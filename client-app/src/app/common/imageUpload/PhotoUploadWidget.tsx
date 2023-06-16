import React, {useEffect, useState} from "react";
import './PhotoUpload.css'
import {Cropper} from "react-cropper";
import PhotoWidgetDropzone from "./photoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <div className="widget">
            <div className="widget-element ">
                <PhotoWidgetDropzone setFiles={setFiles}/>
            </div>
            <div className="widget-element " content='Resize image'>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                )}
            </div>
            <div className='img-preview' style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}}/>
            {files && files.length > 0 &&
                <>
                    <Stack direction="column-reverse" spacing={2}>
                        <Button onClick={() => setFiles([])} variant="outlined" style={{background: 'white'}}
                                startIcon={<DeleteIcon/>}>
                            Delete
                        </Button>
                        <Button onClick={onCrop} variant="contained" endIcon={<SendIcon/>}>
                            Send
                        </Button>
                    </Stack>
                </>}
        </div>
    )
}