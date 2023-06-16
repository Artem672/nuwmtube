import React, {SyntheticEvent, useState} from "react";
import {observer} from "mobx-react-lite";
import './ProfilePhotos.css'
import {Photo, Profile} from "../../app/models/profile";
import {useStore} from "../../app/stores/store";
import AddIcon from '@mui/icons-material/Add';
import {Stack} from "@mui/material";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import {Button} from "semantic-ui-react";

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({profile}: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto,
        uploading,loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <div className='photo-grid'>
            {isCurrentUser &&
                <div className="add-photo" onClick={() => setAddPhotoMode(!addPhotoMode)}>
                    <Stack alignItems="center" className={addPhotoMode ? "plus-icon-rotate" : "plus-icon"}>
                        <AddIcon fontSize={"inherit"}/>
                    </Stack>
                </div>
            }
            {
                addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                ) : (
                    <>
                        {profile.photos?.map(photo => (
                            <div key={photo.id}>
                                <img src={photo.url}/>
                                {isCurrentUser && (
                                    <Button.Group fluid widths={2}>
                                        <Button
                                            basic
                                            color='green'
                                            content='Main'
                                            name={'main' + photo.id}
                                            loading={target === 'main' + photo.id && loading}
                                            disabled={photo.isMain}
                                            onClick={e => handleSetMainPhoto(photo, e)}
                                        />
                                       {/* <Button
                                            name={photo.id}
                                            loading={loading && photo.id === target}
                                            onClick={(e) => handleDeletePhoto(photo, e)}
                                            basic
                                            color='red'
                                            icon='trash'
                                            disabled={photo.isMain}
                                        />*/}
                                    </Button.Group>
                                )}
                            </div>
                        ))}
                    </>
                )
            }

        </div>
    )
})