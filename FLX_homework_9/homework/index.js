// Task 1
function findTypes(...args) {
	let types = [];
	for (let i=0; i < args.length; i++) {
		types.push(typeof args[i]);
	}
	return types;
}

findTypes('number');
findTypes(null, 5, "hello");

// Task 2
function executeforEach(someArr, someFunc) {
		for (let i = 0; i < someArr.length; i++){
			someFunc(someArr[i]);
		}
}

executeforEach([1,2,3], function(el) {
	console.log(el) 
});

// Task 3
function mapArray(someArr, someFunc) {
	let mappedArr = [];
	executeforEach(someArr, function(el) {
		mappedArr.push(someFunc(el))
	});
	return mappedArr;
}

mapArray([2, 5, 8], function(el) {
	return el + 3 
});

// Task 4
function filterArray(someArr, someFunc) {
	let filtered = [];
	executeforEach(someArr, function(el) {
		if (someFunc(el))	{
			filtered.push(el)
		}
	});
	return filtered;
}

filterArray([2, 5, 8], function(el) { 
	return el > 3
})

// Task 5
const data = [
  {
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
]

function getAmountOfAdultPeople(data) {
	const personAge = mapArray(data, function(el) {
		return el.age;
	});
	const adultsAmount = filterArray(personAge, function(el) {
		return el > 18;
	});
	return adultsAmount.length;
}

getAmountOfAdultPeople(data);

// Task 6
function getGreenAdultBananaLovers(data) {
	const bananaLover = filterArray(data, function(el) {
		if (el.age > 18 && el.eyeColor === "green" 
		&& el.favoriteFruit === "banana") {
			return el;
		}
	});
	const personName = mapArray(bananaLover, function(el) {
		return el.name;
	});
 return personName;
}

getGreenAdultBananaLovers(data);

// Task 7
function keys(someObj) {
	const arrOfKeys = [];
	for (let key in someObj) {
		arrOfKeys.push(key);
	}
	return arrOfKeys
}

keys({keyOne: 1, keyTwo: 2, keyThree: 3});

// Task 8
function values(someObj) {
	const arrOfValues = [];
	for (let objValue in someObj) {
		arrOfValues.push(someObj[objValue]);
	}
	return arrOfValues;
}

values({keyOne: 1, keyTwo: 2, keyThree: 3});

// Task 9
function showFormattedDate(someDate) {
	const letteredMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" ];
	const getDate = someDate.getDate();
	const getMonth = letteredMonth[someDate.getMonth()];
	const getYear = someDate.getFullYear();

	return `Date: ${getDate} of ${getMonth}, ${getYear}`;
}

showFormattedDate(new Date('2019-01-27T01:10:00'));

// Task 10
function isEvenYear(someDate) {
	const getYear = someDate.getFullYear();
	return !(getYear%2);
}
isEvenYear(new Date('2019-01-27T01:10:00'));

// Task 11
function isEvenMonth(someDate) {
	const getMonth = someDate.getMonth();
	return !((getMonth+1)%2);
}

isEvenMonth(new Date('2019-02-27T01:10:00'));