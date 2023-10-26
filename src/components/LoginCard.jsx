import axios from 'axios';
import { useState } from 'react';
import useAuthStore from '../store/authStore';
import Cookies from 'js-cookie';

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });

      Cookies.set('accessTokenClient', response.data.accessToken, {
        expires: 1,
      });
      console.log(response.data.accessToken);
      console.log('data user');
      console.log(response.data.findUser.name);
      console.log(response.data.findUser);
      login({
        name: response.data.findUser.name,
        email: response.data.findUser.email,
        id: response.data.findUser.id,
      });
      console.log(response.data);
      alert('login succes!!!');
      window.location.reload();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  return (
    <div>
      {/* modal2 */}
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_2').showModal()}
        >
          Login
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-gray-50 ">
            {/* <!-- component --> */}
            <div className="flex justify-center self-center   z-10">
              <div className="p-12 bg-gray-50 mx-auto rounded-2xl w-100  ">
                <div className="mb-4">
                  <h3 className="font-semibold text-2xl text-gray-800">
                    Sign In{' '}
                  </h3>
                  <p className="text-gray-500">
                    Please sign in to your account.
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      type="email"
                      placeholder="mail@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                      />
                      <label
                        // for="remember_me"
                        className="ml-2 block text-sm text-gray-800"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-blue-500 hover:text-blue-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={loginUser}
                      className="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
                <div className="pt-5 text-center text-gray-400 text-xs">
                  <span>Copyright © 2023 paafff</span>
                </div>
              </div>
            </div>
            {/* component */}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      {/* modal2 */}
    </div>
  );
};

export default LoginCard;
