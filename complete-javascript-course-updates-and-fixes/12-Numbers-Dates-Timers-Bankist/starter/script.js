'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-06-28T14:11:59.604Z',
    '2024-07-01T17:01:17.194Z',
    '2024-07-02T23:36:17.929Z',
    '2024-07-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovement = function (date) {
  const calcDayspassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDayspassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0); // 문자열길이, 0 채울꺼 >> 한자리수면 0n 이렇게
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //HTML 요소의 내부 HTML을 빈 문자열(‘’)로 설정합니다. 즉, 해당 요소의 모든 내용을 제거

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovement(date);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // const html = ``
};
// displayMovements(account1.movements);

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

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// calcDisplayBalance(account1);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, arr) => acc + arr, 0);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, arr) => acc + arr, 0);

  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
// calcDisplaySummary(account1);

//업데이트
const updateUi = function (acc) {
  displayMovements(acc);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

const startLogOutTimer = function () {
  let time = 10;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const set = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${set}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
// 이벤트 핸들러
let currentAccount, timer;

// 로그인 임시
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

//국제화 api
const now = new Date();
const options = {
  // 사용자 설정
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};

const locale = (labelDate.textContent = new Intl.DateTimeFormat(
  'ko-KR',
  options
).format(now));
// 개쩌네.. iso language code table << google 검색
const locale2 = navigator.language;
console.log(locale2);

//day/month/year

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // 기본동작방지

  // console.log('login');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // .?속성값이 null 또는 undefined경우에도 객체속성에접근가능하게헤주는 옵셔널체이닝
    // console.log('login');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // 로그인시 현재 날짜 생성
    // const now = new Date(); // 현재날짜
    // const day = `${now.getDate()}`.padStart(2, 0); // 문자열길이, 0 채울꺼 >> 한자리수면 0n 이렇게
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year},${hour}:${min}`;

    const options = {
      // 사용자 설정
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // 개쩌네.. iso language code table << google 검색

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUi(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value; // 입력한 금액을 숫자로 변환
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && // 송금금액이 0보다 크며
    receiverAcc && // 존재하는 아이디 이어야하며
    currentAccount.balance >= amount && // 보유자산보다 적으며
    receiverAcc.username !== currentAccount.username //자기자신이 아니다
  ) {
    // console.log('이체완료');
    currentAccount.movements.push(-amount); //로그인 유저
    receiverAcc.movements.push(amount); // 상대방

    //전송날짜
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //시간 초기화
    clearInterval(timer);
    timer = startLogOutTimer();

    updateUi(currentAccount);
  }
});

//계정 탈퇴
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Delete');

  if (
    currentAccount.username === inputCloseUsername.value &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});
//

let sorted = false; // 정렬x
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); //true 전달해서 정렬
  sorted = !sorted;
});

//

//

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(23 === 23.0); // true
console.log(0.1 + 0.2); // 0.30000000000000004 ... 2진법으로 표현하기 힘들어서..
console.log(0.1 + 0.2 === 0.3); //false

console.log(Number('23')); //23 숫자
console.log(+'23'); //23 숫자

console.log(Number.parseInt('30px')); //30
//parseInt 메소드는 문자열의 시작 부분에서 숫자를 찾아 변환하며, 숫자가 아닌 문자를 만나면 변환을 중단
console.log(Number.parseInt('e23')); //NaN

console.log(Number.parseFloat('2.5rem')); //2.5
console.log(Number.parseInt('2.5rem')); //2

// not a number = 숫자가아니냐
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

//isFinite 유한한 숫자인지 확인
console.log(Number.isFinite(23)); // true
console.log(Number.isFinite('23')); // false
console.log(Number.isFinite(+'20X')); // false

console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); // false

//=====================================

console.log(Math.sqrt(25)); // 5 제곱근나옴
console.log(25 ** 1 / 2); //12.5
console.log(25 ** (1 / 2)); //5

console.log(8 ** (1 / 3)); //2
console.log(Math.max(5, 18, 23, 11, 2)); // 최댓값 찾아줌 23
console.log(Math.max(5, 18, '23', 11, 2)); //  최댓값 찾아줌 23
console.log(Math.max(5, 18, '23px', 11, 2)); // nan

console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log(Math.random()); // 0~ 1 사이

const rendomint = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(rendomint(5, 20));

// 소수점 자름
console.log(Math.trunc(23.3)); //23
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24 << 반오름 0.5 기준

console.log(Math.ceil(23.9)); //24 << 무 조건 오름
console.log(Math.ceil(23.3)); //24 << 마찬가지

console.log(Math.floor(23.3)); //23 <<  무조건내림
console.log(Math.floor(23.3)); //23 << 마찬가지
console.log(Math.floor('23.3')); //23 << 마찬가지

console.log(Math.trunc(-23.3)); //-23 <<
console.log(Math.floor(-23.3)); //-24 <<

//소수점 설정
console.log((2.7).toFixed(0)); // 3 << 문자열로나옴.. tofixed는 항상 문자열을 반환
console.log((2.7).toFixed(3)); // 2.700 <<
console.log((2.345).toFixed(2)); // 2.35

// 나머지 연산자

console.log(5 % 2); //1 .. 나누고 남은값 나머지
console.log(5 / 2); //2.5 // 나눈값

console.log(8 % 3); // 2
console.log(8 / 3); // 2.666..

console.log(6 % 2); // 0 ... 남은게 없으니 짝수다
console.log(6 / 2); // 3

console.log(7 / 2); // 1... 남은게 1이니 홀 수
console.log(7 / 2); // 3.5 ...

const isEven = n => n % 2 === 0; //짝수냐?
console.log(isEven(8)); // true
console.log(isEven(23)); //false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'; //0,2,4,6
    if (i % 3 === 0) row.style.backgroundColor = 'blue'; //0,3,6,9
  });
});

const diameter = 287_460_000_000;
console.log(diameter);

console.log(Number('230_000')); //nan ... 구분못해서 안댐

console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 << js가 안전하게 나타 낼 수 있는 가장 큰 수
// 이 수 ㅓㄴㅁ어가면 정밀도가 떨어짐

console.log(4654543545343453453354351234n); // n는 bigint
console.log(BigInt(53453354351234));

console.log(10000n + 10000n); // 20000n
console.log(54646546515464n * 100000n);

const huge = 20215648678784n;
const num = 23;
// console.log(huge * num); 안됨.. 타입같아야함

console.log(huge * BigInt(num));

console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(typeof 20n); // bigint
console.log(20n == 20); //true

console.log(huge + 'is really big!!');

console.log(10n / 3n); // 3n << 기본적으로 소수부분 잘라낸다.
console.log(10 / 3); //3.333

//js 날짜 생성

// // const now = new Date();
// console.log(now); //Tue Jul 02 2024 21:04:39 GMT+0900 (한국 표준시)
// console.log(new Date('Tue Jul 02 2024 21:04:39')); // 자동으로 시간을 구문 분석
// console.log(new Date('December 24,2015'));

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5)); // 년 월 일 시간 분 초
// console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0900 (한국

// console.log(new Date(0)); // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 09:00:00 GMT+0900 (한국 표준시)
// //                   3번 ,하루는 24시간 ,시간은 60분, 분은 60초,초는 1000밀리초 (1초)

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); // 2037
// console.log(future.getMonth()); // 10
// console.log(future.getDate()); // 19
// console.log(future.getDay()); // 4... (이건 요일을 나타냄 0은 일요일 4느,ㄴ 목요일)
// console.log(future.getHours()); // 15
// console.log(future.getMinutes()); // 23
// console.log(future.getSeconds()); // 0

// console.log(future.toISOString()); //2037-11-19T06:23:00.000Z
// console.log(future.getTime()); //2142224580000 << 이건타임스탬프
// console.log(new Date(2142224580000)); //Thu Nov 19 2037 15:23:00 GMT+0900 (한국 표준시)

// console.log(Date.now()); // 현재시간 타임스탬프

// const future2 = new Date(2037, 10, 19, 15, 23);
// console.log(+future2);

// const calcDayspassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const day1 = calcDayspassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
// console.log(day1);

const num2 = 3884764.23;
const optinoss = {
  style: 'currency',
  // unit: 'celsius',
  currency: 'EUR',
  useGrouping: false,
};
console.log('미국:', new Intl.NumberFormat('en-us', optinoss).format(num2));
console.log('독일:', new Intl.NumberFormat('de-DE', optinoss).format(num2));
console.log('시리아:', new Intl.NumberFormat('ar-SY', optinoss).format(num2));

// 타이머 설정
const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`피자 ${ing1}ㅈㄴ ${ing2}먹고싶다`),
  3000,
  ...ingredients
); // 3초후 발생

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // << spinach 포함되어있으면 무시

//setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 100000000000); // 1초마다 실행
