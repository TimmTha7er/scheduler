import { connect } from 'react-redux';
import { toggleRangeVisible } from '../../redux/actions';

const RangeBtn = ({ isRangeVisible, toggleRangeVisible }) => {
  const onRangeBtnClick = () => {
    toggleRangeVisible();
  };

  const rangeBtnName = isRangeVisible ? 'День' : 'Расписание';

  return (
    <button onClick={onRangeBtnClick} className='header__range-btn'>
      {rangeBtnName}
    </button>
  );
};

const mapStateToProps = ({ range: { isRangeVisible } }) => {
  return { isRangeVisible };
};

const mapDistatchToProps = {
  toggleRangeVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(RangeBtn);
