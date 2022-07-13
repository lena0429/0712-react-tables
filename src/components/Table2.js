import React, { useState, useEffect } from 'react';
import { response } from '../data';

const Table2 = () => {
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [regionCurOption, setRegionCurOption] = useState("all");
    const [modelCurOption, setModelCurOption] = useState("all");

    useEffect(() => {
      const regionSet = new Set(["all"]);
      const modelSet = new Set(["all"]);
      const columnsSet = new Set();
      response.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          columnsSet.add(key);
        });
        regionSet.add(obj.region);
        modelSet.add(obj.model);
    });

    setRegionOptions(Array.from(regionSet));
    setModelOptions(Array.from(modelSet));

    setColumns(Array.from(columnsSet));
    setData(response);
  }, []);

  useEffect(() => {
    const nextDisplayData = data
      .filter(
        (obj) => regionCurOption === "all" || obj.region === regionCurOption
      )
      .filter(
        (obj) => modelCurOption === "all" || obj.model === modelCurOption
      );
    setDisplayData(nextDisplayData);
  }, [data, regionCurOption, modelCurOption]);

  useEffect(() => {
    const modelSet = new Set(["all"]);
    const dataFilteredByRegion = data.filter(
      (obj) => regionCurOption === "all" || obj.region === regionCurOption
    );

    dataFilteredByRegion.forEach((item) => modelSet.add(item.model));
    setModelOptions(Array.from(modelSet));
  }, [regionCurOption, data]);

  useEffect(() => {
    const regionSet = new Set(["all"]);
    const dataFilteredByModel = data.filter(
      (obj) => modelCurOption === "all" || obj.model === modelCurOption
    );
    dataFilteredByModel.forEach((item) => regionSet.add(item.region));
    setRegionOptions(Array.from(regionSet));
  }, [modelCurOption, data]);

  const handleChangeRegionSelect = (e) => {
    setRegionCurOption(e.target.value);
  };

  const handleChangeModelSelect = (e) => {
    setModelCurOption(e.target.value);
  };

  return (
    <div>
      <div>
        <label>region</label>
        <select value={regionCurOption} onChange={handleChangeRegionSelect}>
          {regionOptions.map((region) => {
            return (
              <option key={region} value={region}>
                {region}
              </option>
            );
          })}
        </select>
        <label>model</label>
        <select value={modelCurOption} onChange={handleChangeModelSelect}>
          {modelOptions.map((model) => {
            return (
              <option key={model} value={model}>
                {model}
              </option>
            );
          })}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => {
              return <th key={index}>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, index) => {
            return (
              <tr key={index}>
                {columns.map((column, index1) => {
                  return <td key={`${index}-${index1}`}>{row[column]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table2