import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions/ProductAction";
import { useAppDispatch } from "./storeHooks";

const useProductHook = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URLSearchParams();

    const pageNumber = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    const keyword = searchParams.get("keyword") || null;
    const category = searchParams.get("category") || null;
    const sortOrderDir = searchParams.get("sortOrderDir") || "asc";

    params.set("pageNumber", `${pageNumber - 1}`);
    params.set("sortOrderDir", sortOrderDir);
    params.set("sortBy", "productPrice");

    if (keyword) {
      params.set("keyword", keyword);
    }
    if (category) {
      params.set("category", category);
    }

    const queryString = params.toString();
    dispatch(fetchProducts(queryString));
  }, [searchParams, dispatch]);
};
export default useProductHook;
