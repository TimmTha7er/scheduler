import React, { useCallback } from 'react';
import { GridNav, ControlPanelLoader, AdminRangeBtn } from '../../components';
import { useActions, useTypedSelector } from '../supports/Hooks';

const ControlPanel: React.FC = () => {
  const { setDate } = useActions();
  const {
    auth: { loading },
    admin: { selectedUser },
  } = useTypedSelector((state) => state);

  const setGridDate = useCallback((date: moment.Moment) => {
    return setDate(date);
  }, []);

  if (loading) {
    return <ControlPanelLoader />;
  }

  return (
    <div className='admin-control-panel'>
      <div className='admin-control-panel__selected-user'>
        <div className='admin-control-panel__schedule-title'>
          События пользователя
        </div>
        <div className='admin-control-panel__user-name'>
          {selectedUser?.email}
        </div>
      </div>
      <div className='admin-control-panel__btns-wrap'>
        <GridNav setDate={setGridDate} />
        <AdminRangeBtn />
      </div>
    </div>
  );
};

export default ControlPanel;
