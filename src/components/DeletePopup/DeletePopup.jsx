import { connect } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  deleteEvent,
} from '../../redux/actions';

const DeletePopup = ({
  setDeletePopupVisible,
  setPreviewPopupVisible,
  deleteEvent,
  rowDate,
}) => {
  const onBtnСonfirmClick = () => {
    setPreviewPopupVisible(false);
    deleteEvent(rowDate);
    setDeletePopupVisible(false);
  };

  const onBtnCancelClick = () => {
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

const mapStateToProps = ({ grid: { rowDate } }) => {
  return { rowDate };
};

const mapDistatchToProps = {
  setDeletePopupVisible,
  setPreviewPopupVisible,
  deleteEvent,
};

export default connect(mapStateToProps, mapDistatchToProps)(DeletePopup);
