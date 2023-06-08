import LoadingComponent from "../../../app/layout/LoadingComponent";
import React, {useEffect} from "react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

export default observer(function Watch() {
    const {videoStore} = useStore();
    const {loadVideo} = videoStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadVideo(id);
    }, [id, loadVideo])

    if (videoStore.loading) return <LoadingComponent/>

    return (
        <div>
            <video controls controlsList="nodownload">
                <source src="https://nuwmtube.blob.core.windows.net/videos/sample-5s.mp4"
                        type="video/mp4"/>
            </video>
        </div>
    )
})