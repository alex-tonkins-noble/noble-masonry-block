import { useBlockProps } from '@wordpress/block-editor';
import convertAspectRatioToPercentage from '../functions/convertAspectRatioToPercentage';

export default function Save(props) {
	const { attributes } = props;
	const { blockId, size, imageUrl, imageAlt, imageID, aRatio } = attributes;

	// Generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		const colStyle = `grid-column: span ${size.colValue}`;
		const paddingStyle = `padding-bottom: ${convertAspectRatioToPercentage(
			aRatio.numerator,
			aRatio.denominator
		)}`;

		styles.push(`#${blockId} { ${colStyle}; ${paddingStyle}; } `);

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
