import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Eye,  EyeClosed } from 'lucide-react';
import api from '../../lib/axios';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword]= useState(false)

  const handleShowPassword = () => {
   
    setShowPassword((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = async (data) => {
  try {
    const response = await api.post('/login', data, {
      withCredentials: true, // to send and receive cookies
    });

    console.log('Response headers:', response.headers); // just to check cookies or other headers

    if (response.status === 200) {
      console.log('Login successful!');
      // No localStorage usage anymore

      // Navigate to dashboard or protected route
      navigate('/home'); // adjust the route as per your app
    }
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.log(error.response.data.message || 'Login failed');
    } else {
      console.log('An unexpected error occurred. Please try again.');
    }
  }
};


  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <form className='bg-amber-50 h-[65vh] p-8 text-black flex flex-col gap-4 rounded-3xl justify-center items-center'  onSubmit={handleSubmit(onSubmit)}>

      <h2 className='text-2xl font-bold'>Login to your account</h2>

        <div className='flex flex-col text-left gap-3'>
          <div className='flex flex-col  justify-center text-left' >
            <label className='text-left' htmlFor="email" >Email</label>
            <input
              id="email"
              type="email"
              className='border-2 border-black text-sm  px-[5px] py-3 rounded-2xl w-[350px]'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
          </div>

          <div className='flex flex-col  justify-center text-left'>
            <label className='text-left' htmlFor="password" >Password</label>
            <div className='relative'>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className='border-2 border-black text-sm  px-[5px] py-3 rounded-2xl w-[350px]'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              /> 
                <button
                type="button"
                className='absolute inset-y-0 right-0 flex items-center px-3' 
                onClick={handleShowPassword}>
                  {showPassword ? <Eye/> : <EyeClosed/>}
                </button>
            </div>
            {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
          </div>
        </div>

        <button className='bg-amber-600 px-4 py-2 border-black border-2 rounded-2xl  w-[350px] hover:bg-amber-500 duration-200 ease-in-out' type="submit">
          Login
        </button>

        <p >
          Don't have an account?{' '}
          <Link to="/register" className='text-blue-700' >Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;