import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth-slice';
import inboxReducer from './inbox-slice';
import sentBoxReducer from './sentbox-slice';

const store = configureStore({
    reducer: {auth: authReducer, inbox: inboxReducer, sentbox: sentBoxReducer }
});

export default store;