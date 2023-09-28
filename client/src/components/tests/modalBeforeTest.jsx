import { Modal, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { use } from "../../../../server/routes/auth.routes";
import { useNavigate } from "react-router-dom";
import { setCurrentTest } from "../../store/tests";

const ModalBeforeTest = ({ show, onClose, test }) => {
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentTest(test[0].id));
    navigate("/test");
  };
  console.log("currentTest", test);
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size=""
      >
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="fs-5 text-light">
            {/* {!edit ? "Добавляем автомобиль..." : "Редактируем автомобиль..."} */}
            Внимание!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} className="text-center">
              <Form.Label>
                {`Вы действительно хотите начать проходить тест? `}
              </Form.Label>
              <br />
              <Form.Label className="fs-4">
                {`"${test[0].testName}"`}
              </Form.Label>
              <Form.Text className="text-muted ">
                <br />
                {`Время на прохождение: ${
                  test[0].timeOfTest > 0
                    ? test[0].timeOfTest + " мин."
                    : "неограничено"
                } `}
                <br />
                {test[0].numberOfQuestionsForTest !== 0
                  ? `Количество вопросов в тесте : ${test[0].numberOfQuestionsForTest} `
                  : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <hr />
              <div className="text-center text-danger">
                Во время прохождения теста запрещено закрывать(обновлять)
                страницу. <br />
                Если вы не уложитесь во время или выполните недопустимые
                действия - результат будет засчитан как отрицательный
              </div>
            </Form.Group>
            <hr />
            {/* <Row> */}
            <Form.Group as={Col}>
              <button
                className="btn btn-primary"
                // disabled={!isValid}
                type="submit"
              >
                Приступить
              </button>
              {"  "}
              <button
                className="btn btn-secondary"
                // disabled={!isValid}
                type="button"
                onClick={onClose}
              >
                Отмена
              </button>
            </Form.Group>
            {/* </Row> */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalBeforeTest;
