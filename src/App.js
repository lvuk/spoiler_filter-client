import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error, Login, Reviews } from './pages';
import UserReviews from './pages/UsersReviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/myreviews' element={<UserReviews />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
