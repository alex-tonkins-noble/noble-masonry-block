<?php

$blockPropsId = $attributes['blockId'];
$mobileBreakpoint = '769px';
$keepLayoutOnMobile = $attributes['keepLayoutOnMobile'];
$keepLayoutOnMobileClass = !$keepLayoutOnMobile ? ' --fullwidth-on-mobile' : '';

$img_id = $attributes['imageID'];
$img_url = $attributes['imageUrl'];
$img_alt = $attributes['imageAlt'] ? $attributes['imageAlt'] : '';

$size = $attributes['size'];
$colValue = $size && $size['colValue'] ? $size['colValue'] : 12;

$ratio = $attributes['aRatio'];
$numerator = $ratio && $ratio['numerator'] ? $ratio['numerator'] : null;
$denominator = $ratio && $ratio['denominator'] ? $ratio['denominator'] : null;

$colStyle = "grid-column: span {$colValue}";

// Sections are forced fullwidth on mobile.
$styles = "@media (min-width: {$mobileBreakpoint}) { #{$blockPropsId} { {$colStyle}; } }";

?>

<div
    id="<?php echo $blockPropsId ?>"
    <?php echo get_block_wrapper_attributes([
        'class' => $keepLayoutOnMobileClass,
    ]); ?>
    >

    <style><?php echo $styles ?></style>

    <?php echo $content ?>
</div>