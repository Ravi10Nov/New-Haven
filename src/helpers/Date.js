export const dayMonthYear = (d) => {
    //debugger;
    const parsedDate = new Date(d);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(parsedDate);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(parsedDate);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(parsedDate);
    return `${da}-${mo}-${ye}`
}


export function timeSince(LastLoginDate) {
    
    const date = new Date(LastLoginDate);
    const dateDiff = (Date.now() - date);
    var seconds = Math.floor( dateDiff / 1000);
    //debugger
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return "Just now";
  }
