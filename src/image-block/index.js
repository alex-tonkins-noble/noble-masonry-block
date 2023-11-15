import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	title: metadata.title,
	icon: metadata.icon,
	parent: metadata.parent,
	supports: metadata.supports,
	attributes: metadata.attributes,
	edit: Edit,
	save: save,
});
