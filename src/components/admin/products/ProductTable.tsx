import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../shared/Modal";
import {
  DataGrid,
  type GridPaginationModel,
  type GridSortModel,
} from "@mui/x-data-grid";
import { MdRefresh } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { DeleteModal } from "../../checkout/DeleteModel";
import toast from "react-hot-toast";
import ProductViewModel from "../../shared/ProductViewModel";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { useState } from "react";
import type {
  AdminProductRow,
  PaginationType,
  ProductType,
} from "../../../types/common";
import { adminProductTableColumn } from "../../helper/TableColumn";
import AddProductForm from "./AddProductForm";
import ImageUploadForm from "./ImageUploadForm";
import { adminDeleteProduct } from "../../../store/actions/ProductAction";

interface ProductTableProps {
  openAddProductDialog: boolean;
  setOpenAddProductDialog: (open: boolean) => void;
  adminProducts: ProductType[];
  pagination: PaginationType | null;
}

const ProductTable = ({
  openAddProductDialog,
  setOpenAddProductDialog,
  adminProducts,
  pagination,
}: ProductTableProps) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { btnLoader } = useAppSelector((state) => state.errors);

  const [currentPage, setCurrentPage] = useState(
    (pagination?.pageNumber ?? 0) + 1 || 1
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [productViewOpen, setProductViewOpen] = useState(false);
  const [mappedProduct, setMappedProduct] = useState<ProductType | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<AdminProductRow | null>(null);

  const emptyProducts = !adminProducts || adminProducts?.length === 0;

  const tableRecords = adminProducts.map((data) => {
    return {
      id: data.productId,
      category: data.productCategory,
      productName: data.productName,
      description: data.productDescription,
      productStock: data.productStock,
      productPrice: data.productPrice,
      specialPrice: data.specialPrice,
      discount: data.discount,
    };
  });

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

  const handleEdit = (product: AdminProductRow) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (product: AdminProductRow) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleImageUpload = (product: AdminProductRow) => {
    setSelectedProduct(product);
    setImageDialogOpen(true);
  };

  const handleProductView = (product: AdminProductRow) => {
    const mapped: ProductType = {
      productId: product.id,
      productCategory: product.category,
      productName: product.productName,
      image: "",
      productDescription: product.description,
      productStock: product.productStock,
      productPrice: product.productPrice,
      discount: product.discount,
      specialPrice: product.specialPrice,
    };
    setMappedProduct(mapped);
    setProductViewOpen(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      adminDeleteProduct(
        toast,
        setDeleteDialogOpen,
        setSelectedProduct,
        selectedProduct?.id
      )
    );
  };

  return (
    <div>
      {emptyProducts ? (
        <div className="flex flex-col items-center justify-center">
          <FaBoxOpen size={50} className="mb-3" />
          <h2 className="text-gray-700 font-semibold text-2xl">
            No Products Found
          </h2>
        </div>
      ) : (
        <div>
          <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
            All Products
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
          <div className="max-w-full">
            <DataGrid
              className="w-full"
              rows={tableRecords}
              columns={adminProductTableColumn(
                handleImageUpload,
                handleEdit,
                handleDelete,
                handleProductView
              )}
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
          </div>
          <DeleteModal
            openDeleteModal={deleteDialogOpen}
            setOpenDeleteModal={setDeleteDialogOpen}
            onDeleteHandler={onDeleteHandler}
            btnLoader={btnLoader}
            text="Product"
          />
          <ProductViewModel
            open={productViewOpen}
            setOpen={setProductViewOpen}
            product={mappedProduct}
            isAvailable={(mappedProduct?.productStock ?? 0) > 0}
          />
        </div>
      )}

      <Modal
        open={dialogOpen || openAddProductDialog}
        setOpen={dialogOpen ? setDialogOpen : setOpenAddProductDialog}
        title={dialogOpen ? "Update Product Details" : "Add New Product"}
      >
        <AddProductForm
          setOpen={dialogOpen ? setDialogOpen : setOpenAddProductDialog}
          product={dialogOpen ? selectedProduct : null}
          update={dialogOpen}
        />
      </Modal>

      {selectedProduct && (
        <Modal
          open={imageDialogOpen}
          setOpen={setImageDialogOpen}
          title="Update Product Image"
        >
          <ImageUploadForm
            setOpen={setImageDialogOpen}
            product={selectedProduct}
          />
        </Modal>
      )}
    </div>
  );
};
export default ProductTable;
