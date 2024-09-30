import React from 'react';
import { Button } from '@material-tailwind/react';
import Employees from './pages/dashboard/employees'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up';
import Home from './pages/dashboard/home';
import Routes from './routes';

function App() {
  return (
    // <div className="flex justify-center items-center h-screen">
    //   <Button>Click Me!</Button>
    // </div>
    // <Employees />
    // <SignIn />
    // <SignUp />
    // <Home/>
    <Routes/>
  );
}

export default App;