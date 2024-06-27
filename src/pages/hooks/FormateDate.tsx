const FormatDate = (dateString:any) => {
    const dateParts = dateString.split('-');
    const [year, month, day] = dateParts;
    const date = new Date(year, month - 1, day); // Month needs to be 0-based in JavaScript Date objects
  
    const options:any = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  };
  export default FormatDate;