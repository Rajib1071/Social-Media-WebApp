import React, { createContext, useContext, useReducer, useEffect } from 'react';
import io from 'socket.io-client';
// Define your action types
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ADD_POST_TO_USER = 'ADD_POST_TO_USER';
const REMOVE_POST_FROM_USER = 'REMOVE_POST_FROM_USER'; // Add this action type
// Add this action type
const SET_CURRENT_SOCKET = 'SET_CURRENT_SOCKET';

// Create a context
const AppContext = createContext();

const initialState = {
    currentUser: undefined, // Initialize as undefined
    // Other state properties...
    currentsocket: null, // Initialize with null or any default value
};

const appReducer = (state, action) => {
    switch (action.type) {
        // Add a new case for SET_CURRENT_SOCKET
        case SET_CURRENT_SOCKET:
            return { ...state, currentsocket: action.payload };
        case SET_CURRENT_USER:
            // console.log('Reducer SET_CURRENT_USER:', action.payload);
            return { ...state, currentUser: action.payload };
        // Handle other action types...
        case ADD_POST_TO_USER:
            // Add the new post ID to the currentUser's posts array
            const updatedPosts = [...state.currentUser.posts, action.payload];
            const updatedUserWithPosts = { ...state.currentUser, posts: updatedPosts };
            console.log('Reducer ADD_POST_TO_USER:', action.payload);
            return { ...state, currentUser: updatedUserWithPosts };
        case REMOVE_POST_FROM_USER:
            // Remove the post ID from the currentUser's posts array
            const updatedPostsAfterDelete = state.currentUser.posts.filter(
                (postId) => postId !== action.payload
            );
            const updatedUserWithoutPost = {
                ...state.currentUser,
                posts: updatedPostsAfterDelete,
            };
            console.log('Reducer REMOVE_POST_FROM_USER:', updatedPostsAfterDelete);
            return { ...state, currentUser: updatedUserWithoutPost };
        default:
            return state;
    }
};



const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Create and initialize the CURRENT_socket instance when the provider is mounted
    useEffect(() => {
        const currentsocket = io("https://instapostsocketserver.onrender.com");

        // Dispatch an action to set the CURRENT_socket instance in the state
        dispatch({ type: SET_CURRENT_SOCKET, payload: currentsocket });

        // Cleanup function to disconnect the CURRENT_socket when the provider is unmounted
        return () => {
            currentsocket.disconnect();
        };
    }, []);
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

export { AppProvider, useAppContext, SET_CURRENT_USER, ADD_POST_TO_USER, REMOVE_POST_FROM_USER,SET_CURRENT_SOCKET };
