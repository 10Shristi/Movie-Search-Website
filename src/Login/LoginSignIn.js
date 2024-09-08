import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './f.avif';

const LoginSignIn = () => {
    const navigate = useNavigate();
    const [input,setInput] = useState({
        email: "",
        password: "",
    });
    
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showRegisterMessage, setShowRegisterMessage] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(false);
    
    
    function handleData(e){
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if(value.length!==0){
            setFormError({...formError,[name]: null})
        }
        if (name === 'email') {
            setShowRegisterMessage(false);
            
        } else if (name === 'password') {
            setPasswordMessage(false);
        }
        
    }
   

    const handleLogin = (e) => {
        e.preventDefault();
        const errors = validate(input);
        setFormError(errors);
        
    
        if (Object.keys(errors).length > 0) {
            setIsSubmit(false);
            return;
        }
    
        setIsSubmit(true);
    
        let users = JSON.parse(localStorage.getItem("users")) || [];
    
        const user = users.find(user => user.email === input.email);
    
        if (user) {
            if (user.password === input.password) {
                localStorage.setItem("Loggedin", true);
                localStorage.setItem("currentUser", JSON.stringify(user));
                
                navigate("/");
            } else {
                setPasswordMessage(true);
                // return;
            }
        } else {
            setShowRegisterMessage(true);
            setPasswordMessage(false);
        }
    };
    
        
    

    const validate = (values) => {
        const errors = {};
        const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

       
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regx.test(values.email)) {
            errors.email = "Invalid email format!";
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
                        <div className='mb-8'>
                            <h1 className='text-3xl font-medium'>Welcome Back</h1>
                            <p>Please enter your credentials to login!</p>
                        </div>
                        <form onSubmit={handleLogin} className="max-w-md w-full   px-8 pt-6 pmdb-8 mb-4">
        <div className="header mb-4">
            <h1 className="text-3xl mb-4 text-blue-700 font-bold">Sign In</h1>
        </div>
        
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email  </label>
        <input type="text" placeholder="Enter your email" name="email" value={input.email}  onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 '></input>
        {formError.email && <p className="text-red-500 text-xs italic">{formError.email}</p>}
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password  </label>
        <input type="text" placeholder="Enter your password" name="password" value={input.password} onChange={handleData} className='border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:placeholder-gray-500 '></input>
        {formError.password && <p className="text-red-500 text-xs italic">{formError.password}</p>}
        </div>
        <div>
            <button className='w-full text-xl bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Sign In</button>
        </div>
        {showRegisterMessage && (
                            <div className="mt-4 text-red-500 text-xm italic">
                                <p>User not found. Please register first!</p>
                                
                            </div>
                        )}
                        {passwordMessage && (
                            <div className="mt-4 text-red-500 text-xm italic">
                                <p>Wrong password!</p>
                                
                            </div>
                        )}

        <p className='text-sm mt-4 text-black'>Don't have an account?</p>
        <Link to = "/loginSignUp" className="text-blue-500 hover:text-blue-800"><u>Register here</u>
        </Link>
        </form>

                    </div>
                </div>
               </div>

            </div>

        </div>
        
      
    
    </React.Fragment>
  )
}

export default LoginSignIn
