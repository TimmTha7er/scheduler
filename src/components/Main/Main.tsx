import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Day,
  ScheduleRange,
  CreatePopup,
  EditPopup,
  PreviewPopup,
  DeletePopup,
} from '../../components';
import { fetchEvents } from '../../redux/actions';
import { RootState } from '../../redux/store';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const {
    range: { isRangeVisible },
    popups: {
      isCreatePopupVisible,
      isEditPopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <main className='main'>
      {isRangeVisible ? <ScheduleRange /> : <Day />}

      {isCreatePopupVisible && <CreatePopup></CreatePopup>}
      {isEditPopupVisible && <EditPopup></EditPopup>}
      {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
      {isDeletePopupVisible && <DeletePopup></DeletePopup>}
    </main>
  );
};

export default Main;
