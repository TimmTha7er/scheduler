import React from 'react';
import { connect } from 'react-redux';
import Day from '../Day/Day';
import ScheduleRange from '../ScheduleRange/ScheduleRange';
import CreatePopup from '../CreatePopup/CreatePopup';
import PreviewPopup from '../PreviewPopup/PreviewPopup';
import DeletePopup from '../DeletePopup/DeletePopup';
import { RootState } from '../../redux/reducers/index';

type MainProps = {
  isRangeVisible: boolean;
  isCreatePopupVisible: boolean;
  isPreviewPopupVisible: boolean;
  isDeletePopupVisible: boolean;
};

const Main: React.FC<MainProps> = ({
  isRangeVisible,
  isCreatePopupVisible,
  isPreviewPopupVisible,
  isDeletePopupVisible,
}) => {
  return (
    <main className='main'>
      {isRangeVisible ? <ScheduleRange /> : <Day />}

      {isCreatePopupVisible && <CreatePopup></CreatePopup>}
      {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
      {isDeletePopupVisible && <DeletePopup></DeletePopup>}
    </main>
  );
};

const mapStateToProps = ({
  range: { isRangeVisible },
  popups: { isCreatePopupVisible, isPreviewPopupVisible, isDeletePopupVisible },
}: RootState) => {
  return {
    isRangeVisible,
    isCreatePopupVisible,
    isPreviewPopupVisible,
    isDeletePopupVisible,
  };
};

const mapDistatchToProps = {};

export default connect(mapStateToProps, mapDistatchToProps)(Main);
