import { useState } from 'react';

function ReportWeight() {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  let onButtonClick = () => {
    alert (weight, date);

  }

  return (
    <div className='bg-amber-200 box-border p-4 border-4 ...'>
      <span className='mr-10'>
        Date: <input className='border rounded shadow-md' onChange = {e => setDate(e.target.value)} type = "date" id = "date" />
      </span>
      <input onChange = {e => setWeight(e.target.value)} placeholder="Weight" className = 'mr-5 border rounded shadow-md w-20 h-10' type ="text" name = "weight" />  
      <button type ="button" onClick = {onButtonClick} className = 'border rounded shadow-md bg-indigo-500 text-white w-20 h-10'>Add</button>
    </div>
  )
}

export default ReportWeight; 
