import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define your action types
const SET_CURRENT_USER = 'SET_CURRENT_USER';

// Create a context
const AppContext = createContext();

const initialState = {
    currentUser: undefined, // Initialize as undefined
    // Other state properties...
};

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            // console.log('Reducer SET_CURRENT_USER:', action.payload);
            return { ...state, currentUser: action.payload };
        // Handle other action types...
        default:
            return state;
    }
};



const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Log the currentUser whenever it changes
    useEffect(() => {
        console.log('currentUser in AppProvider:', state.currentUser);
    }, [state.currentUser]);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to access the context
const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export { AppProvider, useAppContext, SET_CURRENT_USER };
