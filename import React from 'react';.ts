import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (window.location.hostname === 'blubridge.ai') {
  window.location.replace('https://www.blubridge.ai' + window.location.pathname);
}

ReactDOM.render(<App />, document.getElementById('root'));