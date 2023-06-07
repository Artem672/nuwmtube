import React from "react";
import {Video} from "../../../app/models/video";
import '../../../app/layout/Grid.css'
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, NavLink} from "react-router-dom";

interface Props {
    video: Video;
}

export default observer(function VideoCard({video}: Props) {
    const {videoStore} = useStore();

    return (
        <Link to={`/watch/${video.id}`}>
            <div className="grid__item" onClick={() => videoStore.selectVideo(video.id)}>
                <div className="card">
                    <img
                        className="card__img" alt=""
                        src="https://ichef.bbci.co.uk/news/976/cpsprodpb/15951/production/_117310488_16.jpg.webp"/>
                </div>
                <div className="card__content">
                    <h1 className="card__header">{video.name}</h1>
                    <p className="card__text">{video.date}</p>
                </div>
            </div>
        </Link>
    )
})