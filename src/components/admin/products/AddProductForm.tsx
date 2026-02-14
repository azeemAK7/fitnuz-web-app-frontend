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
  ProductVariantFormValues,
} from "../../../types/common";
import SelectTextField from "../../shared/SelectTextField";

const WEIGHT_OPTIONS = [
  { label: "100g", grams: 100 },
  { label: "250g", grams: 250 },
  { label: "500g", grams: 500 },
  { label: "1kg", grams: 1000 },
];

const defaultVariant: ProductVariantFormValues = {
  weightLabel: "1kg",
  weightInGrams: 1000,
  price: 0,
  discount: 0,
  stock: 0,
};

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

  const [variants, setVariants] = useState<ProductVariantFormValues[]>([
    { ...defaultVariant },
  ]);

  useEffect(() => {
    if (update && product) {
      setValue("productName", product.productName);
      setValue("productDescription", product.description);
      if (product.variants && product.variants.length > 0) {
        const mapped = product.variants.map((v) => ({
          variantId: v.variantId,
          weightLabel: v.weightLabel,
          weightInGrams: v.weightInGrams,
          price: v.price,
          discount: v.discount,
          stock: v.stock,
        }));
        setVariants(mapped);
      }
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

  const addVariantRow = () => {
    const usedLabels = variants.map((v) => v.weightLabel);
    const available = WEIGHT_OPTIONS.find(
      (w) => !usedLabels.includes(w.label)
    );
    if (available) {
      setVariants([
        ...variants,
        {
          weightLabel: available.label,
          weightInGrams: available.grams,
          price: 0,
          discount: 0,
          stock: 0,
        },
      ]);
    }
  };

  const removeVariantRow = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const updateVariant = (
    index: number,
    field: keyof ProductVariantFormValues,
    value: string | number
  ) => {
    const updated = [...variants];
    if (field === "weightLabel") {
      const opt = WEIGHT_OPTIONS.find((w) => w.label === value);
      updated[index] = {
        ...updated[index],
        weightLabel: value as string,
        weightInGrams: opt?.grams ?? 0,
      };
    } else {
      updated[index] = { ...updated[index], [field]: Number(value) };
    }
    setVariants(updated);
  };

  const updateProductHandler = (data: ProductFormValues) => {
    const sendData: ProductFormValues = {
      ...data,
      variants,
    };

    if (update) {
      if (!product) return;
      sendData.productId = product.id;
      dispatch(updateProductDetails(sendData, toast, setOpen, reset));
    } else {
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

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-sm text-slate-800">
              Weight Variants
            </label>
            {variants.length < WEIGHT_OPTIONS.length && (
              <button
                type="button"
                onClick={addVariantRow}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                + Add Variant
              </button>
            )}
          </div>

          {variants.map((variant, index) => (
            <div
              key={index}
              className="flex flex-wrap items-end gap-2 p-3 border border-gray-200 rounded-md bg-gray-50"
            >
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">
                  Weight
                </label>
                <select
                  value={variant.weightLabel}
                  onChange={(e) =>
                    updateVariant(index, "weightLabel", e.target.value)
                  }
                  className="px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none"
                >
                  {WEIGHT_OPTIONS.map((opt) => (
                    <option key={opt.label} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col flex-1 min-w-[80px]">
                <label className="text-xs font-medium text-gray-600 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    updateVariant(index, "price", e.target.value)
                  }
                  className="px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none"
                  placeholder="Price"
                  min="0"
                />
              </div>

              <div className="flex flex-col flex-1 min-w-[80px]">
                <label className="text-xs font-medium text-gray-600 mb-1">
                  Discount %
                </label>
                <input
                  type="number"
                  value={variant.discount}
                  onChange={(e) =>
                    updateVariant(index, "discount", e.target.value)
                  }
                  className="px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none"
                  placeholder="Discount"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex flex-col flex-1 min-w-[80px]">
                <label className="text-xs font-medium text-gray-600 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    updateVariant(index, "stock", e.target.value)
                  }
                  className="px-2 py-1.5 border border-gray-300 rounded-md text-sm outline-none"
                  placeholder="Stock"
                  min="0"
                />
              </div>

              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariantRow(index)}
                  className="px-2 py-1.5 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
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
