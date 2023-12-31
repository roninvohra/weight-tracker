import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { triggerEffect } from '../store/actions';

function ReportWeight() {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());
  const [unit, setUnit] = useState ('lbs');
  const dispatch = useDispatch();

  let onButtonClick = async () => {

    try {
      console.log (date);
      let postData = {
        "weight": weight,
        "date": date,
        "unit": unit,
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
      dispatch(triggerEffect());
      console.log ("DISPATCHED");
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
      <select id = "unit" onChange = {e => setUnit(e.target.value)}>
          <option value = "lbs">lbs</option>
          <option value = "kg">kg</option>
      </select>
      <button type ="button" onClick = {onButtonClick} className = 'border rounded shadow-md bg-indigo-500 text-white w-20 h-10'>Add</button>
    </div>
  )
}

export default ReportWeight; 