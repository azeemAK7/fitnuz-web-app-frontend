import { FaTriangleExclamation } from "react-icons/fa6";

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-14 max-w-md mx-auto">
      <FaTriangleExclamation className="text-red-500 text-6xl mb-4" />
      <p className="text-gray-600 mb-6 text-center">
        {message ? message : "An unexpected error has occured"}
      </p>
    </div>
  );
};
export default ErrorPage;
