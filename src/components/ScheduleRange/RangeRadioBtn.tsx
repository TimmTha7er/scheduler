import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useInput } from '../supports/hooks';
import {
  setRadioBtnValue,
  setALLPopupsUnvisible,
  setRowDate,
} from '../../redux/actions';

const RangeRadioBtn: React.FC = () => {
  const dispatch = useDispatch();
  const { radioBtnValue } = useSelector((state: RootState) => state.range);
  const input = useInput(radioBtnValue);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    input.onChange(event);
    dispatch(setRadioBtnValue(event.currentTarget.value));
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  return (
    <form className='radio-group'>
      <input
        className='radio-group__input visually-hidden'
        type='radio'
        value='schedule'
        id='schedule'
        name='range-radio-btn'
        onChange={handleChange}
        defaultChecked={radioBtnValue === 'schedule'}
      />
      <input
        className='radio-group__input visually-hidden'
        type='radio'
        value='n-days'
        id='n-days'
        name='range-radio-btn'
        onChange={handleChange}
        defaultChecked={radioBtnValue === 'n-days'}
      />
      <input
        className='radio-group__input visually-hidden'
        type='radio'
        value='n-events'
        id='n-events'
        name='range-radio-btn'
        onChange={handleChange}
        defaultChecked={radioBtnValue === 'n-events'}
      />

      <div className='radio-group__btns'>
        <label
          className='radio-group__label radio-group__label_active'
          htmlFor='schedule'
          title='События за выбранный промежуток времени'
        >
          <span className='radio-group__text'>Промежуток</span>
        </label>

        <label
          className='radio-group__label'
          htmlFor='n-days'
          title='События за ближайшие n дней'
        >
          <span className='radio-group__text'>В ближайшее время</span>
        </label>

        <label
          className='radio-group__label'
          htmlFor='n-events'
          title='Ближайшие n событий'
        >
          <span className='radio-group__text'>Ближайшие события</span>
        </label>
      </div>
    </form>
  );
};

export default RangeRadioBtn;
