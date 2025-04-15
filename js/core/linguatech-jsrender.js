
/* CONVERTERS FOR X JS RENDER */
$.views.converters("currency", function (val) {
    return convert_ToCurrency(val);
});

function convert_ToCurrency(val) {
    if (typeof cultureInfo === 'undefined') {
        var cultureInfo = 'nl-NL';
    }

    return parseFloat(val).toLocaleString(getCultureInfo(), { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

$.views.converters("percentage", function (val) {
    return convert_ToPercentage(val * 100);
});

function convert_ToPercentage(val) {
    return parseFloat(val).toLocaleString(getCultureInfo(), { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

$.views.converters("number", function (val) {
    return convert_ToNumber(val);
});

function convert_ToNumber(val) {
    return parseFloat(val).toLocaleString(getCultureInfo(), { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getCultureInfo() {
    if (typeof cultureInfo === 'undefined') {
        return 'nl-NL';
    }
    return cultureInfo;
}

$.views.converters("unixdate", function (val) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return getDate(val).toLocaleDateString(undefined, options);
});


/** 17:00 **/
$.views.converters("time", function (val) {
    return converter_convertTime(getDate(val));
});

$.views.converters("timeNoShift", function (val) {
    return converter_convertTime(getDateNoShift(val));
});

function converter_convertTime(date) {
    var options = { timeZone: "UTC", hour12: false, hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
}


/** 23 jan. 2019 17:00 **/
$.views.converters("shortdatetime", function (val) {
    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return getDate(val).toLocaleDateString(undefined, options);
});

/** 2019-01-23T16:00:00.000Z **/
$.views.converters("isodate", function (val) {
    return getDate(val).toISOString();
});

$.views.converters("isodateNoShift", function (val) {
    return getDateNoShift(val).toISOString();
});


$.views.converters("longdatetime", function (val) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return getDate(val).toLocaleDateString(undefined, options);
});

$.views.converters("timespan_to_subtitletime", function (val) {
    return `${sliceNumber(val.Hours, 2)}:${sliceNumber(val.Minutes, 2)}:${sliceNumber(val.Seconds, 2)}.${sliceNumber(val.Milliseconds, 3)}`;
});


function sliceNumber(number, digitAmount) {
    for (var i = 0; i < digitAmount; i++) {
        number = "0" + number;
    }
    return number.slice(digitAmount * -1);
}

function getDate(val) {
    var dateVal = parseFloat(val.replace("/Date(", "").replace(")/", ""));
    var date = new Date(dateVal);
    if (date.getFullYear() == 1970)
        date = new Date(val);

    return date;
}

function getDateNoShift(val) {
    var date = getDate(val);
    var dateNoShift = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return dateNoShift;
}