import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { GridNav, ControlPanelLoader, AdminRangeBtn } from '../../components';

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { loading },
    admin: { selectedUser },
  } = useSelector((state: RootState) => state);

  const setGridDate = useCallback(
    (date: moment.Moment) => {
      return dispatch(setDate(date));
    },
    [dispatch]
  );

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
