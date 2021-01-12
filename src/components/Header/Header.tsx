import React, { useRef, useEffect } from 'react';
import GridNav from '../GridNav/GridNav';
import DatePicker from '../DatePicker/DatePicker';
import RangeBtn from '../RangeBtn/RangeBtn';
import { connect } from 'react-redux';
import {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
} from '../../redux/actions';
import { RootState } from '../../redux/reducers/index';
import { PopupsActionTypes } from '../../redux/actions/popups';
import { DatePickerActionTypes } from '../../redux/actions/datePicker';

type HeaderProps = {
  isVisible: boolean;
  setDate: (date: moment.Moment) => DatePickerActionTypes;
  setVisible: (value: boolean) => DatePickerActionTypes;
  date: moment.Moment;
  setALLPopupsUnvisible: () => PopupsActionTypes;
};

const Header: React.FC<HeaderProps> = ({
  isVisible,
  setVisible,
  setDate,
  date,
  setALLPopupsUnvisible,
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const selectedMonth: string = date.format('MMMM');
  const selectedYear: string = date.format('YYYY');

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any): void => {
    if (e.path && !e.path.includes(datePickerRef.current)) {
      setVisible(false);
    }
    // !!!!
    // https://youtu.be/GtaKTDNQ6vo?t=938
    // https://www.youtube.com/watch?v=_Jh60EKcvPA
    // !!!!
    // if (!datePickerRef.current?.contains(e.target)) {
    //   setVisible(false);
    // }
  };

  const onSelectedDateClick = (): void => {
    setVisible(!isVisible);
    setALLPopupsUnvisible();
  };

  return (
    <header className='header'>
      <div ref={datePickerRef} className='header__date-wrap'>
        <div onClick={onSelectedDateClick} className='header__selected-date'>
          <div className='header__selected-month'>{selectedMonth}</div>
          <div className='header__selected-year'>{selectedYear}</div>
        </div>
        {isVisible && (
          <DatePicker
            date={date}
            setDate={setDate}
            owner={'header'}
            setVisible={setVisible}
          ></DatePicker>
        )}
      </div>
      <div className='header__btns-wrap'>
        <GridNav setDate={setDate}></GridNav>
        <RangeBtn></RangeBtn>
      </div>
    </header>
  );
};

const mapStateToProps = ({ datePicker: { date, isVisible } }: RootState) => {
  return { isVisible, date };
};

const mapDistatchToProps = {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(Header);
