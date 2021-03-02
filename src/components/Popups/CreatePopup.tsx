import React, { useCallback } from 'react';
import { CreateEditPopupView } from '../../components';
import { useActions, useTypedSelector } from '../supports/Hooks';

const CreatePopup: React.FC = () => {
  const { setCreatePopupVisible, createEvent, setRowDate } = useActions();
  const { rowDate } = useTypedSelector((state) => state.grid);

  const onCancelClick = useCallback(() => {
    setRowDate(null);
    setCreatePopupVisible(false);
  }, []);

  const onSubmitClick = useCallback(
    (title: string, descr: string) => (
      e: React.FormEvent<HTMLFormElement>
    ): void => {
      e.preventDefault();

      const newEvent = {
        title: title || 'Без названия',
        descr: descr,
        time: rowDate!.toString(),
      };

      createEvent(newEvent);
      setCreatePopupVisible(false);
    },
    [rowDate]
  );

  return (
    <CreateEditPopupView
      popupTitle='Новое событие'
      submitBtnName='Создать'
      onSubmitClick={onSubmitClick}
      onCancelClick={onCancelClick}
    />
  );
};

export default CreatePopup;
