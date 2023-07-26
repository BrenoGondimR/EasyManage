import moment from "moment/moment";
let locale = "pt"
export const formatDate = (date, format = locale === "pt" ? 'DD/MM/YYYY' : 'MM/DD/YYYY', showTime = false) => {
    debugger
    if (date === null || date === undefined || date === "0001-01-01T00:00:00Z" || !date) return " - "

    const timeFormat = showTime ? (locale === "pt" ? ' HH:mm' : ' HH:mm') : '';
    const fullFormat = format + timeFormat;

    if (typeof (date) === 'object')
        return moment(date).parseZone('2015-01-22T16:11:36.36-07:00').format(fullFormat)
    if (typeof(date) === 'string')
        return moment(date).parseZone('2015-01-22T16:11:36.36-07:00').format(fullFormat)
    let dateStr = date.replace(/[A-Za-z]/g, ' ')
    if (moment(dateStr).isValid()) {
        return moment(dateStr).parseZone('2015-01-22T16:11:36.36-07:00').format(fullFormat)
    }
    else {
        return ' - '
    }
}


