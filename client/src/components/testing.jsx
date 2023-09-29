import { useDispatch, useSelector } from "react-redux";
import { getCurrentTest } from "../store/tests";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/math";

const Testing = () => {
  // const dispatch = useDispatch();
  // const [currentTest, setCurrentTest] = useState(null);
  const currentTest = useSelector(getCurrentTest());

  // useEffect(() => {
  //   setCurrentTest(dispatch(getCurrentTest()));
  // }, []);
  console.log("currentTest testing", currentTest);

  ////////////////////////////////
  ////////////////////////////////
  ////////////////////////////////
  // нужно сделать

  // таблицу в БД со статистикой прохождения теста (продумать)
  // состояние в redux со статистикой прохождения теста (продумать)
  // написать функцию для выбора случайного элемента массива ?
  // написать функцию для "перемешивания" массива                     +
  ////////////////////////////////
  ////////////////////////////////
  ////////////////////////////////

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const shuffleArr = shuffle(arr);
  console.log(arr, shuffleArr);

  const progress = 80;
  return (
    <>
      <br />
      <div className="container mt-5">
        <div className="card ">
          <h3 className="card-header text-center">{currentTest.testName}</h3>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: progress + "%" }}
              // aria-valuenow="25"
              // aria-valuemin="0"
              // aria-valuemax="100"
            >
              {`6 из ${currentTest.numberOfQuestionsForTest}`}
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title mt-5 mb-3">{currentTest.description}</h5>
            <p className="text-center bg-info mb-5 rounded">
              можно выбрать один или несколько вариантов
            </p>
            {/* <p className="card-text">
              Тест вопроса Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Maiores saepe tenetur voluptate repudiandae quidem minima.
              Officiis, libero tempora! Iure corrupti modi quam nihil labore
              saepe accusamus, iusto non. Soluta, ea.
            </p> */}
            <div className="d-grid gap-2">
              <button className="btn btn-light" type="button">
                Кнопка
              </button>
              <button className="btn btn-primary" type="button">
                Кнопка
              </button>
              <button className="btn btn-light" type="button">
                Кнопка
              </button>
              <button className="btn btn-light" type="button">
                Кнопка
              </button>
              <button className="btn btn-light" type="button">
                Кнопка
              </button>
            </div>
            {/* <div className="">Вопрос 1</div>
            <div>Вопрос 2</div>
            <div>Вопрос 3</div>
            <div>Вопрос 4</div>
            <div>Вопрос 5</div> */}
          </div>
          <div className="card-footer text-muted d-flex justify-content-between ">
            <div className="btn btn-success fs-4 align-items-center align-middle">
              <i className="bi bi-arrow-left-square-fill text-light"></i>{" "}
              <span className="align-middle">НАЗАД</span>
            </div>
            <div className="btn btn-success fs-4 align-items-center align-middle">
              <span className="align-middle">ДАЛЕЕ</span>{" "}
              <i className="bi bi-arrow-right-square-fill text-light"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testing;
