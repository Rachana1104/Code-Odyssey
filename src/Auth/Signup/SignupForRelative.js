import "./SignupForRelative.css";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  Container,
  InputAdornment,
  FilledInput,
  InputLabel,
} from "@mui/material";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export default function SignupForRelative() {
  const [isLoading, setLoading] = useState(true);

  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [showPassword1, setshowPassword1] = useState(false);
  const handleClickShowPassword1 = () => {
    setshowPassword1(!showPassword1);
  };
  const handleChanges = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
    });
    createacc();
  };

  const history = useNavigate();

  async function createacc() {
    console.log("hello");
    try {
      let result = await fetch(
        "http://hackathonwork.pythonanywhere.com/auth/register/",
        {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            username: values.username,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      result = await result;
      console.log(result);
      
      if (result) {
        // alert("Signed in Successfully! Please verify your email");
        swal("Hooray!!", "You have successfully signedup", "success");
        history("/loginforrelative");
      }
    } catch (error) {
      console.log("Error" + error);
      setLoading(false);
    }
  }
   
  return (
    <>
      <Container
        component={motion.div}
        transition={{ type: "spring", stiffness: 40 }}
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        maxWidth="xs"
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="user-name">User Name</InputLabel>
              <FilledInput
                required
                fullWidth
                id="user-name"
                label="User Name"
                type="text"
                name="username"
                autoComplete="user-name"
                autoFocus
                value={values.username}
                onChange={handleChanges}
                endAdornment={
                  <InputAdornment position="end">
                    <BsFillFileEarmarkPersonFill />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <FilledInput
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChanges}
                endAdornment={
                  <InputAdornment position="end">
                    <MdEmail />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                fullWidth
                type={showPassword1 ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      edge="end"
                    >
                      {showPassword1 ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            style={{
              backgroundColor: "#fb3b30",
              color: "#888bd2",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </>
  );
}