import ReportWeight from './components/ReportWeight';
import ShowLogs from './components/ShowLogs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetEffect } from './store/actions';
import React, { useState, useEffect  } from 'react';

function App() {
  const effectTriggered = useSelector((state) => state.effectTriggered);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState ([]);

      
  const fetchData = async () => {
            
    try {
        const response = await fetch('http://localhost:5050/logs');

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        let data = await response.json();
        console.log (data);
        setTableData (data);

        // Update the state with the fetched data            
        data.forEach((item) => 
            {
                item.date = new Date (item.date);
                item.dateString = item.date ? item.date.toLocaleDateString() : '';
                item.timeString = item.date ?  item.date.toLocaleTimeString() : '';
            }
        );
        
        data = data.sort((a, b) => b.date - a.date);
        let chronologicalData = data.slice();
        chronologicalData.sort ((a,b)=> a.date-b.date);
        /*
        setChartData ({
            labels: chronologicalData.map((item) => item.dateString),
            datasets: [
              {
                label: "Weight",
                data: chronologicalData.map((item) => item.weight),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }
            ]
          });
          */
        
          console.log ("Table data" ,tableData);

        
    } catch (error) {
        console.error('Error during GET request:', error);
    }

    };
    
  useEffect(() => {
        // Call the fetchData function when the component mounts
      if (effectTriggered){
        fetchData();
        dispatch(resetEffect());
        console.log ("TRIGGERED");
      }
    
  }, [effectTriggered]); 

  return (
    <>
      <h1 className="flex text-3xl font-bold underline justify-center">
        Weight Tracker
      </h1>
      <div className = "flex justify-center">
        <ReportWeight />
      </div>

      
        <div className = "flex justify-center">
            <ShowLogs tableData = {tableData}/>
        </div>

    </>
  )
}

export default App;
