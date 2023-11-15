import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div {...useBlockProps.save()}>
			<div className="wp-block-noble-performs-masonry-block__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
