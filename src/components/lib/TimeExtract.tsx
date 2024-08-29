export function convertTo12Hour(timeString: any) {
  let [hours, minutes] = timeString.split(":");

  hours = parseInt(hours);

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
}
