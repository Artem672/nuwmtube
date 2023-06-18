import React from "react";
import './ValidationError.css'

interface Props {
    errors: any;
}

export default function ValidationError({errors}: Props) {
    return (
        <div className="message error">
            {errors && (
                <ul className="message-list">
                    {errors?.map((err: string, i: any) => (
                        <li key={i} className="message-item">
                            {err}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}