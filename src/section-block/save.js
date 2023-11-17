import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save(props) {
	const { attributes } = props;
	const { blockId, size, verticalAlignment } = attributes;

	const vAlignmentClass = verticalAlignment
		? `is-vertically-aligned-${verticalAlignment}`
		: '';

	// Generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(`#${blockId} { grid-column: span ${size.colValue}; }`);

		return styles.join('\n');
	};

	const inlineStyles = generateInlineStyles();

	const additionalWrapperProps = {
		className: `class_number_2 ${vAlignmentClass}`,
	};

	const blockProps = useBlockProps.save(additionalWrapperProps);
	const { children, ...innerBlocksProps } =
		useInnerBlocksProps.save(blockProps);

	return (
		<div id={blockId} {...innerBlocksProps}>
			{inlineStyles && <style>{inlineStyles}</style>}
			{children}
		</div>
	);
}
