import React, { Component } from "react";
import Todo from "../Todos/Todos";
import HeaderButtons from "../HeaderButtons/HeaderButtons";
import PageButtons from "../PageButtons/PageButtons";
import Button from "@material-ui/core/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  ADD_NEW_ITEM,
  DELETE_ITEM,
  CHECK_OR_UNCHECK,
  CHECK_ALL,
  DELETE_CHECKED,
  EDIT,
} from "../redux/actions";

class ToDoApp extends Component {
  maininput = React.createRef();
  state = {
    mainlist: [],
    pageCount: 0,
    buttonList: [],
    currentPage: 1,
    itemsPerPage: 5,
  };
  currentstate = 0;
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.addcontenttostate();
    }
  };

  addcontenttostate = () => {
    const { ADD_NEW_ITEM } = this.props.actions;
    let content = this.maininput.current.value;
    let regex = /[A-Za-z0-9]+/g;
    let result = content.match(regex);
    if (result) {
      this.maininput.current.value = "";
      ADD_NEW_ITEM(content);
      this.forceUpdate();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.mainlist !== this.props.mainlist) {
      this.constrollpagecountwhendeleteall();
    }
  }

  deleteTodo = (id) => {
    const { DELETE_ITEM } = this.props.actions;
    DELETE_ITEM(id);
    this.constrollpagecountwhendelete();
  };

  editTodo = (itemInfo, editinputvalue, changeeditinputstatus) => {
    let regex = /[A-Za-z0-9]+/g;
    let result = editinputvalue.match(regex);
    if (result) {
      const { EDIT } = this.props.actions;
      EDIT(editinputvalue, itemInfo);
      changeeditinputstatus();
    }
  };

  checkedodnot = (itemInfo) => {
    const { CHECK_OR_UNCHECK } = this.props.actions;
    CHECK_OR_UNCHECK(itemInfo);
  };

  deleteall = () => {
    this.props.actions.DELETE_CHECKED();
    this.constrollpagecountwhendeleteall();
  };

  checkall = () => {
    this.props.actions.CHECK_ALL();
  };

  changepagecount = (button) => {
    this.setState({ currentPage: button });
  };

  constrollpagecount = () => {
    if (
      (this.props.mainlist.length + 1) % 5 === 1 &&
      this.props.mainlist.length > 3
    ) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  constrollpagecountwhendelete = () => {
    const { currentPage } = this.state;

    if ((this.props.mainlist.length - 1) % 5 === 0 && currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  constrollpagecountwhendeleteall = (additionalinfo) => {
    console.log("updated", this.props.mainlist.length);

    this.setState({
      ...this.state,
      currentPage: Math.ceil(this.props.mainlist.length / 5),
    });
  };

  render() {
    const { currentPage, itemsPerPage } = this.state;

    const endIndex = currentPage * itemsPerPage;
    const startindex = endIndex - itemsPerPage;

    const slicedTodos = [...this.props.mainlist].slice(startindex, endIndex);
    return (
      <div>
        <div id="maininputfield">
          <input
            ref={this.maininput}
            onKeyPress={this.handleKeyPress}
            className="maininput"
          />
          <div className="mainaddbtn">
            <Button onClick={() => this.addcontenttostate()}>add</Button>
          </div>
        </div>
        <HeaderButtons
          mainlist={this.props.mainlist}
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
              mainlist={this.props.mainlist}
            />
          </>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mainlist: state.mainlist,
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        ADD_NEW_ITEM,
        DELETE_ITEM,
        CHECK_OR_UNCHECK,
        CHECK_ALL,
        DELETE_CHECKED,
        EDIT,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoApp);
