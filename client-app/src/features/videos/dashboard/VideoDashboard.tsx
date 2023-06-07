import React, {useEffect} from "react";
import '../../../app/layout/Grid.css'
import VideoCard from "./VideoCard";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

export default observer(function VideoDashboard() {
    const {videoStore} = useStore();
    const {videosByDate} = videoStore;

    useEffect(() => {
        videoStore.loadVideos();
    }, [videoStore])

    if (videoStore.loading) return <LoadingComponent/>

    return (
        <div className="grid">
            {videosByDate.map((video) => (<VideoCard
                video={video}
                key={video.id}
            />))}
        </div>
    )
})