/**
 * WordPress dependencies
 */
import { DropZone } from '@wordpress/components';
import { mediaUpload } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

const GalleryDropZone = ( props ) => {
	const { noticeOperations, onSelect, label } = props;

	const addFiles = ( files ) => {
		mediaUpload( {
			allowedTypes: helper.ALLOWED_GALLERY_MEDIA_TYPES,
			filesList: files,
			onError: noticeOperations.createErrorNotice,
			onFileChange: ( images ) => onSelect( images ),
		} );
	};

	return (
		<DropZone
			label={ label }
			onFilesDrop={ addFiles }
		/>
	);
};

export default GalleryDropZone;
