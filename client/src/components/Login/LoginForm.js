import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const LoginForm = ({ handleOnChange, handleSubmit, email, password }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <form className="login-input" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        // value="admin1@gmail.com"
        value={email}
        onChange={handleOnChange}
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
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          value={password}
          // value="Admin@123"
          name="password"
          onChange={handleOnChange}
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
          label="Password"
          placeholder="Your Password ..."
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox />}
        label="Remember"
        sx={{
          marginTop: 1,
          fontSize: 15,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{ marginTop: 4, textTransform: "capitalize", fontSize: 18 }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
