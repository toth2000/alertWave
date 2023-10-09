import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const StockCard = ({ subscribed, name, onAddClick, onDeleteClick }) => {
  return (
    <Grid item>
      <Card elevation={5}>
        <CardContent>
          <Stack alignItems={"center"} gap={1}>
            <Typography sx={{ fontSize: 18 }}>{name.toUpperCase()}</Typography>
            {subscribed ? (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDeleteClick(name)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => onAddClick(name)}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StockCard;
