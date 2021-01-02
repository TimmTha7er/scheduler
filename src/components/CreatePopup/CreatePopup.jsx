const CreatePopup = () => {
  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>Новое событие</h2>
        <div className='create-popup__close icon icon-cancel-1'></div>
      </div>
      <form className='form'>
        <div className='create-popup__content'>
          <div className='form__field'>
            <label className='form__label' htmlFor=''>
              Название
            </label>
            <input
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

export default CreatePopup;
