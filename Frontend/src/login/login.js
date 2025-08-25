
import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

const Login = () => {
     // const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let email = e.target.elements.email?.value;
        let password = e.target.elements.password?.value;

        try{
          const res = await fetch("http://localhost:5000/api/login", {
               method:"POST",
               headers: {
                    "Content-type":"application/json",
               },
               body: JSON.stringify({email,password}),
          });

          if(!res.ok){
               throw new Error("Invalid login credentials");
          }
          const data = await res.json();

          localStorage.setItem("token",data.access_token);
        
          toast.success("Login successful!");
          window.location.href = "/dashboard";

          }catch(err){
               toast.error(err.message);
          }  
    };

    const classes = {
        pageBody: 'h-screen flex bg-gray-bg1',
        formContainer:
            'w-full max-w-md    m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16',
        formHeading: 'text-2xl  font-medium text-primary mt-4 mb-12 text-center',
        btnContainer: 'flex justify-center items-center mt-6',
    };
    return (
        <div className={classes.pageBody}>
            <div className={classes.formContainer}>
                <h1 className={classes.formHeading}>
                    Log in to your account 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <input
                        id='email'
                        label='Email'
                        type='email'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        placeholder='Your email'
                    />
                    <input
                        id='password'
                        label='Password'
                        type='password'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        placeholder='Your Password'
                    />

                    <div className={classes.btnContainer}>
                        <button type='submit'                             
                        className={`bg-green py-2 px-4 text-sm text-white
                          rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Continue with Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;