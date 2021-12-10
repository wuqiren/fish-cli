import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './route';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map((item) => {
          return <Route path={item.path} key={item.path} element={item.component} />;
        })}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
