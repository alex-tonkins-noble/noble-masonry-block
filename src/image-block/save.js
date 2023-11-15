import { useBlockProps } from '@wordpress/block-editor';

export default function Save(props) {
	const { attributes } = props;
	const { blockId, size, imageUrl, imageAlt, imageID } = attributes;

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

			{imageUrl && (
				<img
					src={imageUrl}
					alt={imageAlt}
					className={imageID && `wp-image-${imageID}`}
				/>
			)}
		</div>
	);
}
