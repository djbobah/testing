import React from "react";
import userService from "../../services/user.service";
const TestCard = ({ test }) => {
  const author = userService.getUserDataById(test.authorId);
  console.log(author);

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Название теста</h5>
          <hr />
          <p className="card-text">
            Описательная часть выавыа ывавыа ыва ыва ыва ыва ыва выа вы а выа вы
            а ыва выа ываывавыа ывавыа.
          </p>
          <a href="#" className="btn btn-primary">
            Перейти к тестированию
          </a>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <div className="text-muted">
              <div>Автор:</div>
              <div></div>
              {/* {await userService.getUserDataById(test.authorId)} */}
            </div>

            <div className="text-muted">
              <div>Последнее обновление:</div>
              <div className="d-flex justify-content-end">data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;