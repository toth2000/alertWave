import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  createUserSubscription,
  deleteUserSubscription,
} from "../api/subscription";
import { showErrorAlert } from "../utils/api";

const useSubscription = (list, setList) => {
  const { setLoading } = useContext(AppContext);

  const createSubscription = async (userId, stock) => {
    try {
      if (!userId || !stock) return;

      setLoading(true);

      const { data } = await createUserSubscription(userId, stock);
      if (data?.result === true) {
        alert(data?.message);
      }
    } catch (error) {
      console.error("Error in API Call: ", error);
      showErrorAlert(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscription = async (userId, stock) => {
    try {
      if (!userId || !stock) return;

      setLoading(true);

      const { data } = await deleteUserSubscription(userId, stock);
      if (data?.result === true) {
        alert(data?.message);
        const update = getUpdatedList(list, stock);
        setList(update);
      }
    } catch (error) {
      console.error("Error in API Call: ", error);
      showErrorAlert(error);
    } finally {
      setLoading(false);
    }
  };

  const getUpdatedList = (prevList, stock) => {
    const list = [...prevList];
    const result = list.filter((item) => item.stock !== stock);
    return result;
  };

  return { createSubscription, deleteSubscription };
};

export default useSubscription;
