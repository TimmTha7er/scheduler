const TimeRuler = () => {
  const items = [];
  const start = 0;
  const end = 24;

  for (let idx = start; idx < end; idx++) {
    if (idx < 10) {
      items.push(`0${idx}:00`);
    } else {
      items.push(`${idx}:00`);
    }
  }

  // console.log(items);

  return (
    <div className='time-ruler'>
      <div className='time-ruler__header'>
        <div className='time-ruler__empty-row time-ruler__empty-row_high'></div>
        <div className='time-ruler__empty-row'></div>
      </div>
      <div className='time-ruler__cells'>
        {items.map((item, idx) => {
          return (
            <div key={idx} className='time-ruler__cell'>
              <div className='time-ruler__time'>{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeRuler;
