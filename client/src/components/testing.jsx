import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentQuestionAnswers,
  getCurrentTest,
  getCurrentTestQuestions,
} from "../store/tests";
import { getCurrentUser } from "../store/users";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/math";
import { clearData, loadData } from "../store/userAnswers";

const Testing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearData());
  }, []);
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

  // useEffect(()=>{},[])

  const currentUser = useSelector(getCurrentUser());

  // 1 начинается тестирование
  const currentTest = useSelector(getCurrentTest());
  // 2 получаем вопросы для теста и перемешиваем их
  const currentTestQuestions = useSelector(getCurrentTestQuestions());
  const shuffleQuestions = shuffle(currentTestQuestions);

  // получаем количество вопросов теста
  const lengthTest = shuffleQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(shuffleQuestions[0]); // нужно ли?

  // 3 получаем ответы на вопросы и перемешиваем их
  // let answers = shuffleQuestions.map((question) => {
  //   shuffle(useSelector(getCurrentQuestionAnswers(question.id)));
  // });
  // const currentQuestionsAnswers = useSelector(
  //   getCurrentQuestionAnswers(currentQuestion.id)
  // );
  // const shuffleAnswers = shuffle(currentQuestionsAnswers);
  // const strJSON = JSON.stringify(shuffleQuestions);
  useEffect(() => {
    dispatch(loadData(currentUser.id, currentTest.id, shuffleQuestions));
  }, []);

  // console.log("current user", currentUser);
  // console.log("JSON", strJSON);
  // console.log("from JSON", JSON.parse(strJSON));
  // console.log("shuffleQuestions", shuffleQuestions);

  // console.log("lengthTest", lengthTest);
  // console.log("currentQuestion", currentQuestion);
  // console.log("currentQuestionAnswers", shuffleAnswers);

  // константа для отображения прогресс бара (для примера)
  const progress = 80;
  return (
    <>
      <br />
      <div className="container mt-5">
        <div className="card ">
          <h3 className="card-header text-center">{currentTest.testName}</h3>
          <div className="progress m-1">
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
            <div className="border rounded mb-1">
              <h4 className="card-title mt-3 mb-3">
                {currentQuestion.question}
              </h4>
            </div>
            <p className="text-center bg-info mb-5 rounded fs-5">
              можно выбрать один или несколько вариантов
            </p>
            {/* <p className="card-text">
              Тест вопроса Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Maiores saepe tenetur voluptate repudiandae quidem minima.
              Officiis, libero tempora! Iure corrupti modi quam nihil labore
              saepe accusamus, iusto non. Soluta, ea.
            </p> */}
            <div className="d-grid gap-2">
              {/* {shuffleAnswers.map((answer) => (
                <button
                  className="btn btn-light fs-4"
                  type="button"
                  key={answer.id + answer.answer}
                >
                  {answer.answer}
                </button>
              ))} */}
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
