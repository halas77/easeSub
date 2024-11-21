export const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

export const formatDate = (inputDate: string): string => {
  const dateObject = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "short", 
    day: "2-digit" 
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return formattedDate;
};

