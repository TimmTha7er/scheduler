import React from 'react';
import { useSelector } from 'react-redux';
import {
  Day,
  ScheduleRange,
  CreatePopup,
  PreviewPopup,
  DeletePopup,
} from '../../components';
import { RootState } from '../../redux/reducers/index';

const Main: React.FC = () => {
  const {
    range: { isRangeVisible },
    popups: {
      isCreatePopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
  } = useSelector((state: RootState) => state);

  return (
    <main className='main'>
      {isRangeVisible ? <ScheduleRange /> : <Day />}

      {isCreatePopupVisible && <CreatePopup></CreatePopup>}
      {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
      {isDeletePopupVisible && <DeletePopup></DeletePopup>}
    </main>
  );
};

export default Main;
