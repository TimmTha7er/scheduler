import { useState } from 'react';
import { connect } from 'react-redux';
import {
  setCreatePopupVisible,
  createEvent,
  setRowDate,
} from '../../redux/actions';

const CreatePopup = ({
  setCreatePopupVisible,
  createEvent,
  setRowDate,
  event: { title: eventTitle = '', descr: eventDescr = '' } = {},
}) => {
  const [title, setTitle] = useState(eventTitle);
  const [descr, setDescr] = useState(eventDescr);

  const onCancelClick = () => {
    setRowDate(null);
    setCreatePopupVisible(false);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    const ttitle = title.trim() === '' ? 'Без названия' : title;
    createEvent({ title: ttitle, descr: descr });
    setCreatePopupVisible(false);
  };

  const popupTitle =
    !eventTitle && !eventDescr ? 'Новое событие' : 'Редактирование события';

  const submitBtnName = !eventTitle && !eventDescr ? 'Создать' : 'Сохранить';

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>{popupTitle}</h2>
        <div
          onClick={onCancelClick}
          className='create-popup__close icon icon-cancel-1'
        ></div>
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
              maxLength='120'
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
              cols='30'
              rows='10'
              maxLength='4000'
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

const mapStateToProps = ({ grid: { rowDate, events } }) => {
  const event = events[rowDate];

  return { event };
};

const mapDistatchToProps = {
  setCreatePopupVisible,
  createEvent,
  setRowDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(CreatePopup);
