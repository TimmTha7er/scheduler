import firebase from '../firebase/config';

// ADD EVENT
// const res = db.ref('calendar').push({
//   'Thu Jan 14 2021 07:00:00 GMT+0300': {
//     title: 'Покормить кота',
//     descr:
//       '1 ) взять корм\n2 ) наложить в мисочку\n3 ) позвать кота\n4 ) пожелать приятного аппетита\n5 ) погладить\n6 ) если мало - подложить еще',
//   },
// });

// // GET ALL EVENTS
// db.ref('calendar').on('value', (snapshot) => {
//   const eventsList: any = [];

//   snapshot.forEach((childSnapshot) => {
//     const eventKey = childSnapshot.key;
//     const eventData = childSnapshot.val();

//     eventsList.push({ id: eventKey, event: eventData });
//   });

//   console.log(eventsList);
// });

// DELETE EVENT by id
// const id = '-MR5lD9IvaKsh9oeFlsA';
// db.ref('calendar').child('-MR5lD9IvaKsh9oeFlsA').remove();
// или
// db.ref(`calendar/i${d}`).remove();

// update event by id
// db.ref('calendar')
//   .child('-MR5l-pz5LyQJWgBEqTC')
//   .update({
//     ['Thu Jan 14 2021 07:00:00 GMT+0300']: {
//       title: 'не покормить кота',
//     },
//   });

// // UPDATE all EVENT by id
// const id = '-MR5l-pz5LyQJWgBEqTC';
// db.ref(`calendar/${id}`)
//   // .child('-MR5l-pz5LyQJWgBEqTC')
//   .update({
//     'Thu Jan 14 2021 07:00:00 GMT+0300': {
//       title: 'Покормить кота',
//       descr:
//         '1 ) взять корм\n2 ) наложить в мисочку\n3 ) позвать кота\n4 ) пожелать приятного аппетита\n5 ) погладить\n6 ) если мало - подложить еще',
//     },
//   });

// UPDATE title of EVENT
// const id = '-MR5l-pz5LyQJWgBEqTC';
// db.ref(`calendar/${id}/Thu Jan 14 2021 07:00:00 GMT+0300/`)
//   // .child('-MR5l-pz5LyQJWgBEqTC')
//   .update({
//     title: 'Покормить кота',
//   });

export default class SchedulerStoreService {
  _getResource = (url: string) => {
    return firebase.database().ref(`${url}`);
  };

  getEvents = async () => {
    const snapshot = await this._getResource('calendar').once('value');
    // const events: {}[] = [];

    if (!snapshot.exists()) {
      throw new Error(`Не удалось получить ${snapshot.ref} }`);
    }

    const events: any = {};

    snapshot.forEach((childSnapshot) => {
      const { descr, time, title } = childSnapshot.val();

      events[time] = {
        descr,
        title,
        id: childSnapshot.key,
      };
      // console.log('childSnapshot', {
      //   [time]: {
      //     descr,
      //     title,
      //     id: childSnapshot.key,
      //   },
      //   // ...childSnapshot.val(),
      //   // id: childSnapshot.key,
      // });
    });

    // snapshot.forEach((childSnapshot) => {
    //   events.push({
    //     id: childSnapshot.key,
    //     event: childSnapshot.val(),
    //   });
    // });

    // console.log('events', events);

    return events;
    // return snapshot.val();
  };

  addEvent = async (newEvent: any) => {
    // const event = await this._getResource(`calendar`).push(newEvent, () =>
    //   console.log('Add event succeeded.')
    // );
    const event = await this._getResource(`calendar`)
      // .push(newEvent, () => console.log('Add event succeeded.'))
      .push(newEvent);

    // console.log({ ...newEvent, id: event.key });
    const result = {
      [newEvent.time.toString()]: {
        title: newEvent.title,
        descr: newEvent.descr,
        id: event.key,
      },
    };

    return result;
    // return newEvent;
  };

  removeEvent = async (id: string) => {
    await this._getResource(`calendar/${id}`).remove(() =>
      console.log('Remove succeeded.')
    );
  };

  editEvent = async (eventId: string, eventDate: string, updates: {}) => {
    await this._getResource(
      `calendarfdsf/${eventId}/${eventDate}/`
    ).update(updates, () => console.log('Update succeeded.'));
  };
}
