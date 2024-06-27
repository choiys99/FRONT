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
    // 객체의 메소드 1
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
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // 2 하지만 여기서 일반함수가 되어버림 더이상 1을 가르키지않음

// book(23, 'Sarah Williams'); // 안됨 이젠 book은 일반함수라서 기능을 작동못함 this 키워드가 작동안함

book.call(eurowings, 23, 'Sarah Williams'); // call() = this 가 가르키고자하느거 ,
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Copper');
console.log(swiss);

//Apply
const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData); // apply메소드는 두번째는 배열로 받는다
console.log(swiss);

book.call(swiss, ...flightData); // 스프레드연산자 사용으로 더 효율적

const bookEw23 = book.bind(eurowings, 23); // bind() 메서드를 사용하여 book 함수의 this를 eurowings로 고정, 그리고 flightNum을 23으로 고정
bookEw23('Jonas Schmedtmann'); // bookEw23 함수 실행, 이때 name만 전달하면 됨
bookEw23('Martha Cooper');

// 이벤트 리스너 활ㅇㅇ
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); // 이벤트 리스너 안의 this는 해당 이벤트가 발생한 dom 객체를 가르키기 때문에 this는 버튼객체를참조

  this.planes++;
  console.log(this.planes); // 안나옴 ㅇㅇ
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // addtax 화살표함수 사용하고있어서 첫번째 인자 null 사용
// addVat = value => value + value * 0.23

// console.log(addVAT(100));

const poll = {
  question: `What is your favourite programming language?`,
  options: ['0: JavaScript', '1: Python', '2: rust', '3: C++'],
  answers: new Array(4).fill(0), // 결과를 저장하는 배열 , 초기값은 모두 0
  registerNewAnswer() {
    // 사용자로부터 투표응답을 받는 메서드
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')} \n (Write option number)`
      )
    );
    console.log(answer);

    //타입
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    // console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    // 기본값으로 array를 가짐
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are${this.answers.join(', ')}`);
    }
  },
};

// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

////////////////////////////////////////////////

console.log('=======================');
console.log('=======================');
console.log('=======================');
console.log('=======================');
console.log('=======================');

/*
1. 코드 캡슐화하여 전역 스코프와 충돌 방지
2.다른 전역 변수와 겹치지 않음

3.모듈패턴구현하는데 사용
4.변수 유효범위 관리 유용

5. 초기화 코드 실행 유용
*/

const run0nce = function () {
  console.log('This will never run again');
};
run0nce();

(function () {
  console.log('This will never run again'); // 즉시호출함수표현식 iife 위 코드랑 같다
  const isPrivate = 23;
})();

(() => console.log('이건 좀 신기한데?'))(); // 얘도 즉시 호출한다.

console.log('=======================');
console.log('=======================');
console.log('=======================');
console.log('=======================');
console.log('=========클로저===========');

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();
console.dir(booker);

console.log('==================================================');
console.log('==================================================');
console.log('==================================================');
console.log('==================================================');
console.log('==================================================');

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // 함수 g 가 실행되면 a 변수가 선언되고 23이 할당 그다음 f 함수가 정의
f();

h();
f();

// 2222 타이머

const boardPassengers = function (n, wait) {
  const perGroup = n / 3; //(1) 순서

  setTimeout(function () {
    //(2) 타이머설정
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`Htere are 3groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`will start boarding in ${wait} seconds`); //(3)  3번이지만 즉시실행 타이머아님
};

// setTimeout(function () {
//   console.log('타임'); // 1초후 실행, 콜백함수
// }, 1000);

const perGroup = 50; // 변수 이름이 같으면 함수는 내부 변수를 우선으로 사용함..
boardPassengers(180, 3);

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
