import { Stack } from "@mui/material";

import SearchBox from "../components/SearchBox";

import StockCard from "../components/StockCard";
import ScrollView from "../components/ScrollView";
import { useContext, useEffect, useState } from "react";
import { getUserSubscription } from "../api/subscription";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../constant/routes";
import { showErrorAlert } from "../utils/api";
import { useInput } from "../hooks/useInput";
import useSubscription from "../hooks/useSubscription";

const MySubscriptionPage = () => {
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const { state, handleInput, validateInputFields } = useInput({
    text: "",
  });

  const { setLoading } = useContext(AppContext);
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const { createSubscription, deleteSubscription } =
    useSubscription(list, setList);
  const navigate = useNavigate();

  const fetchMySubscriptions = async () => {
    try {
      setLoading(true);
      const { data } = await getUserSubscription(authState?.userId);
      setList(data);
    } catch (error) {
      console.error("Error in API Call: ", error);
      showErrorAlert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!validateInputFields()) {
      return;
    }

    const result = list.filter((item) =>
      item.stock.toLowerCase().includes(state.text.toLowerCase())
    );
    setDisplayList(result);
  };

  const handleAddSubscription = async (stock) => {
    await createSubscription(authState?.userId, stock);
  };

  const handleDeleteSubscription = async (stock) => {
    await deleteSubscription(authState?.userId, stock);
  };

  useEffect(() => {
    fetchMySubscriptions();
  }, [authState]);

  useEffect(() => {
    setDisplayList(list);
  }, [list]);

  useEffect(() => {
    if (!isUserAuthenticated) navigate(AUTH_ROUTE);
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
      <ScrollView title={"My Subscriptions"}>
        {displayList.map((item, indx) => (
          <StockCard
            key={indx}
            name={item.stock}
            subscribed={true}
            onAddClick={handleAddSubscription}
            onDeleteClick={handleDeleteSubscription}
          />
        ))}
      </ScrollView>
    </Stack>
  );
};

export default MySubscriptionPage;
