export function formatDate(date: number | string, withTime: boolean = true) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    const dayString = [year, month, day].join('-');
    return dayString + (withTime ? ` ${hours}:${minutes}:${seconds}` : '');
}

export function formatDate2(date: number | string, withTime: boolean = true) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear() - 2000,
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    const dayString = [day, month, year].join('/');
    return (withTime ? `${hours}:${minutes}:${seconds} ` : '') + dayString;
}

export function formatDuration(duration: number) {
    let seconds = duration;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds -= minutes * 60;
    minutes -= hours * 60;
    return `${timeToString(hours)}:${timeToString(minutes)}:${timeToString(seconds)}`
}

function timeToString(time: number) {
    let formattedTime = time.toString();
    if (formattedTime.length < 2) formattedTime = '0' + formattedTime;
    return formattedTime;
}

export function getDateFromString(date: string) {
    const [dateString, timeString] = date.split(' ');
    const [year, month, day] = dateString.split('-');
    const [hours, minutes, seconds] = timeString.split(':');
    return new Date(+year, +month, +day, +hours, +minutes, +seconds);
}

export const MONTHS = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
export const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function getDaysOfMonth(year: number, month: number) {
    const nbDays = new Date(year, month, 0).getDate();
    const dateArray: string[] = [];
    for (let d = 0; d < nbDays; d++) {
        dateArray.push((d+1).toString());
    }
    return dateArray;
}

export function getInputFormattedTime(timeInSeconds: number, useTime: boolean = true) {
    const date = new Date(timeInSeconds * 1000);
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) {
        month = '0' + month;
    }
    let day = date.getDate().toString();
    if (day.length < 2) {
        day = '0' + day;
    }
    let hours = date.getHours().toString();
    if (hours.length < 2) {
        hours = '0' + hours;
    }
    let minutes = date.getMinutes().toString();
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }
    let seconds = date.getSeconds().toString();
    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    if (!useTime) {
        return `${date.getFullYear()}-${month}-${day}`;
    }

    const defaultTime = `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return defaultTime;
}