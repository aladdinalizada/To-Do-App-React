import React, { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { uid } from "uid";
import { EditText } from "react-edit-text";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [editId, setEditId] = useState(0);
  //Add todo
  const handleAddTodo = () => {
    if (inputValue) {
      setTodos([...todos, { todoId: uid(6), todoText: inputValue }]);
      setInputValue("");
    } else {
      setErrorStatus(true);
    }
  };
  //Delete todo
  const handleDelete = (e) => {
    const newTodos = todos.filter((i) => i.todoId !== e.target.id);
    setTodos(newTodos);
  };
  //Edit todo
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.todoId === id);
    setInputValue(editTodo.inputValue);
    setEditId(id);
  };
  return (
    <div>
      <Container className="mt-4 text-primary">
        <h1>TODO APP</h1>
        <Row className="my-4">
          <Col xs={2}></Col>
          <Col xs={7}>
            <Form.Control
              onChange={(e) => {
                setInputValue(e.target.value);
                setErrorStatus(false);
              }}
              //   Press Enter to add todo
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              value={inputValue}
              placeholder="add todos here.."
              aria-label="Username"
              aria-describedby="basic-addon1"
              className={errorStatus && "border border-danger"}
            />

            {errorStatus && (
              <p className="error-message text-danger">
                Input can not be empty!!
              </p>
            )}
          </Col>
          <Col xs={1}>
            <Button variant="primary" onClick={() => handleAddTodo()}>
              Add
            </Button>
          </Col>
          <Col xs={2}></Col>
        </Row>

        {todos.map((element) => {
          return (
            <ListGroup key={element.todoId} className="mb-3">
              <Row className="d-flex justify-content-center">
                <Col xs={8}>
                  <ListGroup.Item
                    className="d-flex justify-content-between
                   align-items-center"
                  >
                    <p className="m-0">
                      <EditText defaultValue={element.todoText} />
                    </p>
                    <div className="d-flex">
                      <Button
                        id={element.todoId}
                        variant="success"
                        onClick={(e) => handleEdit(e)}
                        editId={editId}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                      >
                        Edit
                      </Button>
                      <Button
                        id={element.todoId}
                        variant="danger"
                        onClick={(e) => handleDelete(e)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                </Col>
              </Row>
            </ListGroup>
          );
        })}
      </Container>
    </div>
  );
};

export default TodoApp;
