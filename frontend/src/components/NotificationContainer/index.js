import { Container, Snackbar } from "@mui/material";
import Notification from "../Notification";

const NotificationContainer = ({ notificationList }) => {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Container>
        {notificationList.map((item) => (
          <Notification title={"IBM Alert"} message={"Low price"} />
        ))}
      </Container>
    </Snackbar>
  );
};

export default NotificationContainer;
