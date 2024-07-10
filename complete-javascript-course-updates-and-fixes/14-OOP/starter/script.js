'use strict';

//객체지향 프로그래밍

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas = new Person('Jonas', 1998);
console.log(jonas);

const matilda = new Person('zzz', 1997);
const jack = new Person('zzz', 1997);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);

console.log(Person.prototype.isPrototypeOf(jonas)); //이거상속받음? true false

Person.prototype.species = '호모새키';
console.log(jonas.species, matilda.species);

console.log(jonas.__proto__); // Person의 jonas __proto__  형태
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor); //가지고있는 실제 함수
console.dir(Person.prototype.constructor); //가지고있는 실제 함수

const arr = [3, 6, 3, 4, 5, 6, 9, 3]; // 짧게 적었지만 실제로는 new Array [이렇게 들어감./]
console.log(arr.__proto__); //배열의 프로토타입.. 우리가 기본적으로 알고잇는것들 맵 푸시 리버스 이런거 다 기본적으로 들어가있음
// 자바 오브젝트?맞나 이거랑 같음
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__); // 오브젝트 프로토타입 << 나옴

Array.prototype.unique = function () {
  //배열 프토토타입에새로운 메서드 유니크 추가. 중복된값제거 고유한 요소만으로 이루어진 새로운배열
  return [...new Set(this)]; //this는 호출한 배열을 가르킴
  // new Set(this)는 중복제거한 Set 객체를 생성
};
console.log(arr.unique()); // 중복된값제거.. 하지만 좋은거 아님 사용하지말것 주의해야함
/*
1.전역오염 = 프로토타입에 추가하면 해당메서드는 모든객체에서 사용가능하기때문에 부작용 또는 코드 충돌발생
전역네임드페이스를 오염시킴
2.성능저하 = 메서드 검색하는과정에서 성능에 영향.. 자주사용하는 메서드경우 심함
3.카드 가독성및 유지보수 어려움
걍 사용법만알고 하지말자
*/
const h1 = document.querySelector('h1');
// 문제해결하기
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
//ES6클래스

//클래스 표현식
// const PersonCl2 = class {}

//클래스 선언식
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    // 생성자 외부가 개체의 프로토타입에 있다
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`hey${this.firstName}`);
  }
}

const jessica = new PersonCl('Jessica', 1999); //생성자 내부의 this 키워드도 새로 생성된 빈 개체로 설정
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`hey${this.firstName}`);
// };

jessica.greet();

// 1. 클래스는 호이스팅안됨
// 2. 첫글자는 대문자
// 3. 항상 엄격모드로 실행(클래스가 존재하면 자동?)
