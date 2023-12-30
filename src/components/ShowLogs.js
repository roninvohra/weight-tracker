import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ShowLogs = () => {
  const [responseData, setResponseData] = useState(null);
  const effectTriggered = useSelector((state) => state.effectTriggered);

  useEffect(() => {
    const fetchData = async () => {
        
      try {
        const response = await fetch('http://localhost:5050/logs');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();
        console.log (data);
        // Update the state with the fetched data
        setResponseData(data);
      } catch (error) {
        console.error('Error during GET request:', error);
      }

    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [effectTriggered]); // The empty dependency array ensures this effect runs once after the initial render

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
                            <td className = "border">{dateString} {timeString} </td>
                            <td className = "border">{item.weight}</td>
                            
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
