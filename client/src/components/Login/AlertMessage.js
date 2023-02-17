import React from "react";
import { Alert, AlertTitle, Stack, Zoom } from "@mui/material";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <Zoom in style={{ transitionDuration: 700 }}>
      <Stack
        sx={{
          position: "absolute",
          top: { sm: 30, xs: 10 },
          right: { sm: 30, xs: 10 },
          zIndex: 1000,
        }}
      >
        <Alert severity={info.type}>
          <AlertTitle>{info.status}</AlertTitle>
          <strong>{info.message}</strong>
        </Alert>
      </Stack>
    </Zoom>
  );
};

export default AlertMessage;
