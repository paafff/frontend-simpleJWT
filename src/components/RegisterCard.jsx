import axios from 'axios';
import { useState } from 'react';

const LoginCard = () => {
  const [registUserData, setRegistUserData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
  });

  const registUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/register', {
        name: registUserData.name,
        email: registUserData.email,
        password: registUserData.password,
        confPassword: registUserData.confPassword,
      });

      // console.log(registUserData);
      // console.log(response.data);
      alert('registration success!!!');
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
      {/* modal1 */}
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Register
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-gray-50 ">
            {/* <!-- component --> */}
            <div className="flex justify-center self-center   z-10">
              <div className="p-12 bg-gray-50 mx-auto rounded-2xl w-100  ">
                <div className="mb-4">
                  <h3 className="font-semibold text-2xl text-gray-800">
                    Sign Up{' '}
                  </h3>
                  <p className="text-gray-500">Please Sign Up your account.</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Name
                    </label>
                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      type=""
                      required
                      placeholder="Your Name"
                      value={registUserData.name}
                      onChange={(e) => {
                        setRegistUserData({
                          ...registUserData,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      type="email"
                      required
                      placeholder="mail@gmail.com"
                      value={registUserData.email}
                      onChange={(e) => {
                        setRegistUserData({
                          ...registUserData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={registUserData.password}
                      onChange={(e) => {
                        setRegistUserData({
                          ...registUserData,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Confirm Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={registUserData.confPassword}
                      onChange={(e) => {
                        setRegistUserData({
                          ...registUserData,
                          confPassword: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      onClick={registUser}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className="pt-5 text-center text-gray-400 text-xs">
                  <span>Copyright © 2023 paafff</span>
                </div>
              </div>
            </div>
            {/* <!-- component --> */}
          </div>
          <form method="dialog" className="modal-backdrop">
            {/* <div className='modal-action'> */}

            <button>close</button>
            {/* </div> */}
          </form>
        </dialog>
      </div>
      {/* modal1 */}
    </div>
  );
};

export default LoginCard;
