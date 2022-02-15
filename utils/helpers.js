module.exports = {
    //format date in m/d/yyyy
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },

    progress_bar: (donation_total, goal) => {
      var percentage;
      if (parseInt(donation_total) === 0) {
        percentage = 0;
      } else {
        percentage = goal / donation_total;
      }

      return percentage;
    }
  }