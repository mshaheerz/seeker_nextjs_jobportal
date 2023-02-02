
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css';
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from 'react-toastify';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Paper,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "@/config/axios";
import React, { use, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppContext } from "@/context/AppContext";
import {auth} from '@/firebase/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { companyAuthentication } from "@/config/companyendpoints";

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
      main: "#ffff",
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

export default function CompanySignup() {
  const { companyDetails, setCompanyDetails }: any = useContext(AppContext);
  // type Inputs = {
  //   example: string,
  //   exampleRequired: string,
  // };
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const onSubmit:SubmitHandler<Inputs> = data => console.log(data);
  //states */
  const [fullname, setFullname] = useState(false);
  const [fullNameErr, setfullNameErr] = useState("");
  const [company, setCompany] = useState(false);
  const [companyErr, setCompanyErr] = useState("");
  const [email, setEmail] = useState(false);
  const [emailerr, setEmailErr] = useState("");
  const [password, setPassword] = useState(false);
  const [passworderr, setPasswordErr] = useState("");
  const [cpassword, setCpassword] = useState(false);
  const [cpassworderr, setCpasswordErr] = useState("");
  const [phone, setPhone] = useState(false);
  const [phoneerr, setPhoneerr] = useState("");
  const [flag,setFlag] = useState(false)
  const [number, setNumber] = useState('')
  const [confirmObj,setConfirmObj]=useState({})
  //states */
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    async function invoke(){
        if(localStorage.getItem("companytoken")){
            const data = await companyAuthentication({"companytoken":localStorage.getItem("companytoken")})
            
            if(data.status ==="failed"){
              router.push('/company/signup')
            }else if(data.auth){
                router.push('/company')
            }else{
                router.push('/company/signup')
            }
        }else{
            router.push('/company/signup')
        }
        
    }
    invoke();

 }, [])
  // submit handle

  function setupRecaptcha(number:any){
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-div', {}, auth)
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth,number,recaptchaVerifier)
  }


  const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //input datas
    let obj = {
      fullname: data.get("fullname"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
      cpassword: data.get("confirmpassword"),
      company:data.get("company"),
      employeeCount:data.get("employeeCount"),
      hiringManager:data.get("hiringManager"),
      industry:data.get("industry"),
      description:data.get("description"),
      otpverify:confirmObj

    };

    console.log(obj)


    //validation
    if (
      obj.fullname &&
      obj.employeeCount &&
      obj.hiringManager &&
      obj.industry &&
      obj.description &&
      obj.company &&
      obj.email &&
      obj.phone &&
      obj.password &&
      obj.cpassword
    ) {
      let regName = /^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let mob = /^([+]\d{2})?\d{10}$/;
        if(regName.test(obj.fullname.toString())){
            setFullname(false);
            setfullNameErr('')
            if(regName.test(obj.company.toString())){
                setCompany(false);
                setCompanyErr('')

                if(regEmail.test(obj.email.toString())){
                    setEmail(false);
                    setEmailErr('')

                    if(mob.test(obj.phone.toString())){
                        setPhone(false)
                        setPhoneerr('')
                        if(obj.password === obj.cpassword){
                            setPassword(false)
                            setPasswordErr('')
                            setCompanyDetails(obj);
                            router.push('/company/otp_verification')
                        }else{
                            setPassword(true)
                            setPasswordErr('password and confirm password is incorrect')
                        }
                    }else{
                        setPhone(true)
                        setPhoneerr('please provide valid phone number')
                    }
                }else{
                    setEmail(true);
                    setEmailErr('Please provide valid email address')
                }


            }else{
                setCompany(true);
                setCompanyErr('company does not contain characters')
            }
        }else{
            setFullname(true);
            setfullNameErr('please Enter valid name')
        }
      
    } else {
      toast.error(`OOPS! All fields are required`, {
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
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="lg">
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
          <Avatar sx={{ m: 4, bgcolor: "secondary.main" }}>
            <BuildingOffice2Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a company account
          </Typography>
          <Box component="form" onSubmit={handleSubmits} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  error={fullname}
                  helperText={fullNameErr}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  name="company"
                  autoComplete="family-name"
                  error={company}
                  helperText={companyErr}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type='text'
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e)=>setNumber(e.target.value)}
                  error={phone}
                  helperText={phoneerr}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={email}
                  helperText={emailerr}
                />
              </Grid>


            
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-controlled-open-select-label">
                      Number of  employees your company
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      name="employeeCount"
                      id="demo-controlled-open-select"
                      label="Number of  employees your company"
                      className={"placeholder:text-white label:text-white"}
                      fullWidth
                    //   value={employerType}
                    //   onChange={handleEmployerChange}
                    >
                      <MenuItem value={10}>0-10</MenuItem>
                      <MenuItem value={50}>10-50</MenuItem>
                      <MenuItem value={100}>50-100</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-controlled-open-select-label">
                      Are you a hiring manager ?
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      name="hiringManager"
                      id="demo-controlled-open-select"
                      label="Are you a hiring manager ?"
                      className={"placeholder:text-white label:text-white"}
                      fullWidth
                    //   value={employerType}
                    //   onChange={handleEmployerChange}
                    >
                      <MenuItem value={'yes'}>Yes</MenuItem>
                      <MenuItem value={'no'}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <InputLabel id="demo-controlled-open-select-label">
                      your Company industry 
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      name="industry"
                      id="demo-controlled-open-select"
                      label="your Company industry"
                      className={"placeholder:text-white label:text-white"}
                      placeholder="industry"
                      fullWidth
                    //   value={employerType}
                    //   onChange={handleEmployerChange}
                    >
                      <MenuItem value='software'>Software</MenuItem>
                      <MenuItem value='medical'>Medical</MenuItem>
                      <MenuItem value='education'>Education</MenuItem>
                      <MenuItem value='medical'>Medical</MenuItem>
                      <MenuItem value='textile'>Textile</MenuItem>
                      <MenuItem value='media'>Media and news</MenuItem>
                      <MenuItem value='construction'>Construction</MenuItem>
                      <MenuItem value='advertising'>Advertising</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} >
                  <FormControl fullWidth>
                   
                    <TextField
                    placeholder="Company description"
                    multiline
                    name="description"
                    id="description"
                    rows={3}
                   
                    />
                  </FormControl>
                </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={password}
                  helperText={passworderr}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  error={cpassword}
                  helperText={cpassworderr}
                />
              </Grid>

              <div id='recaptcha-div' />
            </Grid>
            <Button
              style={{display:flag ? 'block' : 'none'}}
              type="submit"
              variant="contained"
              className={
                "px-40  mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white "
              }
            >
              Continue
            </Button>


            <Button
              style={{display:!flag ? 'block' : 'none'}}
              onClick={async ()=>{
                try {
                
               
                    let numbers = String(number)
                    const response:any = await setupRecaptcha(`+91${numbers}`);
                    setConfirmObj(response)
                    setFlag(true)
                   
                  
                 
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
              variant="contained"
              className={
                "px-40  mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white "
              }
            >
              verify
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/company/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
