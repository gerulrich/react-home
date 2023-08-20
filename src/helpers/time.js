
const toTime = (seconds) => {
    var date = new Date(null);
    date.setSeconds(seconds);
    if (seconds >= 3600)
      return date.toISOString().substr(11, 8);
    return date.toISOString().substr(14, 5);
  };
  
  export { toTime };