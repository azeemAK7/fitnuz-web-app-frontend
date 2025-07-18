import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaBuilding, FaCity, FaStreetView, FaTrash } from "react-icons/fa6";
import { MdPinDrop, MdPublic } from "react-icons/md";
import { setUserCheckoutAddress } from "../../store/actions/ProductAction";
import type { AddressType } from "../../types/common";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

interface AddressListProps {
  addresses: AddressType[];
  setSelectedAddress: (addr: AddressType | null) => void;
  setOpenAddressModal: (open: boolean) => void;
  setOpenDeleteModal: (open: boolean) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useAppDispatch();
  const { userSelectedCheckoutAddress } = useAppSelector((state) => state.auth);

  const handleAddressSelection = (address: AddressType) => {
    dispatch(setUserCheckoutAddress(address));
  };

  const onEditButtonHandler = (address: AddressType) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address: AddressType) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.addressId}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const isButtonClick = target.closest("button");
            if (!isButtonClick) {
              handleAddressSelection(address);
            }
          }}
          className={`p-4 shadow-md rounded-md cursor-pointer relative  ${
            userSelectedCheckoutAddress?.addressId === address.addressId
              ? "bg-green-100"
              : "bg-white"
          }`}
        >
          <div className="flex items-start">
            <div className="space-y-1">
              <div className="flex items-center">
                <FaBuilding size={16} className="mr-2 text-gray-600" />
                <p className="font-semibold break-words max-w-[250px]">
                  {address.buildingName}
                </p>
                {userSelectedCheckoutAddress?.addressId ===
                  address.addressId && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>

              <div className="flex items-center">
                <FaStreetView size={16} className="mr-2 text-gray-600" />
                <p className="max-w-[110px] sm:max-w-[160px] font-semibold break-words">
                  {address.street}
                </p>
              </div>

              <div className="flex items-center">
                <FaCity size={16} className="mr-2 text-gray-600" />
                <p className="break-words">
                  {address.city}, {address.state}
                </p>
              </div>

              <div className="flex items-center">
                <MdPinDrop size={16} className="mr-2 text-gray-600" />
                <p className="break-words max-w-[250px]">{address.pincode}</p>
              </div>

              <div className="flex items-center">
                <MdPublic size={16} className="mr-2 text-gray-600" />
                <p className="break-words max-w-[250px]">{address.country}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 absolute top-4 right-2">
            <button onClick={() => onEditButtonHandler(address)}>
              <FaEdit size={18} className="text-teal-700 cursor-pointer" />
            </button>
            <button onClick={() => onDeleteButtonHandler(address)}>
              <FaTrash size={17} className="text-rose-600 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AddressList;
