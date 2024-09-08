import React,{useEffect, useState, useRef} from 'react'
import { FaStar } from "react-icons/fa";

function Rating({movieTitle}) {

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [displayreviews, setDisplayReviews] = useState([]);
    const [user, setUser] = useState({});
    const [userMessage, setUserMessage]= useState(false)
    const [message, setmessage]= useState(false)
    const [hover,setHover]= useState(0)
    const messageEndRef = useRef(null)
   
    
    const handleRatingChange = (currentRate) => {
      setRating(currentRate);
      console.log("Current Rating", currentRate); 
      setmessage(false)
      setUserMessage(false)
      // setHover(null)
  };

   const handleSubmit=(e)=>{
    e.preventDefault();
    const existingReview = displayreviews.find(review => review.user.fname === user.fname);

    if (existingReview) {
      
      setUserMessage(true)
      setRating(0)
      setReview("")
      return;
    }
    
    const movieReview = {

      movieTitle:movieTitle,    
      rating: rating,
      review: review,
      user: user,
    };

    if(rating!== 0 || review !=="" ){
      const existingReviews =  JSON.parse(localStorage.getItem("movieReview")) ;
      const updatedReviews = Array.isArray(existingReviews) ? [...existingReviews, movieReview] : [movieReview];
    
      localStorage.setItem('movieReview', JSON.stringify(updatedReviews));
    
      const filteredReviews = updatedReviews.filter(review => review.movieTitle === movieTitle);
      setDisplayReviews(filteredReviews);
     
    }
   
    else{
     setmessage(true)
    }
   
    
    setRating(0);
    setReview(""); 
   
    
   }
   const handleReviewChange=(e)=>{
    setReview(e.target.value);
    setmessage(false)
    setUserMessage(false)
    
   }

 
  useEffect(() => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUserData) {
        setUser(storedUserData);
      }
    } catch (error) {
      console.error('Error retrieving user data from localStorage:', error);
    }
    const storedReviews = JSON.parse(localStorage.getItem("movieReview")) || [];
    const filteredReviews = storedReviews.filter(review => review.movieTitle === movieTitle);
    setDisplayReviews(filteredReviews);
  }, [movieTitle]);

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView();
  },[review,rating])
  
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center'>
        <p className='text-blue-400'> How was the movie?</p>
          </div>

      
      <div className='flex justify-center mt-3'>
        
      {[...Array(5)].map((star,index)=>{
        const currentRate = index+1;
        return(
            
                <label key={currentRate}>
                   <input type="radio" name="rate" className='hidden' 
                   value={currentRate}
                   onClick={() => handleRatingChange(currentRate)}
                   />
                  
                    <FaStar
              color={currentRate <= (hover || rating) ? "yellow" : "gray"}
              className='cursor-pointer size-6 ml-4 mr-4'
              onMouseEnter={() => setHover(currentRate)}
              onMouseLeave={() => setHover(0)}
            />
                 
                </label>
        )
      })
      }
    </div>

    <div className='flex justify-center '>
    
    <textarea placeholder='Write your review...' value={review} onChange={handleReviewChange} className='mt-4 p-2  bg-slate-800 rounded flex justify-center w-[300px] h-20 text-white'/>
    
    </div>
    <div className='flex justify-center'>
    <button type= "submit" className=' text-xm mt-5 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[300px]'>Rate Now</button>
      </div>
      
      {message && (
                            <div className="flex justify-center mt-4 text-red-500 text-xm italic">
                                <p>Please Rate/Review the movie!</p>
                                
                            </div>
                        )}
                        {userMessage && (
                            <div className="flex justify-center mt-4 text-red-500 text-xm italic">
                                <p>You have already submitted a review for this movie.</p>
                                
                            </div>
                        )}
      
      </form>
      
   

      <div className='mt-8 '>
  <h2 className='text-xl ml-4 text-white font-bold mb-2'>Audience Reviews</h2>
  <div className='divide-y divide-gray-300 ml-4 mr-20 '>
  {displayreviews.filter(review => review.rating !== "").length > 0 ? (
    displayreviews.filter(review => review.rating !== "").map((review, index) => (
      <div key={index} className=' p-4  '>
        
        {review.user && review.user.fname && (
          <div className='text-blue-300 font-bold text-xs '>{review.user.fname}</div> 
        )}
        <div className=' '>
        <div className='flex '>
          {[...Array(5)].map((star, i) => (
            <FaStar
              key={i}
              color={i < review.rating ? "yellow" : "gray"}
              className="mt-2"
            />
          ))}
        </div>
        <p className=' text-white text-xm '>{review.review}</p>
          </div>
       
        <div ref={messageEndRef}/>
      </div>
      
    ))
  ) : (
    <p className='text-center text-white'>No reviews yet.</p>
  )}
</div>
  </div>
  

   
    </div>
  )
}

export default Rating



