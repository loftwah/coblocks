/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings } from '@wordpress/block-editor';

/**
 * Inspector controls
 *
 * @param {Object} props Block props
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

	return (
		<>
			<InspectorControls>
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
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );
