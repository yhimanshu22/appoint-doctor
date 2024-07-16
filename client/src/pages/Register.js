import React from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import rootUrl from "../Data/proxy";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler
  const onFinishHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    try {
      dispatch(showLoading());
      const res = await axios.post(`${rootUrl}/api/v1/user/register`, values);
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-bold text-center mb-4">Register Form</h3>
        <form onSubmit={onFinishHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
            <span>Already a user?</span><Link to="/login" className="text-blue-500 hover:text-blue-700 text-sm"> Login here</Link>
            </div>
           
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
