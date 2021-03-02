import React from 'react';
import {
  CreatePopup,
  EditPopup,
  PreviewPopup,
  DeletePopup,
  AdminPreviewPopup,
  AdminEditPopup,
} from '../../components';
import { useTypedSelector } from '../supports/Hooks';

const Popups: React.FC = () => {
  const {
    auth: { user },
    popups: {
      isCreatePopupVisible,
      isEditPopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
  } = useTypedSelector((state) => state);

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
