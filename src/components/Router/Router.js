import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Record from '../Record/Record';
import List from '../List/List';
import App from '../../App';
import Detail from '../Detail/Detail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/record" element={<Record />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
