import React from 'react';
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

  const onCancelClick = (): void => {
    dispatch(setRowDate(null));
    dispatch(setCreatePopupVisible(false));
  };

  const onSubmitClick = (input: any, textarea: any) => (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    const newEvent = {
      title: input.value || 'Без названия',
      descr: textarea.value,
      time: rowDate!.toString(),
    };

    dispatch(createEvent(newEvent));
    dispatch(setCreatePopupVisible(false));
  };

  return (
    <CreateEditPopupView
      popupTitle='Новое событие'
      submitBtnName='Создать'
      title=''
      descr=''
      onSubmitClick={onSubmitClick}
      onCancelClick={onCancelClick}
    ></CreateEditPopupView>
  );
};

export default CreatePopup;
