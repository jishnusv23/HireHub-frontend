import { isAfter, isBefore, addMinutes, subMinutes } from "date-fns";
export const isExpired = (startTime: string, dateString: string) => {
  const [startHours, startMinutes] = startTime.split(":");

  const date = new Date(dateString);

  const startTimeObject = new Date(date);
  startTimeObject.setHours(parseInt(startHours));
  startTimeObject.setMinutes(parseInt(startMinutes));
  startTimeObject.setSeconds(0); 

  const endTimeWindow = addMinutes(startTimeObject, 20);

  const currentTime = new Date();

  // console.log("End Time Window for Expiry:", endTimeWindow);
  // console.log("Current Time:", currentTime);

  return isAfter(currentTime, endTimeWindow);
};

export const isActive = (startTime: string, dateString: string) => {
  const [startHours, startMinutes] = startTime.split(":");

  const date = new Date(dateString);

  const startTimeObject = new Date(date);
  startTimeObject.setHours(parseInt(startHours));
  startTimeObject.setMinutes(parseInt(startMinutes));
  startTimeObject.setSeconds(0);
  const startTimeWindow = subMinutes(startTimeObject, 5); 
  const endTimeWindow = addMinutes(startTimeObject, 20); 

  const currentTime = new Date();

  
  // console.log("Start Time Object:", startTimeObject);
  // console.log("Start Time Window:", startTimeWindow);
  // console.log("End Time Window:", endTimeWindow);
  // console.log("Current Time:", currentTime);
  // console.log(
  //   isAfter(currentTime, startTimeWindow) &&
  //     isBefore(currentTime, endTimeWindow),
  //   "pppppopo"
  // );
  return (
    isAfter(currentTime, startTimeWindow) &&
    isBefore(currentTime, endTimeWindow)
  );
};
