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
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   // Methods will be added to .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     // else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋');
//     console.log(this);
//   }
// }

// const jessica = new PersonCl('Jessica', 1999); //생성자 내부의 this 키워드도 새로 생성된 빈 개체로 설정
// console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`hey${this.firstName}`);
// };

// jessica.greet();

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
// PersonCl.hey();

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
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }
//   get speedUs() {
//     return this.speed / 1.6;
//   }
//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//   }
// }
// const ford = new CarCl('Ford', 120);

// console.log(ford.speedUs);
// ford.accelerate();
// ford.speedUs = 50;
// console.log(ford);

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

//////////////////////////////////////

const Car1 = function (make, speed) {
  this.make = make;
  this.speed = speed;
}; // 생성자 함수 car1 make speed 를 받음

Car1.prototype.accelerate = function () {
  // 메소드 추가 실행되면 스피드 + 10
  this.speed += 10;
  console.log(`${this.make} is goind at ${this.speed} km/h`);
};

Car1.prototype.brake = function () {
  // 메소드 추가 스피ㄷ, -5
  this.speed -= 5;
  console.log(`${this.make} is goind at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car1.call(this, make, speed);
  this.charge = charge; // 이렇게하면 ev 객체를 가르킴
};

EV.prototype = Object.create(Car1.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} is goind at ${this.speed} km/h
    with a charge of ${this.charge}`);
};
const tesla = new EV('테슬라', 120, 23);
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

class PersonCl {
  constructor(fullName, birthYear) {
    // 생성자 메서드, 객체 생성 시 fullName, birthYear 속성 초기화
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // 인스턴스 메서드, prototype 프로퍼티에 추가됨
  calcAge() {
    // 현재 년도(2037)에서 birthYear를 빼서 나이 계산 후 콘솔에 출력
    console.log(2037 - this.birthYear);
  }

  greet() {
    // fullName 속성을 사용하여 인사말 콘솔에 출력
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    // 나이 계산 후 반환하는 게터 메서드
    return 2037 - this.birthYear;
  }

  // 기존 속성에 대한 세터 메서드
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // else alert(`${name} is not a full name!`);
  }

  get fullName() {
    // _fullName 속성을 반환하는 게터 메서드
    return this._fullName;
  }

  // 정적 메서드, 클래스 자체에서 호출
  static hey() {
    console.log('Hey there 👋');
    console.log(this); // this는 PersonCl 클래스를 가리킴
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // PersonCl 클래스의 constructor 호출하여 fullName, birthYear 초기화
    super(fullName, birthYear);
    this.course = course; // course 속성 추가 초기화
  }
  includes() {
    // fullName, course 속성을 사용하여 정보 출력
    console.log(
      `저의 이름은 ${this.fullName} 그리고 직업은 ${this.course} 입니다`
    );
  }
  calcAge() {
    // 부모 클래스의 calcAge 메서드 오버라이드
    console.log(`나이는 ${this.age} 입니다`);
  }
}

const martha = new StudentCl('최예성', 2012, '알바생');
martha.includes();
martha.calcAge(); // 부모 클래스의 calcAge 메서드가 오버라이드 됨

// PersonProto2 객체, 프로토타입 객체
const PersonProto2 = {
  // calcAge 메서드, 현재 년도(2024)에서 birthYear를 빼서 나이 계산 후 콘솔에 출력
  calcAge() {
    console.log(2024 - this.birthYear);
  },
  // init 메서드, firstName, birthYear 속성 초기화
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// PersonProto2 객체를 프로토타입으로 하는 steven2 객체 생성
const steven2 = Object.create(PersonProto2);

// PersonProto2 객체를 프로토타입으로 하는 StudentProto2 객체 생성
const StudentProto2 = Object.create(PersonProto2);

// StudentProto2 객체의 init 메서드 오버라이드, PersonProto2의 init 메서드 호출 후 course 속성 추가
StudentProto2.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};

// StudentProto2 객체를 프로토타입으로 하는 jay2 객체 생성 후 init 메서드 호출
const jay2 = Object.create(StudentProto2);
jay2.init('jay', 2010, '알바');

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
class Account {
  // 1) public fields (instances)<< 프로토 타입 추가 x
  locale = navigator.language;

  // 2) Private fields
  #movements = []; //#붙이는걸로 필드를 비공개로 만듬
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner; // 계좌 소유자 이름
    this.currency = currency; // 통화 종류
    // protected property
    this.#pin = pin; // PIN 코드
    // pin은 입력값을 기반으로 생성자에 대한 핀을 설정
    // 근데 생성자에서는 필드를 정의 할 수 없음

    // this._movements = []; // 거래 내역 배열
    // this.locale = navigator.language; // 사용자 언어 설정

    console.log(`thanks for opeing an account, ${owner}`); // 계좌 개설 메시지 출력
  }

  // public interface << 항상 프로토 타입추가

  // 3) public methods
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val); // 입금 금액을 movements 배열에 추가
    return this;
  }

  withdraw(val) {
    this.deposit(-val); // 출금 금액을 음수로 deposit 메서드 호출
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      // 대출 승인 여부 확인
      this.deposit(val); // 대출 금액을 입금
      console.log('화긴요'); // 대출 승인 메시지 출력
      return this; // 자신을 호출한 객체인스턴스를 반환 > 메서드 체이닝할라구
    }
  }

  static helper() {
    console.log('스태틱의단검');
  }
  // 4) private methods
  #approveLoan(val) {
    return true; // 대출 승인 여부를 반환 (항상 true)  하지만 구글 크롬에서는 사용불가
  }
}

const acc1 = new Account('최예성', 'Kr', 111); // Account 클래스의 인스턴스 생성
console.log(acc1); // 생성된 인스턴스 출력

acc1.deposit(250); // 250원 입금
acc1.withdraw(120); // 120원 출금
acc1.requestLoan(1000);
// acc1.approveLoan(1000); 허용하면안됨..
console.log(acc1.getMovements());
console.log(acc1); // 변경된 인스턴스 출력

Account.helper();

// console.log(acc1.#pin);
// console.log(acc1.#movements); << 에러발생!! 찾을수없ㄷ!! 외부에서 접근이 불가능하다!

// console.log(acc1.#approveLoan(100));

//Chanining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000); // 메서드체이닝

//문제 해결
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
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
