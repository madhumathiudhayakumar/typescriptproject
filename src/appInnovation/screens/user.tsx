import { Box, Card, CardContent, Typography } from "@mui/material";
import type React from "react";
import type { RegisterFormData } from "../constant";


const User : React.FC = () => {
    const loggedData : RegisterFormData = JSON.parse(localStorage.getItem("loggedUser") || "")
    return(
        <>
        <Box sx={{alignContent:"center",}}>
            <Card sx={{width:"100%",borderRadius:4,boxShadow:4 }}>
                <CardContent>
                    <Typography>{`Welcome to user ${loggedData?.name} !`}</Typography>
                </CardContent>
            </Card>
        </Box>
        </>
    )
} 
export default User