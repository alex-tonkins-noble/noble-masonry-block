import './editor.scss';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<>
			<div {...useBlockProps()}>
				<div className="wp-block-noble-performs-masonry-block__inner">
					<InnerBlocks
						allowedBlocks={[
							'noble-performs/masonry-block-section-block',
						]}
						orientation="horizontal"
					/>
				</div>
			</div>
		</>
	);
}
