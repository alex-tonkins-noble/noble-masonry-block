import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { RangeControl, PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { size, verticalAlignment } = attributes;

	const vAlignmentClass = verticalAlignment
		? `is-vertically-aligned-${verticalAlignment}`
		: null;

	// Define a separate blockId for the backend to target elements for backend styling.
	const blockPropsId = useBlockProps().id;

	// Save the block ID into an attribute so it can be used in the save file.
	useEffect(() => {
		setAttributes({ blockId: `${blockPropsId}` });
	}, []);

	// Function to generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(
			`.wp-block-noble-performs-masonry-block .block-editor-block-list__block:has(#${blockPropsId}) { grid-column: span ${size.colValue}; }`
		);

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
			</InspectorControls>

			<div
				{...useBlockProps({
					className: `${vAlignmentClass}`,
				})}
			>
				{/* Output the inline styles */}
				{inlineStyles && <style>{inlineStyles}</style>}

				<div className="masonry-block-section-block__inner">
					<InnerBlocks
						orientation="vertical"
						allowedBlocks={[
							'noble-performs/masonry-block-section-block',
							'core/image',
						]}
					/>
				</div>
			</div>
		</>
	);
}
