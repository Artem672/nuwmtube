import React from "react";
import './NotFound.css'

export default function NotFound() {
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h2>Oops! Page not found.</h2>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <a href="/videos">Return to videos page</a>
        </div>
    )
}