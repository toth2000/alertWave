import { Container, Snackbar } from "@mui/material";
import Notification from "../Notification";

const NotificationContainer = ({ notificationList, setNotificationList }) => {
  const handleNotificationClose = (id) => {
    const result = notificationList.filter((item) => item.id !== id);
    setNotificationList(result);
  };

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Container>
        {notificationList.map((item) => (
          <Notification
            key={item.id}
            payload={item}
            handleNotificationClose={handleNotificationClose}
          />
        ))}
      </Container>
    </Snackbar>
  );
};

export default NotificationContainer;
