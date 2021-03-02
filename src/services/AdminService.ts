import moment from 'moment';
import 'moment/locale/ru';
import firebase from './firebase/config';
import { AdminState, User } from '../redux/types';

export default class AdminService {
  public editUser = async (user: User) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .update(this._transformUser(user));
  };

  public getUserById = async (id: User['id']) => {
    const user = await firebase.firestore().collection('users').doc(id).get();

    if (!user.exists) {
      throw new Error(
        `Не удалось получить пользователя со следующим id: ${id} }`
      );
    }

    const userData = user.data() as User;

    return userData;
  };

  public getUsers = async (
    orderBy: AdminState['sortBy'],
    order: AdminState['order']
  ) => {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'user')
      .orderBy(orderBy, order)
      .get();

    if (snapshot.empty) {
      throw new Error(
        `Не удалось получить пользователя список пользователей }`
      );
    }

    const users: User[] = this._transformUsers(snapshot);

    return users;
  };

  private _transformUsers = (snapshot: firebase.firestore.QuerySnapshot) => {
    const users: User[] = [];

    snapshot.forEach((doc) => {
      const { id, role, createdAt, firstName, email } = doc.data();
      const date = moment(new Date(1970, 0, 1).setSeconds(createdAt.seconds))
        .clone()
        .format('DD MM YYYY, HH:mm');

      users.push({ id, firstName, email, role, createdAt: date });
    });

    return users;
  };

  private _transformUser = (user: User) => {
    const newUser = { ...user };
    delete newUser.createdAt;

    return newUser;
  };
}
