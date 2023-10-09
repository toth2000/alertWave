import { Grid, Paper, Stack, Typography } from "@mui/material";

const ScrollView = ({ title, children }) => {
  return (
    <Stack width={{ xs: "90%", md: "60%" }}>
      <Paper elevation={2} sx={{ p: { xs: 2, md: 5 } }}>
        <Typography variant="h4" fontSize={{ xs: 24, md: 36 }}>
          {title}
        </Typography>
        <Grid
          container
          direction={"row"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={5}
          gap={2}
        >
          {children}
        </Grid>
      </Paper>
    </Stack>
  );
};

export default ScrollView;
