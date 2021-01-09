import { connect } from 'react-redux';
import {
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setRowDate,
} from '../../redux/actions';

const buildDayGrid = (date) => {
  const startHour = date.clone().startOf('day').startOf('hour');
  const endHour = date.clone().endOf('day').endOf('hour');

  const hour = startHour.clone().subtract(1, 'hour');
  const dayGrid = [];

  while (hour.isBefore(endHour, 'hour')) {
    dayGrid.push(hour.add(1, 'hour').clone());
  }

  return dayGrid;
};

const DayGrid = ({
  selectedMonthDay,
  selectedWeedDay,
  date,
  rowDate,
  isCreatePopupVisible,
  isPreviewPopupVisible,
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setRowDate,
  events,
}) => {
  const dayGrid = buildDayGrid(date);

  const onRowClick = (time) => () => {
    if (!isCreatePopupVisible && !isPreviewPopupVisible) {
      setRowDate(time);
      setCreatePopupVisible(true);
    }
  };

  const onEventClick = (time) => () => {
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
        {dayGrid.map((item, idx) => {
          const selectedRow =
            item.isSame(rowDate) && isPreviewPopupVisible
              ? 'daygrid__row_selected'
              : '';
          const selectedEvent = item.isSame(rowDate)
            ? 'grid-event_selected'
            : '';

          const row = events[item] ? (
            <div key={idx} className='daygrid__row'>
              <div
                onClick={onEventClick(item)}
                className={`grid-event ${selectedEvent}`}
              >
                <span className='grid-event__inner'>{events[item].title}</span>
              </div>
            </div>
          ) : (
            <div
              onClick={onRowClick(item)}
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
}) => {
  const selectedMonthDay = date.format('D');
  const selectedWeedDay = date.format('ddd');

  return {
    selectedMonthDay,
    selectedWeedDay,
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
