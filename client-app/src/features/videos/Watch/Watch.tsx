import LoadingComponent from "../../../app/layout/LoadingComponent";
import React from "react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

export default observer(function Watch() {
    const {videoStore} = useStore();

    if (videoStore.loading) return <LoadingComponent/>

    return (
        <div></div>
    )
})