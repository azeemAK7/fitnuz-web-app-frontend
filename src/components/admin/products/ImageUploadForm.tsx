import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinners from "../../shared/Spinners";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { updateProductImage } from "../../../store/actions/ProductAction";
import type { AdminProductRow } from "../../../types/common";

interface ImageUploadFormProp {
  setOpen: (open: boolean) => void;
  product: AdminProductRow;
}

const ImageUploadForm = ({ setOpen, product }: ImageUploadFormProp) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { btnLoader } = useAppSelector((state) => state.errors);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid image file (.jpeg , .jpg , .png)");
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  const imageSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image before saving.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);

    dispatch(updateProductImage(toast, setOpen, product.id, formData));
  };

  const clearImageHandler = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={imageSubmitHandler}>
        <div className="flex flex-col gap-4 w-full">
          <label className="flex gap-2 justify-center items-center p-3 w-full rounded-md cursor-pointer text-blue-600 border border-dashed border-blue-700">
            <FaCloudUploadAlt size={24} />
            <span>Upload Product Image</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={imageChangeHandler}
              className="hidden"
              accept=".jpeg , .jpg , .png"
            />
          </label>
          {previewImage && (
            <div>
              <img
                src={previewImage}
                alt="product image"
                className="h-60 rounded-md mb-2"
              />
              <button
                type="button"
                onClick={clearImageHandler}
                className="bg-rose-700 text-white px-2 py-1 rounded-md"
              >
                Clear Image
              </button>
            </div>
          )}
        </div>
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
              <>"Update"</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ImageUploadForm;
