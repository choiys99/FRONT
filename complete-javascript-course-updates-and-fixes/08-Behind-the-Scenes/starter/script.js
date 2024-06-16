'use strict';

const myname = '예썽';

if (myname === '예썽') {
  // console.log(`에성 이즈 ${job}`);
  const job = '굳';
  // console.log();
}
//tdz = 사각지대  변수를 선언 및 초기화 하기전에 사용

// var, function, import 영향안받음
// const let class 영향받음

// console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}
var addExpr = function (a, b) {
  return a + b;
};
var addArrow = (a, b) => a + b;

if (!nmprodcut) {
  del();
}

var nmprodcut = 10;

function del() {
  console.log('삭제');
}

// var nmprodcut; // 변수 선언이 호이스팅됨
// if (!nmprodcut) {
//   del(); // nmprodcut이 undefined이므로 del() 함수가 호출됨
// }
// nmprodcut = 10; // 변수 할당이 실제 코드 실행 시 이루어짐
// function del() {
//   console.log('삭제');
// }

const introObject = {
  name: '상준',
  nickname: 'ray',
  getIntro: function () {
    introFunction = function () {
      return `${this.username}님의 닉네임은 ${this.nickname}입니다.`;
    };
    console.log(introFunction());
  },
};
introObject.getIntro(); //undefined님의 닉네임은 undefined입니다.
