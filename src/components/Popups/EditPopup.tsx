import React, { useCallback } from 'react';
import { CreateEditPopupView } from '../../components';
import { useActions, useTypedSelector } from '../supports/Hooks';

const EditPopup: React.FC = () => {
  const { editEvent, setRowDate, setEditPopupVisible } = useActions();
  const { rowDate, events } = useTypedSelector((state) => state.grid);
  const { title, descr } = events[rowDate!.toString()];

  const onCancelClick = useCallback(() => {
    setRowDate(null);
    setEditPopupVisible(false);
  }, []);

  const onSubmitClick = useCallback(
    (title: string, descr: string) => (
      e: React.FormEvent<HTMLFormElement>
    ): void => {
      e.preventDefault();

      const date = rowDate!.toString();
      const id = events[date].id;
      const updates = {
        title: title || 'Без названия',
        descr: descr,
      };

      editEvent({ date, id, updates });
      setEditPopupVisible(false);
    },
    [rowDate, events]
  );

  return (
    <CreateEditPopupView
      popupTitle='Редактирование события'
      submitBtnName='Сохранить'
      title={title}
      descr={descr}
      onSubmitClick={onSubmitClick}
      onCancelClick={onCancelClick}
    />
  );
};

export default EditPopup;
