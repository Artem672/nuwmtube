import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "./NavBar.css"
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

export default observer(function NavBar() {
    const {videoStore, userStore} = useStore();
    const {user, logout} = userStore;
    const navigate = useNavigate();
    let location = useLocation();
    const [value, setValue] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    useEffect(() => {
        if (location.pathname !== '/videos' && location.pathname !== '/login')
            navigate('/videos')
        videoStore.searchVideos(value);
    }, [debouncedValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const node = useRef<any>(); // Ref for the dropdown div

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (e: Event) => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setIsOpen(false);
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClickOutside);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                       onChange={handleChange}/>
            </div>
            <div className="logo" onClick={handleDropDown} ref={node}>
                <img src={user?.image || '/assets/profile.png'} alt="Logo"/>
                {isOpen &&
                    <div className="dropdown-menu">
                        <NavLink to="/profile/${user?.username}" className="dropdown-item">Profile</NavLink>
                        <a href="#" onClick={logout} className="dropdown-item">Logout</a>
                    </div>
                }
            </div>
        </nav>
    )
})