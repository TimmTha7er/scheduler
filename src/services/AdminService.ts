import firebase from './firebase/config';
import { IUser, IEvent, ICreatedEvent } from '../redux/interfaces';

export default class AdminService {
  editUser = async () => {
    // const cityRef = firebase.firestore().collection('cities').doc('DC');
    // // Set the 'capital' field of the city
    // const res = await cityRef.update({capital: true});
  };

  // getEvents = async (uid: string) => {
  //   const snapshot = await firebase
  //     .database()
  //     .ref(`calendar/users/${uid}/events`)
  //     .once('value');

  //   // ??
  //   if (!snapshot.exists) {
  //     throw new Error(`Не удалось получить ${snapshot.ref} }`);
  //   }

  //   const events: IEvent = this._transformEvents(snapshot);

  //   return events;
  // };

  getUserById = async (id: string) => {
    const user = await firebase.firestore().collection('users').doc(id).get();

    if (!user.exists) {
      throw new Error(
        `Не удалось получить пользователя со следующим id: ${id} }`
      );
    }

    const userData = user.data() as IUser;

    return userData;
  };

  getUsers = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'user')
      .get();

    if (snapshot.empty) {
      throw new Error(
        `Не удалось получить пользователя список пользователей }`
      );
    }

    const users: IUser[] = [];
    snapshot.forEach((doc) => {
      users.push(doc.data() as IUser);
    });

    return users;
  };

  // _transformEvents = (snapshot: firebase.database.DataSnapshot) => {
  //   const events: IEvent = {};

  //   snapshot.forEach((childSnapshot) => {
  //     const { descr, time, title } = childSnapshot.val();

  //     events[time] = {
  //       descr,
  //       title,
  //       id: childSnapshot.key || '',
  //     };
  //   });

  //   return events;
  // };
}
