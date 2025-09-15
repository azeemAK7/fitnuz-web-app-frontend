import type { GridColDef } from "@mui/x-data-grid";
import type {
  AdminCategoryRow,
  AdminProductRow,
  OrderRow,
} from "../../types/common";
import { FaEye, FaImage } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const adminOrderTableColumn = (
  handleEdit: (row: OrderRow) => void
): GridColDef<OrderRow>[] => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "orderId",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border border-slate-300",
    renderHeader: () => <span className="text-center">Order ID</span>,
  },
  {
    // Column for customer email.
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Email</span>,
  },
  {
    // Column for showing total amount of the order.
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Total Amount</span>,
  },
  {
    // Column to display order status (e.g., Pending, Shipped).
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Status</span>,
  },
  {
    // Column for order creation date.
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Order Date</span>,
  },
  {
    // Custom action column with an "Edit" button.
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal border border-slate-300",
    sortable: false,
    width: 250,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
        </div>
      );
    },
  },
];

export const adminProductTableColumn = (
  handleImageUpload: (row: AdminProductRow) => void,
  handleEdit: (row: AdminProductRow) => void,
  handleDelete: (row: AdminProductRow) => void,
  handleProductView: (row: AdminProductRow) => void
): GridColDef<AdminProductRow>[] => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Product Id",
    align: "center",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border border-slate-300",
    renderHeader: () => <span className="text-center">Product ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "category",
    headerName: "Category",
    align: "center",
    width: 250,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Category</span>,
  },
  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Product Name</span>,
  },
  {
    disableColumnMenu: true,
    field: "description",
    headerName: "Product Discription",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Product Discription</span>,
  },
  {
    // Column for order creation date.
    disableColumnMenu: true,
    field: "productStock",
    headerName: "Product Stock",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Product Stock</span>,
  },
  {
    // Column for order creation date.
    disableColumnMenu: true,
    field: "productPrice",
    headerName: "Product Price",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Product Price</span>,
  },
  {
    // Column for order creation date.
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Special Price",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Special Price</span>,
  },
  {
    // Column for order creation date.
    disableColumnMenu: true,
    field: "discount",
    headerName: "Product Discount",
    align: "center",
    width: 200,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Product Discount</span>,
  },
  {
    // Custom action column with an "Edit" button.
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal border border-slate-300",
    sortable: false,
    width: 400,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleImageUpload(params.row)}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md"
          >
            <FaImage className="mr-2" />
            Image
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
          <button
            onClick={() => handleProductView(params.row)}
            className="flex items-center bg-slate-800 text-white px-4   h-9 rounded-md"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </div>
      );
    },
  },
];

export const adminCategoryTableColumn = (
  handleEdit: (row: AdminCategoryRow) => void,
  handleDelete: (row: AdminCategoryRow) => void
): GridColDef<AdminCategoryRow>[] => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "Category Id",
    align: "center",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border border-slate-300",
    renderHeader: () => <span className="text-center">Category ID</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 200,
    editable: false,
    sortable: true,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName:
      "text-slate-700 font-normal border text-center border-slate-300",
    renderHeader: () => <span>Category Name</span>,
  },
  {
    // Custom action column with an "Edit" button.
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal border border-slate-300",
    sortable: false,
    flex: 1, // take remaining space dynamically
    minWidth: 200,
    renderHeader: () => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];
