const DayGrid = () => {
  return (
    <div className='daygrid'>
      <div className='daygrid__header'>
        <div className='daygrid__date-wrap'>
          <div className='daygrid__date'>
            <div className='daygrid__day'>29</div>
            <div className='daygrid__weekday'>вт</div>
          </div>

          <div className='daygrid__empty-row'></div>
        </div>
      </div>

      <div className='daygrid__rows'>
        <div className='daygrid__row'>
          <div className='grid-event'>
            Выбросить мусор! <br />
            {/* <!-- Выбросить мусор! <br />
        Выбросить мусор!<br />
        Выбросить мусор! --> */}
          </div>
        </div>
        <div className='daygrid__row'>
          <div className='action-bar'>
            {/* <!-- <button className="action-bar__btn icon icon-plus-1"></button> -->
        <!-- <button className="action-bar__btn icon icon-pencil"></button> -->
        <!-- <button className="action-bar__btn icon icon-trash"></button> --> */}
          </div>
        </div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
        <div className='daygrid__row'></div>
      </div>
    </div>
  );
};

export default DayGrid;
