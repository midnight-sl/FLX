function formatTime(num) {
    const getDays = Math.floor(num / 1440);
    const getHours = Math.floor((num%1440) / 60);
    const getMinutes = (num%1440)%60;
    return (` ${getDays} day(s) ${getHours} hour(s) ${getMinutes} minute(s) `);
  }
  formatTime(120);
  formatTime(59);
  formatTime(3601);
  formatTime(1441);