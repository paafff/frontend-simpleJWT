import React, { useState } from 'react';
import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard';
import useAuthStore from './store/authStore';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {
  const [userDataGetme, setUserDataGetme] = useState('');
  // const [auth, setAuth] = useState(false);
  // const [remainingTime, setRemainingTime] = useState(30); // Set remaining time in seconds
  // const [timerRunning, setTimerRunning] = useState(false);
  const { loggedIn, user, logout } = useAuthStore();

  const accessToken = Cookies.get('accessTokenClient');

  const userGetme = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserDataGetme(response.data);
      console.log(response.data);
      // startTimer(); // Start the timer after a successful request
    } catch (error) {
      if (error.response) {
        if (error.response) {
          alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
        } else {
          console.log(error); // Menampilkan error pada konsol
        }
      }
    }
  };

  const increaseToken = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/access-token'
        //  {
        //   headers: { Authorization: `Bearer ${accessToken}` },
        // }
      );

      console.log(response.data);
      Cookies.set('accessTokenClient', response.data.accessToken, {
        expires: 1,
      });

      window.location.reload();
    } catch (error) {
      console.log(error); // Menampilkan error pada konsol
    }
  };

  // if (accessToken !== null) {
  //   loggedIn = true;
  // }

  // const startTimer = () => {
  //   if (!timerRunning) {
  //     setTimerRunning(true);
  //     const intervalId = setInterval(() => {
  //       if (remainingTime > 0) {
  //         setRemainingTime((prevTime) => prevTime - 1);
  //       } else {
  //         clearInterval(intervalId);
  //         setTimerRunning(false);
  //         setRemainingTime(30); // Reset the timer to 30 seconds
  //       }
  //     }, 1000);
  //   }
  // };

  if (accessToken !== null) {
    return (
      <div className="min-h-screen flex flex-col justify-center">
        {/* modal */}
        <div className="flex flex-row justify-center space-x-5">
          <RegisterCard />
          <LoginCard />
        </div>
        <div className="flex flex-col justify-center items-center space-y-2 py-5">
          <p>
            data from local storage zustand, only logout can remove this
            state,login again to fill the state
          </p>
          <p>name (zustand) : {user?.name}</p>
          <p>email (zustand) : {user?.email}</p>
          <button className="btn" onClick={logout}>
            logout
          </button>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2 py-5">
          {/* {timerRunning && (
          <p>
            Refresh in {remainingTime} second{remainingTime !== 1 ? 's' : ''}
          </p>
        )} */}
          <p>
            data from server with token active only 60 second, after that token
            will be expired and cant click getme button, you should re-login or
            click +token to increase/generate new access token
          </p>
          <p>name (getme) : {userDataGetme?.name}</p>
          <p>email (getme) : {userDataGetme?.email}</p>
          <div className="flex flex-row space-x-5">
            <button className="btn" onClick={userGetme}>
              getMe
            </button>
            <button className="btn" onClick={increaseToken}>
              +Token
            </button>
          </div>
        </div>

        {/* modal */}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col justify-center">
        {/* modal */}
        <div className="flex flex-row justify-center space-x-5">
          <RegisterCard />
          <LoginCard />
        </div>
        <div className="flex flex-col justify-center items-center space-y-2 py-5">
          <p>Create account first, then login</p>
        </div>

        {/* modal */}
      </div>
    );
  }
};

export default App;
