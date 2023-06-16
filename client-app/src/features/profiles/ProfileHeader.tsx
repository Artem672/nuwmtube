import React from "react";
import './ProfileHeader.css'
import {Button} from "semantic-ui-react";
import {Profile} from "../../app/models/profile";
import {observer} from "mobx-react-lite";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
    return (
        <div className='profile-header'>
            <div className='header-left'>
                <img src={profile.image || '/assets/profile.png'}/>
                <h1>{profile.displayName}</h1>
            </div>
            <div className='header-right'>
                <div className='header-followers'>
                    <div className='followers'>
                        <div className='header-number'>5</div>
                        <div>FOLLOWERS</div>
                    </div>
                    <div className='following'>
                        <div className='header-number'>42</div>
                        <div>FOLLOWING</div>
                    </div>
                </div>
                <Button
                    fluid
                    className='header-button'
                    color={true ? 'green' : 'red'}
                    content={true ? 'Follow' : 'Unfollow'}
                />
            </div>
        </div>
    )
})