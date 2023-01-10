import React, {useState} from 'react';
import AppContext from "./AppContext";

const AppContextProvider = ({children}) => {
    // Tabs
    const [tabValue, setTabValue] = useState(0);

    const changeTabValueHandler = (value) => {
        setTabValue(value);
    };

    const restTabProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const context = {
        // Tabs
        tabValue,
        setTabValue,
        changeTabValueHandler,
        restTabProps,
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;