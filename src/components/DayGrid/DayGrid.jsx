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

export default DayGrid;
