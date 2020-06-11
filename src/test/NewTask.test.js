import React from 'react';
import NewTask from '../Components/NewTask';
import { shallow } from 'enzyme';
import firebase from 'firebase';




test('NewTask onEntryChange', () => {
    //firebase.initializeApp(config);
    const element = shallow(<NewTask />);
    console.log(element.instance().onEntryChange);
    console.log(element.state('tasks'));
    element.instance().handleInputChange({
        target: { value: 'new text' }
    });
    console.log(element.state('tasks'))

})