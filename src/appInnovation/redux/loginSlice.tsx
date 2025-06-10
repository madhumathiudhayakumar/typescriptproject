import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { LoginErrorData, LoginFormData } from "../constant"

interface loginState {
    loginData: LoginFormData,
    visible:boolean
    loginerrors:LoginErrorData
}

const initialState : loginState = {
    loginData:{
    email:'',
    password:'',
    initialLogin:true
},
visible:false,
loginerrors:{
    email:"",
    password:""
}
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setLoginData(state,action: PayloadAction<Partial<LoginFormData>>){
            state.loginData = {...state.loginData,...action.payload}
        },
        setVisible(state,action:PayloadAction<boolean>){
            state.visible = action.payload
        },
        setLoginErrors(state,action:PayloadAction<Partial<LoginErrorData>>){
            state.loginerrors = {...state.loginerrors,...action.payload}
        }
    }
})

export const {setLoginData,setVisible,setLoginErrors} = loginSlice.actions
export default loginSlice.reducer