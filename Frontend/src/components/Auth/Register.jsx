import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Eye,  EyeClosed } from 'lucide-react';

const Register = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',          // Validate on first change
    reValidateMode: 'onChange', // Revalidate on every change
  });

  const [showPassword, setShowPassword]= useState(false)

  const handleShowPassword = () => {
   
    setShowPassword((prev) => !prev)
  }




  const onSubmit = async (data) => {
    try {
      console.log('Registration form submitted', data);

      const response = await axios.post('http://localhost:3001/api/auth/register', data);

      if (response.status === 201) {
        alert('Registration successful!');
        // Optional: reset form or redirect to login
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        // Server responded with a non-2xx status
        alert(error.response.data.message || 'Registration failed');
      } else {
        // Unexpected error (like network failure)
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };


  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <form className='bg-amber-50 min-h-[65vh] h-auto p-8 text-black flex flex-col gap-4 rounded-3xl justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-2xl font-bold' >Create an account</h2>
        <div className='flex flex-col text-left gap-3'>
          <div className='flex flex-col  justify-center text-left'>
            <label className='text-left' htmlFor="name" >full name</label>
            <input
              id="name"
              type="text"
              className='border-2 border-black text-sm  px-[5px] py-3 rounded-2xl w-[350px]'
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
                },
              })}
            />
            {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
          </div>

          <div className='flex flex-col  justify-center text-left'>
            <label htmlFor="email" >email</label>
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
            <label htmlFor="password" >password</label>
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
            {errors.password && <div className='text-red-500' >{ errors.password.message}</div>}
            </div>
          </div>

        {/* <div className={styles.inputGroup}>
          <label htmlFor="mobile" className={styles.label}>Mobile Number</label>
          <input
            id="mobile"
            type="text"
            className={styles.input}
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile number must be 10 digits',
              },
            })}
          />
          {errors.mobile && <div className={styles.error}>{errors.mobile.message}</div>}
        </div> */}

       

        <button
        className='bg-amber-600 px-4 py-2 border-black border-2 rounded-2xl  w-[350px] hover:bg-amber-500 duration-200 ease-in-out' 
        type="submit" >
          Register
        </button>

        <p >
          Already have an account?{' '}
          <Link to="/login" className='text-blue-700'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;