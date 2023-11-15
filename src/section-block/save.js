import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save(props) {
	const { attributes } = props;
	const { blockId, size, verticalAlignment } = attributes;

	const vAlignmentClass = verticalAlignment
		? `is-vertically-aligned-${verticalAlignment}`
		: null;

	// Generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(`#${blockId} { grid-column: span ${size.colValue}; }`);

		return styles.join('\n');
	};

	const inlineStyles = generateInlineStyles();

	return (
		<div
			id={blockId}
			{...useBlockProps.save({ className: vAlignmentClass })}
		>
			{/* Output the inline styles */}
			{inlineStyles && <style>{inlineStyles}</style>}

			<div className="masonry-block-section-block__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
