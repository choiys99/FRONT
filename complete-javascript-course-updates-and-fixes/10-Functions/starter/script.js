'use strict';
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // numPassengers = 1, price = 199 기본값 설정

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2);
createBooking('LH123', 2, 350);
createBooking('LH123', undefined, 350);

///////////////////////////////////////////////////

const flight = 'LH234';
const jonas = {
  name: 'Jonas SchmedTmann',
  passport: 24739452744,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr' + passenger.name;

  // if (passenger.passport === 24739452744) {
  //   alert('확인');
  // } else {
  //   alert('실패');
  // }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// const add = (a,b) => a + b;
// const counter = {
//   value :23,
//   inc: function() {
//     this.value++;
//   }
// }

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase(); // 문자열에서 모든 공백 문자를 제거하고 소문자로 변환
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' '); // 입력받은 문자열 str을 공백문자를 기준으로 분리하여 배열만듬
  return [first.toUpperCase(), ...others].join(' '); // 첫번째 단어를 대문자로 변환 > 변환된 첫단어와 나머지들을 다시 공백으로 연결하여 문자열
};
const transformer = function (str, fn) {
  // str문자열과 fn 함수 받음
  console.log(`Original string:${str}`); // 원본출력
  console.log(`Transformed string: ${fn(str)}`); //fn함수를 호출해서 문자열을 변환

  console.log(`Transformed by:${fn.name}`); //fn 함수의 이름을 콘솔에 출력
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// 콜백

const high5 = function () {
  console.log('ㅁ');
};

// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5); // 배열의 각 요소에대해 함수를 실행 high5가 실행

// 함수 반환 함수

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

const greet = greeting => {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('hello')('Jonas');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book:function(){}
  book(flightNum, name) {
    console.log(
      `${name} book a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name: name });
  },
};
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
// console.log(lufthansa);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'Sarah Williams'); // 안됨 이젠 book은 일반함수라서 기능을 작동못함 this 키워드가 작동안함

book.call(eurowings, 23, 'Sarah Williams'); // call() = this 가 가르키고자하느거 ,
console.log(eurowings);
