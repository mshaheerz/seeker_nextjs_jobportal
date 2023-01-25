import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {  RecaptchaVerifier,signOut,onAuthStateChanged,signInWithPhoneNumber,getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import {auth} from '@/firebase/firebase'
import {
  Select,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
  Box,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import ManageAccounsIcon from "@mui/icons-material/ManageAccounts";
import { FileUpload } from "@mui/icons-material";
import { useRouter } from "next/router";

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



function UserSetup() {
  const [state, setState] = React.useState("");
  const [employerType, setEmployerType] = React.useState("");
  const { userDetails, setUserDetails }: any = useContext(AppContext);
  const [confirmObj, setConfirmObj]= useState("")
  const [flag,setFlag] = useState(false)
  let [pdf, setPdf] = useState<any>();
  const router = useRouter();




  useEffect(() => {
    if (Object.keys(userDetails).length == 0) {
      toast.error('Do not refresh!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      router.push('/auth/signup') 
    }else{
      toast.warn('Do not refresh!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
  }, [])






  // pdf converted to base64
  const toBase64 = (image: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }).catch((err) => {
      console.log(err);
    });



  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };


  // firebase otp captcha setup
  function setupRecaptcha(number:any){
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth,number,recaptchaVerifier)
  }

  const handleEmployerChange = (event: SelectChangeEvent) => {
    setEmployerType(event.target.value);
  };


  //submit handle
  const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datas = new FormData(event.currentTarget);
    const pdfBase = await toBase64(pdf);
    if (Object.keys(userDetails).length !== 0) {
      let newdetails = {
        city: datas.get("city"),
        state: state,
        address: datas.get("address"),
        zip: datas.get("zip"),
        recentjob: datas.get("recentjob"),
        recentcompany: datas.get("recentcompany"),
        employertype: employerType,
        school: datas.get("school"),
        resume: pdfBase,
        otpverify:confirmObj,
        ...userDetails,
      };
      console.log(userDetails);
      
      setUserDetails(newdetails)
      
      router.push('/usersetup/otp')
    } else {
      router.push("/auth/signup");
    }

    // console.log(userdetails)

    // if(userdetails ==undefined){
    //   router.push('/auth/signup')
    // }
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
            <ManageAccounsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add your contact Informations
          </Typography>
          <Box component="form" onSubmit={handleSubmits} sx={{ mt: 3 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-city"
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    // error={firstname}
                    // helperText={firstNameerr}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ m: 0, minWidth: 225 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                      State
                    </InputLabel>
                    <Select
                      name="state"
                      fullWidth
                      label="state"
                      value={state}
                      id="select-state"
                      onChange={handleChange}
                    >
                      <MenuItem value={"kerala"}>Kerala</MenuItem>
                      <MenuItem value={"karnataga"}>Karnataga</MenuItem>
                      <MenuItem value={"thamilnadu"}>Thamilnadu</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    autoComplete="new-address"
                    // error={cpassword}
                    // helperText={cpassworderr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="zip"
                    label="zip"
                    type="number"
                    id="zipcode"
                    autoComplete="new-zip"
                    // error={password}
                    // helperText={passworderr}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="recentjob"
                    required
                    fullWidth
                    id="recentjob"
                    label="Recent job title"
                    // error={firstname}
                    // helperText={firstNameerr}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="recentcompany"
                    label="Recent company"
                    name="recentcompany"
                    autoComplete="family-name"
                    // error={lastname}
                    // helperText={lastNameerr}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ m: 0, minWidth: 200, maxWidth: 470 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                      Job type
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      name="jobtype"
                      id="demo-controlled-open-select"
                      label=" Job type"
                      className={"placeholder:text-white label:text-white"}
                      placeholder="Employment type"
                      fullWidth
                      value={employerType}
                      onChange={handleEmployerChange}
                    >
                      <MenuItem value={"part-time"}>part-time</MenuItem>
                      <MenuItem value={"full-time"}>full-time</MenuItem>
                      <MenuItem value={"temporary"}>temporary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="school"
                    label="Scool or University/college"
                    name="school"
                    autoComplete="school"
                    // error={email}
                    // helperText={emailerr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    className="text-center flex"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="application/pdf"
                      onChange={(e:any) => setPdf(e.target.files[0])}
                      type="file"
                    />

                    <FileUpload />
                    <Typography>Upload resume</Typography>
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                 <div id='recaptcha-container' />
              </Grid>
              </Grid>
           
              <Button
               
                type="submit"
                fullWidth
                variant="contained"
                style={{display:flag ? 'block' : 'none'}}
                className={
                  `mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white`
                }
              >
                Next
              </Button>
              <Button
               style={{display:!flag ? 'block' : 'none'}}
                onClick={async ()=>{
                  try {
                    if (Object.keys(userDetails).length !== 0) {
                      let number = String(userDetails.phone)
                      const response:any = await setupRecaptcha(`+91${number}`);
                      setConfirmObj(response)
                      setFlag(true)
                     
                    }else{
                     router.push('/auth/signup')
                    }
                   
                  } catch (error:any) {
                    
                    toast.error(`please verify captcha! ${error.message}`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
                    // alert(error.message)
                  }
                }}
                fullWidth
                variant="contained"
                className={
                  `mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white `
                }
              >
                verify
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

export default UserSetup;
