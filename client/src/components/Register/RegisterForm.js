import React, { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <form className="register-input">
      {/* <h1 style={{textAlign: "center", marginBottom: 30}}>Register Form</h1> */}
      {/* Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <TextField
          label="First Name"
          name="firstName"
          // value={email}
          // onChange={handleOnChange}
          required
          id="outlined-start-adornment"
          placeholder="Your First Name ..."
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          // value={email}
          // onChange={handleOnChange}
          required
          id="outlined-start-adornment"
          placeholder="Your First Name ..."
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </Box>
      {/* Email */}
      <TextField
        label="Email"
        name="email"
        // value={email}
        // onChange={handleOnChange}
        required
        id="outlined-start-adornment"
        placeholder="Your Email ..."
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <AttachEmailIcon />
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2 }}
      />
      {/* Password */}
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          label="Password"
          name="password"
          // value={password}
          // onChange={handleOnChange}
          required
          autoComplete="current-password"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Your Password ..."
          sx={{ marginBottom: 2 }}
        />
      </FormControl>
      {/* Confirm Password */}
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm</InputLabel>
        <OutlinedInput
          label="Confirm"
          name="confirmPassword"
          // value={password}
          // onChange={handleOnChange}
          required
          // autoComplete="current-password"
          id="outlined-adornment-current-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Confirm ..."
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{ marginTop: 5, textTransform: "capitalize", fontSize: 18 }}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
