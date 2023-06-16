import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfilePhotos from "./ProfilePhotos";
import {Profile} from "../../app/models/profile";
import {observer} from "mobx-react-lite";

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
                        <Tab label={<span style={{color: 'white'}}>About</span>} value="1"/>
                        <Tab label={<span style={{color: 'white'}}>Photos</span>} value="2"/>
                        <Tab label={<span style={{color: 'white'}}>Videos</span>} value="3"/>
                        <Tab label={<span style={{color: 'white'}}>Followers</span>} value="4"/>
                        <Tab label={<span style={{color: 'white'}}>Following</span>} value="5"/>
                    </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2"><ProfilePhotos profile={profile}/></TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Three</TabPanel>
                <TabPanel value="5">Item Three</TabPanel>
            </TabContext>
        </Box>
    );
})