import './editor.scss';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
	const additionalWrapperProps = {};

	const innerBlocksPropsNew = {
		allowedBlocks: [
			'noble-performs/masonry-block',
			'noble-performs/masonry-block-section-block',
			'core/paragraph',
		],
		orientation: 'horizontal',
	};

	const blockProps = useBlockProps(additionalWrapperProps);

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		blockProps,
		innerBlocksPropsNew
	);

	return (
		<section {...innerBlocksProps}>
			<div className="wp-block-noble-performs-masonry-block__inner">
				{children}
			</div>
		</section>
	);
}
