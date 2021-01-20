import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editEvent,
  setRowDate,
  setEditPopupVisible,
} from '../../redux/actions';
import { CreateEditPopupView } from '../../components';
import { RootState } from '../../redux/store';

const CreatePopup: React.FC = () => {
  const dispatch = useDispatch();
  const { rowDate, events } = useSelector((state: RootState) => state.grid);
  const { title, descr } = events[rowDate!.toString()];

  const onCancelClick = (): void => {
    dispatch(setRowDate(null));
    dispatch(setEditPopupVisible(false));
  };

  const onSubmitClick = (input: any, textarea: any) => (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    const date = rowDate!.toString();
    const id = events[date].id;
    const updates = {
      title: input.value || 'Без названия',
      descr: textarea.value,
    };

    dispatch(editEvent(date, id, updates));
    dispatch(setEditPopupVisible(false));
  };

  return (
    <CreateEditPopupView
      popupTitle='Редактирование события'
      submitBtnName='Сохранить'
      title={title}
      descr={descr}
      onSubmitClick={onSubmitClick}
      onCancelClick={onCancelClick}
    ></CreateEditPopupView>
  );
};

export default CreatePopup;
