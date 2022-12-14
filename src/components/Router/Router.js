import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Record from '../Record/Record';
import Detail from '../Detail/Detail';
import Todo from '../Todo/Todo';
import Domains from '../Domains/Domain';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Domains />} />
        <Route path="/record" element={<Record />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
