import { useState } from 'react';
import { connect } from 'react-redux';
import { setCreatePopupVisible, createEvent } from '../../redux/actions';

const CreatePopup = ({ setCreatePopupVisible, createEvent }) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');

  const onCancelClick = () => () => {
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
    createEvent({ title: title, descr: descr });
    setCreatePopupVisible(false);
  };

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>Новое событие</h2>
        <div
          onClick={onCancelClick()}
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
              className='form__textarea'
              cols='30'
              rows='10'
              maxLength='4000'
            ></textarea>
          </div>
        </div>
        <div className='create-popup__footer'>
          <button className='form__btn'>
            <span>Создать</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDistatchToProps = {
  setCreatePopupVisible,
  createEvent,
};

export default connect(mapStateToProps, mapDistatchToProps)(CreatePopup);
