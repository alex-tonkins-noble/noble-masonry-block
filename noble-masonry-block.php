<?php
/**
 * Plugin Name:       Noble Masonry Block
 * Plugin URI:        https://nobleperforms.co.uk/
 * Description:       A block used to create spectacular masonry galleries.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Alex Tonkins - Noble Performs
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       noble-masonry-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_noble_masonry_block_init() {
	register_block_type( __DIR__ . '/build/masonry-block' );
	register_block_type( __DIR__ . '/build/section-block' );
	register_block_type( __DIR__ . '/build/image-block' );
}
add_action( 'init', 'create_noble_masonry_block_init' );

// Function to convert aspect ratio parts to a percentage
function convertAspectRatioToPercentage($numerator, $denominator) {
	// Check if the input is valid - if not then return the percentage as 100% (1:1).
	if (!is_numeric($numerator) || !is_numeric($denominator) || $denominator == 0) {
		return '100%';
	}

	// Calculate the percentage based on the ratio parts
	$percentage = ($numerator / $denominator) * 100;

	return $percentage . '%';
}