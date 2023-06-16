import React from "react";
import {Video} from "../../../app/models/video";
import '../../../app/layout/Grid.css'
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {format} from 'date-fns'
import {Popup} from "semantic-ui-react";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    video: Video;
}

export default observer(function VideoCard({video}: Props) {
    const {videoStore} = useStore();
    return (
        <Link to={`/watch/${video.id}`}>
            <div className="grid__item">
                <div className="card">
                    <video
                        className="card__img"
                        src={video.locationSrc}/>
                </div>
                <div className="card__content">
                    <div className="card__content__top">
                       {/* <Popup
                            hoverable
                            key={video.id}
                            trigger={
                                <img className="card__header__image" src={video?.profile?.image || '/assets/profile.png'} alt=''/>
                            }
                        >
                            <Popup.Content >
                                <ProfileCard profile={video.profile}/>
                            </Popup.Content>
                        </Popup>*/}
                        <Link to={`/profiles/${video.profile.username}`}>
                            <img className="card__header__image" src={video?.profile?.image || '/assets/profile.png'} alt=''/>
                        </Link>
                        <h1 className="card__header" title={video.name}>{video.name}</h1>
                    </div>
                    <p className="card__text">{format(video.date!, 'dd MMM yyyy h:mm aa')}</p>
                </div>
            </div>
        </Link>
    )
})