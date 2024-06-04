import React, { useState } from 'react'
import ContactUs from './components/ContactUs'
import FinalMessage from './components/FinalMessage';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const[lotteryId,setlLotteryId]=useState(null)
  return (
    <div>
       {isSubmitted ? (
          <FinalMessage lotteryId={lotteryId?.data?.lottery_id} />
        ) : (
          <ContactUs  setlLotteryId={setlLotteryId} setIsSubmitted={setIsSubmitted}/>
        )}
    
    </div>
  )
}

export default App
