import {
  Stack,
} from "@mui/material";

import SearchBox from "../components/SearchBox";

import StockCard from "../components/StockCard";
import ScrollView from "../components/ScrollView";

const SearchPage = () => {
  return (
    <Stack
      alignItems={"center"}
      sx={{
        my: 2,
      }}
      gap={5}
    >
      <SearchBox />
      <ScrollView title={"Stock List"}>
        <StockCard name={"Tata"} subscribed={true}  />
        <StockCard name={"IBM"} subscribed={false} />
        <StockCard name={"Facebook"} subscribed={true} />
      </ScrollView>
    </Stack>
  );
};

export default SearchPage;
