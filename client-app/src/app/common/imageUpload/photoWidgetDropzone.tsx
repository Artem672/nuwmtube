import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import PublishIcon from '@mui/icons-material/Publish';
import {Stack} from "@mui/material";

interface Props {
    setFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
    const dzStyles = {
    }

    const dzActive = {
    }

    const onDrop = useCallback((acceptedFiles: any) => {
       setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
           preview: URL.createObjectURL(file)
       })))
    }, [setFiles])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
            <input {...getInputProps()} />
            <Stack display='flex' flexDirection='column' alignItems='center' fontSize='32px'>
                <PublishIcon fontSize='inherit'/>
                <p style={{fontSize: 'medium'}}>Drop here</p>
            </Stack>
        </div>
    )
}