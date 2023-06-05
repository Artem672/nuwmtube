import React from "react";
import {Video} from "../../../app/models/video";
import '../../../app/layout/Grid.css'

interface Props {
    video: Video;
    selectVideo: (id: string) => void;
}

export default function VideoCard({video, selectVideo}: Props) {
    return (
        <div className="grid__item" onClick={() => selectVideo(video.id)}>
            <div className="card">
                <img
                    className="card__img" alt=""
                    src="https://ichef.bbci.co.uk/news/976/cpsprodpb/15951/production/_117310488_16.jpg.webp"/>
            </div>
            <div className="card__content">
                <h1 className="card__header">{video.name}</h1>
                <p className="card__text">{video.name}</p>
            </div>
        </div>
    )
}