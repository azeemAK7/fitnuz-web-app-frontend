import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchCategories } from "../../store/actions/ProductAction";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { CategoryType } from "../../types/common";

const Filter = () => {
  const [category, setCategory] = useState("all");
  const [sortOrderDir, setSortOrderDir] = useState("asc");
  const [keyword, setKeyword] = useState("");

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrderDir") || "asc";
    const currentKeyword = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrderDir(currentSortOrder);
    setKeyword(currentKeyword);
  }, [searchParams]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value as string;
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params}`);
  };

  const handleClearFilter = () => {
    navigate({ pathname: window.location.pathname });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const updatedParams = new URLSearchParams(searchParams);
      if (keyword) {
        updatedParams.set("keyword", keyword);
      } else {
        updatedParams.delete("keyword");
      }
      navigate(`${pathname}?${updatedParams.toString()}`);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword, navigate, params, pathname, searchParams]);

  const toggleSortOrder = () => {
    setSortOrderDir((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortOrderDir", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center lg:gap-4 gap-3">
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          placeholder="Search Products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md lg:py-2 py-1.5 pl-10 lg:pr-4 pr-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FaSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>

      {/* CATEGORY SELECTION */}
      <div className="flex flex-row lg:gap-4 gap-2 items-center">
        <FormControl
          className="text-slate-800 border-slate-700"
          variant="outlined"
          size="small"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="lg:min-w-[120px] min-w-[100px] text-slate-800 border-slate-700 lg:text-base text-sm"
          >
            <MenuItem value="all">All</MenuItem>
            {categories?.map((item: CategoryType) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SORT BUTTON & CLEAR FILTER */}
        <Tooltip title="Sorted by price: asc">
          <Button
            variant="contained"
            color="primary"
            onClick={toggleSortOrder}
            className="flex items-center lg:gap-2 gap-1 lg:h-10 h-9 lg:px-4 px-2 lg:text-base text-sm"
          >
            <span className="lg:inline hidden">Sort By</span>
            <span className="lg:hidden inline">Sort</span>
            {sortOrderDir === "asc" ? (
              <FaArrowUp className="lg:size-5 size-4" />
            ) : (
              <FaArrowDown className="lg:size-5 size-4" />
            )}
          </Button>
        </Tooltip>
        <button
          onClick={handleClearFilter}
          className="flex items-center lg:gap-2 gap-1 bg-rose-900 text-white lg:px-3 px-2 lg:py-2 py-1.5 rounded-md transition duration-300 ease-in shadow-md focus:outline-none lg:text-base text-sm"
        >
          <MdRefresh className="font-semibold" size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};
export default Filter;
