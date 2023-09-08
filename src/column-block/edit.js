import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ToggleControl, RangeControl, PanelBody } from '@wordpress/components';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { size, breakpoints } = attributes; // Define a single "breakpoints" object
	const blockId = useBlockProps().id;

	// Function to update the attribute value
	const updateBreakpoint = (key, value) => {
		setAttributes({ breakpoints: { ...breakpoints, [key]: value } });
	};

	// Function to generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(
			`.block-editor-block-list__block:has(#${blockId}) {
				grid-column: span ${size.colValue};
				grid-row: span ${size.rowValue};
			}`
		);

		// Loop through each breakpoint
		for (const key in breakpoints) {
			const breakpoint = breakpoints[key];

			if (breakpoint.enabled) {
				// Generate the media query based on the breakpoint's min-width
				// Ensuring the class is correct - backend structure differs massively from frontend
				styles.push(
					`@media (max-width: ${breakpoint.breakpointWidth}px) {
						.block-editor-block-list__block:has(#${blockId}) {
							grid-column: span ${breakpoint.colValue};
							grid-row: span ${breakpoint.rowValue};
						}
					}`
				);
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
		<div {...useBlockProps({ className: 'testtest' })}>
			{/* Output the inline styles */}
			{inlineStyles && <style>{inlineStyles}</style>}

			<InspectorControls>
				<PanelBody
					title={__('Column Size', 'layout-block-column-block')}
				>
					<div className="better-range-styling-wrapper">
						<RangeControl
							label={__('Width', 'layout-block-column-block')}
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
						label={__('Height', 'layout-block-column-block')}
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
						'layout-block-column-block'
					)}
				>
					<p className="wp-block-noble-performs-layout-block-info-tagline">
						{__(
							'Change the width and height of your columns on Mobile, Tablet and Desktop here.',
							'layout-block-column-block'
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
													'layout-block-column-block'
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
												'layout-block-column-block'
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

			<div className="layout-block-column-block__inner">
				<span>Column</span>
			</div>
		</div>
	);
}
