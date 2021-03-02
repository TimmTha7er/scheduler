import firebase from './firebase/config';
import { Event, CreatedEvent, EditedEvent, User } from '../redux/types';

export default class SchedulerService {
  private _apiBase = (uid?: User['id']) => {
    return uid
      ? `calendar/users/${uid}/events`
      : `calendar/users/${this._getUid()}/events`;
  };

  private _getResource = (url: string) => {
    return firebase.database().ref(`${url}`);
  };

  private _getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : undefined;
  }

  public getEvents = async (uid?: User['id']) => {
    const snapshot = await this._getResource(this._apiBase(uid)).once('value');

    if (!snapshot.exists) {
      throw new Error(`Не удалось получить ${snapshot.ref} }`);
    }

    const events: Event = this._transformEvents(snapshot);

    return events;
  };

  public addEvent = async (newEvent: CreatedEvent) => {
    const res = await this._getResource(this._apiBase()).push(newEvent);
    const event: Event = this._transformEvent(newEvent, res.key!.toString());

    return event;
  };

  public removeEvent = async (id: string) => {
    await this._getResource(`${this._apiBase()}/${id}`).remove();
  };

  public editEvent = async (
    id: EditedEvent['id'],
    date: EditedEvent['date'],
    updates: EditedEvent['updates']
  ) => {
    await this._getResource(`${this._apiBase()}/${id}`).update(updates);

    const { title, descr } = updates;
    const newEvent: Event = {
      [date]: {
        title,
        descr,
        id,
      },
    };

    return newEvent;
  };

  private _transformEvent = (newEvent: CreatedEvent, id: string) => {
    return {
      [newEvent.time.toString()]: {
        title: newEvent.title,
        descr: newEvent.descr,
        id: id,
      },
    };
  };
  private _transformEvents = (snapshot: firebase.database.DataSnapshot) => {
    const events: Event = {};

    snapshot.forEach((childSnapshot) => {
      const { descr, time, title } = childSnapshot.val();

      events[time] = {
        descr,
        title,
        id: childSnapshot.key || '',
      };
    });

    return events;
  };
}
