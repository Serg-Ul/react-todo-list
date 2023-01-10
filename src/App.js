import React from "react";

// Material UI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// Custom Components
import TodoForm from "./components/TodoForm/TodoForm";
import TabPanel from "./components/TabPanel/TabPanel";
import Posts from "./components/Posts/Posts";

// Context
import useAppContext from "./hooks/useAppContext";

const App = () => {

    const {tabValue, changeTabValueHandler, restTabProps} = useAppContext();

    return (
        <div className="App">
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={tabValue} onChange={(event, value) => changeTabValueHandler(value)} aria-label="basic tabs example">
                    <Tab label="Create TODO Point" {...restTabProps(0)} />
                    <Tab label="TODO List" {...restTabProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <TodoForm/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Posts/>
            </TabPanel>
        </div>
    );
}

export default App;
