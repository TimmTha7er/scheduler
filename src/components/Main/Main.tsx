import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Day,
  ScheduleRange,
  CreatePopup,
  PreviewPopup,
  DeletePopup,
  ErrorIndicator,
  Loading,
} from '../../components';
import { fetchEvents } from '../../redux/actions';
import { RootState } from '../../redux/store';

import SchedulerStoreService from '../../services/SchedulerStoreService';

const schedulerStoreService = new SchedulerStoreService();

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const {
    range: { isRangeVisible },
    popups: {
      isCreatePopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
    grid: { loading, error },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    // schedulerStoreService.addEvent({
    //   time: 'Thu Jan 21 2021 07:00:00 GMT+0300',
    //   title: 'Покормить кота',
    //   descr:
    //     '1 ) взять корм\n2 ) наложить в мисочку\n3 ) позвать кота\n4 ) пожелать приятного аппетита\n5 ) погладить\n6 ) если мало - подложить еще',
    // });
    dispatch(fetchEvents());
  }, []);

  if (error) {
    return <ErrorIndicator></ErrorIndicator>;
  }

  if (loading) {
    return <Loading></Loading>;
  }

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
