import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div {...useBlockProps.save()}>
			<p>{'Custom Test Block – hello from the saved content!'}</p>

			<InnerBlocks.Content />
		</div>
	);
}
