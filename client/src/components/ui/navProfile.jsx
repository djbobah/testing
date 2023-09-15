import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";
// import avatarImg from "../../assets/img/img_504714.png";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUser());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  // console.log("currentUser nv profile", currentUser);
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center text-white">
        <div className="me-2">{currentUser.fio}</div>
        <i className="bi bi-person-circle me-2 fs-5"></i>
        {/* <img src={avatarImg} alt="" height="40" className="img-responsive rounded-circle"/> */}
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser.id}`} className="dropdown-item">
          Профиль
        </Link>
        <Link to="/main/logout" className="dropdown-item">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
