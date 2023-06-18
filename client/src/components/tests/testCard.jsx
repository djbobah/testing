import React, { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useUsers } from "../hooks/useUsers";

import { shortFio } from "../../utils/fioUtils";
import { useAuth } from "../hooks/useAuth";
import { useTests } from "../hooks/useTests";
import TestService from "../../services/test.service";
import { Link, useNavigate } from "react-router-dom";

const TestCard = ({ test, edit, setEdit }) => {
  const navigate = useNavigate;
  const [author, setAuthor] = useState({});
  const { getUserData } = useUsers();
  const { currentUser } = useAuth();
  const { currentTest, setCurrentTest } = useTests();
  const [enterError, setEnterError] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const navigate = useNavigate();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  // const author = userService.getUserDataById(test.authorId);
  // console.log("author", author);
  // console.log("currentUser", currentUser);

  useEffect(() => {
    getUserData(test.authorId).then((author) => {
      setAuthor(author);
    });
  }, []);
  // getUserData(test.authorId).then((author) => {
  //   setAuthor(author);
  // });
  // console.log("test date", test);

  const handleClickEditTest = async (id) => {
    try {
      await TestService.getCurrentTest(id).then((curTest) => {
        setCurrentTest(curTest);
        setEdit(true);
      });
      // navigate("/main/home");
      // console.log("currentUser", currentUser);

      // setTests(data);
      // const curTest = await TestService.getCurrentTest(
      //   currentUser.id_department
      // );
      // setCurrentDepartment(curDep);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
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
              <Link
                to="/main/createTest"
                className="text-muted btn"
                onClick={() => handleClickEditTest(test.id)}
                id={test.id}
              >
                <i className="bi bi-pencil-fill"></i>
              </Link>
            ) : (
              ""
            )}
          </div>

          <hr />
          <p className="card-text">{test.description}</p>
          <a href="#" className="btn btn-primary">
            Перейти к тестированию
          </a>
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
