'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// console.log(btnsOpenModal.length);

// hiden 삭제
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// hiden 추가
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// 버튼 길이만큼 히든 삭제?

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', openModal);
// }
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// 버튼 클릭시 실행 (hiden 추가)
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 키보드 누를때마다 실행
document.addEventListener('keydown', function (e) {
  //esc 그리고 모달클래스명에 hidden 포함되어있지않다면!
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal(); // 클래스명에 히든 추가해서 지움
  }
});

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // 단일(중복이라도 첫번째 요소만 선택)
const allSections = document.querySelectorAll('.section'); // 복수
console.log(allSections);

document.getElementById('section--1'); // id 지정
const allButtons = document.getElementsByTagName('button'); // HTML 문서 내의 모든 <button> 태그 요소를 선택
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // 문서내 클래스 이름이 btn인 모도 요소를 선택하여 HTMLCollection 객체로 반환
// HTMLCollection은 실시간으로 문서의 변화를 반영하는 살아있는 컬렉션
//특정 클래스 이름을 가진 모든 요소를 선택하고 조작해야 할 때 유용

const message = document.createElement('div'); // div요소를 생성하고 그 요소를 message 에 저장
message.classList.add('cookie-message');
//  <div class="cookie-message"></div> <<<<
// message.textContent = 'We use cookied for improved functionality and analytics.'
message.innerHTML = // innerhtml은 html을 읽어 온다
  'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it ! </button>';

header.append(message); //부모 요소의 첫 번째 자식으로 새로운 노드를 추가
// header.append(message); //부모 요소의 마지막 자식으로 새로운 노드를 추가
// header.append(message.cloneNode(true)); 중복허용?

header.before(message); // 요소 앞에 컨텐츠 삽입
header.after(message); // 요소 뒤에 삽입

//삭제
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  }); // 클릭하면 실행 메시지 삭제
// 예전에는 부모요소를 선택하고 그 자식요소를 선택해서 삭제를 했는데 시대가 좋아짐 ㅎ

//스타일
message.style.backgroundColor = `#37384d`; // 메시지.스타일.배경색. = "지정한색"
message.style.width = '120%'; // 가로너비 120%
console.log(message.style.height); // X why ? 인라인으로 지정한 스타일값만나옴
console.log(message.style.width); // 120%

console.log(getComputedStyle(message)); // 전달받은 모든 css속성값을 받은 객체를 보여줌
console.log(getComputedStyle(message).height); // 이렇게하면 height 볼수있음

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
//Number.parseFloat= 문자열을 부동 소수점 숫자로 변환
console.log(getComputedStyle(message).height); // 이렇게하면 height 볼수있음

//css 변수

document.documentElement.style.setProperty('--color-primary', 'orangered');
//('대상','변경')

//속성
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// console.log(logo.desogmer); 안됨.. 표준이아니라서
console.log(logo.getAttribute('designer')); // 이건됨... 지금은 값이없어서 null
logo.setAttribute('company', 'Bankist'); // company="Bankist" 라는 속성이 생김

console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//epdlxj thrtjd
console.log(logo.dataset.versionNumber);

//클래스
logo.classList.add('c', 'j');
// console.log(logo.cl);
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

//이건사용하지마셈.. 기존 클래스를 모두 재정의
// logo.className = 'jonas'

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coores = section1.getBoundingClientRect();
  console.log(s1coores.left, s1coores.top);

  console.log(e.target.getBoundingClientRect()); // e.target = btnScrollTo 가르킴
  //getBoundingClientRect = HTML 요소(Element)의 크기와 현재 뷰포트에서의 요소의 상대적인 위치 정보를 반환합니다.

  // console.log('현재 스크롤(X//y)', window.pageXOffset, pageYOffset); << 사용하지말래..오래된거
  console.log('현재 스크롤(X/Y)', window.screenX, screenY);

  console.log(
    '높이/가로',
    document.documentElement.clientHeight, //창의 내부 높이 패딩까지포함
    document.documentElement.clientWidth // 창의 가로너비 패딩까지포함
  );

  //스크롤 위치 px단위
  // window.scrollTo(
  //   s1coores.left + window.pageXOffset,
  //   s1coores.top + window.pageYOffset
  // );
  window.scrollTo({
    left: s1coores.left + window.pageXOffset,
    top: s1coores.top + window.pageYOffset,
    behavior: 'smooth',
  });
});
