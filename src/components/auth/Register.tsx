import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { FaUserPlus } from "react-icons/fa6";
import { registerUser } from "../../store/actions/ProductAction";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";
import { useAppDispatch } from "../../hooks/storeHooks";
import type { RegisterFormValues } from "../../types/formTypes";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onTouched",
  });

  const registerHandler: SubmitHandler<RegisterFormValues> = async (data) => {
    dispatch(registerUser(data, navigate, toast, setLoader, reset));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          <FaUserPlus className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Register Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="userName"
            type="text"
            placeholder="Enter your username"
            register={register}
            message="*UserName Is Required"
            errors={errors}
          />
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            message="*Email Is Required"
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            placeholder="Enter your password"
            min={8}
            register={register}
            message="*Password Is Required"
            errors={errors}
          />

          <button
            disabled={loader}
            className="bg-gradient-to-r from-purple-600 to-red-500  flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
            type="submit"
          >
            {loader ? (
              <>
                {" "}
                <Spinners /> Loading...
              </>
            ) : (
              <>Register</>
            )}
          </button>

          <p className="text-center text-sm text-slate-700 mt-6">
            Already have an account?
            <Link
              className="font-semibold underline hover:text-black"
              to="/login"
            >
              <span> SignIn</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;
