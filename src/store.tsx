import { configureStore } from "@reduxjs/toolkit";

import RegisterReducer from './appInnovation/redux/registerSlice'
import LoginReducer from './appInnovation/redux/loginSlice'

const store = configureStore({
    reducer:{
        register: RegisterReducer,
        login : LoginReducer
    }

})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store