import React from "react";
import {Video} from "../../../app/models/video";
import '../../../app/layout/Grid.css'
import VideoCard from "./VideoCard";

interface Props {
    videos: Video[];
    selectedVideo: Video | undefined;
    selectVideo: (id: string) => void;
}

export default function VideoDashboard({videos, selectedVideo, selectVideo}: Props) {
    return (
        <div className="grid">
            { videos.map((video) => ( <VideoCard
                video={video}
                selectVideo={selectVideo}
                key={video.id}
            />))}
        </div>
    )
}