import firebase from './firebase/config';
import { IEvent, ICreatedEvent } from '../redux/interfaces';

export default class SchedulerService {
  _apiBase = 'calendar';

  _getResource = (url: string) => {
    return firebase.database().ref(`${url}`);
  };

  getEvents = async () => {
    const snapshot = await this._getResource(this._apiBase).once('value');

    if (!snapshot.exists()) {
      throw new Error(`Не удалось получить ${snapshot.ref} }`);
    }

    const events: IEvent = this._transformEvents(snapshot);

    return events;
  };

  addEvent = async (newEvent: ICreatedEvent) => {
    const res = await this._getResource(`${this._apiBase}`).push(newEvent);
    const event: IEvent = this._transformEvent(newEvent, res.key!.toString());

    return event;
  };

  removeEvent = async (id: string) => {
    await this._getResource(`${this._apiBase}/${id}`).remove();
  };

  editEvent = async (id: string, updates: { title: string; descr: string }) => {
    await this._getResource(`${this._apiBase}/${id}/`).update(updates);
  };

  _transformEvent = (newEvent: ICreatedEvent, id: string) => {
    return {
      [newEvent.time.toString()]: {
        title: newEvent.title,
        descr: newEvent.descr,
        id: id,
      },
    };
  };
  _transformEvents = (snapshot: firebase.database.DataSnapshot) => {
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
