import React from 'react';
import { connect } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
} from '../../redux/actions';
import { PopupsActionTypes } from '../../redux/actions/popups';
import { RootState } from '../../redux/reducers/index';
import closeBtnImg from '../../img/close.svg';
import deleteBtnImg from '../../img/trash-o.svg';
import editBtnImg from '../../img/pencil.svg';

type PreviewPopupProps = {
  eventTitle: string;
  eventDescr: string;
  setPreviewPopupVisible: (value: boolean) => PopupsActionTypes;
  setDeletePopupVisible: (value: boolean) => PopupsActionTypes;
  setCreatePopupVisible: (value: boolean) => PopupsActionTypes;
};

const PreviewPopup: React.FC<PreviewPopupProps> = ({
  eventTitle,
  eventDescr,
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
}) => {
  const onBtnCancelClick = (): void => {
    setPreviewPopupVisible(false);
  };

  const onBtnDeleteClick = (): void => {
    setDeletePopupVisible(true);
  };

  const onBtnEditClick = (): void => {
    setPreviewPopupVisible(false);
    setCreatePopupVisible(true);
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
            <img
              className='action-bar__btn-img'
              src={deleteBtnImg}
              alt='del'
            />
          </button>
          <button
            onClick={onBtnEditClick}
            className='action-bar__btn'
            // className='action-bar__btn icon icon-pencil'
          >
            <img
              className='action-bar__btn-img'
              src={editBtnImg}
              alt='edit'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ grid: { rowDate, events } }: RootState) => {
  const { title: eventTitle, descr: eventDescr } = events[rowDate];

  return { eventTitle, eventDescr };
};

const mapDistatchToProps = {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(PreviewPopup);
