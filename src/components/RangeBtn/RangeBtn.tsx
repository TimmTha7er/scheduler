import React from 'react';
import { connect } from 'react-redux';
import { toggleRangeVisible, setALLPopupsUnvisible } from '../../redux/actions';
import { RootState } from '../../redux/reducers/index';
import { GridActionsType } from '../../redux/actions/range';
import { PopupsActionTypes } from '../../redux/actions/popups';

type RangeBtnProps = {
  isRangeVisible: boolean;
  toggleRangeVisible: () => GridActionsType;
  setALLPopupsUnvisible: () => PopupsActionTypes;
};

const RangeBtn: React.FC<RangeBtnProps> = ({
  isRangeVisible,
  toggleRangeVisible,
  setALLPopupsUnvisible,
}) => {
  const rangeBtnName: string = isRangeVisible ? 'День' : 'Расписание';

  const onRangeBtnClick = (): void => {
    toggleRangeVisible();
    setALLPopupsUnvisible();
  };

  return (
    <button onClick={onRangeBtnClick} className='header__range-btn'>
      {rangeBtnName}
    </button>
  );
};

const mapStateToProps = ({ range: { isRangeVisible } }: RootState) => {
  return { isRangeVisible };
};

const mapDistatchToProps = {
  toggleRangeVisible,
  setALLPopupsUnvisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(RangeBtn);
