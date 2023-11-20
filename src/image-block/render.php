<?php

$blockPropsId = $attributes['blockId'];

$img_id = $attributes['imageID'];
$img_url = $attributes['imageUrl'];
$img_alt = $attributes['imageAlt'] ? $attributes['imageAlt'] : '';
$img_thumb = $attributes['imageThumbSize'];

$img_src = wp_get_attachment_image_src( $img_id, $img_thumb );
$img_width = $img_src && $img_src[1] ? $img_src[1] : null;
$img_height = $img_src && $img_src[2] ? $img_src[2] : null;

$size = $attributes['size'];
$colValue = $size && $size['colValue'] ? $size['colValue'] : 12;

$ratio = $attributes['aRatio'];
$numerator = $ratio && $ratio['numerator'] ? $ratio['numerator'] : null;
$denominator = $ratio && $ratio['denominator'] ? $ratio['denominator'] : null;

$colStyle = "grid-column: span {$colValue}";
$paddingStyle = "padding-bottom: " . convertAspectRatioToPercentage($numerator, $numerator);

$styles = "#{$blockPropsId} { {$colStyle}; {$paddingStyle}; }";

?>

<?php if ($img_url): ?>
    <div
        id="<?php echo $blockPropsId ?>"
        <?php echo get_block_wrapper_attributes(); ?>
        >

        <style><?php echo $styles ?></style>

        <img
            class="masonry-block-image-block__img"
            src="<?php echo $img_url ?>"
            alt="<?php echo $img_alt ?>"
            width="<?php echo $img_width ?>"
            height="<?php echo $img_height ?>"
        />
    </div>
<?php endif; ?>