import { useEffect } from "react";
import InputField from "../shared/InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import Spinners from "../shared/Spinners";
import toast from "react-hot-toast";
import { addOrUpdateUserAddress } from "../../store/actions/ProductAction";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { AddressType } from "../../types/common";

interface AddressFormProps {
  setOpenAddressModal: (open: boolean) => void;
  address?: AddressType | null;
}

const AddressForm: React.FC<AddressFormProps> = ({
  setOpenAddressModal,
  address,
}) => {
  const { btnLoader } = useAppSelector((state) => state.errors);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddressType>({
    mode: "onTouched",
  });

  const onSaveAddressHandler: SubmitHandler<AddressType> = async (
    data: AddressType
  ) => {
    dispatch(
      addOrUpdateUserAddress(data, reset, toast, setOpenAddressModal, address)
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address.buildingName);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("pincode", address.pincode);
      setValue("street", address.street);
      setValue("country", address.country);
    }
  }, [address]);

  return (
    <div className="max-h-[500px] overflow-y-auto hide-scrollbar px-4">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          {address?.addressId ? "Update Address" : "Add Address"}
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter Building Name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter City"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />

          <InputField
            label="Pincode"
            required
            id="pincode"
            type="text"
            message="*Pincode is required"
            placeholder="Enter Pincode"
            min={6}
            register={register}
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter Street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter Country"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={btnLoader}
          className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4 hover:cursor-pointer"
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners /> loading...
            </>
          ) : (
            <>save</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
