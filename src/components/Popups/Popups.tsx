import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  CreatePopup,
  EditPopup,
  PreviewPopup,
  DeletePopup,
} from '../../components';

const Popups: React.FC = () => {
  const {
    popups: {
      isCreatePopupVisible,
      isEditPopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
  } = useSelector((state: RootState) => state);
  return (
    <>
      {isCreatePopupVisible && <CreatePopup></CreatePopup>}
      {isEditPopupVisible && <EditPopup></EditPopup>}
      {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
      {isDeletePopupVisible && <DeletePopup></DeletePopup>}
    </>
  );
};

export default Popups;
