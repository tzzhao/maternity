"use strict";
exports.__esModule = true;
var fs = require("fs");
var MAX = 15000;
var start = Math.floor(new Date(2021, 1, 28).getTime() / 1000);
var now = Math.floor(Date.now() / 1000);
var time = start;
var dataSize = 0;
var babyBottle = {};
var breastFeed = {};
var diaper = {};
var dataToImport = {
    babyBottle: babyBottle,
    breastFeed: breastFeed,
    diaper: diaper
};
while (time < now && dataSize < MAX) {
    var type = getRandomInt(0, 5);
    var duration = randomDuration();
    var start_1 = time;
    var end = time + duration;
    var quantity = randomQuantity();
    time = end + (type > 1 ? randomTimeGap() : 0);
    switch (type) {
        case 0: {
            diaper[start_1] = {
                time: start_1,
                type: 'p'
            };
            break;
        }
        case 1: {
            diaper[start_1] = {
                time: start_1,
                type: 's'
            };
            break;
        }
        case 2: {
            babyBottle[start_1] = {
                start: start_1,
                duration: duration,
                quantity: quantity
            };
            break;
        }
        case 3: {
            breastFeed[start_1] = {
                start: start_1,
                duration: duration,
                type: 'r'
            };
            break;
        }
        case 4: {
            breastFeed[start_1] = {
                start: start_1,
                duration: duration,
                type: 'l'
            };
            break;
        }
    }
    dataSize++;
}
fs.writeFile('./generated-imports.json', JSON.stringify(dataToImport), function () {
});
function randomTimeGap() {
    return getRandomInt(3600, 14400);
}
function randomDuration() {
    return getRandomInt(60, 1800);
}
function randomQuantity() {
    return getRandomInt(40, 120);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
