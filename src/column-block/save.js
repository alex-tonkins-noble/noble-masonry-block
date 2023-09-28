import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save(props) {
	const { attributes } = props;
	const { blockId, size, breakpoints, verticalAlignment } = attributes;

	const vAlignmentClass = verticalAlignment
		? `is-vertically-aligned-${verticalAlignment}`
		: null;

	// Generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		styles.push(
			`#${blockId} { grid-column: span ${size.colValue}; grid-row: span ${size.rowValue}; }`
		);

		// Loop through each breakpoint
		for (const key in breakpoints) {
			const breakpoint = breakpoints[key];

			if (breakpoint.enabled) {
				// Generate the media query based on the breakpoint's min-width
				styles.push(
					`@media (max-width: ${breakpoint.breakpointWidth}px) { #${blockId} { grid-column: span ${breakpoint.colValue}; grid-row: span ${breakpoint.rowValue}; } }`
				);
			}
		}

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

			<div className="layout-block-column-block__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
