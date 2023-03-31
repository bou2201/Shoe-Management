import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="dashboard-content-calendar">
      <h4 className="content-title">Calendar</h4>
      <Calendar onChange={setValue} value={value} locale="en-GB" />
      <p className="selected-date">
        Current selected date is: <b>{moment(value).format("LL")}</b>
      </p>
    </div>
  );
};

export default CalendarComponent;
