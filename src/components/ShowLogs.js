import React, { useState, useEffect } from 'react';

const ShowLogs = () => {
  const [responseData, setResponseData] = useState(null);

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
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  return (
    <div>
        <table className = "border border-spacing-15 border-slate-400">
            <thead>
                <tr>
                    <th className = "border border-slate-400">Date</th>
                    <th className = "border border-slate-400">Weight</th>
                </tr>
            </thead>
            <tbody>
                {responseData && responseData.map((item, index) => (
                    <tr key = {item._id}>
                        <td className = "border">{item.date}</td>
                        <td className = "border">{item.weight}</td>
                    </tr>
                    // Replace 'id' and 'name' with the actual property names in your data
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default ShowLogs;
