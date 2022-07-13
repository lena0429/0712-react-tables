import React, { useState, useEffect } from 'react';
import { response } from '../data.js';

const Table1 = () => {
    const [ data, setData ] = useState([]);
    const [ columns, setColumns ] = useState([]);
    const [ displayData, setDisplayData ] = useState([]);

    // 1. fetch data from the backend
    // 2. set names of columns
    useEffect(()=>{
        // get an object of a set of name strings
        const columnsSet = new Set();
        response.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
                columnsSet.add(key)
            })
        })
        setData(response)
        setColumns(Array.from(columnsSet))
    }, [])
    

    // handle sum functionality
    // keep an eye on data, everytime data has been updated, the callback function is invoked, and display the updated data
    // we want to define an region object and display the data according to it  
    useEffect(() => {
        // we need to make the object first, then use [] to set the key-value pairs.
        // first we need to check if the key is alreay in the region object
        // if it doesn't, we set the new key-value pair using bracket notation
        // if the key already exists, we just need to push the new value to the valueArray.
        // console.log(regionObj) => {US: Array(3), EU: Array(3), CA: Array(4)}  
        const regionObj = {};  
        data.forEach((obj) => {
            if(regionObj[obj.region] === undefined) {
                regionObj[obj.region] = [obj];    
            } else {
                regionObj[obj.region].push(obj)
            }
        });
      
        // console.log(Object.keys(regionObj)) =>  ['US', 'EU', 'CA']
        Object.keys(regionObj).forEach((region) => {
            const arr = regionObj[region]   // get the valueArray
            const sum = arr.reduce((acc, current) => {
                return acc += current.sales;
            }, 0);
            arr.unshift({ region: region, model: "sum", sales: sum });
        })
        
        const nextDisplayData = Object.values(regionObj).flat();
        setDisplayData(nextDisplayData);
    }, [data])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column, index) => <th key={index}>{column}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((item, index) => {
                     return (
                        <tr key={index}>
                          <td>{item.region}</td>
                          <td>{item.model}</td>
                          <td>{item.sales}</td>
                        </tr>  
                     ) 
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default Table1 