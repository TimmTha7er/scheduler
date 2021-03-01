import React from 'react';
import { useInput, useFocus } from '../supports/hooks';
import closeBtnImg from '../../img/close.svg';

interface CreateEditPopupViewProps {
  popupTitle: string;
  submitBtnName: string;
  title?: string;
  descr?: string;
  onSubmitClick: (
    title: string,
    descr: string
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
  onCancelClick: () => void;
}

const CreateEditPopupView: React.FC<CreateEditPopupViewProps> = ({
  popupTitle,
  submitBtnName,
  title = '',
  descr = '',
  onSubmitClick,
  onCancelClick,
}) => {
  const { value: inputValue, onChange: inputOnChange } = useInput(title);
  const { value: textareaValue, onChange: textareaOnChange } = useInput(descr);
  const inputRef = useFocus();

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    inputOnChange(event.currentTarget.value);
  };

  const onTextareaChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    textareaOnChange(event.currentTarget.value);
  };

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>{popupTitle}</h2>
        <div
          onClick={onCancelClick}
          // className='create-popup__close icon icon-cancel-1'
          className='create-popup__close'
        >
          <img className='create-popup__btn-img' src={closeBtnImg} alt='X' />
        </div>
      </div>
      <form
        onSubmit={onSubmitClick(inputValue, textareaValue)}
        className='form'
      >
        <div className='create-popup__content'>
          <div className='form__field'>
            <label className='form__label' htmlFor=''>
              Название
            </label>
            <input
              value={inputValue}
              onChange={onInputChange}
              className='form__input'
              type='text'
              autoComplete='off'
              maxLength={120}
              ref={inputRef}
            />
          </div>

          <div className='form__field'>
            <label className='form__label' htmlFor=''>
              Описание
            </label>
            <textarea
              value={textareaValue}
              onChange={onTextareaChange}
              className='form__textarea scroll-bar'
              cols={30}
              rows={10}
              maxLength={4000}
            />
          </div>
        </div>
        <div className='create-popup__footer'>
          <button className='form__btn'>
            <span>{submitBtnName}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CreateEditPopupView);
