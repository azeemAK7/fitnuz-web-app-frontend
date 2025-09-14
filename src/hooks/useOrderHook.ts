import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDashboardOrders } from "../store/actions/ProductAction";
import { useAppDispatch } from "./storeHooks";

const useOrderHook = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URLSearchParams();

    const pageNumber = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", `${pageNumber - 1}`);

    const queryString = params.toString();
    dispatch(fetchDashboardOrders(queryString));
  }, [searchParams, dispatch]);
};
export default useOrderHook;
