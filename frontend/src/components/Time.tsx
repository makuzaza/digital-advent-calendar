import React, { useEffect, useState } from "react";
import "./Time.css";
import { Button } from "@mui/material";

type Props = {
  setWindows: (windows: string[]) => void;
  windows: string[];
};

const Time: React.FC<Props> = ({ setWindows, windows }) => {
  const [fromDate, setFromDate] = useState<string>(windows[0]);
  const [toDate, setToDate] = useState<string>(windows[windows.length - 1]);

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
  };

  useEffect(() => {
    function getDatesArray(fromDate: string, toDate: string) {
      const dateArray = [];
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate).toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dateArray;
    }
    const dates = getDatesArray(fromDate, toDate);
    // console.log(dates);
    setWindows(dates);
  }, [fromDate, toDate, setWindows]);

  return (
    <div className="time">
      <div>
        <label
          htmlFor="fromDatePicker"
          style={{ display: "inline-block", width: "100px", margin: "10px 0" }}
        >
          From:
        </label>
        <input
          className="input"
          type="date"
          id="fromDatePicker"
          value={fromDate}
          onChange={handleFromDateChange}
        />
      </div>

      <div>
        <label
          htmlFor="toDatePicker"
          style={{ display: "inline-block", width: "100px", margin: "10px 0" }}
        >
          To:
        </label>
        <input
          type="date"
          id="toDatePicker"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
      <div className="buttons">
        <Button variant="contained" onClick={handleReset} type="submit">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Time;
