import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  RecaptchaVerifier,signOut,onAuthStateChanged,signInWithPhoneNumber,getAuth } from "firebase/auth";
// import {auth} from "@/firebase/firebase"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
  Box,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import React, { useState,useContext } from "react";
import MenuBook from "@mui/icons-material/MenuBook";
import { AppContext } from "@/context/AppContext";
import axios from "@/config/axios";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      dark: "#000807",
      light: "#ffffff",
      main: "#ffffff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#8F0992",
      main: "#f44336",
      dark: "#2C2C32",
      contrastText: "#000",
    },
  },
});



function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://seeker.com/">
        Seeker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


function SkillsSetup() {
  const {userDetails, setUserDetails}:any = useContext(AppContext)
  const router = useRouter()
  //states */

  const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //input datas
    let otp = data.get("otp")
    if(otp === "" || otp ==null) {
      toast.error(`please input otp`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      try {
    
        console.log(userDetails)
        await userDetails.otpverify.confirm(otp);
        axios.post('/signup',userDetails).then((response)=>{
         if(response.data.status ==='success'){

            localStorage.setItem("usertoken",response.data.token)
            router.push('/')




         }else{
          toast.error(`${response.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setTimeout(() => {
              router.push('/auth/signup')
            }, 3000);
         }
        }).catch((error)=>{
          toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        })
      
      } catch (error:any) {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          console.log(error)
          // router.push('/usersetup')
      }

      
    }

    

    //validation
    
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            scrollPaddingBlock: 4,
            display: "flex",
            border: 1,
            borderRadius: 2,
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 4,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <Avatar sx={{ m: 4, bgcolor: "primary.main", padding: 3 }}>
            <MenuBook />
          </Avatar>
          <Typography component="h1" variant="h5">
            Otp verification
          </Typography>
          <div id='recaptcha-container' />
          <Typography component="h6" variant="h6">
            {userDetails?.phone}
          </Typography>
          <Box component="form" onSubmit={handleSubmits} sx={{ mt: 3 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Grid container spacing={2}>
             
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="otp"
                    label="otp"
                    name="otp"
                    autoComplete="otp"
                    // error={email}
                    // helperText={emailerr}
                  />
                </Grid>
                <div id='recaptcha-container' />

            
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={
                  "mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white "
                }
              >
                Verify
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </FormControl>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SkillsSetup;
