import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorData, RegisterFormData } from "../constant";

interface registerState {
    registerData: RegisterFormData,
    visiblePassword: boolean,
    errorData: ErrorData,
    registerList :RegisterFormData[]
}

const initialState: registerState = {
    registerData: {
        name: '',
        email: '',
        password: '',
        gender: '',
        skils: [],
        dob: '',
        age: 0,
        phone: '',
        profile: null,
        document: null,
        country: '',
        role: ''
    },
    visiblePassword: false,
    errorData: {
        name: '',
        email: '',
        password: '',
        gender: '',
        skils: '',
        dob: '',
        age: '',
        phone: '',
        profile: '',
        document: '',
        country: '',
        role: ''
    },
    registerList:[]
    // errorData: {
    // }
}

const registerSlice = createSlice({

    name: "register",
    initialState,
    reducers: {
        setRegisterData(state, action: PayloadAction<Partial<RegisterFormData>>) {
            state.registerData = { ...state.registerData, ...action.payload }
        },
        setVisiblePassword(state, action: PayloadAction<boolean>) {
            state.visiblePassword = action.payload
        },
        // error field for all errors at a time 
        // setErrorData(state, action: PayloadAction<ErrorData>) {
        //     state.errorData = { ...state.errorData, ...action.payload }
        // }
        setErrorData(state, action: PayloadAction<Partial<ErrorData>>) {
            state.errorData = { ...state.errorData, ...action.payload }
        },
        setRegisterList(state,action:PayloadAction<RegisterFormData>){
            state.registerList = [...state.registerList,action.payload]
        }



    }

})

export const { setRegisterData, setVisiblePassword, setErrorData,setRegisterList } = registerSlice.actions
export default registerSlice.reducer