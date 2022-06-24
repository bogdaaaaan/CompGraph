"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSeconds = void 0;
/* funciton to convert seconds into readable format */
var convertSeconds = function (seconds) {
    var d = seconds;
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
};
exports.convertSeconds = convertSeconds;
