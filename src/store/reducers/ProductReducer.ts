import type {
  FetchCategoryAction,
  FetchProductsAction,
} from "../../types/actionTypes";
import type {
  CategoryType,
  PaginationType,
  ProductType,
} from "../../types/common";

interface ProductState {
  products: ProductType[];
  categories: CategoryType[] | null;
  pagination: PaginationType | null;
  categoryPagination: PaginationType | null;
}

const initialState: ProductState = {
  products: [],
  categories: null,
  pagination: null,
  categoryPagination: null,
};

type ProductActions = FetchProductsAction | FetchCategoryAction;

export const productReducer = (
  state = initialState,
  action: ProductActions
) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageSize: action.pageSize,
          pageNumber: action.pageNumber,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          isLastPage: action.isLastPage,
        },
      };

    case "FETCH_CATEGORY":
      return {
        ...state,
        categories: action.payload,
        categoryPagination: {
          pageSize: action.pageSize,
          pageNumber: action.pageNumber,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          isLastPage: action.isLastPage,
        },
      };

    default:
      return state;
  }
};
