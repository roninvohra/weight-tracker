import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetEffect, triggerEffect } from '../store/actions';

const ShowLogs = () => {
  const [responseData, setResponseData] = useState(null);
  const effectTriggered = useSelector((state) => state.effectTriggered);
  const dispatch = useDispatch();

  useEffect(() => {
    if (effectTriggered){
        const fetchData = async () => {
            
        try {
            const response = await fetch('http://localhost:5050/logs');

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            // Parse the JSON response
            let data = await response.json();
            console.log (data);
            // Update the state with the fetched data            
            data.forEach((item) => 
                {
                    item.date = new Date (item.date);
                    item.dateString = item.date ? item.date.toLocaleDateString() : '';
                    item.timeString = item.date ?  item.date.toLocaleTimeString() : '';
                }
            );

            data = data.sort((a, b) => b.date - a.date);
            setResponseData(data);
            
        } catch (error) {
            console.error('Error during GET request:', error);
        }

        };

        // Call the fetchData function when the component mounts
        fetchData();
        dispatch(resetEffect());
        console.log ("TRIGGERED");
    }
  }, [effectTriggered]); 

  return (
    <>
        <div>
        {responseData ? (
            <table className = "border border-spacing-15 border-slate-400">
                <thead>
                    <tr>
                        <th className = "border border-slate-400">Date</th>
                        <th className = "border border-slate-400">Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {responseData.map((item) => 
                    {
                        const dateString = item.date ? new Date(item.date).toLocaleDateString() : '';
                        const timeString = item.date ? new Date(item.date).toLocaleTimeString() : '';

                    return(
                        <tr key = {item._id}>
                            <td className = "border">{item.dateString} {item.timeString} </td>
                            <td className = "border">{item.weight} {item.unit}</td>
                        </tr>
                    );})}
                </tbody>
            </table>
        ) : ( <h2> Loading...</h2>)}
        </div>
    </>
  );
};

export default ShowLogs;