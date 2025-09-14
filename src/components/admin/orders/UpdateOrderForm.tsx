import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import Spinners from "../../shared/Spinners";
import { updateOrderStatus } from "../../../store/actions/ProductAction";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import type { OrderRow } from "../../../types/common";

const ORDER_STATUS = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Accepted",
];

interface UpdateOrderFormProps {
  setOpen: (open: boolean) => void;
  selectedId: number;
  selectedItem: OrderRow | null;
}

const UpdateOrderForm = ({
  setOpen,
  selectedId,
  selectedItem,
}: UpdateOrderFormProps) => {
  const dispatch = useAppDispatch();

  const { btnLoader } = useAppSelector((state) => state.errors);
  const [orderStatus, setOrderStatus] = useState(
    selectedItem?.status || "Accepted"
  );
  const [error, setError] = useState("");

  const orderUpdateStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order Status Is Required");
      return;
    }
    dispatch(updateOrderStatus(selectedId, setOpen, orderStatus, toast));
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={orderUpdateStatus}>
        <FormControl fullWidth variant="outlined" error={!!error}>
          <InputLabel id="order-status-label">Order Status</InputLabel>
          <Select
            labelId="order-status-label"
            label="Order Status"
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setError("");
            }}
          >
            {ORDER_STATUS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        <div className="flex w-full justify-between items-center absolute bottom-20">
          <Button
            disabled={btnLoader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-2 px-4 font-medium text-sm"
          >
            Cancel
          </Button>
          <Button
            disabled={btnLoader}
            type="submit"
            variant="contained"
            color="primary"
            className="text-white bg-blue-600 py-2 px-4 font-medium text-sm"
          >
            {btnLoader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdateOrderForm;
