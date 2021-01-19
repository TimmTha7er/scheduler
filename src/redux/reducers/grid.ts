import {
  DELETE_EVENT,
  CREATE_EVENT,
  SET_ROW_DATE,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_LOADED,
  FETCH_EVENTS_ERROR,
} from '../action-types';
import { GridActionsType } from '../actions/grid';
import { IEventList } from '../actions/grid';

export interface IGridState {
  rowDate: moment.Moment | null;
  events: IEventList | any;
  loading: boolean;
  error: null | {};
}

const initialState: IGridState = {
  rowDate: null,
  events: {
    // 'Sat Jan 09 2021 00:00:00 GMT+0300': {
    //   title: 'Покормить кота',
    //   descr:
    //     '1 ) взять корм\n2 ) наложить в мисочку\n3 ) позвать кота\n4 ) пожелать приятного аппетита\n5 ) погладить\n6 ) если мало - подложить еще',
    // },
  },
  loading: true,
  error: null,
};

const gridReducer = (
  state = initialState,
  action: GridActionsType
): IGridState => {
  if (action.type === FETCH_EVENTS_REQUESTED) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === FETCH_EVENTS_LOADED) {
    return {
      ...state,
      events: action.payload,
      loading: false,
      error: null,
    };
  }

  if (action.type === FETCH_EVENTS_ERROR) {
    return {
      ...state,
      events: {},
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === SET_ROW_DATE) {
    return {
      ...state,
      rowDate: action.payload,
    };
  }

  if (action.type === CREATE_EVENT) {
    // const time: string = state.rowDate!.toString();
    // const { title, descr, id } = action.payload;

    // const newEvent: IEventList = {
    //   [time]: {
    //     title: title,
    //     descr: descr,
    //     id: id
    //   },
    // };

    return {
      ...state,
      events: { ...state.events, ...action.payload },
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

export { gridReducer };
