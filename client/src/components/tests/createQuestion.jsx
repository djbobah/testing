import React, { useEffect, useState } from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import SelectField from "../common/form/selectField";
import { useAnswers } from "../hooks/useAnswers";
import { useQuestions } from "../hooks/useQuestions";
import QuestionsService from "../../services/questions.service";
import { useSelector } from "react-redux";
import { getTypeOfAnswers } from "../../store/typeOfAnswers";

const CreateQuestion = () => {
  // const answers = ;
  // const [answers, setAnswers] = useState([]);

  const { questions, getQuestionsData } = useQuestions();
  const { answers, create } = useAnswers();
  // console.log("currentTest", currentTest);
  // getQuestionsData(currentTest.id);

  // const qTest = QuestionsService.getQuestionsForTest(currentTest.id);
  // const qTest2 = getQuestionsData(currentTest.id);

  console.log("questions", questions);
  // console.log("qData", qTest);
  // console.log("qData2", qTest2);

  const [data, setData] = useState({
    questionDescription: "текст вопроса",
    typeOfAnswers: 2,
    answersData: [],
  });
  const typeOfAnswers = useSelector(getTypeOfAnswers());
  const typeOfAnswersOptions = typeOfAnswers?.map((type) => {
    // console.log("1", type.description === "1");
    // if (type.description === "1") {
    // console.log("1");
    return {
      name: type.name,
      value: type.id,
    };
    // }
  });

  // console.log("typeOfAnswers", typeOfAnswers);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    console.log("target", target);
  };
  const handleClickAddAnswer = (e) => {
    e.preventDefault();
    // create()
    // const addAnswer = { id: 3, answer: "lorem30", isTrue: false };

    // setAnswers([...answers, { answer: "", isTrue: false }]);
    // answers.push();
    console.log(answers);
  };
  const handleClickSaveQuestion = (e) => {
    e.preventDefault();
  };

  const renderAnswers = (answers) => {
    console.log("ans", answers);
    return answers?.map((answer) => (
      <div className="d-flex fs-4 " key={answer.id}>
        <CheckBoxField
          value={answer.isTrue}
          //{data.isRandomQuestions}
          // onChange={handleChange}
          name="isRandomQuestions"
          // error={errors.isRandomQuestions}
        />

        <div className="w-100">
          <TextField
            // label="Ответ:"
            name="answer"
            value={answer.answer}
            // {data.testName}
            //onChange={handleChange}
            // error={errors.testName}
            //   autoFocus
          />
        </div>
      </div>
    ));
  };

  useEffect(() => {
    console.log("useEff", answers);
    renderAnswers(answers);
  }, [answers]);
  return (
    <div className="container " style={{ marginTop: "1px" }}>
      <div className="card-body ">
        <form>
          <TextAreaField
            // label="Описание:"
            name="questionDescription"
            value={data.questionDescription}
            //{data.description}
            onChange={handleChange}
            // error={errors.description}
          />
          <SelectField
            onChange={handleChange}
            options={typeOfAnswersOptions}
            name="typeOfAnswers"
            defaultOption="Выберите тип ответов..."
            // error={errors.department}
            value={data.typeOfAnswers}
            label="Выберите тип ответов..."
          />
          <label className="text-muted mb-2">Ответы:</label>
          {renderAnswers(answers)}
          <div className="text-end">
            <button
              className="btn btn-success me-2"
              onClick={handleClickAddAnswer}
            >
              Добавить ответ
            </button>
            <button
              type="submit"
              onClick={handleClickSaveQuestion}
              className="btn btn-primary me-2"
            >
              Сохранить вопрос
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
