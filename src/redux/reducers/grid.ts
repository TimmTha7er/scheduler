import { DELETE_EVENT, CREATE_EVENT, SET_ROW_DATE } from '../action-types';
import { GridActionsType } from '../actions/grid';
import { IEventList } from '../actions/grid';

export interface IGridState {
  rowDate: moment.Moment | null;
  events: IEventList;
}

const initialState: IGridState = {
  rowDate: null,
  events: {
    'Sat Jan 09 2021 00:00:00 GMT+0300': {
      title: 'Покормить кота',
      descr:
        '1 ) взять корм\n2 ) наложить в мисочку\n3 ) позвать кота\n4 ) пожелать приятного аппетита\n5 ) погладить\n6 ) если мало - подложить еще',
    },
  },
};

const datePickerReducer = (
  state = initialState,
  action: GridActionsType
): IGridState => {
  if (action.type === SET_ROW_DATE) {
    return {
      ...state,
      rowDate: action.payload,
    };
  }

  if (action.type === CREATE_EVENT) {
    const time: string = state.rowDate!.toString();
    const { title, descr }: any = action.payload;

    const newEvent: IEventList = {
      [time]: {
        title: title,
        descr: descr,
      },
    };

    return {
      ...state,
      events: { ...state.events, ...newEvent },
    };
  }

  if (action.type === DELETE_EVENT) {
    const newEvents: IEventList = { ...state.events };
    const time: string = action.payload!.toString();
    delete newEvents[time];

    return {
      ...state,
      events: { ...newEvents },
      rowDate: null,
    };
  }

  return state;
};

export default datePickerReducer;
