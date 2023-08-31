import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const {} = attributes;

	return (
		<div {...useBlockProps()}>
			<p>Column to go here</p>
		</div>
	);
}
