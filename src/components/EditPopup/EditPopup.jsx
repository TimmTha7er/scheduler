import { useState } from 'react';
import { connect } from 'react-redux';
import { setEditPopupVisible, createEvent } from '../../redux/actions';

const EditPopup = ({
  setEditPopupVisible,
  createEvent,
  event: { title: eventTitle = '', descr: eventDescr = '' },
}) => {
  const [title, setTitle] = useState(eventTitle);
  const [descr, setDescr] = useState(eventDescr);

  const onCancelClick = () => {
    setEditPopupVisible(false);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    createEvent({ title: title, descr: descr });
    setEditPopupVisible(false);
  };

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>Редактирование события</h2>
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
            <span>Сохранить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ datePicker: { events, date } }) => {
  const event = events[date];

  return { event };
};

const mapDistatchToProps = {
  setEditPopupVisible,
  createEvent,
};

export default connect(mapStateToProps, mapDistatchToProps)(EditPopup);
