export const formatTime = (timeString: string) => {
  const date = new Date(`1970-01-01T${timeString}`);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  
  const formattedHours = hours.toString().padStart(2, '0');
  
  return `${formattedHours}:${minutes} ${period}`;
}
