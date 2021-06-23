import "./App.css";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import Todo from "/home/user/Desktop/react/react1/src/components/Todos/Todos.js";
import HeaderButtons from "/home/user/Desktop/react/react1/src/components/HeaderButtons/HeaderButtons.js";
import PageButtons from "/home/user/Desktop/react/react1/src/components/PageButtons/PageButtons.js";
import { createStore } from "redux";

class App extends Component {
  ///redux

  ////redux

  maininput = React.createRef();
  state = {
    mainlist: [],
    pageCount: 0,
    buttonList: [],
    currentPage: 1,
    itemsPerPage: 5,
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.addcontenttostate();
    }
  };

  addcontenttostate = () => {
    let content = this.maininput.current.value;
    let regex = /[A-Za-z0-9]+/g;
    let result = content.match(regex);
    if (result) {
      this.setState({
        mainlist: [
          ...this.state.mainlist,
          { content, id: uuidv4(), checked: false },
        ],
      });
      this.maininput.current.value = "";
      this.createButton();
      this.constrollpagecount();
    }
  };

  deleteTodo = (id) => {
    this.setState(
      {
        mainlist: this.state.mainlist.filter((a) => {
          return a.id !== id;
        }),
      },
      () => this.constrollpagecountwhendelete()
    );
  };

  editTodo = (itemInfo, editinputvalue, changeeditinputstatus) => {
    const { mainlist } = this.state;

    this.setState({
      mainlist: mainlist.map((item) => {
        if (item.id === itemInfo.id) {
          return { ...item, content: editinputvalue };
        } else {
          return item;
        }
      }),
    });
    changeeditinputstatus();
  };

  checkedodnot = (itemInfo) => {
    this.setState({
      mainlist: this.state.mainlist.map((item) => {
        if (itemInfo === item.id) {
          return { ...item, checked: !item.checked };
        } else {
          return item;
        }
      }),
    });
  };

  deleteall = () => {
    const { mainlist } = this.state;
    this.setState(
      {
        mainlist: mainlist.filter((item) => !item.checked),
      },
      () => {
        this.constrollpagecountwhendeleteall();
      }
    );
  };

  checkall = () => {
    const { mainlist } = this.state;
    let result = mainlist.every((item) => item.checked);

    this.setState({
      mainlist: mainlist.map((item) => {
        if (!result) {
          return { ...item, checked: true };
        } else {
          return { ...item, checked: false };
        }
      }),
    });
  };

  createButton = () => {
    const { mainlist, pageCount, buttonList } = this.state;

    if (mainlist.length % 5 === 0) {
      this.setState({
        pageCount: pageCount + 1,
        buttonList: [...buttonList, pageCount + 1],
      });
    }
  };

  changepagecount = (button) => {
    this.setState({ currentPage: button });
  };

  constrollpagecount = () => {
    const { mainlist, pageCount, buttonList } = this.state;

    if ((mainlist.length + 1) % 5 === 1 && mainlist.length > 3) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  constrollpagecountwhendelete = () => {
    const { mainlist, pageCount, buttonList, currentPage } = this.state;

    if (mainlist.length % 5 === 0 && currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  constrollpagecountwhendeleteall = () => {
    const { mainlist, pageCount, buttonList, currentPage } = this.state;

    if ((mainlist.length - mainlist.length) % 5 === 0 && currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  render() {
    // document.addEventListener("keydown", (e) => {
    //   if (e.key === "Enter") {
    //     // this.addcontenttostate();
    //     console.log("luka");
    //   }
    // });

    const { currentPage, mainlist, itemsPerPage } = this.state;
    const endIndex = currentPage * itemsPerPage;
    const startindex = endIndex - itemsPerPage;
    const slicedTodos = [...mainlist].slice(startindex, endIndex);

    return (
      <>
        <div id="maininputfield">
          <input ref={this.maininput} onKeyPress={this.handleKeyPress} />
          <Button onClick={() => this.addcontenttostate()}>add</Button>
        </div>
        <HeaderButtons
          mainlist={this.state.mainlist}
          deleteall={this.deleteall}
          checkall={this.checkall}
        />
        <div className="main">
          <>
            {slicedTodos.map((item, index) => {
              return (
                <div key={index} className="listdiv">
                  <Todo
                    itemInfo={item}
                    deleteHandler={this.deleteTodo}
                    editTodo={this.editTodo}
                    checkedodnot={this.checkedodnot}
                  />
                </div>
              );
            })}
            <PageButtons
              pageCount={this.state.pageCount}
              buttonList={this.state.buttonList}
              changepagecount={this.changepagecount}
              mainlist={this.state.mainlist}
            />
          </>
        </div>
      </>
    );
  }
}

export default App;
