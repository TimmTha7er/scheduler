import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreatePopupVisible,
  createEvent,
  setRowDate,
} from '../../redux/actions';
import { IEvent } from '../../redux/actions/grid';
import { RootState } from '../../redux/reducers';
import closeBtnImg from '../../img/close.svg';

const CreatePopup: React.FC = () => {
  const dispatch = useDispatch();
  const { rowDate, events = {} } = useSelector(
    (state: RootState) => state.grid
  );
  const event: IEvent = rowDate
    ? events[rowDate.toString()]
    : {
        title: '',
        descr: '',
      };
  const { title: eventTitle, descr: eventDescr} = event || {};

  const [title, setTitle] = useState<string>(eventTitle);
  const [descr, setDescr] = useState<string>(eventDescr);

  const popupTitle: string =
    !eventTitle && !eventDescr ? 'Новое событие' : 'Редактирование события';

  const submitBtnName: string =
    !eventTitle && !eventDescr ? 'Создать' : 'Сохранить';

  const onCancelClick = (): void => {
    dispatch(setRowDate(null));
    dispatch(setCreatePopupVisible(false));
  };

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const onDescrChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setDescr(e.currentTarget.value);
  };

  const onSubmitClick = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const ttitle: string = title.trim() === '' ? 'Без названия' : title;
    dispatch(createEvent({ title: ttitle, descr: descr }));
    dispatch(setCreatePopupVisible(false));
  };

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>{popupTitle}</h2>
        <div
          onClick={onCancelClick}
          // className='create-popup__close icon icon-cancel-1'
          className='create-popup__close'
        >
          <img className='create-popup__btn-img' src={closeBtnImg} alt='X' />
        </div>
      </div>
      <form onSubmit={onSubmitClick} className='form'>
        <div className='create-popup__content'>
          <div className='form__field'>
            <label className='form__label' htmlFor=''>
              Название
            </label>
            <input
              onChange={onTitleChange}
              value={title}
              className='form__input'
              type='text'
              autoComplete='off'
              maxLength={120}
            />
          </div>

          <div className='form__field'>
            <label className='form__label' htmlFor=''>
              Описание
            </label>
            <textarea
              onChange={onDescrChange}
              value={descr}
              className='form__textarea'
              cols={30}
              rows={10}
              maxLength={4000}
            ></textarea>
          </div>
        </div>
        <div className='create-popup__footer'>
          <button className='form__btn'>
            <span>{submitBtnName}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePopup;
