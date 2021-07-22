/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings, FontSizePicker, withFontSizes } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param props
 */
const Inspector = ( props ) => {
	const {
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
		fallbackBackgroundColor,
		fallbackTextColor,
	} = props;

	console.log( props );

	return (
		<Fragment>
			<InspectorControls>
				{ /* <PanelBody title={ __( 'Highlight settings', 'coblocks' ) } className="blocks-font-size">
						<FontSizePicker
							fallbackFontSize={ fallbackFontSize }
							value={ fontSize.size }
							onChange={ ( size ) => {
								setFontSize( size );
								this.props.setAttributes( { customFontSize: size } );
							} }
						/>
					</PanelBody> */ }
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background color', 'coblocks' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text color', 'coblocks' ),
						},
					] }
				>
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackBackgroundColor,
							fallbackTextColor,
						} }
					/>
				</PanelColorSettings>
			</InspectorControls>
		</Fragment>
	);
};

export default compose( [
	applyWithColors,
	// withFontSizes( 'fontSize' ),
] )( Inspector );
