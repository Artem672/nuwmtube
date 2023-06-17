import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import './ProfileVideos.css'
import PhotoWidgetDropzone from "../../app/common/imageUpload/photoWidgetDropzone";
import MyTextInput from "../../app/common/form/MyTextInput";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadSharpIcon from '@mui/icons-material/CloudUploadSharp';
import Button from "@mui/material/Button";

export default observer(function ProfileVideos() {
    const [inputValue, setInputValue] = useState(""); // Creating a state variable

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Updating the state variable whenever the input changes
    };

    const {
        profileStore:
            {
                isCurrentUser,
                deleteVideo,
                profile,
                uploadVideo
            },
        videoStore
    } = useStore();
    const [files, setFiles] = useState<any>([]);

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    const fileToBlob = async (file: any) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });

    async function handleUploadVideo() {
        try {
            var blob = await fileToBlob(files[0])
            uploadVideo(inputValue, blob);
        } catch (error) {
            console.log(error)
        }
    }

    if (videoStore.loading) return <LoadingComponent/>

    return (
        <div className="videos-container">
            {isCurrentUser &&
                <div className="video-container">
                    <div className="video-image-box">
                        <PhotoWidgetDropzone setFiles={setFiles}/>
                        {files && files.length > 0 &&
                            <div>{files[0].name}</div>
                        }
                    </div>
                    <form className='form-videos'>
                        <div className="video-name">
                            <div className="input-container">
                                <input placeholder="Video name" className="input-field" type="text" required onChange={handleInputChange}/>
                                <label htmlFor="input-field" className="input-label">Enter name</label>
                                <span className="input-highlight"></span>
                            </div>
                        </div>
                        <div className="video-button">
                            {
                                isCurrentUser &&
                                <>
                                    <Button onClick={handleUploadVideo} variant="outlined"
                                            style={{background: 'white'}}
                                            startIcon={<CloudUploadSharpIcon/>}>
                                        Upload
                                    </Button>
                                </>
                            }
                        </div>
                    </form>
                </div>
            }
            {
                profile?.videos?.map(video => (
                    <div className="video-container">
                        <div className="video-image-box">
                            <video className="video-image" src={video.locationSrc}/>
                        </div>
                        <div className="video-name">
                            {video.name}
                        </div>
                        <div className="video-button">
                            {
                                isCurrentUser &&
                                <>
                                    <Button onClick={() => deleteVideo(video)} variant="outlined"
                                            style={{background: 'white'}}
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                </>
                            }
                        </div>
                    </div>
                ))}
        </div>
    )
})