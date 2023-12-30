import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReportWeight() {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());

  let onButtonClick = async () => {

    try {

      console.log (date);
      let postData = {
        "weight": weight,
        "date": date,
      }
      const response = await fetch('http://localhost:5050/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };


  return (
    <div className='bg-amber-200 box-border p-4 border-4 ...'>
      <span className='mr-10'>
        Date: <DatePicker selected={date} showTimeSelect onChange={(date) => setDate(date) } />
      </span>
      <input onChange = {e => setWeight(e.target.value)} placeholder="Weight" className = 'mr-5 border rounded shadow-md w-20 h-10' type ="text" name = "weight" />  
      <button type ="button" onClick = {onButtonClick} className = 'border rounded shadow-md bg-indigo-500 text-white w-20 h-10'>Add</button>
    </div>
  )
}

export default ReportWeight; 
