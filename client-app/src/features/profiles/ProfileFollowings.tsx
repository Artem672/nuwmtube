import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Card, Header, Tab} from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

interface Props {
    predicate: string;
}

export default observer(function ProfileFollowings({predicate}: Props) {
    const {profileStore} = useStore();
    const {profile, followings, loadFollowings, loadingFollowings} = profileStore;

    useEffect(() => {
        loadFollowings(predicate);
    }, [loadFollowings])

    return(
        <Tab.Pane loading={loadingFollowings} style={{background: 'transparent', border: 'none'}}>
            <Grid>
                <Grid.Column width='16'>
                    <Card.Group itemsPerRow='5'>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})