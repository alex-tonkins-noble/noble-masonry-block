import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function BlockSave() {
	const additionalWrapperProps = {
		className: 'class_number_1',
	};

	const blockProps = useBlockProps.save(additionalWrapperProps);
	const { children, ...innerBlocksProps } =
		useInnerBlocksProps.save(blockProps);

	return (
		<section {...innerBlocksProps}>
			<div className="wp-block-noble-performs-masonry-block__inner">
				{children}
			</div>
		</section>
	);
}
