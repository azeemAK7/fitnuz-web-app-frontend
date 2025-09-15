import type { FetchAdminCategoryAction } from "../../types/actionTypes";
import type { CategoryType, PaginationType } from "../../types/common";

interface AdminCategoryState {
  adminCategory: CategoryType[];
  adminCategoryPagination: PaginationType | null;
}

const initialState: AdminCategoryState = {
  adminCategory: [],
  adminCategoryPagination: null,
};

type adminCategoryAction = FetchAdminCategoryAction;

export const AdminCategoryReducer = (
  state = initialState,
  action: adminCategoryAction
) => {
  switch (action.type) {
    case "FETCH_ADMIN_CATEGORY":
      return {
        ...state,
        adminCategory: action.payload,
        adminCategoryPagination: {
          ...state.adminCategoryPagination,
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
