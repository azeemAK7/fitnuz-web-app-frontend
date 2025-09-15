import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import { useEffect } from "react";
import { Button } from "@mui/material";
import Spinners from "../../shared/Spinners";
import toast from "react-hot-toast";
import {
  adminCategoryAdd,
  adminCategoryUpdate,
} from "../../../store/actions/ProductAction";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import type {
  AdminCategoryRow,
  CategoryFormValues,
} from "../../../types/common";

interface AddOrUpdateCategoryFormProps {
  setOpen: (open: boolean) => void;
  category: AdminCategoryRow | null;
  update: boolean;
}

const AddOrUpdateCategoryForm = ({
  setOpen,
  category,
  update,
}: AddOrUpdateCategoryFormProps) => {
  const dispatch = useAppDispatch();
  const { btnLoader } = useAppSelector((state) => state.errors);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    mode: "onTouched",
  });

  useEffect(() => {
    if (category && update) {
      setValue("categoryName", category.categoryName);
    }
  }, [category, update]);

  const handleSubmitForm = (formData: CategoryFormValues) => {
    if (update) {
      if (!category) return;
      const sendDate = {
        ...formData,
        categoryId: category.id,
      };
      dispatch(adminCategoryUpdate(sendDate, toast, reset, setOpen));
    } else {
      dispatch(adminCategoryAdd(formData, toast, reset, setOpen));
    }
  };

  return (
    <div className="relative py-5 h-full">
      <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col max-w-md">
          <InputField
            label="Category Name"
            id="categoryName"
            type="text"
            errors={errors}
            register={register}
            required
            message="This field is required"
            min={3}
            placeholder="Type Category Name"
          />
        </div>
        <div className="absolute bottom-5 w-full flex flex-row items-center justify-between">
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
              <>{update ? "Update" : "Add"}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddOrUpdateCategoryForm;
