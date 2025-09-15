import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../shared/Loader";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/storeHooks";
import useAdminProductHook from "../../../hooks/useAdminProductHook";
import ProductTable from "./ProductTable";

const AdminProducts = () => {
  useAdminProductHook();
  const { adminProducts, adminProductsPagination } = useAppSelector(
    (state) => state.admin
  );
  const { isLoading } = useAppSelector((state) => state.errors);

  const [AddProductDialogOpen, setAddProductDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end pt-6 pb-10">
        <button
          onClick={() => setAddProductDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white font-semibold py-2 px-4 gap-2 hover:cursor-pointer shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdAddShoppingCart size={20} />
          Add Products
        </button>
      </div>

      {isLoading ? (
        <Loader text={"Loading Products..."} />
      ) : (
        <ProductTable
          openAddProductDialog={AddProductDialogOpen}
          setOpenAddProductDialog={setAddProductDialogOpen}
          adminProducts={adminProducts}
          pagination={adminProductsPagination}
        />
      )}
    </div>
  );
};
export default AdminProducts;
