import './editor.scss';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { previewBreakpoints } = attributes;

	// TO DO - Get the active breakpoint label and add it to the preview mode. "You are previewing "LABEL" view.".

	// Function to handle the toggle of breakpoint active state
	const toggleBreakpoint = (breakpoint) => {
		const updatedBreakpoints = { ...previewBreakpoints };

		// Toggle the active state for the selected breakpoint
		updatedBreakpoints[breakpoint].active =
			!updatedBreakpoints[breakpoint].active;

		// Set all other breakpoints to false
		for (const key in updatedBreakpoints) {
			if (key !== breakpoint) {
				updatedBreakpoints[key].active = false;
			}
		}

		// Update the block attributes
		setAttributes({ previewBreakpoints: updatedBreakpoints });
	};

	const anyBreakpointIsActive = () => {
		if (
			previewBreakpoints &&
			Object.values(previewBreakpoints).some((bp) => bp.active)
		) {
			return true;
		}
	};

	const activePreviewModeClass = anyBreakpointIsActive()
		? 'preview-mode'
		: '';

	return (
		<>
			<div {...useBlockProps({ className: `${activePreviewModeClass}` })}>
				{anyBreakpointIsActive() && (
					<p className="preview-mode__text">
						Preview Mode is Active.
					</p>
				)}
				<div className="wp-block-noble-performs-layout-block__inner">
					<InnerBlocks
						allowedBlocks={[
							'noble-performs/layout-block-column-block',
						]}
						orientation="horizontal"
					/>
				</div>
			</div>

			<BlockControls group="block">
				<ToolbarDropdownMenu
					icon="filter"
					label={__('Preview Breakpoints')}
					controls={[
						...Object.keys(previewBreakpoints).map(
							(breakpoint) => ({
								icon: '',
								title: `${__('Preview the ')}${
									previewBreakpoints[breakpoint].label
								}${__(' view?')}`,
								onClick: () => toggleBreakpoint(breakpoint),
								isActive: previewBreakpoints[breakpoint].active,
							})
						),
					]}
				></ToolbarDropdownMenu>
			</BlockControls>
		</>
	);
}
