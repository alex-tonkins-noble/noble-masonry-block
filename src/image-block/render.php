<?php

$blockPropsId = $attributes['blockId'];

$img_id = $attributes['imageID'];
$img_url = $attributes['imageUrl'];
$img_alt = $attributes['imageAlt'] ? $attributes['imageAlt'] : '';

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
        />
    </div>
<?php endif; ?>