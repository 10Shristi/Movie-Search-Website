import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './f.avif';



const LoginSignUp = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        location: "",
    });
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [ fname, setFname]= useState("");
    const [userExistsMessage, setUserExistsMessage] = useState("");

   
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            if (localStorage.getItem("users")) {
                let users = JSON.parse(localStorage.getItem("users"));
                
                let userExists = false;

                users.forEach(user => {
                    if (user.email === input.email) {
                        userExists = true;
                    }
                });
                if (!userExists) {
                    users.push({ ...input, Loggedin: true });
                    localStorage.setItem('users', JSON.stringify(users));
                } else {
                    setUserExistsMessage("User with this email already exists!");
                    setIsSubmit(false);
                     return;
                }
            } else {
                let users = [{ ...input, Loggedin: true }];
                localStorage.setItem('users', JSON.stringify(users));
                
            }

            
            navigate("/LoginSignIn");
        }
    }, [formError, input, isSubmit, navigate]);

    const handleData = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if(value.length!==0){
            setFormError({...formError,[name]: null})
            setUserExistsMessage(false)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(input);
        setFormError(errors);
        if(Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    };
  

    const validate = (values) => {
        const errors = {};
        const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (!values.fname && values.fname ==="") {
            errors.fname = "First name is required!";
        }
        
        if (!values.lname) {
            errors.lname = "Last name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regx.test(values.email)) {
            errors.email = "Invalid email format!";
        }
        if (!values.location) {
            errors.location = "Location is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }

        return errors;
    };

    

    return (
        <React.Fragment>
            <div className='flex flex-col flex-auto w-full h-screen bg-white'>
            <div className='h-full'>
               <div className='grid grid-cols-3 h-full'>
                <div className='bg-blue-400' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
                <div className='col-span-2 flex justify-center items-center'>
                    <div className='min-w-[450] px-8'>
                        
                        <form onSubmit={handleSubmit} className=" w-full  pt-6 pb-8 mb-4">
                    <div className="header mb-4">
                        <h1 className="text-4xl mb-4 text-blue-700 font-bold">Registration</h1>
                    </div>
                    <div className='flex space-x-4 mb-4'>
                    <div className="w-1/2">
                        <label aria-required className="block text-gray-700 text-sm font-bold mb-2 "> First Name  </label>
                        <input type="text" placeholder="Enter your first name" name="fname" value={input.fname} onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 ' />
                        {formError.fname && <p className="text-red-500 text-xs italic">{formError.fname}</p>}
                    </div>
                    <div className="w-1/2 " >
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name  </label>
                        <input type="text" placeholder="Enter your last name" name="lname" value={input.lname} onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 ' />
                        {formError.lname && <p className="text-red-500 text-xs italic">{formError.lname}</p>}
                    </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email  </label>
                        <input type="text" placeholder="Enter your email" name="email" value={input.email} onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 w-full' />
                        {formError.email && <p className="text-red-500 text-xs italic">{formError.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Location  </label>
                        <input type="text" placeholder="Enter your location" name="location" value={input.location} onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 w-full' />
                        {formError.location && <p className="text-red-500 text-xs italic">{formError.location}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password  </label>
                        <input type="password" placeholder="Enter your password" name="password" value={input.password} onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 w-full' />
                        {formError.password && <p className="text-red-500 text-xs italic">{formError.password}</p>}
                    </div>
                    <div>
                        <button className='w-full text-xl bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'  type="submit">Sign Up</button>
                    </div>
                    {userExistsMessage && <p className="text-red-500 text-xs italic mt-4">{userExistsMessage}</p>}
                    <p className='text-sm mt-4 text-black'>Already have an account?</p>
                    <Link to="/loginSignIn " className="text-blue-500 hover:text-blue-800"><u>Login here</u></Link>
                </form>

                    </div>
                </div>
               </div>

            </div>

        </div>
           
        </React.Fragment>
    )
}

export default LoginSignUp;

