import { MdCategory } from "react-icons/md";
import CategoryTable from "./CategoryTable";
import Loader from "../../shared/Loader";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/storeHooks";
import useAdminCategoryHook from "../../../hooks/useAdminCategoryHook";

const AdminCategory = () => {
  useAdminCategoryHook();
  const { adminCategory, adminCategoryPagination } = useAppSelector(
    (state) => state.adminCategory
  );
  const { categoryLoading } = useAppSelector((state) => state.errors);

  const [AddCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);

  return (
    <div className="md:mx-14">
      <div className="flex justify-end pt-6 pb-10">
        <button
          onClick={() => setAddCategoryDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 flex gap-2 rounded-lg py-2 px-4 items-center justify-center md:text-xl sm:text-sm text-white font-semibold cursor-pointer shadow-xl transition-colors hover:text-slate-300 duration-300"
        >
          <MdCategory size={20} />
          Add Category
        </button>
      </div>

      {categoryLoading ? (
        <Loader text="Category Loading..." />
      ) : (
        <div>
          <CategoryTable
            AddCategoryDialogOpen={AddCategoryDialogOpen}
            setAddCategoryDialogOpen={setAddCategoryDialogOpen}
            adminCategory={adminCategory}
            pagination={adminCategoryPagination}
          />
        </div>
      )}
    </div>
  );
};
export default AdminCategory;
