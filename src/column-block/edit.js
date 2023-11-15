import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { ToggleControl, RangeControl, PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit(props) {
	const { attributes, setAttributes, context } = props;
	const { size, breakpoints, verticalAlignment } = attributes; // Define a single "breakpoints" object

	const previewBreakpoints = context['noble-performs/masonry-block/previews'];

	const vAlignmentClass = verticalAlignment
		? `is-vertically-aligned-${verticalAlignment}`
		: null;

	// Define a separate blockId for the backend to target elements for backend styling.
	const blockPropsId = useBlockProps().id;

	// Save the block ID into an attribute so it can be used in the save file.
	useEffect(() => {
		setAttributes({ blockId: `${blockPropsId}` });
	}, []);

	// Function to update the attribute value
	const updateBreakpoint = (key, value) => {
		setAttributes({ breakpoints: { ...breakpoints, [key]: value } });
	};

	// Check if any preview breakpoint is active
	const anyBreakpointIsActive = () => {
		if (
			previewBreakpoints &&
			Object.values(previewBreakpoints).some((bp) => bp.active)
		) {
			return true;
		}
	};

	// Return the active breakpoint object
	const activePreviewBreakpoint = () => {
		for (const breakpoint in previewBreakpoints) {
			if (previewBreakpoints[breakpoint].active === true) {
				return previewBreakpoints[breakpoint];
			}
		}

		return null;
	};

	// Function to generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(
			`.wp-block-noble-performs-masonry-block .block-editor-block-list__block:has(#${blockPropsId}) { grid-column: span ${size.colValue}; grid-row: span ${size.rowValue}; }`
		);

		// Loop through each breakpoint
		for (const key in breakpoints) {
			const breakpoint = breakpoints[key];

			if (breakpoint.enabled) {
				/**
				 * Declare the Selector in which the grid columns and rows should be attached
				 * Also declare the grid columns and grid rows in their own variables, whilst adding "!important" to them if the respective breakpoint is in "preview mode"
				 * - Adding "!important" overrides every other breakpoints values.
				 */
				const selector = `.wp-block-noble-performs-masonry-block .block-editor-block-list__block:has(#${blockPropsId})`;
				const gridColumn = `grid-column: span ${breakpoint.colValue}${
					previewBreakpoints[key]?.active ? ' !important' : ''
				}`;
				const gridRow = `grid-row: span ${breakpoint.rowValue}${
					previewBreakpoints[key]?.active ? ' !important' : ''
				}`;

				/**
				 * Push the inline styles for each active breakpoint.
				 * If we are in preview mode, then DO NOT wrap the styles in a media query because we want the admin to see them without resizing their browser.
				 * Also check if the breakpoint being previewed is <= the breakpoints' attached to each column.
				 * This is to ensure we aren't previewing Mobile styles on Desktop if Desktop isn't enabled on a specific column - as an example.
				 */
				if (
					anyBreakpointIsActive() &&
					previewBreakpoints[key].order <=
						activePreviewBreakpoint().order
				) {
					styles.push(`${selector} { ${gridColumn}; ${gridRow}; }`);
				} else {
					styles.push(
						`@media (max-width: ${breakpoint.breakpointWidth}px) { ${selector} { ${gridColumn}; ${gridRow}; } }`
					);
				}
			}
		}

		return styles.join('\n');
	};

	const generateBetterRangeUXSpan = (columnSizeVar) => {
		return <span>{((100 / 12) * columnSizeVar).toFixed(0)}%</span>;
	};

	// Generate the inline styles
	const inlineStyles = generateInlineStyles();

	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					value={verticalAlignment}
					onChange={(value) => {
						setAttributes({ verticalAlignment: value });
					}}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={__('Column Size', 'masonry-block-column-block')}
				>
					<p className="info-tagline">
						{__(
							'Specify the default width and height of your column.',
							'masonry-block-column-block'
						)}
					</p>
					<div className="better-range-styling-wrapper">
						<RangeControl
							label={__('Width', 'masonry-block-column-block')}
							value={size.colValue}
							onChange={(newValue) =>
								setAttributes({
									size: { ...size, colValue: newValue },
								})
							}
							min={1}
							max={12}
						/>
						{generateBetterRangeUXSpan(size.colValue)}
					</div>
					{/* Set the Row Span */}
					<RangeControl
						label={__('Height', 'masonry-block-column-block')}
						value={size.rowValue}
						onChange={(newValue) =>
							setAttributes({
								size: { ...size, rowValue: newValue },
							})
						}
						min={1}
						max={10}
					/>
				</PanelBody>
				<PanelBody
					title={__(
						'Column Breakpoints',
						'masonry-block-column-block'
					)}
				>
					<p className="info-tagline">
						{__(
							'Change the width and height of your columns on Mobile, Tablet and Desktop here - not mandatory, but highly advised.',
							'masonry-block-column-block'
						)}
					</p>
					{/* Loop through each breakpoint */}
					{Object.keys(breakpoints).map((key) => {
						const breakpoint = breakpoints[key];

						return (
							<div key={key}>
								<ToggleControl
									label={`Specify Column Width on ${breakpoint.label}? <${breakpoint.breakpointWidth}px`}
									checked={breakpoint.enabled}
									onChange={(newValue) =>
										updateBreakpoint(key, {
											...breakpoint,
											enabled: newValue,
										})
									}
								/>

								{breakpoint.enabled && (
									<>
										<div className="better-range-styling-wrapper">
											{/* Set the Column Span */}
											<RangeControl
												label={__(
													'Width',
													'masonry-block-column-block'
												)}
												value={breakpoint.colValue}
												onChange={(newValue) =>
													updateBreakpoint(key, {
														...breakpoint,
														colValue: newValue,
													})
												}
												min={1}
												max={12}
											/>
											{generateBetterRangeUXSpan(
												breakpoint.colValue
											)}
										</div>

										{/* Set the Row Span */}
										<RangeControl
											label={__(
												'Height',
												'masonry-block-column-block'
											)}
											value={breakpoint.rowValue}
											onChange={(newValue) =>
												updateBreakpoint(key, {
													...breakpoint,
													rowValue: newValue,
												})
											}
											min={1}
											max={10}
										/>
									</>
								)}
							</div>
						);
					})}
				</PanelBody>
			</InspectorControls>

			<div
				{...useBlockProps({
					className: `${vAlignmentClass}`,
				})}
			>
				{/* Output the inline styles */}
				{inlineStyles && <style>{inlineStyles}</style>}

				<div className="masonry-block-column-block__inner">
					<InnerBlocks orientation="vertical" />
				</div>
			</div>
		</>
	);
}
