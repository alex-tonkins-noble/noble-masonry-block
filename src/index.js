import './style.scss';
import './section-block';
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
