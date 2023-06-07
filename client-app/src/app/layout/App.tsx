import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import './Grid.css'
import VideoDashboard from "../../features/videos/dashboard/VideoDashboard";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

function App() {
    const {videoStore} = useStore();

    useEffect(() => {
        //videoStore.loadVideos();
    }, [videoStore])

    return (
        <div className="App">
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <VideoDashboard/>
            </Container>
        </div>
    );
}

export default observer(App);
