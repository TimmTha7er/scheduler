import React from 'react';
import { connect } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  deleteEvent,
} from '../../redux/actions';
import { PopupsActionTypes } from '../../redux/actions/popups';
import { GridActionsType } from '../../redux/actions/grid';
import { RootState } from '../../redux/reducers/index';

type DeletePopupProps = {
  setDeletePopupVisible: (value: boolean) => PopupsActionTypes;
  setPreviewPopupVisible: (value: boolean) => PopupsActionTypes;
  deleteEvent: (date: moment.Moment) => GridActionsType;
  rowDate: moment.Moment;
};

const DeletePopup: React.FC<DeletePopupProps> = ({
  setDeletePopupVisible,
  setPreviewPopupVisible,
  deleteEvent,
  rowDate,
}) => {
  const onBtnСonfirmClick = (): void => {
    setPreviewPopupVisible(false);
    deleteEvent(rowDate);
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

const mapStateToProps = ({ grid: { rowDate } }: RootState) => {
  return { rowDate };
};

const mapDistatchToProps = {
  setDeletePopupVisible,
  setPreviewPopupVisible,
  deleteEvent,
};

export default connect(mapStateToProps, mapDistatchToProps)(DeletePopup);
