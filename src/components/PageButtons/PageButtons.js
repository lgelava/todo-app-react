import React, { Component } from "react";
import "./PageButtons.css";

class PageButtons extends Component {
  pagebtncount = () => {};

  render() {
    let prosta = [];
    const { pageCount, buttonList, changepagecount, mainlist } = this.props;

    for (let i = 1; i <= Math.ceil(mainlist.length / 5); i++) {
      prosta.push(i);
    }

    return (
      <>
        <div className="pagebuttons">
          {prosta.map((el) => (
            <button onClick={() => changepagecount(el)} key={el}>
              {el}
            </button>
          ))}
        </div>
      </>
    );
  }
}
//buttonList.length > 0 &&
export default PageButtons;
