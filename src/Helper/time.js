export const date = new Date();

export const getTimeDate = (date) => {
  let created = new Date(date);
  let createdDate = created.toDateString();
  let createdTime = created.toTimeString().substr(0, 8);
  return [createdDate.substring(3), createdTime, date];
};

export const postCreation = (array) => {
  const current = new Date();
  let currentDate = current.toDateString();
  let currentTime = current.toTimeString().substr(0, 8);
  const arrayValue = new Date(array[2]);
  const day_Diff =
    (current.getTime() - arrayValue.getTime()) / (1000 * 60 * 60 * 24);
  if (day_Diff < 0.5) {
    let createdTime = getSeconds(array[1].split(":"));
    let difference = createdTime;
    return currentDayCalculation(difference);
  } else if (day_Diff > 0.5 && day_Diff < 1) {
    let difference = (current.getTime() - arrayValue.getTime()) / 1000;
    return currentDayCalculation(difference);
  } else if (day_Diff >= 1 && day_Diff <= 7) {
    if (day_Diff < 2) {
      return `${Math.floor(day_Diff)} day ago`;
    }
    return `${Math.floor(day_Diff)} days ago`;
  } else {
    return array[0];
  }
};

const getSeconds = (array) => {
  let hrstoSec = parseInt(array[0]) * 3600;
  let minToSec = parseInt(array[1]) * 60;
  let sec = parseInt(array[2]) + hrstoSec + minToSec;
  return sec;
};

const currentDayCalculation = (difference) => {
  switch (true) {
    case difference < 60: {
      return `${difference} seconds ago`;
    }
    case difference > 60 && difference < 3600: {
      let min = Math.floor(difference / 60);

      if (min < 5) {
        return `${min} minute ago`;
      } else {
        return `${min} minutes ago`;
      }
    }
    case difference >= 3600: {
      let hour = Math.floor(difference / 3600);
      if (hour <= 1) {
        return `${hour} hour ago`;
      } else {
        return `${hour} hours ago`;
      }
    }
  }
};
