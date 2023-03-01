import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const RegisterForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <form className="register-input" onSubmit={props.handleSubmit}>
      {/* Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={props.firstName}
          onChange={props.handleOnChange}
          error={props.errorFirstName}
          helperText={props.textFirstName}
          id="outlined-start-adornment"
          placeholder="Your First Name ..."
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={props.lastName}
          onChange={props.handleOnChange}
          error={props.errorLastName}
          helperText={props.textLastName}
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
        value={props.email}
        onChange={props.handleOnChange}
        error={props.errorEmail}
        helperText={props.textEmail}
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
        <InputLabel htmlFor="outlined-adornment-password" error={props.errorPassword}>Password</InputLabel>
        <OutlinedInput
          label="Password"
          name="password"
          value={props.password}
          onChange={props.handleOnChange}
          error={props.errorPassword}
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
        {props.textPassword && (
          <FormHelperText error={props.errorPassword}>{props.textPassword}</FormHelperText>
        )}
      </FormControl>
      {/* Confirm Password */}
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-confirm-password" error={props.errorConfirm}>
          Confirm
        </InputLabel>
        <OutlinedInput
          label="Confirm"
          name="confirmPassword"
          value={props.confirmPassword}
          onChange={props.handleOnChange}
          error={props.errorConfirm}
          // required
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
        {props.textConfirm && (
          <FormHelperText error={props.errorConfirm}>{props.textConfirm}</FormHelperText>
        )}
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
