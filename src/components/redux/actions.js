export const ADD_NEW_ITEM = (content, uuidv4) => ({
  type: "ADD_NEW_ITEM",
  content,
});

export const DELETE_ITEM = (id) => ({
  type: "DELETE_ITEM",
  id,
});

export const CHECK_OR_UNCHECK = (itemInfo) => ({
  type: "CHECK_OR_UNCHECK",
  itemInfo,
});

export const CHECK_ALL = () => ({
  type: "CHECK_ALL",
});

export const DELETE_CHECKED = () => ({
  type: "DELETE_CHECKED",
});

export const EDIT = (editinputvalue, itemInfo) => ({
  type: "EDIT",
  editinputvalue,
  itemInfo,
});
