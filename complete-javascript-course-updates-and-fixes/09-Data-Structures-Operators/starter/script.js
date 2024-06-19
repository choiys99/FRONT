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
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDeliverty: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `order received! ${this.starterMenu[starterIndex]} and 
      ${this.mainMenu[mainIndex]} 
      and ${time} 
      and ${address}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`here is your declicious pasta with${ing1},${ing2},${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
//널리쉬 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리 연산자이다.
//  aa ?? bb << aa가 null 이거나 und.. 일경우 bb 반환 아니면 aa
const foo = null ?? 'default string';
console.log(foo);
// Expected output: "default string"

const guest = restaurant.numGuests || 10;
console.log(guest);

const guestCorrect = restaurant.numGuests || 10;
console.log(guestCorrect);

restaurant.orderPizza('버섯', '마늘', '고등어', '고양이');

// 스프레드연산자
const arrr = [1, 2, ...[3, 4]];

const [a1, b1, ...others] = [1, 2, 3, 4, 5];

console.log(a1, b1, others); // [a1=1,b1=2, others = 나머지 값]

const [Pizza, , Risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(Pizza, Risotto, otherFood);

//obj
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(sum);
  }
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4); // 값을 다 합쳐서 하나의 배열로 압축함,.

restaurant.orderDeliverty({
  tiem: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

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
console.log('==========구분용=========');

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
// const cc = arr[2];

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

//중첩객체의 구조분해할당
// const { fri } = openingHours; // opinghours에서 fri 속성을 추출하여 fri 라는 새로운 변수에 할당
// console.log(fri); //fri  변수에는 openinghours 의 fri속성값이 저장
console.log('구분용===============');
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

const newMenu = [...restaurant.mainMenu, 'gnocci'];
console.log(newMenu);
// 배ㅕㅇㄹ복사

const mainMenuCopy = [...restaurant.mainMenu];
// 두개 합치기

const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu2);

//문자열을 하나하나 쪼갬
const str = 'jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // ['j', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(str);
console.log(...str); // j o n a s

// console.log(`${...str} Schmedtmann`);

const ingredients = [
  // prompt('lets make pasta! Ingredinet 1?'),
  // prompt('lets make pasta! Ingredinet 2?'),
  // prompt('lets make pasta! Ingredinet 3?'),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

//objects

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

console.log('======================================');
console.log('======================================');
console.log('======================================');
console.log('======================================');
console.log('======================================');
console.log('======================================');
console.log('======================================');

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, '최', '에', '성'];
console.log(players1Final);

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function () {
  printGoals('Davies', 'Muller', 'Lewandowski', 'kimmich');
};
