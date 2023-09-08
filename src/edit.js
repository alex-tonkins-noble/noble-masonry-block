import './editor.scss';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<>
			<div {...useBlockProps()}>
				<InnerBlocks
					allowedBlocks={['noble-performs/layout-block-column-block']}
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
