import React from 'react';
import ReactDOM from 'react-dom/client';
import RainbowColorBoxApp from './RainbowColorBox/App';
import TodoListApp from './TodoList/App';
import worker from './TodoList/TodoMockServer/browser';

import UseContextApp from './UseContext/App';
import UseMemoApp from './UseMemo/App';
import UseCallbackApp from './UseCallback/App';
import CustomHooksApp from './CustomHooks/App';

async function prepare() {
  await worker.start();

  return Promise.resolve();
}

prepare().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(<RainbowColorBoxApp />);
  root.render(<TodoListApp />);
  // root.render(<UseContextApp />);
  // root.render(<UseMemoApp />);
  // root.render(<UseCallbackApp />);
  // root.render(<CustomHooksApp />);
});
