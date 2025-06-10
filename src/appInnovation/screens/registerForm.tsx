// src/appInnovation/components/RegisterForm.tsx
import {
  Box, Button, Card, CardContent, FormControl, FormControlLabel,
  FormGroup, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup,
  Select, Stack, TextField, Typography,
  type SelectChangeEvent
} from "@mui/material";
import { Checkbox } from "@mui/material"
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { setErrorData, setRegisterData, setRegisterList, setVisiblePassword } from "../redux/registerSlice";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerSchema } from "../validation/validation";
import * as Yup from 'yup'
import type { ErrorData } from "../constant";

const skillsList = ["HTML", "CSS", "React"];


const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputData = useSelector((state: RootState) => state.register.registerData);
  const showPassword = useSelector((state: RootState) => state.register.visiblePassword);
  const errors = useSelector((state:RootState)=> state.register.errorData)
  const inputDataList = useSelector((state:RootState)=> state.register.registerList)

  const profileRef = useRef<HTMLInputElement>(null);
const documentRef = useRef<HTMLInputElement>(null);
console.log(profileRef,"refffff");

  const  handleClickShowPassword = () => {
    dispatch(setVisiblePassword(!showPassword))
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const updatedSkills = checked
        ? [...inputData.skils, value]
        : inputData.skils.filter(skill => skill !== value);
      dispatch(setRegisterData({ skils: updatedSkills }));
      dispatch(setErrorData({skils:""}))
    } else if (type === 'file') {
      dispatch(setRegisterData({ [name]: files?.[0] ?? null }));
      dispatch(setErrorData({[name]:""}))
    } else {
      dispatch(setRegisterData({ [name]: type === 'number' ? +value : value }));
      dispatch(setErrorData({[name]:""}))

    }
  };

  const handleSelectChange = (e:SelectChangeEvent) =>{
    const {name,value} = e.target 
    dispatch(setRegisterData({[name]:value}))
    dispatch(setErrorData({[name]:""}))


  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await registerSchema.validate(inputData, { abortEarly: true });
      const emailExists = inputDataList.filter((ele)=>ele?.email === inputData?.email?.trim())
      console.log(emailExists,"EEEEEE");
      
      if (emailExists?.length > 0) {
        dispatch(setErrorData({email:"This email is already exists"}))
      }else{
      // dispatch(setErrorData(errors));
      // Continue with form submission
      console.log("Valid data", inputData);
      dispatch(setRegisterList(inputData))
      const updatedList = [...inputDataList, inputData];
      localStorage.setItem("registerData",JSON.stringify(updatedList))
      dispatch(setRegisterData({ name: '',
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
        role: ''}))
        if (profileRef.current) profileRef.current.value = '';
        if(documentRef.current) documentRef.current.value = ''
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError && err.path) {
        // Reset all errors and set only the first one
        const errorObj: ErrorData = {
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
        };
  
        // Set only the first encountered error
        errorObj[err.path as keyof ErrorData] = err.message;
  
        dispatch(setErrorData(errorObj));

        // all errors came at a time
    
        // if (err instanceof Yup.ValidationError) {
        //   const errorObj: Record<string, string> = {};
      
        //   err.inner.forEach(e => {
        //     if (e.path) {
        //       errorObj[e.path] = e.message;
        //     }
        //   });
      
        //   dispatch(setErrorData(errorObj));
        // }
      }
    }
  };
console.log(inputData,errors,inputDataList,"Errorrrrr");

  return (
    <Box sx={{ alignItems: "center", marginTop: 30 }}>
      <Card sx={{ width: "100%", maxWidth: 800, margin: "auto", borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h3" mb={3}>Register Form</Typography>
          <form onSubmit={handleSubmit}>
          <Stack spacing={2} width="100%">
            <TextField fullWidth required label="Name" name="name" value={inputData.name} onChange={handleChange} error={!!errors?.name} helperText={errors?.name}/>
            <Box sx={{ display: "flex", gap: 2 }}>
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
            </Box>
            <TextField fullWidth required label="Profile Image" name="profile" ref={profileRef} type="file" InputLabelProps={{ shrink: true }} onChange={handleChange}  inputProps={{ accept: "image/*" }}   />
            <Box sx={{ display: "flex", gap: 2 }}>
						<TextField fullWidth required label="Date of Birth" name="dob" type="date" value={inputData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} inputProps={{max:new Date().toISOString().split("T")[0]}} />
              <TextField fullWidth required label="Age" name="age" type="number" value={inputData.age} onChange={handleChange} inputProps={{ min: 1 }} />
            </Box>
						<TextField fullWidth required label="Phone" name="phone" type="tel" value={inputData.phone} onChange={handleChange} error={!!errors?.phone} helperText={errors?.phone}/>

            <FormControl fullWidth required>
              <FormLabel sx={{textAlign:"start"}}>Gender</FormLabel>
              <RadioGroup name="gender" value={inputData.gender} onChange={handleChange} row>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Others" control={<Radio />} label="Others" />
              </RadioGroup>
              <FormHelperText sx={{color:"red"}}>{errors?.gender}</FormHelperText>
            </FormControl>

            <FormControl fullWidth required>
              <FormLabel sx={{textAlign:"start"}}>Skills</FormLabel>
              <FormGroup row>
                {skillsList.map(skill => (
                  <FormControlLabel
                    key={skill}
                    control={
                      <Checkbox
                        value={skill}
                        checked={inputData.skils.includes(skill)}
                        onChange={handleChange}
                      />
                    }
                    label={skill}
                  />
                ))}
              </FormGroup>
              <FormHelperText sx={{color:"red"}}>{errors?.skils}</FormHelperText>
            </FormControl>

            <TextField fullWidth required label="Document" name="document" ref={documentRef} type="file" InputLabelProps={{ shrink: true }} onChange={handleChange}  inputProps={{ accept: "application/pdf" }} error={!!errors?.document} helperText={errors?.document}/>

            <FormControl fullWidth required>
              <InputLabel>Country</InputLabel>
              <Select name="country" value={inputData.country} onChange={handleSelectChange} >
                <MenuItem value="IN" onChange={handleChange}>India</MenuItem>
                <MenuItem value="US">America</MenuItem>
                <MenuItem value="R">Russia</MenuItem>
              </Select>
              <FormHelperText sx={{color:"red"}}>{errors?.country}</FormHelperText>
            </FormControl>
            <FormControl fullWidth required >
              <InputLabel id="role">Role</InputLabel>
              <Select name="role" value={inputData.role} onChange={handleSelectChange}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
              <FormHelperText sx={{color:"red"}}>{errors?.role}</FormHelperText>
            </FormControl>

            <Button variant="contained" type="submit">Submit</Button>
          </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm;
