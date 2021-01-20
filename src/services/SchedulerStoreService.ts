import firebase from '../firebase/config';
import { IEvent, ICreatedEvent } from '../redux/interfaces';

export default class SchedulerStoreService {
  _getResource = (url: string) => {
    return firebase.database().ref(`${url}`);
  };

  getEvents = async () => {
    const snapshot = await this._getResource('calendar').once('value');

    if (!snapshot.exists()) {
      throw new Error(`Не удалось получить ${snapshot.ref} }`);
    }

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

  addEvent = async (newEvent: ICreatedEvent) => {
    const event: any = await this._getResource(`calendar`).push(newEvent, () =>
      console.log('Add event succeeded.')
    );

    const result: IEvent = {
      [newEvent.time.toString()]: {
        title: newEvent.title,
        descr: newEvent.descr,
        id: event.key,
      },
    };

    return result;
  };

  removeEvent = async (id: string) => {
    await this._getResource(`calendar/${id}`).remove(() =>
      console.log('Remove succeeded.')
    );
  };

  // editEvent = async (eventId: string, eventDate: string, updates: {}) => {
  editEvent = async (id: string, updates: { title: string; descr: string }) => {
    await this._getResource(`calendar/${id}/`).update(updates, () =>
      console.log('Update succeeded.')
    );
  };
}
