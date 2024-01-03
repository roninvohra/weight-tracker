import ReportWeight from './components/ReportWeight';
import ShowLogs from './components/ShowLogs';
import LineChart from './components/LineChart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetEffect } from './store/actions';
import React, { useState, useEffect  } from 'react';

function App() {
  const effectTriggered = useSelector((state) => state.effectTriggered);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState ([]);
  const [chartData, setChartData] = useState ([]);
  const [loggedToday, setLoggedToday] = useState (false);
      
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
      
        setChartData (chronologicalData);
        
        if (chronologicalData.length > 0){
          let currentDate = new Date(Date.now());
          if (chronologicalData[chronologicalData.length-1].date.toLocaleDateString() == currentDate.toLocaleDateString()){
            setLoggedToday(true);
            console.log ("SET TRUe");
          }
        }

        
    } catch (error) {
        console.error('Error during GET request:', error);
    }

    };
    
  useEffect(() => {
      if (effectTriggered){
        fetchData();
        dispatch(resetEffect());
        console.log ("TRIGGERED");
      }
    
  }, [effectTriggered]); 

  return (
    <>
    <div className = "flex flex-col items-center">
      <h1 className="text-3xl font-bold underline">
        Weight Tracker
      </h1>
    
      <ReportWeight />
      {tableData.length > 0 ? (
        <>  
      {!loggedToday && <div> You haven't logged your weight today! </div> }
      <ShowLogs tableData = {tableData}/>
  
      <div className = "w-1/2 h-full">
        <LineChart chartData = {chartData}  />
      </div>
      </>) : (<div>Start by logging your weight!</div>)}

      </div>
    </>
  )
}

export default App;
