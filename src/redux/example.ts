// types
export const BOOL = 'BOOL';
export const STRING = 'STRING';

// Actions interface
interface IBoolAction {
  type: typeof BOOL;
  payload: boolean;
}

interface IStringAction {
  type: typeof STRING;
  payload: string;
}

export type ListsAction = IBoolAction | IStringAction;

export interface ListState {
  date: string;
  isVisible: boolean;
}

// actions
export const BoolAction = (value: boolean): ListsAction => {
  return {
    type: BOOL,
    payload: value,
  };
};
export const StringAction = (value: string): ListsAction => {
  return {
    type: STRING,
    payload: value,
  };
};

const initialState: ListState = {
  date: '',
  isVisible: false,
};

export const datePickerReducer = (
  state = initialState,
  action: ListsAction
): ListState => {
  if (action.type === BOOL) {
    return {
      ...state,
      isVisible: action.payload,
    };
  }

  if (action.type === STRING) {
    return {
      ...state,
      date: action.payload,
    };
  }

  return state;
};
