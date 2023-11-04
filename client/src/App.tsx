import './App.css';
import { Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
