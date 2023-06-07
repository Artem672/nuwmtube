import React, {useEffect, useState} from "react";
import "./NavBar.css"
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

export default observer(function NavBar() {
    const {videoStore} = useStore();
    let timeoutId: NodeJS.Timeout | null = null;
    /*const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            videoStore.searchVideos(searchTerm);
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])*/

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            videoStore.searchVideos(e.currentTarget.value)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            console.log('User finished typing:', value);
            videoStore.searchVideos(value);
        }, 1000);
    };

    return (
        <nav>
            <div className="logo">
                <NavLink to='/' className="logo">
                    <img src="/assets/play.png" alt="Logo"/>
                    <span>Videos</span>
                </NavLink>
            </div>
            <div className="group">
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
                <input placeholder="Search" type="search" className="input"
                       onChange={handleChange}
                    //onKeyDown={(e) => handleKeyDown(e)}
                       /*onChange={(e) => {
                           setSearchTerm(e.target.value)
                       }}*//>
            </div>
            <div className="logo">
                <img src="/assets/profile.png" alt="Logo"/>
            </div>
        </nav>
    )
})