import './editor.scss';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<>
			<div {...useBlockProps()}>
				<p>
					{__(
						'Custom Test Block - hello from the editor!',
						'noble-layout-block'
					)}
				</p>
				<InnerBlocks
					allowedBlocks={['noble-performs/layout-block-column-block']}
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
