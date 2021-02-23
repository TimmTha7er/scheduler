import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  CreatePopup,
  EditPopup,
  PreviewPopup,
  DeletePopup,
  AdminPreviewPopup,
  AdminEditPopup,
} from '../../components';

const Popups: React.FC = () => {
  const {
    auth: { user },
    popups: {
      isCreatePopupVisible,
      isEditPopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
  } = useSelector((state: RootState) => state);

  if (user?.role === 'admin') {
    return (
      <>
        {isEditPopupVisible && <AdminEditPopup />}
        {isPreviewPopupVisible && <AdminPreviewPopup />}
      </>
    );
  }

  return (
    <>
      {isCreatePopupVisible && <CreatePopup />}
      {isEditPopupVisible && <EditPopup />}
      {isPreviewPopupVisible && <PreviewPopup />}
      {isDeletePopupVisible && <DeletePopup />}
    </>
  );
};

export default Popups;
