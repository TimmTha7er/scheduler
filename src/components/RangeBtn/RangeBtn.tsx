import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRangeVisible, setALLPopupsUnvisible } from '../../redux/actions';
import { RootState } from '../../redux/store';

const RangeBtn: React.FC = () => {
  const dispatch = useDispatch();
  const { isRangeVisible } = useSelector((state: RootState) => state.range);
  const rangeBtnName: string = isRangeVisible ? 'День' : 'Расписание';

  const onRangeBtnClick = (): void => {
    dispatch(toggleRangeVisible());
    dispatch(setALLPopupsUnvisible());
  };

  return (
    <button onClick={onRangeBtnClick} className='header__range-btn'>
      {rangeBtnName}
    </button>
  );
};

export default RangeBtn;
