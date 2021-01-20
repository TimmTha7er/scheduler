import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  deleteEvent,
} from '../../redux/actions';
import { RootState } from '../../redux/store';

const DeletePopup: React.FC = () => {
  const dispatch = useDispatch();
  const { rowDate, events } = useSelector((state: RootState) => state.grid);

  const onBtnСonfirmClick = (): void => {
    dispatch(setPreviewPopupVisible(false));

    const id = events[rowDate!.toString()].id;
    dispatch(deleteEvent(rowDate!, id));
    dispatch(setDeletePopupVisible(false));
  };

  const onBtnCancelClick = (): void => {
    dispatch(setDeletePopupVisible(false));
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
