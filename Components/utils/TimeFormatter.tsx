import React from "react";

function TimeFormatter({ timeString }: { timeString: string }) {
  function convertTo12HourFormat(time24: string) {
    // Split the time string into components
    let [hour24, minute, second] = time24.split(":").map(Number);

    // Determine AM or PM
    let period = hour24 < 12 ? "AM" : "PM";

    // Convert hour from 24-hour to 12-hour format
    let hour12 = hour24 % 12;
    if (hour12 === 0) {
      hour12 = 12;
    }

    // Format the hour, minute, and second to ensure two digits
    let formattedHour = hour12.toString().padStart(2, "0");
    let formattedMinute = minute.toString().padStart(2, "0");

    // Combine into final 12-hour format time string
    let time12 = `${formattedHour}:${formattedMinute}`;

    return time12;
  }

  return <div>{convertTo12HourFormat(timeString)}</div>;
}

export default TimeFormatter;
