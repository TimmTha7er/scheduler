const DeletePopup = () => {
  return (
    <div className='delete-popup'>
      <div className='delete-popup__title'>Удаление события</div>
      <div className='delete-popup__text'>
        Вы действительно хотите удалить событие?
      </div>
      <div className='delete-popup__footer'>
        <button className='delete-popup__btn'>Отмена</button>
        <button className='delete-popup__btn delete-popup__btn_action'>
          Да
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
