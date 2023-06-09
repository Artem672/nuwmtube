import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import './Grid.css'
import {observer} from "mobx-react-lite";
import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import {ToastContainer} from "react-toastify";
import {useStore} from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
    const location = useLocation();
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent/>

    return (
        <div className="App">
            <ScrollRestoration/>
            <ModalContainer/>
            <ToastContainer position='top-right' hideProgressBar theme='colored'/>
            {location.pathname === '/' ? <HomePage/> : (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '4em'}}>
                        <Outlet/>
                    </Container>
                </>
            )}
        </div>
    );
}

export default observer(App);
