const getWeekFromDate = (date) => {
    // convert date from string to date object 
    const givenDate = new Date(date);
    // get the day of the week
    const dayNr = givenDate.getDay();
    // get the date of the sunday of the previous week
    givenDate.setDate(givenDate.getDate() - (dayNr));
    const initialDate = givenDate;

    const dates = [];
    // Get the dates from sunday to saturday
    for(let i = 0; i < 7; i++) {
        const newDate = new Date(initialDate);
        newDate.setDate(newDate.getDate() + i);
        newDate.setUTCHours(0, 0, 0);
        dates.push(newDate);
    }
    return dates;
}

module.exports = {
    getWeekFromDate
}