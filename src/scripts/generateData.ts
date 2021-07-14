import { BreastFeedData, DiaperData } from "../interfaces";
import { BabyBottleData } from "../interfaces/babyBottle.interface";
import * as fs from 'fs';

const MAX = 1000000;

const start = Math.floor(new Date(2019,1,15).getTime() / 1000);
const now = Math.floor(Date.now() / 1000);

let time = start;
let dataSize = 0;


const babyBottle: {[key: number]: BabyBottleData} = {};
const breastFeed: {[key: number]: BreastFeedData} = {};
const diaper: {[key: number]: DiaperData} = {};

const dataToImport = {
	babyBottle,
	breastFeed,
	diaper,
};


while(time < now && dataSize < MAX) {
	const type = getRandomInt(0, 5);
	const duration = randomDuration();
	const start = time;
	const end = time + duration;
	const quantity = randomQuantity();
	time = end + (type > 1 ? randomTimeGap() : 0);
	switch(type) {
	  case 0: {
	  	diaper[start] = {
	  	  start,
	  	  type: 'p'
	  	};
	    break;
	  }
	  case 1: {
		diaper[start] = {
	  	  start,
	  	  type: 's'
	  	};
	    break;
	  }
	  case 2: {
	  	babyBottle[start] = {
	  	  start,
	  	  duration,
	  	  quantity
	  	}
	  	break;
	  }
	  case 3: {
	  	breastFeed[start] = {
	  	  start,
	  	  duration,
	  	  type: 'r'
	  	};
	    break;
	  }
	  case 4: {
		breastFeed[start] = {
	  	  start,
	  	  duration,
	  	  type: 'l'
	  	};
	    break;
	  }
	}
	dataSize++
}

fs.writeFile('./generated-imports.json', JSON.stringify(dataToImport), () => {

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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}