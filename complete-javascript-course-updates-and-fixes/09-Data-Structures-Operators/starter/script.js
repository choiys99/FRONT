'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
//객체파괴
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
console.log('==========구분용=========');

const { name: restName, openingHours: hours, categories: tags } = restaurant; //변수이름을 다시 설정
console.log(restName, hours, tags);
console.log('==========구분용=========');

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
console.log('==========구분용=========');

let aaaa = 1111;
let bbbb = 9999;
const obj = { aaaa: 23, bbbb: 7, c: 14 };

// {aaaa,bbbb} = obj; // 에러발생 중괄호로 실행할때 js는 코드블록을 기대
({ aaaa, bbbb } = obj);
console.log(aaaa, bbbb);

// 구조 분해 할당 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는
//예시
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// Expected output: 10

console.log(b);
// Expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest); // 나머지 요소들을 rest에 담음
// Expected output: Array [30, 40, 50]

const arr = [2, 3, 4];
const aa = arr[0];
const bb = arr[1];
const cc = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

console.log(restaurant.order(2, 0));

// const [i, , j] = nested;
// console.log(i, j);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//기본값과 중첩된 구조분해

const [p = 1, q = 1, r = 1] = [8, 9]; // 기본값 설정..? 값을 가져올때 없으면 발생
console.log(p, q, r); // 8 9 1 r은 없자나
