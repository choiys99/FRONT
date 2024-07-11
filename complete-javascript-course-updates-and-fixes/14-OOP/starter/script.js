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
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
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

//// get set

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
};
// console.log(PersonCl.hey);
PersonCl.hey();

// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // PersonProto 를 부모로 하는(상속받은) 새로운객체 스티븐
console.log(steven);
steven.name = 'Steven';
steven.birthYear = '2002';
steven.calcAge();

console.log(steven.__proto__);

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//문제해결
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  get speedUs() {
    return this.speed / 1.6;
  }
  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}
const ford = new CarCl('Ford', 120);

console.log(ford.speedUs);
ford.accelerate();
ford.speedUs = 50;
console.log(ford);

const Student = function (firstName, birthYear, course) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype; << 이게 맞아보이긴하는데 실제로 작동안함
//Student 객체가 Person 객체의 모든 메소드를 상속
//Student가 Person의 '하위 클래스’처럼 동작
Student.prototype.includes = function () {
  // 여기서 includes는 배열의 요소가 포함되어있는지 확인할려고 사용하는게 아니라
  //prototype에 includes 메소드를 추가할려고 사용
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('mike', 2020, 'Computerseince');
console.log(mike);
mike.includes();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // mike 가 Student 거나 Student를 상속받는 클래스라면 true
console.log(mike instanceof Person);

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

console.dir(mike.__proto__.__proto__.constructor);
