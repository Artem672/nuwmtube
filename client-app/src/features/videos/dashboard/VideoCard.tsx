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
                    <video
                        className="card__img"
                        src="https://nuwmtube.blob.core.windows.net/videos/sample-5s.mp4"/>
                </div>
                <div className="card__content">
                    <div className="card__content__top">
                        <img className="card__header__image" src='/assets/profile.png' alt=''/>
                        <h1 className="card__header">{video.name}</h1>
                    </div>
                    <p className="card__text">{video.date}</p>
                </div>
            </div>
        </Link>
    )
})