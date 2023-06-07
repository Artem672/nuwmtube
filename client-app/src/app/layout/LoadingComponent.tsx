import React from "react";
import './Loader.css'
import {observer} from "mobx-react-lite";

export default observer(function LoadingComponent() {
    return (
        <span className="loader"></span>
    )
})