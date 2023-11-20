import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const { blockId, size, keepLayoutOnMobile } = attributes;

	let mobileLayoutClass = '';
	if (!keepLayoutOnMobile) {
		mobileLayoutClass = '--fullwidth-on-mobile';
	}

	const mobileBreakpoint = '769px';

	// Generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		const colStyle = `grid-column: span ${size.colValue}`;

		styles.push(
			`@media (min-width: ${mobileBreakpoint}) { #${blockId} { ${colStyle}; } }`
		);

		return styles.join('\n');
	};

	const inlineStyles = generateInlineStyles();

	const additionalWrapperProps = {
		className: `${mobileLayoutClass}`,
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
