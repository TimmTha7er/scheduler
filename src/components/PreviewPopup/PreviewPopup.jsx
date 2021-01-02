const PreviewPopup = ({eventTitle, eventDescr}) => {
  return (
    <div className='preview-popup'>
      <div className='preview-popup__header'>
        <h2 className='preview-popup__title'>{eventTitle}</h2>
        <div className='preview-popup__close icon icon-cancel-1'></div>
      </div>
      <div className='preview-popup__descr'>{eventDescr}</div>
      <div className='preview-popup__footer'>
        <div className='action-bar'>
          <button className='action-bar__btn icon icon-trash'></button>
          <button className='action-bar__btn icon icon-pencil'></button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
