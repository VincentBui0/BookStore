import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Show from './pages/Show';
import Edit from './pages/Edit';
import Delete from './pages/Delete';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='books/addnew' element={<AddNew />} />
      <Route path='books/details/:id' element={<Show />}/>
      <Route path='books/edit/:id' element={<Edit />}/>
      <Route path='books/delete/:id' element={<Delete />}/>
    </Routes>
  )
}

export default App