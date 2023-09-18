import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsers } from "../../../store/users";
import { useEffect } from "react";

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus());
  // console.log("UsersLoader dataStatus", dataStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsers());
    }
  }, []);
  if (!dataStatus) return "Loading...";
  return children;
};

export default UsersLoader;
