import firebase from './firebase/config';
import { IUser } from '../redux/interfaces';

export default class AuthService {
  // auth
  signUp = async (email: string, password: string, firstName: string) => {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (!res.user) {
      throw new Error(
        `Не удалось создать пользователя с email: ${email}, password: ${password}, first name: ${firstName} }`
      );
    }

    const userData: IUser = {
      email: email,
      firstName: firstName,
      id: res.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await firebase
      .firestore()
      .collection('/users')
      .doc(res.user.uid)
      .set(userData);
    await res.user.sendEmailVerification();

    return userData;
  };

  signIn = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  signOut = async () => {
    await firebase.auth().signOut();
  };

  sendPasswordResetEmail = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

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
}
