import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { triggerEffect } from '../store/actions';

const ShowLogs = (props) => {
  const tableData = props.tableData;
  const dispatch = useDispatch();

  let onDelete = async (event) => {
    let id = event.currentTarget.id;
    
    try {
      const response = await fetch(`http://localhost:5050/logs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      dispatch(triggerEffect());
    } catch (error) {
      console.error('Error during DELETE request:', error);
    }
  };
  
  return (
    <>
    
    <table className = "border border-spacing-15 border-slate-400">
        <thead>
            <tr>
                <th className = "border border-slate-400">Date</th>
                <th className = "border border-slate-400">Weight</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((item) => 
            {
                const dateString = item.date ? new Date(item.date).toLocaleDateString() : '';
                const timeString = item.date ? new Date(item.date).toLocaleTimeString() : '';

            return(
                <tr key = {item._id}>
                    <td className = "border">{item.dateString} {item.timeString} </td>
                    <td className = "border">{item.weight} {item.unit}</td>
                    <td className = "border"><button type ="button" id = {item._id} onClick = {onDelete} className = 'border rounded shadow-md bg-indigo-500 text-white w-20 h-10'>Delete</button></td>
                </tr>
            );})}
        </tbody>
    </table>
    
    </>
  );
};

export default ShowLogs;