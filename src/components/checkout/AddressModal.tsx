import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface AddressModalProps {
  openAddressModal: boolean;
  setOpenAddressModal: (open: boolean) => void;
  children: ReactNode;
}
const AddressModal = ({
  openAddressModal,
  setOpenAddressModal,
  children,
}: AddressModalProps) => {
  return (
    <Dialog
      open={openAddressModal}
      onClose={() => setOpenAddressModal(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-gray-300 opacity-60 transition-opacity" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="relative w-full max-w-md  mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all">
          <div className="px-6 py-6">{children}</div>
          <div>
            <button
              onClick={() => {
                setOpenAddressModal(false);
              }}
              type="button"
            >
              <FaTimes className="text-red-600 cursor-pointer absolute top-3 right-3 size-7 flex justify-end" />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
export default AddressModal;
