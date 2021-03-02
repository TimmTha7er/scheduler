import React from 'react';
import { useActions, useTypedSelector } from '../supports/Hooks';

const DeletePopup: React.FC = () => {
  const {
    setPreviewPopupVisible,
    setDeletePopupVisible,
    deleteEvent,
  } = useActions();
  const { rowDate, events } = useTypedSelector((state) => state.grid);

  const onBtnСonfirmClick = (): void => {
    setPreviewPopupVisible(false);

    const id = events[rowDate!.toString()].id;
    deleteEvent(rowDate!, id);
    setDeletePopupVisible(false);
  };

  const onBtnCancelClick = (): void => {
    setDeletePopupVisible(false);
  };

  return (
    <div className='delete-popup'>
      <div className='delete-popup__title'>Удаление события</div>
      <div className='delete-popup__text'>
        Вы действительно хотите удалить событие?
      </div>
      <div className='delete-popup__footer'>
        <button onClick={onBtnCancelClick} className='delete-popup__btn'>
          Отмена
        </button>
        <button
          onClick={onBtnСonfirmClick}
          className='delete-popup__btn delete-popup__btn_action'
        >
          Да
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
