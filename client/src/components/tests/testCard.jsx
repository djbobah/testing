import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";

import { shortFio } from "../../utils/fioUtils";
import TestService from "../../services/test.service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTest, setCurrentTest, updateTest } from "../../store/tests";
import { getCurrentUser, getUserDataById } from "../../store/users";

const TestCard = ({ test, onTest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  // const [author, setAuthor] = useState({});
  const currentUser = useSelector(getCurrentUser());
  const [enterError, setEnterError] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const navigate = useNavigate();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  const author = useSelector(getUserDataById(test.authorId));

  const handleClickEditTest = (id) => {
    dispatch(setCurrentTest(id));
  };
  const handleClickTogglePublish = () => {
    if (!test.isPublished) {
      dispatch(updateTest({ ...test, isPublished: true }));
    } else {
      dispatch(updateTest({ ...test, isPublished: false }));
    }
  };

  return (
    <div className="col">
      <div className="card">
        {/* <div className="card-header">asdasd</div> */}
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="card-title">{test.testName}</h5>
            </div>
            {author.id === currentUser.id ? (
              <div className="d-flex">
                {test.isPublished ? (
                  <div
                    className="btn btn-light "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Снять с публикации"
                    onClick={handleClickTogglePublish}
                  >
                    <i className="bi bi-cloud-arrow-down fs-5"></i>
                  </div>
                ) : (
                  <div
                    className="btn btn-warning "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Опубликовать"
                    onClick={handleClickTogglePublish}
                  >
                    <i className="bi bi-cloud-arrow-up fs-5"></i>
                  </div>
                )}

                <Link
                  to="/main/createTest"
                  className="text-muted btn"
                  onClick={() => handleClickEditTest(test.id)}
                  id={test.id}
                >
                  <i className="bi bi-pencil-fill"></i>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          <hr />
          <p className="card-text">{test.description}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary " onClick={onTest}>
              Перейти к тестированию
            </button>
          </div>
        </div>
        <div className="card-footer">
          <div className="">
            <div className="text-muted">
              <div>
                Автор:{" "}
                <b>
                  <u>
                    <i>{shortFio(author.fio)}</i>
                  </u>
                </b>
              </div>

              {/* {await userService.getUserDataById(test.authorId)} */}
            </div>
            <hr />
            <div className="text-muted">
              <div>
                Последнее обновление:{" "}
                <u>
                  {" "}
                  <i className="">
                    {new Date(test.updatedAt).toLocaleDateString()}
                    {/* {author.updatedAt} */}
                  </i>
                </u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
