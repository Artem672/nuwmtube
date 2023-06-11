import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import './Grid.css'
import {observer} from "mobx-react-lite";
import {Outlet, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import {ToastContainer} from "react-toastify";

function App() {
    const location = useLocation();

    return (
        <div className="App">
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
