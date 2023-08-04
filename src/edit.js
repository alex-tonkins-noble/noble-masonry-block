import './editor.scss';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Custom Test Block – hello from the editor!',
				'custom-block-boilerplate'
			) }
		</p>
	);
}
