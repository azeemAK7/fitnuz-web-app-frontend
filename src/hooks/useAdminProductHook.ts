import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAdminProducts } from "../store/actions/ProductAction";
import { useAppDispatch } from "./storeHooks";

const useAdminProductHook = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URLSearchParams();

    const pageNumber = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", `${pageNumber - 1}`);

    const sortBy = searchParams.get("sortBy");

    if (sortBy) {
      params.set("sortBy", sortBy);
      params.set("sortOrderDir", searchParams.get("sortOrderDir") || "asc");
    }

    const queryString = params.toString();
    dispatch(fetchAdminProducts(queryString));
  }, [searchParams, dispatch]);
};
export default useAdminProductHook;
