'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; //HTML 요소의 내부 HTML을 빈 문자열(‘’)로 설정합니다. 즉, 해당 요소의 모든 내용을 제거

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
          </div>
          <div class="movements__value">${mov}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // const html = ``
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log('==================슬라이스============');

//슬라이스
console.log(arr.slice(2)); // 새로운 배열 ['c', 'd', 'e'] 출력 원본은 건드지 x
console.log(arr.slice(2, 4)); // 새로운 배열 ['c', 'd'] 출력 원본은 건드지 x
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b', 'c']
console.log(arr.slice()); // 값 다 출력

console.log([...arr]); // 값 다 출력
console.log('==================스플라이스============');

//스플라이스
// console.log(arr.splice(2)); // 원본은 건듬 ㄷㄷ ['c', 'd', 'e']
arr.splice(-1); // ( -1 은 마지막요소)
arr.splice(1, 2); // ( 두번째 세번째 요소 건듬 ㄷㄷ)
console.log(arr);

console.log('==================리버스============');
//리버스
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // 순서 변경시킨다.. 원본 건듬
console.log(arr2);

//컨캣 배열연결
console.log('==================컨캣============');
const letters = arr.concat(arr2);
console.log(letters);
//조인
console.log('==================조인============');
console.log(letters.join('-')); // 배열을 -로 구분된 문자열로 변경시킨다.a-b-c-d-e-f-g-h-i-j

//at
console.log('==================at메소드============');
const ree = [23, 11, 64];
console.log(arr[0]); // 동일한 결과
console.log(arr.at(0)); // 동일한 결과

console.log(ree[ree.length - 1]); // 마지막요소 얻는법
console.log(ree.slice(-1)[0]);
console.log(ree.at(-1)); // 얘는 문자열에서도 가능

///foreach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; //

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(` ${i + 1} : you deposited${movement}`);
  } else {
    console.log(` ${i + 1}  you withdrew ${Math.abs(movement)}`); // 지정된 숫자의 절대값을 반환
  }
}

console.log('------foreach------');

movements.forEach(function (mov, i, arr) {
  // (요소:배열의 각요소에대한 참조, 인덱스:현재 요소의 인덱스 배열:반목문을 호출한 배열자체)
  // 순서중요함
  if (mov > 0) {
    console.log(` ${i + 1} : you deposited${mov}`);
  } else {
    console.log(` ${i + 1}  you withdrew ${Math.abs(mov)}`); // 지정된 숫자의 절대값을 반환
  }
});

//foreach map and set
console.log('=====foreach map and set=====');

//map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

//set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  // 일회용변수를 의미하는 _
  console.log(`${key}: ${value}`); //set 에서는 키와 밸류 값이 똑같다..
});
