import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useActions, useTypedSelector } from '../supports/Hooks';
import closeBtnImg from '../../img/close.svg';
import deleteBtnImg from '../../img/trash-o.svg';
import editBtnImg from '../../img/pencil.svg';

const PreviewPopup: React.FC = () => {
  const {
    setPreviewPopupVisible,
    setDeletePopupVisible,
    setEditPopupVisible,
  } = useActions();
  const { rowDate, events } = useTypedSelector((state) => state.grid);
  const { title: eventTitle, descr: eventDescr } =
    events[rowDate!.toString()] || {};

  const onBtnCancelClick = (): void => {
    setPreviewPopupVisible(false);
  };

  const onBtnDeleteClick = (): void => {
    setDeletePopupVisible(true);
  };

  const onBtnEditClick = (): void => {
    setPreviewPopupVisible(false);
    setEditPopupVisible(true);
  };

  return (
    <div className='preview-popup'>
      <div className='preview-popup__header'>
        <h2 className='preview-popup__title'>{eventTitle}</h2>
        <div onClick={onBtnCancelClick} className='preview-popup__close'>
          <img
            className='action-bar__btn-img action-bar__btn-img_close'
            src={closeBtnImg}
            alt='X'
          />
        </div>
      </div>

      <PerfectScrollbar>
        <div className='preview-popup__descr'>
          {eventDescr.split('\n').map((item: string, idx: number) => {
            return (
              <span className='preview-popup__descr-item' key={idx}>
                {item}
              </span>
            );
          })}
        </div>
      </PerfectScrollbar>

      <div className='preview-popup__footer'>
        <div className='action-bar'>
          <button
            onClick={onBtnDeleteClick}
            className='action-bar__btn icon'
            title='Удалить'
          >
            <img className='action-bar__btn-img' src={deleteBtnImg} alt='del' />
          </button>
          <button
            onClick={onBtnEditClick}
            className='action-bar__btn'
            title='Редактировать'
          >
            <img className='action-bar__btn-img' src={editBtnImg} alt='edit' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
