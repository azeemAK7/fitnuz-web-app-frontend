import { Pagination } from "@mui/material";
import type { ChangeEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface PaginationsProps {
  totalPage: number;
}

const Paginations = ({ totalPage }: PaginationsProps) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const onChangeHandler = (_event: ChangeEvent<unknown>, value: number) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <Pagination
      count={totalPage}
      page={page}
      defaultPage={1}
      siblingCount={1}
      onChange={onChangeHandler}
      boundaryCount={2}
      shape="rounded"
    />
  );
};
export default Paginations;
