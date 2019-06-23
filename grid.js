const countTo = (n) => [...Array(n).keys()].map(x => x + 1);

const isLeapYear = (year) => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

const daysInMonth = (year, month) => {

    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return 31;
    }

    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }

    if (isLeapYear(year)) {
        return 29;
    }

    return 28;
};

const pad = (n) => (n < 10 ? "0" : "") + n;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const nextDay = (day, daysOfWeek) => {

    let nextDay = daysOfWeek.indexOf(day) + 1;
    if (nextDay === daysOfWeek.length) {
        nextDay = 0;
    }
    return daysOfWeek[nextDay];
};

const pushDay = (value, result, day, month) => {

    if (!result[day]) {
        result[day] = [];
    }

    if (!result[day][month]) {
        result[day][month] = [];
    }

    result[day][month].push(value);
    return result;
};

const buildYear = (year, firstDayOfYear, daysOfWeek) => {

    let result = {};
    let today = firstDayOfYear;

    // Padding up to first day of the year
    daysOfWeek
        .filter(day => daysOfWeek.indexOf(day) < daysOfWeek.indexOf(firstDayOfYear))
        .forEach(day => pushDay(year + "-99-0" + daysOfWeek.indexOf(day), result, day, 1));

    countTo(12).forEach(month => {
        countTo(daysInMonth(year, month)).forEach(day => {
            result = pushDay(year + "-" + pad(month) + "-" + pad(day), result, today, month);
            today = nextDay(today, daysOfWeek);
        })
    });

    return result;
};

const displayDay = day => '<td id="d' + day + '"' + (day.includes("-99-") ? ' class="non-day"' : ' class="m' + day.replace(/-[0-9][0-9]$/, "") + '"') + '><span>' + day.replace(/^.*-/, "") + "</span></td>";

const displayMonth = month => month.map(displayDay).join("");

const displayRow = (weekday, data) => '<tr><th class="day-label"><span id="' + weekday + '">' + weekday + "</span></th>" + data[weekday].map(displayMonth).join("") + "</tr>";

const monthHeader = (year, data) => {
    return "<tr>" +
           "<th></th>" +
           '<th colspan="' + data.Sun[1].length + '">Jan</th>' +
           '<th colspan="' + data.Sun[2].length + '">Feb</th>' +
           '<th colspan="' + data.Sun[3].length + '">Mar</th>' +
           '<th colspan="' + data.Sun[4].length + '">Apr</th>' +
           '<th colspan="' + data.Sun[5].length + '">May</th>' +
           '<th colspan="' + data.Sun[6].length + '">Jun</th>' +
           '<th colspan="' + data.Sun[7].length + '">Jul</th>' +
           '<th colspan="' + data.Sun[8].length + '">Aug</th>' +
           '<th colspan="' + data.Sun[9].length + '">Sep</th>' +
           '<th colspan="' + data.Sun[10].length + '">Oct</th>' +
           '<th colspan="' + data.Sun[11].length + '">Nov</th>' +
           '<th colspan="' + data.Sun[12].length + '">Dec</th>' +
           "</tr>";
};

const yearToTable = (year, data, daysOfWeek) => "<table>" + monthHeader(year, data) + daysOfWeek.map(weekday => displayRow(weekday, data)).join("") + "</table>";

let year = yearToTable(2017, buildYear(2017, "Sun", daysOfWeek), daysOfWeek);
let doc = new DOMParser().parseFromString("<h2>2017</h2>", "text/html");
document.getElementById("2017").appendChild(doc.body.firstChild);
doc = new DOMParser().parseFromString(year, "text/html");
document.getElementById("2017").appendChild(doc.body.firstChild);

year = yearToTable(2018, buildYear(2018, "Mon", daysOfWeek), daysOfWeek);
doc = new DOMParser().parseFromString("<h2>2018</h2>", "text/html");
document.getElementById("2018").appendChild(doc.body.firstChild);
doc = new DOMParser().parseFromString(year, "text/html");
document.getElementById("2018").appendChild(doc.body.firstChild);

year = yearToTable(2019, buildYear(2019, "Tue", daysOfWeek), daysOfWeek);
doc = new DOMParser().parseFromString("<h2>2019</h2>", "text/html");
document.getElementById("2019").appendChild(doc.body.firstChild);
doc = new DOMParser().parseFromString(year, "text/html");
document.getElementById("2019").appendChild(doc.body.firstChild);
