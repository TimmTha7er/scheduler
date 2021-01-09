import { connect } from 'react-redux';
import Day from '../Day/Day.jsx';
import ScheduleRange from '../ScheduleRange/ScheduleRange.jsx';
import CreatePopup from '../CreatePopup/CreatePopup.jsx';
import PreviewPopup from '../PreviewPopup/PreviewPopup.jsx';
import DeletePopup from '../DeletePopup/DeletePopup.jsx';

const Main = ({
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
}) => {
  return {
    isRangeVisible,
    isCreatePopupVisible,
    isPreviewPopupVisible,
    isDeletePopupVisible,
  };
};

const mapDistatchToProps = {};

export default connect(mapStateToProps, mapDistatchToProps)(Main);
