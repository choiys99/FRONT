/*
클린코드 =
설명적인 변수 이름,
수행하는 작업에 맞는 실행 함수 

dry 원칙
심플하게 만들어라
필요한 작억만 해라
동일한 코드를 반복시키지 마라

== 변수
변수 선언에 var 사용 x 
const 사용하셈

변수를 변경하는경우에만 let 

==함수
항상 === 삼중등호 사용
함수 작성 규칙
함수가 일반적으로 하나의 작업만
함수에 세개이상의 매개변수 사용하지마셈

읽기 쉽게 만들 때 마다 화살표 함수 사용  
==oop 객체지향
es6 클래스 사용
모든 데이터 캡슐화
클래스의 메서드들이 서로 적절하게 연결되어 있고 목적에 맞게 작동하는지 확인
1.일관성 유지
2.연결성
3.유지보수
4.테스트 

일반개체에서 메서드를 작성할때 화살표 기능을 사용하지마라
해당 개체의 this 안됨

중첩코드 피하기
1.가드 사용 (!DFDF) return 이거
논리 삼항연산자 사용 if문 피하기위함
if문사용할꺼면 if else 말고 if문 여러개 사용 
for문 피하기 >> 맵 필터 축소 등 배열 메서드 사용하기
콜백기반 비동기 api 피하기

가독성 위해서
async/await 사용하고 then 및 catch 사용말고? promise 사용
가능할때마다 promise.all 결합자 함수를 사용해서 병렬로 실행

항상 예외처리는 필수
*/

// import { get } from "core-js/core/dict";

"use strict ";
const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0; // 지출한도 가져오기

//pure function
const addExpense = function (
  state, //현재상태
  limits, //지출 한도 객체
  value, // 지불할 금액
  description, //지출 설명
  user = "jonas" //기본값 jonas 인 사용자의 이름
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }] //배열전개 연산자
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

// const checkExpenses = function (state, limits) {
//   return state.map((entry) => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: "limit" }
//       : entry;
//   });
// };

const checkExpenses = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, " ");
  console.log(bigExpenses);
  // let output = "";
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
console.log(budget);
logBigExpenses(finalBudget, 500);
