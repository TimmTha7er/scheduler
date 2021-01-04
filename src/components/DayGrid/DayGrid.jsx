import { connect } from 'react-redux';

const DayGrid = ({ selectedMonthDay, selectedWeedDay }) => {
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
        {Array(24)
          .fill()
          .map((item, idx) => {
            return <div key={idx} className='daygrid__row'></div>;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ datePicker: { date } }) => {
  const selectedMonthDay = date.format('D');
  const selectedWeedDay = date.format('ddd');

  return { selectedMonthDay, selectedWeedDay };
};

const mapDistatchToProps = {};

export default connect(mapStateToProps, mapDistatchToProps)(DayGrid);
