import { v4 as uuidv4 } from "uuid";

const initialState = {
  mainlist: [],
  pageCount: 0,
  currentPage: 1,
  itemsPerPage: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_ITEM":
      return {
        ...state,
        mainlist: [
          ...state.mainlist,
          { content: action.content, id: uuidv4(), checked: false },
        ],
      };
    case "DELETE_ITEM":
      return {
        mainlist: state.mainlist.filter((a) => {
          return a.id !== action.id;
        }),
      };
    case "CHECK_OR_UNCHECK":
      return {
        mainlist: state.mainlist.map((item) => {
          if (action.itemInfo === item.id) {
            return { ...item, checked: !item.checked };
          } else {
            return item;
          }
        }),
      };

    case "CHECK_ALL":
      let result = state.mainlist.every((item) => item.checked);
      return {
        ...state,
        mainlist: state.mainlist.map((item) => {
          if (result) {
            return { ...item, checked: false };
          } else {
            return { ...item, checked: true };
          }
        }),
      };

    case "DELETE_CHECKED":
      return {
        ...state,
        mainlist: state.mainlist.filter((item) => !item.checked),
      };
    case "EDIT":
      return {
        mainlist: state.mainlist.map((item) => {
          if (item.id === action.itemInfo.id) {
            return { ...item, content: action.editinputvalue };
          } else {
            return item;
          }
        }),
      };

    default:
      return state;
  }
};

export default reducer;
