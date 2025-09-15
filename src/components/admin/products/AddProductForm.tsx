import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import { Button } from "@mui/material";
import Spinners from "../../shared/Spinners";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import ErrorPage from "../../shared/ErrorPage";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import {
  addNewProduct,
  fetchAdminCategories,
  updateProductDetails,
} from "../../../store/actions/ProductAction";
import type {
  AdminProductRow,
  CategoryType,
  ProductFormValues,
} from "../../../types/common";
import SelectTextField from "../../shared/SelectTextField";

interface AddProductFormProps {
  setOpen: (open: boolean) => void;
  product?: AdminProductRow | null;
  update: boolean;
}

const AddProductForm = ({
  setOpen,
  product,
  update = false,
}: AddProductFormProps) => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    mode: "onTouched",
  });

  const dispatch = useAppDispatch();
  const { btnLoader } = useAppSelector((state) => state.errors);
  const { adminCategory } = useAppSelector((state) => state.adminCategory);
  const { categoryLoading } = useAppSelector((state) => state.errors);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  useEffect(() => {
    if (update && product) {
      setValue("productName", product.productName);
      setValue("productDescription", product.description);
      setValue("productPrice", product.productPrice);
      setValue("productStock", product.productStock);
      setValue("specialPrice", product.specialPrice);
      setValue("discount", product.discount);
    }
  }, [update, product]);

  useEffect(() => {
    if (!update) {
      dispatch(fetchAdminCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (!categoryLoading && adminCategory) {
      setSelectedCategory(adminCategory[0]);
    }
  }, [adminCategory]);

  const updateProductHandler = (data: ProductFormValues) => {
    if (update) {
      if (!product) return;
      const sendData = {
        ...data,
        productId: product.id,
      };
      dispatch(updateProductDetails(sendData, toast, setOpen, reset));
    } else {
      const sendData = {
        ...data,
      };
      dispatch(
        addNewProduct(
          sendData,
          toast,
          setOpen,
          reset,
          selectedCategory?.categoryId
        )
      );
    }
  };

  if (categoryLoading) {
    return <Loader text="Category Loading..." />;
  }
  if (adminCategory.length == 0 && !update) {
    return <ErrorPage message="Category List Is Empty At The Moment" />;
  }

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={handleSubmit(updateProductHandler)}>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <InputField
            label="Product Name"
            id="productName"
            type="text"
            required
            message="This field is required"
            register={register}
            errors={errors}
            placeholder="Enter Product Name"
          />
          {!update && (
            <SelectTextField
              label="Category"
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
              itemLists={adminCategory}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <InputField
            label="Price"
            id="productPrice"
            type="number"
            required
            message="This field is required"
            register={register}
            errors={errors}
            placeholder="Enter Product Price"
          />
          <InputField
            label="Quantity"
            id="productStock"
            type="number"
            required
            message="This field is required"
            register={register}
            errors={errors}
            placeholder="Enter Product Quantity"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <InputField
            label="Discount"
            id="discount"
            type="number"
            required
            message="This field is required"
            register={register}
            errors={errors}
            placeholder="Enter Product Discount"
          />
          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            register={register}
            errors={errors}
            placeholder="Enter Product Special Price"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <label
            htmlFor="desc"
            className="font-semibold text-sm text-slate-800"
          >
            Description
          </label>
          <textarea
            rows={5}
            placeholder="Add Product Description"
            className={`w-full px-4 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
              errors["productDescription"]?.message
                ? "border-red-500"
                : "border-slate-700"
            }`}
            {...register("productDescription", {
              required: { value: true, message: "This Field Is Required" },
            })}
          />
        </div>
        {errors["productDescription"]?.message && (
          <p className="text-sm font-semibold text-red-600 mt-0">
            {errors["productDescription"]?.message as string}
          </p>
        )}
        <div className="flex w-full justify-between items-center absolute bottom-5">
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
export default AddProductForm;
