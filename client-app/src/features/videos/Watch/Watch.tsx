import LoadingComponent from "../../../app/layout/LoadingComponent";
import React, {useEffect} from "react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import './Watch.css'
import Chat from "./Chat";

export default observer(function Watch() {
    const {videoStore} = useStore();
    const {loadVideo, selectedVideo} = videoStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadVideo(id);
    }, [id, loadVideo])

    if (videoStore.loading) return <LoadingComponent/>

    return (
        <div className='watch_panel'>
            <div className="video_player">
                <video className="player" controls controlsList="nodownload">
                    <source src="https://nuwmtube.blob.core.windows.net/videos/sample-5s.mp4"
                            type="video/mp4"/>
                </video>
                <div className="title">{selectedVideo?.name}</div>
            </div>
            <Chat/>
        </div>
    )
})