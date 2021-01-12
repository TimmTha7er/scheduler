import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  setCreatePopupVisible,
  createEvent,
  setRowDate,
} from '../../redux/actions';
import { GridActionsType, IEvent } from '../../redux/actions/grid';
import { RootState } from '../../redux/reducers/index';
import { PopupsActionTypes } from '../../redux/actions/popups';
import closeBtnImg from '../../img/close.svg';

type CreatePopupProps = {
  setCreatePopupVisible: (value: boolean) => PopupsActionTypes;
  createEvent: (event: IEvent) => GridActionsType;
  setRowDate: (date: moment.Moment | null) => GridActionsType;
  event?: { title?: string; descr?: string };
};

const CreatePopup: React.FC<CreatePopupProps> = ({
  setCreatePopupVisible,
  createEvent,
  setRowDate,
  event: { title: eventTitle = '', descr: eventDescr = '' } = {},
}) => {
  const [title, setTitle] = useState<string>(eventTitle);
  const [descr, setDescr] = useState<string>(eventDescr);

  const popupTitle: string =
    !eventTitle && !eventDescr ? 'Новое событие' : 'Редактирование события';

  const submitBtnName: string =
    !eventTitle && !eventDescr ? 'Создать' : 'Сохранить';

  const onCancelClick = (): void => {
    setRowDate(null);
    setCreatePopupVisible(false);
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
    createEvent({ title: ttitle, descr: descr });
    setCreatePopupVisible(false);
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
          <img
            className='create-popup__btn-img'
            src={closeBtnImg}
            alt='X'
          />
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

const mapStateToProps = ({ grid: { rowDate, events } }: RootState) => {
  const event: IEvent = events[rowDate];

  return { event };
};

const mapDistatchToProps = {
  setCreatePopupVisible,
  createEvent,
  setRowDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(CreatePopup);
