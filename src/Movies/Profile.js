import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backgroundImage from './images/l.avif';
import secondbackgroundImage from './images/z.webp';
import Navbar from './Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogout = () =>{
       localStorage.removeItem("Loggedin");
       localStorage.removeItem("currentUser");
      navigate("/LoginSignIn");
  };
     const [user, setUser] = useState({});
     const [showPassword, setShowPassword] = useState(false);

     const passwordVisibility = () => {
       setShowPassword(prevState => !prevState);
     };

     useEffect(() => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem('currentUser'));
        console.log('Stored User Data:', storedUserData); 
        if (storedUserData) {
            setUser(storedUserData);
        }
    } catch (error) {
        console.error('Error retrieving user data from localStorage:', error);
    }
}, []);
   

    return (
     
       <div>

       
       <Navbar/>


      <div className="h-screen flex bg-white mt-20">
      <div className="w-full object-cover flex flex-col">
        
      <div className=" h-1/4 items-center bg-blue-300 justify-center text-black text-2xl " style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <div className=' relative top-32  object-center h-36 mx-auto w-36 -mt-10  rounded-full overflow-hidden' style={{ backgroundImage: `url(${secondbackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> </div>
          
      </div>


      {/* <div className="border-r-2 border-gray-600 "></div> */}
      <div className="h-3/4 items-center justify-center  text-black text-2xl ">
       <div className=' items-start justify-start pt-6 w-full' >
       
       </div>
      

       <div className="text-center">
            <h3 className="text-4xl font-semibold leading-normal font-sans text-gray-900 mb-1 mt-14">
              {user.fname} {user.lname}
            </h3>
       </div>
       <div className="ml-12 mt-12 mr-12">
                <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                    <div className="w-full">
                        <div className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-col pt-4">
                                <div className=" text-gray-500 md:text-lg dark:text-gray-400">First Name</div>
                                <div className="text-lg font-semibold">{user.fname}</div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className=" text-gray-500 md:text-lg dark:text-gray-400">Email</div>
                                <div className="text-lg font-semibold">{user.email}</div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className=" text-gray-500 md:text-lg dark:text-gray-400">Password</div>
                                <div className="relative ">
              <input
                type={showPassword ? 'text' : 'password'}
                className="text-gray-700    text-lg font-semibold  w-[280px]"
                value={user.password}
                // readOnly
              />
              <button
                type="button"
                onClick={passwordVisibility}
                className="absolute inset-y-0 right-0 flex   items-center px-3 text-blue-500 hover:text-blue-700 text-lg "
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              </div>
                            </div>
                            <div></div>
                        </div>
                       
                    </div>
                    <div className="w-full">
                        <div className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-col pt-4">
                                <div className=" text-gray-500 md:text-lg dark:text-gray-400">Last Name</div>
                                <div className="text-lg font-semibold">{user.lname}</div>
                            </div>
                             
                            <div className="flex flex-col pt-4 ">
                                <div className=" text-gray-500 md:text-lg dark:text-gray-400">Location</div>
                                <div className="text-lg font-semibold">{user.location}</div>
                            </div>
                            <div></div>
                        </div>
                        
                    </div>
                    
                </div>
                </div>
                
      </div>
      <div className=" text-xl flex flex-col ">
                   <button onClick={handleLogout} type="button" className='border border-gray-300  text-white  flex justify-end ml-auto mr-2 mb-2   px-4 py-2 rounded cursor-pointer  hover:text-red-600 bg-black'>Logout</button>
                 </div>
      
          
      </div>
      
      
      
   </div>

     
     
   </div>


     );
 };

export default Profile;





