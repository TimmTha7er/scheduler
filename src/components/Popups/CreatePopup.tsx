import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreatePopupVisible,
  createEvent,
  setRowDate,
} from '../../redux/actions';
import { CreateEditPopupView } from '../../components';
import { RootState } from '../../redux/store';

const CreatePopup: React.FC = () => {
  const dispatch = useDispatch();
  const { rowDate } = useSelector((state: RootState) => state.grid);

  const onCancelClick = useCallback(() => {
    dispatch(setRowDate(null));
    dispatch(setCreatePopupVisible(false));
  }, [dispatch]);

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

      dispatch(createEvent(newEvent));
      dispatch(setCreatePopupVisible(false));
    },
    [dispatch, rowDate]
  );

  return (
    <CreateEditPopupView
      popupTitle='Новое событие'
      submitBtnName='Создать'
      onSubmitClick={onSubmitClick}
      onCancelClick={onCancelClick}
    ></CreateEditPopupView>
  );
};

export default CreatePopup;
