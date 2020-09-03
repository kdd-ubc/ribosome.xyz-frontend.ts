import {  UIActions } from "./UIActions";
export interface Toolbar {
  activeToolGroupId: number;
}
export const toggleToolgroupById = (id: number): UIActions => ({
  type: "TOGGLE_TOOLGROUP_BY_ID",
  id: id,
});

const toolbarReducerDefaultState: Toolbar = {
  activeToolGroupId: -1,
};

export const toolbarReducer = (
  state : Toolbar = toolbarReducerDefaultState,
  action: UIActions
  )     : Toolbar => {
  switch (action.type) {
    case "TOGGLE_TOOLGROUP_BY_ID":
      return action.id === state.activeToolGroupId
        ? { ...state, activeToolGroupId: -1 }
        : { ...state, activeToolGroupId: action.id };
    default:
      return state;
  }
};
