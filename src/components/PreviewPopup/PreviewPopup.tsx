import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
} from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import closeBtnImg from '../../img/close.svg';
import deleteBtnImg from '../../img/trash-o.svg';
import editBtnImg from '../../img/pencil.svg';

const PreviewPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { rowDate, events } = useSelector((state: RootState) => state.grid);
  const { title: eventTitle, descr: eventDescr } =
    events[rowDate!.toString()] || {};

  const onBtnCancelClick = (): void => {
    dispatch(setPreviewPopupVisible(false));
  };

  const onBtnDeleteClick = (): void => {
    dispatch(setDeletePopupVisible(true));
  };

  const onBtnEditClick = (): void => {
    dispatch(setPreviewPopupVisible(false));
    dispatch(setCreatePopupVisible(true));
  };

  return (
    <div className='preview-popup'>
      <div className='preview-popup__header'>
        <h2 className='preview-popup__title'>{eventTitle}</h2>
        <div
          onClick={onBtnCancelClick}
          // className='preview-popup__close icon icon-cancel-1'
          className='preview-popup__close'
        >
          <img
            className='action-bar__btn-img action-bar__btn-img_close'
            src={closeBtnImg}
            alt='X'
          />
        </div>
      </div>
      <div className='preview-popup__descr'>
        {eventDescr.split('\n').map((item: string, idx: number) => {
          return (
            <span className='preview-popup__descr-item' key={idx}>
              {item}
            </span>
          );
        })}
      </div>
      <div className='preview-popup__footer'>
        <div className='action-bar'>
          <button
            onClick={onBtnDeleteClick}
            // className='action-bar__btn icon icon-trash'
            className='action-bar__btn icon'
          >
            <img className='action-bar__btn-img' src={deleteBtnImg} alt='del' />
          </button>
          <button
            onClick={onBtnEditClick}
            className='action-bar__btn'
            // className='action-bar__btn icon icon-pencil'
          >
            <img className='action-bar__btn-img' src={editBtnImg} alt='edit' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
