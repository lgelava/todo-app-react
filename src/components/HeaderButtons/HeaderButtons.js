import React, { Component } from "react";
import Button from "@material-ui/core/Button";
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => checkall()}
              ref={this.deleteallbtn}
              className="pagebtn"
            >
              {result ? "Uncheck All" : "Check All"}
            </Button>
          </>
        ) : null}

        {result2 ? (
          <Button
            onClick={() => deleteall()}
            className="pagebtn"
            variant="contained"
            color="secondary"
          >
            delete all
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default HeaderButtons;
