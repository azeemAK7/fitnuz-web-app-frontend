import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import type { CategoryType } from "../../types/common";

interface SelectTextFieldProps {
  label: string;
  selectedItem: CategoryType | null; // can be null if nothing selected
  setSelectedItem: (item: CategoryType) => void;
  itemLists: CategoryType[];
}

const SelectTextField = ({
  label,
  selectedItem,
  setSelectedItem,
  itemLists,
}: SelectTextFieldProps) => {
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="id" className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        <div className="relative">
          <ListboxButton
            className={`relative text-sm py-2 rounded-md border border-slate-700 w-full cursor-default bg-white text-left text-gray-600 sm:text-sm sm:leading-6`}
          >
            <span className="block truncate ps-2">
              {selectedItem?.categoryName}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
              <IoIosArrowDown className="text-xl" />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-hidden"
          >
            {itemLists?.map((item) => (
              <ListboxOption
                key={item.categoryId}
                value={item}
                className="group relative cursor-default rounded-md mx-2 py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
              >
                <span className="block truncate font-semibold group-data-selected:font-semibold">
                  {item.categoryName}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                  <FaCheck className="text-xl" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
};
export default SelectTextField;
