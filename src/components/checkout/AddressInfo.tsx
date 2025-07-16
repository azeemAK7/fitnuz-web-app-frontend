import { FaAddressBook } from "react-icons/fa6";
import Skeleton from "../shared/Skeleton";
import { useEffect, useState } from "react";
import AddressModal from "./AddressModal";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import { DeleteModal } from "./DeleteModel";
import {
  deleteUserAddress,
  resetClientSecret,
  resetPaymentMethodSelect,
} from "../../store/actions/ProductAction";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { AddressType } from "../../types/common";

interface AddressInfoProps {
  addresses: AddressType[];
}

const AddressInfo = ({ addresses }: AddressInfoProps) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null
  );

  const noAddressExist = !addresses || addresses.length === 0;
  const { isLoading, btnLoader } = useAppSelector((state) => state.errors);
  const dispatch = useAppDispatch();

  const addNewAddressHandler = () => {
    setSelectedAddress(null);
    setOpenAddressModal(true);
  };

  const onDeleteHandler = () => {
    if (selectedAddress?.addressId !== undefined) {
      deleteUserAddress(toast, selectedAddress.addressId, setOpenDeleteModal);
    }
  };

  useEffect(() => {
    dispatch(resetPaymentMethodSelect());
    dispatch(resetClientSecret());
  }, []);

  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={48} className="text-gray-500 mb-4" />
          <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
            No Address Added Yet
          </h1>
          <p className="mb-6 text-slate-800 text-center">
            {" "}
            Please add your address to complete purchase
          </p>
          <button
            onClick={addNewAddressHandler}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <div className="py-4 px-8">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={addresses}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={addNewAddressHandler}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
                >
                  Add More
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <AddressModal
        openAddressModal={openAddressModal}
        setOpenAddressModal={setOpenAddressModal}
      >
        <AddressForm
          setOpenAddressModal={setOpenAddressModal}
          address={selectedAddress}
        />
      </AddressModal>
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        onDeleteHandler={onDeleteHandler}
        btnLoader={btnLoader}
      />
    </div>
  );
};
export default AddressInfo;
