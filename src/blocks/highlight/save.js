/**
 * Internal dependencies
 */
import { computeFontSize } from '../../utils/helper';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName, useBlockProps } from '@wordpress/block-editor';

const save = ( props ) => {
	const {
		backgroundColor,
		content,
		customBackgroundColor,
		customFontSize,
		customTextColor,
		fontSize,
		align,
		textColor,
	} = props.attributes;

	const textClass = getColorClassName( 'color', textColor );

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	const classes = classnames( 'wp-block-coblocks-highlight__content', {
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundClass ]: backgroundClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: computeFontSize( fontSize ) ?? customFontSize ?? undefined,
	};

	return RichText.isEmpty( content ) ? null : (
		<p { ...useBlockProps.save( { style: { textAlign: align } } ) }>
			<RichText.Content
				tagName="mark"
				className={ classes }
				style={ styles }
				value={ content }
			/>
		</p>
	);
};

export default save;
