import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfilePhotos from "./ProfilePhotos";
import {Profile} from "../../app/models/profile";
import {observer} from "mobx-react-lite";
import ProfileFollowings from "./ProfileFollowings";

interface Props {
    profile: Profile
}

export default observer(function ProfileContent({profile}: Props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            width: '100%',
            typography: 'body1',
            marginTop: '20px'
        }}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="Profile content">
                        <Tab label={<span style={{color: 'white'}}>Photos</span>} value="1"/>
                        <Tab label={<span style={{color: 'white'}}>Videos</span>} value="2"/>
                        <Tab label={<span style={{color: 'white'}}>Followers</span>} value="3"/>
                        <Tab label={<span style={{color: 'white'}}>Following</span>} value="4"/>
                    </TabList>
                </Box>
                <TabPanel value="1"><ProfilePhotos profile={profile}/></TabPanel>
                <TabPanel value="2">Item Three</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4"><ProfileFollowings/></TabPanel>
            </TabContext>
        </Box>
    );
})