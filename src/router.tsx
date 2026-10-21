import { Navigate, Route, Routes } from 'react-router-dom';
import Favorites from '@pages/favorites';
import Home from '@pages/home';
import type { JSX } from 'react';
import { Layout } from '@components/index';

const Router = (): JSX.Element => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index={true} element={<Home />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  </Routes>
);

export default Router;
