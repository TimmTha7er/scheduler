import { connect } from 'react-redux';
import CreatePopup from '../CreatePopup/CreatePopup.jsx';
import PreviewPopup from '../PreviewPopup/PreviewPopup.jsx';
import DeletePopup from '../DeletePopup/DeletePopup.jsx';
import {
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setDate,
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
  isCreatePopupVisible,
  isPreviewPopupVisible,
  isDeletePopupVisible,
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setDate,
  events,
}) => {
  const dayGrid = buildDayGrid(date);

  const onRowClick = (time) => () => {
    // console.log('time', time);
    setDate(time);
    setCreatePopupVisible(true);
  };

  const onEventClick = (time) => () => {
    setDate(time);
    setPreviewPopupVisible(true);
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

      {isCreatePopupVisible && <CreatePopup></CreatePopup>}
      {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
      {isDeletePopupVisible && <DeletePopup></DeletePopup>}

      <div className='daygrid__rows'>
        {dayGrid.map((item, idx) => {
          const row = events[item] ? (
            <div key={idx} className='daygrid__row'>
              <div onClick={onEventClick(item)} className='grid-event'>
                {events[item].title}
              </div>
            </div>
          ) : (
            <div
              onClick={onRowClick(item)}
              key={idx}
              className='daygrid__row'
            ></div>
          );

          return row;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  datePicker: {
    date,
    isCreatePopupVisible,
    isPreviewPopupVisible,
    isDeletePopupVisible,
    events,
  },
}) => {
  const selectedMonthDay = date.format('D');
  const selectedWeedDay = date.format('ddd');

  return {
    selectedMonthDay,
    selectedWeedDay,
    date,
    isCreatePopupVisible,
    isPreviewPopupVisible,
    isDeletePopupVisible,
    events,
  };
};

const mapDistatchToProps = {
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(DayGrid);
