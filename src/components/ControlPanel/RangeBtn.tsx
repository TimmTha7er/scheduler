import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setALLPopupsUnvisible, setRowDate } from '../../redux/actions';
import { RootState } from '../../redux/store';

const RangeBtn: React.FC = () => {
  const dispatch = useDispatch();
  const {
    datePicker: { date },
    range: { startOfRange, endOfRange },
  } = useSelector((state: RootState) => state);
  const location = useLocation();

  const onRangeBtnClick = (): void => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  return (
    <>
      {location.pathname === '/day' ? (
        <NavLink
          onClick={onRangeBtnClick}
          className='link control-panel__range-btn'
          exact
          to={{
            pathname: `/schedule/range`,
            search: `start=${startOfRange.format(
              'YYYY-MM-DD'
            )}&end=${endOfRange.format('YYYY-MM-DD')}`,
          }}
        >
          Расписание
        </NavLink>
      ) : (
        <NavLink
          onClick={onRangeBtnClick}
          className='link control-panel__range-btn'
          exact
          to={{
            pathname: `/day`,
            search: `date=${date.format('YYYY-MM-DD')}`,
          }}
        >
          День
        </NavLink>
      )}
    </>
  );
};

export default RangeBtn;
