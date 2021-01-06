import { connect } from 'react-redux';
import {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
  setEditPopupVisible,
} from '../../redux/actions';

const PreviewPopup = ({
  eventTitle,
  eventDescr,
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
}) => {
  const onBtnCancelClick = () => {
    setPreviewPopupVisible(false);
  };

  const onBtnDeleteClick = () => {
    setDeletePopupVisible(true);
  };

  const onBtnEditClick = () => {
    setPreviewPopupVisible(false);
    setCreatePopupVisible(true);
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
      <div className='preview-popup__descr'>
        {eventDescr.split('\n').map((item, idx) => {
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

const mapStateToProps = ({ grid: { rowDate, events } }) => {
  const { title: eventTitle, descr: eventDescr } = events[rowDate];

  return { eventTitle, eventDescr };
};

const mapDistatchToProps = {
  setPreviewPopupVisible,
  setDeletePopupVisible,
  setCreatePopupVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(PreviewPopup);
