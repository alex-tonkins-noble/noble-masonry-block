import { useBlockProps } from '@wordpress/block-editor';

export default function Save(props) {
	const { attributes } = props;
	const { blockId, size } = attributes;

	// Generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(`#${blockId} { grid-column: span ${size.colValue}; }`);

		return styles.join('\n');
	};

	const inlineStyles = generateInlineStyles();

	return (
		<div id={blockId} {...useBlockProps.save()}>
			{/* Output the inline styles */}
			{inlineStyles && <style>{inlineStyles}</style>}

			<div className="masonry-block-image-block__inner"></div>
		</div>
	);
}
