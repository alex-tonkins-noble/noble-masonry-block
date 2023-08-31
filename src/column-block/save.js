import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
	const { attributes } = props;
	const {} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<p>Save content here</p>
		</div>
	);
}
