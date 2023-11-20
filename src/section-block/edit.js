import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { RangeControl, PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { size, keepLayoutOnMobile } = attributes;

	let mobileLayoutClass = '';
	if (!keepLayoutOnMobile) {
		mobileLayoutClass = '--fullwidth-on-mobile';
	}

	const mobileBreakpoint = '769px';

	// Define a separate blockId for the backend to target elements for backend styling.
	const blockPropsId = useBlockProps().id;

	// Save the block ID into an attribute so it can be used in the save file.
	useEffect(() => {
		setAttributes({ blockId: `${blockPropsId}` });
	}, []);

	// Function to generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		const colStyle = `grid-column: span ${size.colValue}`;

		// Sections are forced fullwidth on mobile.
		styles.push(
			`@media (min-width: ${mobileBreakpoint}) { #${blockPropsId} { ${colStyle}; } }`
		);

		return styles.join('\n');
	};

	const generateBetterRangeUXSpan = (columnSizeVar) => {
		return <span>{((100 / 12) * columnSizeVar).toFixed(0)}%</span>;
	};

	// Generate the inline styles
	const inlineStyles = generateInlineStyles();

	const additionalWrapperProps = { className: `${mobileLayoutClass}` };

	const innerBlocksPropsNew = {
		allowedBlocks: [
			'noble-performs/masonry-block-section-block',
			'noble-performs/masonry-block-image-block',
			'core/paragraph',
		],
		orientation: 'vertical',
	};

	const blockProps = useBlockProps(additionalWrapperProps);

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		blockProps,
		innerBlocksPropsNew
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Section Size', 'masonry-block-section-block')}
				>
					<p className="info-tagline">
						{__(
							'Specify the default width of your section.',
							'masonry-block-section-block'
						)}
					</p>
					<div className="better-range-styling-wrapper">
						<RangeControl
							label={__('Width', 'masonry-block-section-block')}
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
				</PanelBody>

				<PanelBody title={__('Layout', 'masonry-block-section-block')}>
					<ToggleControl
						label={__(
							'Keep Layout on Mobile?',
							'masonry-block-section-block'
						)}
						checked={keepLayoutOnMobile}
						onChange={(newValue) =>
							setAttributes({
								keepLayoutOnMobile: newValue,
							})
						}
						help={__(
							'By default the images will go fullwidth on Mobile devices. Tick this to keep the layout you have given them. (TIP: Preview the mobile view in the top toolbar!)',
							'masonry-block-section-block'
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...innerBlocksProps}>
				{inlineStyles && <style>{inlineStyles}</style>}
				{children}
			</div>
		</>
	);
}
