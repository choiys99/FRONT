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

var budget = [
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
];

var limits = {
  jonas: 1500,
  matilda: 100,
};

var add = function (value, description, user) {
  if (!user) user = "jonas";
  user = user.toLowerCase();

  var lim;
  if (limits[user]) {
    lim = limits[user];
  } else {
    lim = 0;
  }

  if (value <= lim) {
    budget.push({ value: -value, description: description, user: user });
  }
};
add(10, "Pizza 🍕");
add(100, "Going to movies 🍿", "Matilda");
add(200, "Stuff", "Jay");
console.log(budget);

var check = function () {
  for (var el of budget) {
    var lim;
    if (limits[el.user]) {
      lim = limits[el.user];
    } else {
      lim = 0;
    }

    if (el.value < -lim) {
      el.flag = "limit";
    }
  }
};
check();

console.log(budget);

var bigExpenses = function (limit) {
  var output = "";
  for (var el of budget) {
    if (el.value <= -limit) {
      output += el.description.slice(-2) + " / "; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
