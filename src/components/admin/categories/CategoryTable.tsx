import ErrorPage from "../../shared/ErrorPage";
import {
  DataGrid,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MdRefresh } from "react-icons/md";
import Modal from "../../shared/Modal";
import { DeleteModal } from "../../checkout/DeleteModel";
import AddOrUpdateCategoryForm from "./AddOrUpdateCategoryForm";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import type {
  AdminCategoryRow,
  CategoryType,
  PaginationType,
} from "../../../types/common";
import { adminCategoryTableColumn } from "../../helper/TableColumn";
import { adminCategoryDelete } from "../../../store/actions/ProductAction";

interface CategoryTableProps {
  AddCategoryDialogOpen: boolean;
  setAddCategoryDialogOpen: (open: boolean) => void;
  adminCategory: CategoryType[];
  pagination: PaginationType | null;
}

const CategoryTable = ({
  AddCategoryDialogOpen,
  setAddCategoryDialogOpen,
  adminCategory,
  pagination,
}: CategoryTableProps) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, btnLoader } = useAppSelector((state) => state.errors);

  const [currentPage, setCurrentPage] = useState(
    (pagination?.pageNumber ?? 0) + 1 || 1
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategoryRow | null>(null);

  const emptyCategory = !adminCategory || adminCategory?.length === 0;

  const handleEdit = (category: AdminCategoryRow) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };
  const handleDelete = (category: AdminCategoryRow) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      adminCategoryDelete(toast, setOpenDeleteModal, selectedCategory?.id)
    );
  };

  const handlePaginationChange = (paginationModel: GridPaginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleSortChange = (newModel: GridSortModel) => {
    params.set("page", "1");

    if (newModel.length > 0) {
      params.set("sortBy", newModel[0].field);
      params.set("sortOrderDir", newModel[0].sort ?? "asc");
    } else {
      params.delete("sortBy");
      params.delete("sortOrderDir");
    }
    navigate(`${pathname}?${params}`);
  };

  const clearFilters = () => {
    params.delete("sortBy");
    params.delete("sortOrderDir");
    params.set("page", "1");
    navigate(`${pathname}?${params}`);
  };

  const tableRecords = adminCategory.map((data) => {
    return {
      id: data.categoryId,
      categoryName: data.categoryName,
    };
  });

  return (
    <div className="max-w-5xl">
      {error || emptyCategory ? (
        <ErrorPage message="No Category Found" />
      ) : (
        <div>
          <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
            All Categories
          </h1>
          <div className="flex justify-end pt-2 pb-4">
            <button
              onClick={clearFilters}
              className="bg-blue-500 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white font-semibold py-2 px-4 gap-2 hover:cursor-pointer shadow-md transition-colors hover:text-slate-300 duration-300"
            >
              <MdRefresh size={20} />
              Clear Filter
            </button>
          </div>
          <div className="max-w-full ">
            <DataGrid
              className="w-full"
              rows={tableRecords}
              columns={adminCategoryTableColumn(handleEdit, handleDelete)}
              sx={{
                "& .MuiDataGrid-virtualScroller": {
                  marginBottom: "18px",
                },
              }}
              pagination
              paginationMode="server"
              rowCount={pagination?.totalElements || 0}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pagination?.pageSize || 2,
                    page: currentPage - 1,
                  },
                },
              }}
              sortingMode="server"
              onSortModelChange={handleSortChange}
              onPaginationModelChange={handlePaginationChange}
              pageSizeOptions={[pagination?.pageSize || 2]}
              slotProps={{
                pagination: {
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                },
              }}
              //   disableColumnResize
              disableRowSelectionOnClick
            />
            <DeleteModal
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              onDeleteHandler={onDeleteHandler}
              btnLoader={btnLoader}
              text="Category"
            />
          </div>
        </div>
      )}
      <Modal
        open={openUpdateModal || AddCategoryDialogOpen}
        setOpen={
          openUpdateModal ? setOpenUpdateModal : setAddCategoryDialogOpen
        }
        title={openUpdateModal ? "Update Category" : "Add Category"}
      >
        <AddOrUpdateCategoryForm
          setOpen={
            openUpdateModal ? setOpenUpdateModal : setAddCategoryDialogOpen
          }
          category={openUpdateModal ? selectedCategory : null}
          update={openUpdateModal}
        />
      </Modal>
    </div>
  );
};
export default CategoryTable;
