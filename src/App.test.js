import React from 'react';
import ReactDOM from 'react-dom';
import Tutoriais from './Components/Tutoriais';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
