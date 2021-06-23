import React, { Component, createRef } from "react";
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
          <div>
            <input ref={this.inputRef} defaultValue={`${itemInfo.content}`} />
            <button
              onClick={() =>
                editTodo(
                  itemInfo,
                  this.inputRef.current.value,
                  this.changeeditinputstatus
                )
              }
            >
              apply
            </button>

            <button onClick={() => this.changeeditinputstatus()}>back</button>
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
            <button onClick={() => deleteHandler(itemInfo.id)}>Delete</button>

            <button onClick={() => this.changeeditinputstatus()}>Edit</button>
          </>
        )}
      </>
    );
  }
}
export default Todo;
