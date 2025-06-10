import { Box, Card, CardContent, Typography } from "@mui/material";
import type React from "react";
import type { RegisterFormData } from "../constant";


const Dashboard : React.FC = () => {
    const loggedData : RegisterFormData = JSON.parse(localStorage.getItem("loggedUser") || "")
    return(
        <div>
            <Box sx={{alignContent:"center",width:"100%"}}>
                <Card sx={{width:"100%",borderRadius:4,boxShadow:4 }}>
                    <CardContent>
                        <Typography>{`Welcome to dashboard ${loggedData?.name}! `}</Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}
export default Dashboard