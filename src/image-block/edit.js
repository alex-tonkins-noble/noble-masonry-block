import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	RangeControl,
	PanelBody,
	SelectControl,
	TextareaControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import convertAspectRatioToPercentage from '../functions/convertAspectRatioToPercentage';

function Edit(props) {
	const { attributes, setAttributes, noticeOperations, noticeUI } = props;
	const { size, imageUrl, imageAlt, imageID, aRatio } = attributes;
	const maxAspectRatioSize = 100;

	const [blobURL, setBlobURL] = useState();

	// Define a separate blockId for the backend to target elements for backend styling.
	const blockPropsId = useBlockProps().id;

	// Using the core data store to use the getMedia function, based on an ID, to return all information about the uploaded image
	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select('core');

			return getMedia(imageID);
		},
		[imageID]
	);

	// Using the block-editor data store, get all of the available image sizes within the theme
	const themeImageSizes = useSelect((select) => {
		const { imageSizes } = select(blockEditorStore).getSettings();

		return imageSizes;
	}, []);

	// Render a list of image sizes available to choose from, by comparing the respective image sizes with the sizes available in the theme
	const getAvailableImageSizes = () => {
		// If the imageObject does not exist, then exit
		if (!imageObject) return;

		// Declare empty array of final sizes to push to
		const finalList = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			// Find both the respective image sizes and theme image sizes, used to check if they both exist
			const s = sizes[key];
			const imageSize = themeImageSizes.find((v) => v.slug === key);

			// Push the name and url to the final array of image sizes used to populate the list - only using label and value as that is what <SelectControl> uses
			if (imageSize) {
				finalList.push({
					label: imageSize.name,
					value: s.source_url,
				});
			}
		}

		return finalList;
	};

	const setImage = (img) => {
		if (!img || !img.url) {
			resetImage();
			return;
		}

		setAttributes({
			imageUrl: img.url,
			imageAlt: img.alt,
			imageID: img.id,
		});
	};

	const changeImageSize = (val) => {
		setAttributes({ imageUrl: val });
	};

	const setAlt = (val) => {
		setAttributes({ imageAlt: val });
	};

	const setInsertedImage = (img) => {
		resetImage();
		setAttributes({ imageUrl: img });
	};

	const resetImage = () => {
		setAttributes({ imageUrl: undefined, imageAlt: '', imageID: null });
	};

	// Save the block ID into an attribute so it can be used in the save file.
	useEffect(() => {
		setAttributes({ blockId: `${blockPropsId}` });
	}, []);

	// If the image wasn't uploaded correctly and remains a blob URL - then we must clear this upon first reload as to not cause any errors.
	useEffect(() => {
		if (isBlobURL(imageUrl)) {
			resetImage();
		}
	}, []);

	// Remove the reference to the locally stored blobURL when we don't need it anymore - the image URL attribute will be the dependency
	useEffect(() => {
		if (isBlobURL(imageUrl)) {
			// Check if image is blob URL and store it in a new state
			setBlobURL(imageUrl);
		} else {
			// Once image has uploaded / converted to a regular image - remove the old blob URL
			revokeBlobURL(blobURL);
			setBlobURL(undefined);
		}
	}, [imageUrl]);

	const setErrorNotices = (msg) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(msg);
	};

	// Function to generate the inline styles
	const generateInlineStyles = () => {
		const styles = [];

		const colStyle = `grid-column: span ${size.colValue}`;
		const paddingStyle = `padding-bottom: ${convertAspectRatioToPercentage(
			aRatio.numerator,
			aRatio.denominator
		)}`;

		// Very different markup to the save function due to how WordPress generates the markup of the backend.
		styles.push(`#${blockPropsId} { ${colStyle}; ${paddingStyle}; } `);

		return styles.join('\n');
	};

	const generateBetterRangeUXSpan = (columnSizeVar) => {
		return <span>{((100 / 12) * columnSizeVar).toFixed(0)}%</span>;
	};

	// Generate the inline styles
	const inlineStyles = generateInlineStyles();

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	const additionalWrapperProps = {
		className: `wp-block-noble-performs-masonry-block-image-block`,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'team-member-block')}>
					{imageUrl && !isBlobURL(imageUrl) && (
						<TextareaControl
							label={__('Custom Alt Text', 'team-member-block')}
							help={__(
								'Override the default alt text of the image here.',
								'team-member-block'
							)}
							value={imageAlt}
							onChange={(value) => setAlt(value)}
						/>
					)}
					{imageID && (
						<SelectControl
							label={__('Image Size', 'team-member-block')}
							value={imageUrl}
							options={getAvailableImageSizes()}
							onChange={(value) => changeImageSize(value)}
						/>
					)}
				</PanelBody>

				{imageUrl && (
					<BlockControls group="inline">
						<MediaReplaceFlow
							name={'Replace Image'}
							mediaURL={imageUrl}
							mediaId={imageID}
							allowedTypes={['image']}
							accept="image/*"
							onSelect={(img) => setImage(img)}
							onSelectURL={(img) => setInsertedImage(img)}
							onError={(msg) => setErrorNotices(msg)}
						/>
						<ToolbarButton
							icon={'trash'}
							label={__('Remove Image', 'team-member-block')}
							onClick={() => resetImage()}
						>
							{__('Remove Image', 'team-member-block')}
						</ToolbarButton>
					</BlockControls>
				)}

				<PanelBody
					title={__('Section Size', 'masonry-block-section-block')}
				>
					<p className="info-tagline">
						{__(
							'Specify the default width of your section.',
							'masonry-block-section-block'
						)}
					</p>

					<div className="better-range-styling-wrapper">
						<RangeControl
							label={__('Width', 'masonry-block-section-block')}
							value={size.colValue}
							onChange={(newValue) =>
								setAttributes({
									size: { ...size, colValue: newValue },
								})
							}
							min={1}
							max={12}
						/>
						{generateBetterRangeUXSpan(size.colValue)}
					</div>
					<div className="aspect-ratio-wrapper">
						<input
							id="numeratorInput"
							type="number"
							value={aRatio.numerator}
							onChange={(event) => {
								const clampedValue = clamp(
									parseInt(event.target.value, 10),
									1,
									maxAspectRatioSize
								);
								setAttributes({
									aRatio: {
										...aRatio,
										numerator: clampedValue,
									},
								});
							}}
							min={1}
							max={maxAspectRatioSize}
						/>
						<span className="separator">:</span>
						<input
							id="denominatorInput"
							type="number"
							value={aRatio.denominator}
							onChange={(event) => {
								const clampedValue = clamp(
									parseInt(event.target.value, 10),
									1,
									maxAspectRatioSize
								);

								setAttributes({
									aRatio: {
										...aRatio,
										denominator: clampedValue,
									},
								});
							}}
							min={1}
							max={maxAspectRatioSize}
						/>

						<span>
							{convertAspectRatioToPercentage(
								aRatio.numerator,
								aRatio.denominator
							)}
						</span>
					</div>
				</PanelBody>
			</InspectorControls>

			{/* Adding the blockPropsId as a classname in order to target it and render the grid in the backend. Frontend markup is much easier to manage. */}
			<div {...useBlockProps(additionalWrapperProps)}>
				{/* Output the inline styles */}
				{inlineStyles && <style>{inlineStyles}</style>}

				{imageUrl && (
					<>
						{/* NEED TO SYLE THIS!! */}
						{isBlobURL(imageUrl) && (
							<div className="spinner_wrapper">
								<Spinner />
							</div>
						)}

						<img
							className="masonry-block-image-block__img"
							src={imageUrl}
							alt={imageAlt}
						/>
					</>
				)}
				<MediaPlaceholder
					icon={'format-image'}
					onSelect={(img) => setImage(img)}
					onSelectURL={(img) => setInsertedImage(img)}
					onError={(msg) => setErrorNotices(msg)}
					// accept='image/*'
					allowedTypes={['image']}
					disableMediaButtons={imageUrl}
					notices={noticeUI}
				/>
			</div>
		</>
	);
}

export default withNotices(Edit);
