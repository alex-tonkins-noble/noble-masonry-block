import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
// import save from './save';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType(metadata, {
	edit: Edit,
	save: (props) => <InnerBlocks.Content />,
});
