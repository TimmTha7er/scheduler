import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  CreatePopup,
  EditPopup,
  PreviewPopup,
  DeletePopup,
} from '../../components';

const Popups: React.FC = () => {
  const {
    popups: {
      isCreatePopupVisible,
      isEditPopupVisible,
      isPreviewPopupVisible,
      isDeletePopupVisible,
    },
  } = useSelector((state: RootState) => state);
  const match = useRouteMatch();
  // const history = useHistory();
  // const location = useLocation();
  // const params = useParams();

  // console.log('match', match);
  // console.log('history', history);
  // console.log('location', location);
  // console.log('params', params);

  return (
    <>
      <Switch>
        <Route path={`${match.path}/create`} exact component={CreatePopup} />
        <Route path={`${match.path}/edit`} component={EditPopup} />
        <Route path={`${match.path}/preview`} component={PreviewPopup} />
        <Route path={`${match.path}/delete`} component={DeletePopup} />
      </Switch>
      {isCreatePopupVisible && <CreatePopup></CreatePopup>}
      {isEditPopupVisible && <EditPopup></EditPopup>}
      {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
      {isDeletePopupVisible && <DeletePopup></DeletePopup>}
    </>
  );
};

export default Popups;
