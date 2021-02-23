import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editEvent,
  setRowDate,
  setEditPopupVisible,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { CreateEditPopupView } from '../../components';

const EditPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { rowDate, events } = useSelector((state: RootState) => state.grid);
  const { title, descr } = events[rowDate!.toString()];

  const onCancelClick = useCallback(() => {
    dispatch(setRowDate(null));
    dispatch(setEditPopupVisible(false));
  }, [dispatch]);

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

      dispatch(editEvent({ date, id, updates }));
      dispatch(setEditPopupVisible(false));
    },
    [dispatch, rowDate, events]
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
