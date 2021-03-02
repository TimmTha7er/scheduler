import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useActions, useRouter, useTypedSelector } from '../supports/Hooks';
import closeBtnImg from '../../img/close.svg';
import moreBtnImg from '../../img/more.svg';
import editBtnImg from '../../img/pencil.svg';

const AdminPreviewPopup: React.FC = () => {
  const {
    setPreviewPopupVisible,
    setEditPopupVisible,
    setSelectedUser,
  } = useActions();
  const {
    admin: { selectedUser },
    range: { startOfRange, endOfRange },
  } = useTypedSelector((state) => state);
  const { history } = useRouter();

  const onBtnCancelClick = (): void => {
    setPreviewPopupVisible(false);
    setSelectedUser(null);
  };

  const onBtnShowEventsClick = (): void => {
    setPreviewPopupVisible(false);
    const start = startOfRange.clone().startOf('day');
    const end = endOfRange.clone().add(1, 'day').startOf('day');

    history.push({
      pathname: '/schedule/range',
      search: `?start=${start.format('YYYY-MM-DD')}&end=${end.format(
        'YYYY-MM-DD'
      )}&uid=${selectedUser?.id}`,
    });
  };

  const onBtnEditClick = (): void => {
    setPreviewPopupVisible(false);
    setEditPopupVisible(true);
  };

  return (
    <div className='admin-preview-popup'>
      <div className='admin-preview-popup__header'>
        <h2 className='admin-preview-popup__title'>
          Пользователь {selectedUser?.firstName}
        </h2>
        <div onClick={onBtnCancelClick} className='admin-preview-popup__close'>
          <img
            className='action-bar__btn-img action-bar__btn-img_close'
            src={closeBtnImg}
            alt='X'
          />
        </div>
      </div>

      <PerfectScrollbar>
        <div className='admin-preview-popup__descr'>
          {selectedUser &&
            (Object.keys(selectedUser) as Array<keyof typeof selectedUser>).map(
              (item, idx) => {
                return (
                  <div className='admin-preview-popup__descr-item' key={idx}>
                    <span className='admin-preview-popup__descr-name'>
                      {item}:
                    </span>
                    <span className='admin-preview-popup__descr-prop'>
                      {selectedUser[item]}
                    </span>
                  </div>
                );
              }
            )}
        </div>
      </PerfectScrollbar>

      <div className='admin-preview-popup__footer'>
        <div className='action-bar'>
          <button
            onClick={onBtnEditClick}
            className='action-bar__btn'
            title='Редактировать'
          >
            <img className='action-bar__btn-img' src={editBtnImg} alt='edit' />
          </button>
          <button
            onClick={onBtnShowEventsClick}
            className='action-bar__btn icon'
            title='События пользователя'
          >
            <img
              className='action-bar__btn-img'
              src={moreBtnImg}
              alt='events'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewPopup;
