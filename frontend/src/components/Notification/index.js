import { Alert, AlertTitle, Box } from "@mui/material";
import { useState } from "react";

const Notification = ({ title, message }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open ? (
        <Box mt={2}>
          <Alert
            severity="warning"
            onClose={() => {
              setOpen(false);
            }}
          >
            <AlertTitle>{title}</AlertTitle>
            {message}
          </Alert>
        </Box>
      ) : null}
    </>
  );
};

export default Notification;
