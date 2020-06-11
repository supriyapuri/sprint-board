// import firebase from 'firebase';
// import React from 'react';
// import NewTask from '../Components/NewTask';
// import { shallow } from 'enzyme';

// const fakeUid = {uid: "fakeUid"};

// const auth = jest.fn(() => {
//     return {
//         currentUser: fakeUid
//     }
// });

// firebase.auth() = auth;

// const add = jest.fn();
// const doc = jest.fn(() =>{
//     return {collection};
// })

// const collection = jest.fn();

// when(collection).calledWith('tasks').mockReturnValue({add});
// when(collection).calledWith('users').mockReturnValue(doc)

// const firestore = () => {

// }



// describe('AddTask', () => {
//   it('successfully adds task', async () => {
//     const element = shallow(<AddTask />);
//     element.state()
//     const data = { title: 'test', category: 'test2' }
//     await wrapped({
//       data: () => ({
//         title: 'test'
//       }),
//       ref:{
//         set: jest.fn()
//       }
//     })
//   })
// })

// const mockQueryResponse = jest.fn()
// mockQueryResponse.mockResolvedValue([
//   {
//     id: 1
//   }
// ])
// jest.mock('firebase-admin', () => ({
//   initializeApp: jest.fn(),
//   firestore: () => ({
//    collection: jest.fn(path => ({
//      where: jest.fn(queryString => ({
//        get: mockQueryResponse
//      }))
//    })) 
//   })
// }))


// test('NewTask onEntryChange', () => {
//     const element = shallow(<NewTask />);
//     console.log(element.instance().onEntryChange);
//     console.log(element.state('tasks'));
//     element.instance().handleInputChange({
//         target: { value: 'new text' }
//     });
//     console.log(element.state('tasks'))

// })