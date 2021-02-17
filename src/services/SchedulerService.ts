import firebase from './firebase/config';
import { IEvent, ICreatedEvent } from '../redux/interfaces';

export default class SchedulerService {
  private _apiBase = (uid?: string) => {
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

  public getEvents = async (uid?: string) => {
    const snapshot = await this._getResource(this._apiBase(uid)).once('value');

    // ??
    if (!snapshot.exists) {
      throw new Error(`Не удалось получить ${snapshot.ref} }`);
    }

    const events: IEvent = this._transformEvents(snapshot);

    return events;
  };

  public addEvent = async (newEvent: ICreatedEvent) => {
    const res = await this._getResource(this._apiBase()).push(newEvent);
    const event: IEvent = this._transformEvent(newEvent, res.key!.toString());

    return event;
  };

  public removeEvent = async (id: string) => {
    await this._getResource(`${this._apiBase()}/${id}`).remove();
  };

  public editEvent = async (
    id: string,
    date: string,
    updates: { title: string; descr: string }
  ) => {
    await this._getResource(`${this._apiBase()}/${id}`).update(updates);

    const { title, descr } = updates;
    const newEvent: IEvent = {
      [date]: {
        title,
        descr,
        id,
      },
    };

    return newEvent;
  };

  private _transformEvent = (newEvent: ICreatedEvent, id: string) => {
    return {
      [newEvent.time.toString()]: {
        title: newEvent.title,
        descr: newEvent.descr,
        id: id,
      },
    };
  };
  private _transformEvents = (snapshot: firebase.database.DataSnapshot) => {
    const events: IEvent = {};

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
