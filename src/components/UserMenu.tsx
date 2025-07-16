import { Avatar, Menu, MenuItem } from "@mui/material";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import BackDrop from "./BackDrop";
import toast from "react-hot-toast";
import { logoutUser } from "../store/actions/ProductAction";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    dispatch(logoutUser(navigate, toast));
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="avatar" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: { width: 160 },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <FaUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.userName}</span>
          </MenuItem>
        </Link>

        <Link to="/profile/orders">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">Order</span>
          </MenuItem>
        </Link>
        <MenuItem className="flex gap-2" onClick={logOutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-gradient-to-r from-purple-600 to-red-500 px-4 py-1 text-white rounded-sm">
            <IoIosExit className="text-xl" />
            <span className="font-bold text-[16px] mt-1">LogOut</span>
          </div>
        </MenuItem>
      </Menu>
      {open && <BackDrop isOpen={open} />}
    </div>
  );
};
export default UserMenu;
