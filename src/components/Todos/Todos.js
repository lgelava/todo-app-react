import React, { Component, createRef } from "react";
import Button from "@material-ui/core/Button";
import Todos from "./Todos.css";
class Todo extends Component {
  state = { status: false };

  inputRef = createRef();

  changeeditinputstatus = () => {
    this.setState({ status: !this.state.status });
  };

  render() {
    const { itemInfo, deleteHandler, editTodo, checkedodnot } = this.props;

    return (
      <>
        {this.state.status ? (
          <div className="editdiv">
            <input
              ref={this.inputRef}
              defaultValue={`${itemInfo.content}`}
              className="editinput"
            />

            <div className="applyandbackbtns">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.changeeditinputstatus()}
                className="editbtn"
              >
                back
              </Button>

              <Button
                variant="contained"
                color="primary"
                className="editbtn"
                onClick={() =>
                  editTodo(
                    itemInfo,
                    this.inputRef.current.value,
                    this.changeeditinputstatus
                  )
                }
              >
                apply
              </Button>
            </div>
          </div>
        ) : (
          <>
            <input
              type="checkBox"
              className="singlecheckbox"
              checked={itemInfo.checked}
              onChange={() => checkedodnot(itemInfo.id)}
            />
            <h1>{itemInfo.content}</h1>
            <Button
              onClick={() => deleteHandler(itemInfo.id)}
              className="maindivbtn"
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => this.changeeditinputstatus()}
              className="maindivbtn"
            >
              Edit
            </Button>
          </>
        )}
      </>
    );
  }
}
export default Todo;
