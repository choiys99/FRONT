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
          <div class="movements__value">${mov}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // const html = ``
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

console.log(account1);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, arr) => acc + arr, 0);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, arr) => acc + arr, 0);

  labelSumOut.textContent = `${Math.abs(out)}`;
  labelSumIn.textContent = `${incomes}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // 기본동작방지

  // console.log('login');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // .?속성값이 null 또는 undefined경우에도 객체속성에접근가능하게헤주는 옵셔널체이닝
    // console.log('login');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);
  }
});

// console.log(containerMovements.innerHTML);

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
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   // 일회용변수를 의미하는 _
//   console.log(`${key}: ${value}`); //set 에서는 키와 밸류 값이 똑같다..
// });

//map 메소드는 새로운 배열을 만든다.

const eurToUsd = 1.1;

const movemnetsUSD = movements.map(mov => mov * eurToUsd);
console.log(movemnetsUSD); // 모든 요소 다 사용

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// const movement
const movementsDescriptions = movements.map((mov, i, arr) => {
  return `Movement ${i + 1} : you ${
    mov > 0 ? 'depositd' : 'withdrew'
  } ${Math.abs(mov)}}`;

  // if (mov > 0) {
  //   return `Movement ${i + 1} :You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1} :You withdrew ${Math.abs(mov)}`;
  // }
});

console.log(movementsDescriptions);

const user = 'Steven Thomas Williams;';

//const test = moventes.filter(function(mov) {
// return mov > 0
// });
const withdrawals = movements.filter(mov => mov > 0);

//reduce

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   // acc 누산기 cur 배열요소 i 인덱스 arr 호출된 원래의 배ㅕㅇㄹ
//   console.log(`Iteration ${i}:${acc}`);
//   return acc + cur;
// });

const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

// let numbers = [1, 2, 3, 4, 5];
// let sum = numbers.reduce((accumulator, currentValue, currentIndex, arr) => {
//   console.log(
//     `Processing element ${currentValue} at index ${currentIndex} in array ${arr}`
//   );
//   return accumulator + currentValue;
// }, 0);
// console.log(`Sum of all numbers: ${sum}`);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// console.log(balance);

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const avg = adults.reduce((acc, cur) => acc + cur) / adults.length;
//   const avg = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//   console.log(avg);
// };

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = [5, 2, 4, 1, 15, 8, 3];
// const avg2 = [16, 6, 10, 5, 6, 1, 4];
// console.log(calcAverageHumanAge(avg1, avg2)); // 이렇게 해도 하나만 값이 들어감

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

const totalDepositsUSD = movements
  .filter(mov => mov > 0) // 0보다 클때
  // .map(mov => mov * eurToUsd) // 모든 값들을 달러로 변환 하고
  .map((mov, i, arr) => {
    mov * eurToUsd;
  }) // 모든 값들을 달러로 변환 하고
  .reduce((acc, mov) => acc + mov, 0); //총 금액
console.log(totalDepositsUSD); // 출력
