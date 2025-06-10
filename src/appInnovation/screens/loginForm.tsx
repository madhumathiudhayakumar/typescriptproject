import { Box, Button, Card, CardContent, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { setLoginData, setLoginErrors, setVisible } from "../redux/loginSlice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup'
import type { LoginErrorData, RegisterFormData } from "../constant";
import { useNavigate } from "react-router-dom";


const LoginFom : React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const inputData = useSelector((state: RootState) => state.login.loginData);
  const showPassword = useSelector((state: RootState) => state.login.visible);
  const errors = useSelector((state:RootState)=> state.login.loginerrors)

  const storedData = localStorage.getItem("registerData");
const list: RegisterFormData[] = storedData ? JSON.parse(storedData) : [];
console.log(list, "listtt");


	const  handleClickShowPassword = () => {
    dispatch(setVisible(!showPassword))
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, } = e.target as HTMLInputElement;
      dispatch(setLoginData({ [name]: value }));
      dispatch(setLoginErrors({[name]:""}))
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const trimmedEmail = inputData.email.trim();
      const trimmedPassword = inputData.password.trim();
  
      const matchedUser = list.find((user) => user.email === trimmedEmail);
  
      if (!matchedUser) {
        dispatch(setLoginErrors({ email: "Email not found", password: "" }));
      } else if (matchedUser.password !== trimmedPassword) {
        dispatch(setLoginErrors({ email: "", password: "Incorrect password" }));
      } else {
        console.log("Login successful:", matchedUser);
        localStorage.setItem("loggedUser",JSON.stringify(matchedUser))
        // Optionally clear errors or navigate to next screen
        dispatch(setLoginErrors({ email: "", password: "" }));
        if(matchedUser?.role === "admin"){
          navigate("/appinnovation/dashboard")
        }else {
          navigate("/appinnovation/user")

        }
      }
  
    } catch (error) {
      if (error instanceof Yup.ValidationError && error.path) {
        const errorObj: LoginErrorData = {
          email: "",
          password: "",
        };
        errorObj[error.path as keyof LoginErrorData] = error.message;
        dispatch(setLoginErrors(errorObj));
      }
    }
  };
  
  console.log(errors,"errrorrrr");
  

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  
  //   try {
  //     await registerSchema.validate(inputData, { abortEarly: true });
  //     // dispatch(setErrorData(errors));
  //     // Continue with form submission
  //     console.log("Valid data", inputData);
  //     localStorage.setItem("registerData",JSON.stringify(inputData))
  //   } catch (err) {
  //     if (err instanceof Yup.ValidationError && err.path) {
  //       // Reset all errors and set only the first one
  //       const errorObj: ErrorData = {
  //         name: '',
  //         email: '',
  //         password: '',
  //         gender: '',
  //         skils: '',
  //         dob: '',
  //         age: '',
  //         phone: '',
  //         profile: '',
  //         document: '',
  //         country: '',
  //         role: ''
  //       };
  
  //       // Set only the first encountered error
  //       errorObj[err.path as keyof ErrorData] = err.message;
  
  //       dispatch(setErrorData(errorObj));

  //       // all errors came at a time
    
  //       // if (err instanceof Yup.ValidationError) {
  //       //   const errorObj: Record<string, string> = {};
      
  //       //   err.inner.forEach(e => {
  //       //     if (e.path) {
  //       //       errorObj[e.path] = e.message;
  //       //     }
  //       //   });
      
  //       //   dispatch(setErrorData(errorObj));
  //       // }
  //     }
  //   }
  // };
    return(
        <div>
					<Box sx={{alignContent:"center"}}>
						<Card sx={{width:"100%", maxWidth: 800, margin: "auto",borderRadius:4}}>
							<CardContent>
								<form onSubmit={handleSubmit}>
									<Stack spacing={2} width={"100%"}>
								<Typography variant="h5" mb={3}>Login Form</Typography>
								<TextField fullWidth required label="Email" name="email" value={inputData.email} onChange={handleChange} error={!!errors?.email} helperText={errors?.email}/>
              <TextField fullWidth required label="Password" name="password" type={showPassword ? "text" :"password"} value={inputData.password} onChange={handleChange} 
            InputProps={{ endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )}}
            error={!!errors?.password} helperText={errors?.password}/>
						    <Button variant="contained" type="submit">Submit</Button>
								</Stack>
								</form>
							</CardContent>

						</Card>
					</Box>

        </div>
    )
}
export default LoginFom