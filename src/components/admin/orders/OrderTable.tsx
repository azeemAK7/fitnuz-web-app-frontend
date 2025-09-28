import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { adminOrderTableColumn } from "../../helper/TableColumn";
import UpdateOrderForm from "./UpdateOrderForm";
import Modal from "../../shared/Modal";
import type { Order, OrderRow, PaginationType } from "../../../types/common";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { downloadInvoice } from "../../../store/actions/ProductAction";

interface OrderTableProps {
  adminOrders: Order[];
  pagination: PaginationType | null;
}

const OrderTable = ({ adminOrders, pagination }: OrderTableProps) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const tableRecords = adminOrders.map((data) => {
    return {
      id: data.orderId,
      email: data.email,
      totalAmount: data.totalAmount,
      status: data.orderStatus,
      date: data.orderDate,
      pgStatus: data.payment.pgStatus,
    };
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderRow | null>(null);
  const [currentPage, setCurrentPage] = useState(
    (pagination?.pageNumber ?? 0) + 1 || 1
  );

  const handleEdit = (order: OrderRow) => {
    setSelectedItem(order);
    setDialogOpen(true);
  };

  const handleDownloadInvoice = (id: number) => {
    dispatch(downloadInvoice(id));
  };

  const handlePaginationChange = (paginationModel: GridPaginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };
  return (
    <div>
      <h1 className="text-center font-bold text-3xl text-slate-800 pb-6 uppercase">
        All Orders
      </h1>
      <div>
        <DataGrid
          className="w-full"
          rows={tableRecords}
          columns={adminOrderTableColumn(handleEdit, handleDownloadInvoice)}
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
                pageSize: pagination?.pageSize || 5,
                page: currentPage - 1,
              },
            },
          }}
          onPaginationModelChange={handlePaginationChange}
          pageSizeOptions={[pagination?.pageSize || 5]}
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
      <Modal
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Update Order Status"
      >
        <UpdateOrderForm
          setOpen={setDialogOpen}
          selectedId={selectedItem?.id ?? 0}
          selectedItem={selectedItem}
        />
      </Modal>
    </div>
  );
};
export default OrderTable;
