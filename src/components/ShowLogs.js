import React, { useState, useEffect} from 'react';
  
const ShowLogs = (props) => {
  const tableData = props.tableData;
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
                </tr>
            );})}
        </tbody>
    </table>
    
    </>
  );
};

export default ShowLogs;