import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentQuestionAnswers,
  getCurrentTest,
  getCurrentTestQuestions,
} from "../store/tests";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/math";

const Testing = () => {
  // const dispatch = useDispatch();

  const currentTest = useSelector(getCurrentTest());

  const currentTestQuestions = useSelector(getCurrentTestQuestions());
  // useEffect(() => {
  //   setCurrentTest(dispatch(getCurrentTest()));
  // }, []);
  // console.log("currentTest testing", currentTest);

  ////////////////////////////////
  ////////////////////////////////
  ////////////////////////////////
  // нужно сделать

  // таблицу в БД со статистикой прохождения теста (продумать)
  // состояние в redux со статистикой прохождения теста (продумать)
  // написать функцию для выбора случайного элемента массива ?
  //// написать функцию для "перемешивания" массива                     +
  ////////////////////////////////
  // примерный алгоритм
  //
  // 1 начинается тестирование
  // 2 получаем вопросы для теста и перемешиваем их
  // 3 получаем ответы на вопросы и перемешиваем их
  // 4 записываем вопросы и ответы в store и БД с нулевыми результатами
  // 5 получаем берем данные из store и обновляем их (в БД тоже) по кнопкам вперед и назад
  ////////////////////////////////
  ////////////////////////////////
  const shuffleQuestions = shuffle(currentTestQuestions);

  const lengthTest = shuffleQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(shuffleQuestions[0]);
  const currentQuestionsAnswers = useSelector(
    getCurrentQuestionAnswers(currentQuestion.id)
  );

  console.log("lengthTest", lengthTest);
  console.log("currentQuestion", currentQuestion);

  const shuffleAnswers = shuffle(currentQuestionsAnswers);
  console.log("currentQuestionAnswers", shuffleAnswers);
  //
  // const Questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  // console.log("shuffleQuestions", shuffleQuestions);

  // const shuffleQuestions2 = shuffle(currentTestQuestions);

  // console.log("shuffleQuestions2", shuffleQuestions2);

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
          {/* {} */}

          <div className="card-body">
            <h5 className="card-title mt-5 mb-3">{currentQuestion.question}</h5>
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
              {shuffleAnswers.map((answer) => (
                <button className="btn btn-light" type="button">
                  {answer.answer}
                </button>
              ))}
              {/* <button className="btn btn-light" type="button">
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
              </button> */}
            </div>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between ">
            <div className="btn btn-success fs-4 align-items-center align-middle">
              <i className="bi bi-Questionsow-left-square-fill text-light"></i>{" "}
              <span className="align-middle">НАЗАД</span>
            </div>
            <div className="btn btn-success fs-4 align-items-center align-middle">
              <span className="align-middle">ДАЛЕЕ</span>{" "}
              <i className="bi bi-Questionsow-right-square-fill text-light"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testing;
