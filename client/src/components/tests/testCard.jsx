import React, { useEffect } from "react";
import userService from "../../services/user.service";
import { useUsers } from "../hooks/useUsers";
import { useState } from "react";

import { shortFio } from "../../utils/fioUtils";
const TestCard = ({ test }) => {
  const [author, setAuthor] = useState({});
  const { getUserData } = useUsers();
  // const author = userService.getUserDataById(test.authorId);
  // console.log("test", getUserData());

  useEffect(() => {
    getUserData(test.authorId).then((author) => {
      setAuthor(author);
    });
  }, []);
  // getUserData(test.authorId).then((author) => {
  //   setAuthor(author);
  // });
  // console.log("test date", new Date(author.updatedAt).toLocaleDateString());

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{test.testName}</h5>
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
                Автор: <span>{shortFio(author.fio)}</span>
              </div>

              {/* {await userService.getUserDataById(test.authorId)} */}
            </div>

            <div className="text-muted">
              <div>
                Последнее обновление:{" "}
                <span className="">
                  {new Date(author.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
