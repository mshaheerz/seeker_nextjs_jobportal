import { useEffect } from "react"; 
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {userActions} from "@/redux/signupdetails"
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
} from "@mui/material";
import Image from "next/image";
import {useSession,signIn,signOut} from 'next-auth/react'

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
  // const user = useSelector((state)=>state.user.value)
}


function Login() {
  let dispatch = useDispatch()
  let smth = useSelector((state)=>state?.user)


  useEffect(() => {
    dispatch(userActions.login({user:'something'}))
    
  }, [smth])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    console.log(smth)
    let obj = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(userActions.login(obj))
    


  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            <LockOutlinedIcon />
          </Avatar>
          {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={200} height={200}></Image> */}

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={'mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white '}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
