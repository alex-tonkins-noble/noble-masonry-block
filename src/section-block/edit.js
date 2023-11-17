import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { RangeControl, PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { size, verticalAlignment, layout } = attributes;

	// Define a separate blockId for the backend to target elements for backend styling.
	const blockPropsId = useBlockProps().id;

	// Save the block ID into an attribute so it can be used in the save file.
	useEffect(() => {
		setAttributes({ blockId: `${blockPropsId}` });
	}, []);

	// Function to generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		// Very different markup to the save function due to how WordPress generates the markup of the backend.
		styles.push(`#${blockPropsId} { grid-column: span ${size.colValue}; }`);

		return styles.join('\n');
	};

	const generateBetterRangeUXSpan = (columnSizeVar) => {
		return <span>{((100 / 12) * columnSizeVar).toFixed(0)}%</span>;
	};

	// Generate the inline styles
	const inlineStyles = generateInlineStyles();

	const additionalWrapperProps = {};

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

				<PanelBody title={__('Test', 'masonry-block-section-block')}>
					<ToggleControl
						label={__(
							'Keep Layout on Mobile?',
							'masonry-block-section-block'
						)}
						checked={layout}
						onChange={(newValue) =>
							setAttributes({
								value: newValue,
							})
						}
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
