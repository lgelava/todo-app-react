import React, { Component } from "react";
import "./HeaderButtons.css";
class HeaderButtons extends Component {
  render() {
    const { mainlist, deleteall, checkall } = this.props;

    let result = mainlist.every((item) => item.checked);
    let result2 = mainlist.some((item) => item.checked);

    return (
      <div className="HeaderButtons">
        {mainlist.length > 0 ? (
          <>
            <button
              onClick={() => checkall()}
              ref={this.deleteallbtn}
              className="pagebtn"
            >
              {result ? "Uncheck All" : "Check All"}
            </button>
          </>
        ) : null}

        {result2 ? (
          <button onClick={() => deleteall()} className="pagebtn">
            delete all
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default HeaderButtons;
