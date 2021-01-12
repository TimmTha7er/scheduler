import React from "react";
import { connect } from 'react-redux';
import {
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setRowDate,
} from '../../redux/actions';
import { buildDayGrid } from './buildDayGrid';

import { RootState } from '../../redux/reducers/index';
import { PopupsActionTypes } from '../../redux/actions/popups';
import { GridActionsType } from '../../redux/actions/grid';


type DayGridProps = {
  date: moment.Moment;
  rowDate: moment.Moment;
  isCreatePopupVisible: boolean;
  isPreviewPopupVisible: boolean;
  setCreatePopupVisible: (value: boolean) => PopupsActionTypes;
  setPreviewPopupVisible: (value: boolean) => PopupsActionTypes;
  setRowDate: (date: moment.Moment | null) => GridActionsType;
  events: {
    [name: string]: {
      title: string;
      descr: string;
    };
  };
};

const DayGrid: React.FC<DayGridProps> = ({
  date,
  rowDate,
  isCreatePopupVisible,
  isPreviewPopupVisible,
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setRowDate,
  events,
}) => {
  const dayGrid: moment.Moment[] = buildDayGrid(date);
  const selectedMonthDay: string = date.format('D');
  const selectedWeedDay: string = date.format('ddd');

  const onRowClick = (time: moment.Moment) => (): void => {
    if (!isCreatePopupVisible && !isPreviewPopupVisible) {
      setRowDate(time);
      setCreatePopupVisible(true);
    }
  };

  const onEventClick = (time: moment.Moment) => (): void => {
    if (!isCreatePopupVisible) {
      setRowDate(time);
      setPreviewPopupVisible(true);
    }
  };

  return (
    <div className='daygrid'>
      <div className='daygrid__header'>
        <div className='daygrid__date-wrap'>
          <div className='daygrid__date'>
            <div className='daygrid__month-day'>{selectedMonthDay}</div>
            <div className='daygrid__week-day'>{selectedWeedDay}</div>
          </div>

          <div className='daygrid__empty-row'></div>
        </div>
      </div>

      <div className='daygrid__rows'>
        {dayGrid.map((time: moment.Moment, idx: number) => {
          const selectedRow: string = time.isSame(rowDate)
            ? 'daygrid__row_selected'
            : '';
          const selectedEvent: string = time.isSame(rowDate)
            ? 'grid-event_selected'
            : '';

          const row = events[time.toString()] ? (
            <div key={idx} className='daygrid__row'>
              <div
                onClick={onEventClick(time)}
                className={`grid-event ${selectedEvent}`}
              >
                <span className='grid-event__inner'>
                  {events[time.toString()].title}
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={onRowClick(time)}
              key={idx}
              className={`daygrid__row ${selectedRow}`}
            ></div>
          );

          return row;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  datePicker: { date },
  popups: { isCreatePopupVisible, isPreviewPopupVisible },
  grid: { rowDate, events },
}: RootState) => {
  return {
    date,
    rowDate,
    isCreatePopupVisible,
    isPreviewPopupVisible,
    events,
  };
};

const mapDistatchToProps = {
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setRowDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(DayGrid);
