import { Stack, Typography } from "@mui/material";

import SearchBox from "../components/SearchBox";

import StockCard from "../components/StockCard";
import ScrollView from "../components/ScrollView";
import { useInput } from "../hooks/useInput";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AUTH_ROUTE } from "../constant/routes";
import { useNavigate } from "react-router-dom";
import { searchStock } from "../api/stock";
import { AppContext } from "../context/AppContext";
import { showErrorAlert } from "../utils/api";
import useSubscription from "../hooks/useSubscription";

const SearchPage = () => {
  const [displayList, setDisplayList] = useState([]);

  const { state, handleInput, validateInputFields } = useInput({
    text: "",
  });
  const { createSubscription, deleteSubscription } = useSubscription(
    displayList,
    setDisplayList
  );

  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);

  const handleSearch = async () => {
    if (!validateInputFields()) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await searchStock(state.text);
      const list = data["bestMatches"];
      const result = list.map((item) => ({
        symbol: item["1. symbol"],
        name: item["2. name"],
        subscribed: false,
      }));
      setDisplayList(result);
    } catch (error) {
      console.error("Error in API Call: ", error);
      showErrorAlert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscription = async (stock) => {
    const item = displayList.find((x) => x.name === stock);
    await createSubscription(authState?.userId, item.symbol);
  };

  const handleDeleteSubscription = async (stock) => {
    const item = displayList.find((x) => x.name === stock);
    await deleteSubscription(authState?.userId, item.symbol);
  };

  useEffect(() => {
    if (!isUserAuthenticated()) navigate(AUTH_ROUTE);
  }, []);

  return (
    <Stack
      alignItems={"center"}
      sx={{
        my: 2,
      }}
      gap={5}
    >
      <SearchBox
        value={state.text}
        name="text"
        handleChange={handleInput}
        handleSearch={handleSearch}
      />
      <ScrollView title={"Stock List"}>
        {displayList.map((item, indx) => (
          <StockCard
            key={indx}
            name={item.name}
            subscribed={item.subscribed}
            onAddClick={handleAddSubscription}
            onDeleteClick={handleDeleteSubscription}
          />
        ))}
      </ScrollView>
    </Stack>
  );
};

export default SearchPage;
