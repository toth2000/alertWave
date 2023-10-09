import { Box, LinearProgress } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ProgressLoader = () => {
  const { appState } = useContext(AppContext);
  return (
    <>
      {appState.loading === true ? (
        <Box
          position={"fixed"}
          height={"100dvh"}
          width={"100%"}
          top={0}
          zIndex={10}
          sx={{ background: "rgba(0, 0, 0, 0.8)" }}
        >
          <Box
            position={"relative"}
            height={"100%"}
            width={"100%"}
            top={0}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            zIndex={10}
          >
            <LinearProgress sx={{ width: { xs: "50%", md: "30%" } }} />
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ProgressLoader;
