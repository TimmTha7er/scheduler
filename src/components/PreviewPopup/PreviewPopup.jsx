import { useState } from 'react';
import { connect } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
} from '../../redux/actions';

const PreviewPopup = ({
  eventTitle,
  eventDescr,
  setPreviewPopupVisible,
  setDeletePopupVisible,
}) => {
  const onBtnCancelClick = () => {
    setPreviewPopupVisible(false);
  };

  const onBtnDeleteClick = () => {
    setDeletePopupVisible(true);
  };

  const onBtnEditClick = () => () => {
    setPreviewPopupVisible(false);
  };

  return (
    <div className='preview-popup'>
      <div className='preview-popup__header'>
        <h2 className='preview-popup__title'>{eventTitle}</h2>
        <div
          onClick={onBtnCancelClick}
          className='preview-popup__close icon icon-cancel-1'
        ></div>
      </div>
      <div className='preview-popup__descr'>{eventDescr}</div>
      <div className='preview-popup__footer'>
        <div className='action-bar'>
          <button
            onClick={onBtnDeleteClick}
            className='action-bar__btn icon icon-trash'
          ></button>
          <button
            onClick={onBtnEditClick}
            className='action-bar__btn icon icon-pencil'
          ></button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ datePicker: { date, events } }) => {
  const event = events[date];
  const eventTitle = event.title;
  const eventDescr = event.descr;

  return { eventTitle, eventDescr };
};

const mapDistatchToProps = {
  setPreviewPopupVisible,
  setDeletePopupVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(PreviewPopup);
