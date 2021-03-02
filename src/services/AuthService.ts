import firebase from './firebase/config';
import { User } from '../redux/types';

export default class AuthService {
  public signUp = async (
    email: User['email'],
    password: string,
    firstName: User['firstName']
  ) => {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (!res.user) {
      throw new Error(
        `Не удалось создать пользователя с email: ${email}, password: ${password}, first name: ${firstName} }`
      );
    }

    const userData: User = {
      email: email,
      firstName: firstName,
      id: res.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      role: 'user',
    };

    await firebase
      .firestore()
      .collection('/users')
      .doc(res.user.uid)
      .set(userData);
    await res.user.sendEmailVerification();

    return userData;
  };

  public signIn = async (email: User['email'], password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  public signOut = async () => {
    await firebase.auth().signOut();
  };

  public sendPasswordResetEmail = async (email: User['email']) => {
    await firebase.auth().sendPasswordResetEmail(email);
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
}
