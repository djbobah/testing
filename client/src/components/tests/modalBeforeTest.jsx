import { Modal, Form, Col } from "react-bootstrap";

const ModalBeforeTest = ({ show }) => {
  // const [show, setShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Modal
        show={show}
        // onHide={onClose}
        backdrop="static"
        keyboard={false}
        size=""
      >
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="fs-5 text-dark">
            {/* {!edit ? "Добавляем автомобиль..." : "Редактируем автомобиль..."} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col}>
              <Form.Label className="text-muted">
                Выберите тип автомобиля
              </Form.Label>
              {/* <CreatableSelectModal
                name="typeAuto"
                options={optionsTypeAuto}
                onChange={onChange}
                // error={errors.typeOfWork}
                // defaultValue={optionsTypeAuto[1]}
                // onCreateOption={onCreateTypeOption}
                // value={data.typeAuto}
              /> */}
            </Form.Group>

            <hr />
            {/* <Row> */}
            <Form.Group as={Col}>
              <button
                className="btn btn-primary"
                // disabled={!isValid}
                type="submit"
              >
                Сохранить
              </button>{" "}
              <button
                className="btn btn-secondary"
                // disabled={!isValid}
                type="button"
                // onClick={onClose}
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
