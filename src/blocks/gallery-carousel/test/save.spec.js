/**
 * External dependencies
 */
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let blockDOM;
let serializedBlock;

const baseAttributes = {
	images: [
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-2.jpg', id: 2 },
	],
};

describe( name, () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name, baseAttributes );
		// Reset the reused variables.
		serializedBlock = '';
	} );

	afterEach( () => {
		// Make a snapshot for each save function test to better detect deprecation needs.
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with images', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( baseAttributes.images[ 0 ].url );
		expect( serializedBlock ).toContain( `data-id="${baseAttributes.images[ 0 ].id}"` );
		expect( serializedBlock ).toContain( `wp-image-${baseAttributes.images[ 0 ].id}` );
	} );

	it( 'should have className \'has-lightbox\' with lightbox enabled.', () => {
		block.attributes = { ...block.attributes, lightbox: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-lightbox' );
	} );

	it( 'should have thumbnails on swiper if thumbnails enabled', () => {
		block.attributes = { ...block.attributes, thumbnails: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'wp-block-coblocks-gallery-carousel-thumbnail-pagination' );
	})

	it( 'should have navigation swiper setting of \'\.${ attributes.navigation }\' with arrow navigation buttons enabled', () => {
		block.attributes = { ...block.attributes, prevNextButtons: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'nav-button__prev' );
	});

	it( 'should have className \'has-responsive-height\' with responsiveHeight enabled.', () => {
		block.attributes = { ...block.attributes, responsiveHeight: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-responsive-height' );
	} );

	[ 'large', 'xlarge' ].forEach( ( gridSize ) => {
		it( `should have className 'has-carousel-${gridSize}' with gridSize set to '${gridSize}'.`, () => {
			block.attributes = { ...block.attributes, gridSize };

			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-carousel-${ gridSize }` );
		} );
	} );

	[ 'grayscale', 'sepia', 'saturation', 'dim', 'vintage' ].forEach( ( filter ) => {
		it( `should have className \'has-filter-${filter}\' with filter set to '${filter}'.`, () => {
			block.attributes = { ...block.attributes, filter };
			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-filter-${ filter }` );
		} );
	} );

	it( 'should have \'autoPlay\' property set in the data-flickity attribute when autoPlay enabled.', () => {
		block.attributes = { ...block.attributes, autoPlay: false, autoPlaySpeed: 3000 };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		let swiperData = {};

		blockDOM = new JSDOM( serializedBlock );
		swiperData = JSON.parse( blockDOM.window.document.getElementsByClassName( 'has-carousel')[ 0 ].dataset.swiper);
		expect( swiperData.autoPlay ).toBe( false );

		block.attributes = { ...block.attributes, autoPlay: true };
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		swiperData = JSON.parse( blockDOM.window.document.getElementsByClassName( 'has-carousel')[ 0 ].dataset.swiper);
		expect( swiperData.autoPlay ).toBe( true );
	} );

	it( 'should have \'draggable\' property set in the data-swiper attribute when draggable enabled.', () => {
		block.attributes = { ...block.attributes, draggable: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		let swiperData = {};

		blockDOM = new JSDOM( serializedBlock );
		swiperData = JSON.parse( blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ].dataset.swiper );
		expect( swiperData.draggable ).toBe( true );

		block.attributes = { ...block.attributes, draggable: false };
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		swiperData = JSON.parse( blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ].dataset.swiper );
		expect( swiperData.draggable ).toBe( false );
	} );

	it( 'should have \'pageDots\' property set in the data-flickity attribute when pageDots enabled.', () => {
		block.attributes = { ...block.attributes, pageDots: false };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		let swiperData = {};

		blockDOM = new JSDOM( serializedBlock );
		swiperData = JSON.parse( blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ].dataset.swiper );
		expect( swiperData.pageDots ).toBe( false );

		block.attributes = { ...block.attributes, pageDots: true };
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		swiperData = JSON.parse( blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ].dataset.swiper );
		expect( swiperData.pageDots ).toBe( true );
	} );

	it( 'should have className \'has-aligned-cells\' with alignCells enabled.', () => {
		block.attributes = { ...block.attributes, alignCells: false };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ]
		).not.toHaveClass( 'has-aligned-cells' );

		block.attributes = { ...block.attributes, alignCells: true };
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ]
		).toHaveClass( 'has-aligned-cells' );
	} );

	it( 'should have \'height\' property within the \'style\' attribute with the height attribute set.', () => {
		block.attributes = { ...block.attributes, height: 500 };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'has-carousel' )[ 0 ]
		).toHaveStyle( 'height: 500px' );
	} );
} );
