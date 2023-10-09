import { Alert, AlertTitle, Box } from "@mui/material";

const Notification = ({ payload, handleNotificationClose }) => {
  return (
    <Box mt={2}>
      <Alert
        severity="warning"
        onClose={() => {
          handleNotificationClose(payload.id);
        }}
      >
        <AlertTitle>{payload.title}</AlertTitle>
        {payload.body}
      </Alert>
    </Box>
  );
};

export default Notification;
