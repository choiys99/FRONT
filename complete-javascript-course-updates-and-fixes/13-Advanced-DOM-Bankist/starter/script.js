'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav'); // nav 맨위

const section1 = document.querySelector('#section--1'); // 세션1

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

////////////////// 페이지 스크롤 이벤트 작업  ///////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to'); // 화면 Learn more 이거

btnScrollTo.addEventListener('click', function (e) {});
// 클릭시 실행
// const s1coores = section1.getBoundingClientRect();
// console.log(s1coores.left, s1coores.top);
// console.log(e.target.getBoundingClientRect()); // e.target = btnScrollTo 가르킴
//getBoundingClientRect = HTML 요소(Element)의 크기와 현재 뷰포트에서의 요소의 상대적인 위치 정보를 반환합니다.
// (left, top) 순서인듯?

// console.log('현재 스크롤(X//y)', window.pageXOffset, pageYOffset); << 사용하지말래..오래된거
console.log('현재 스크롤(X/Y)', window.scrollX, scrollY);

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

// pageXOffset = 현재 보이는 화면 왼쪽 가장자리 사이의 거리를 픽셀단위로 나타냄 하지만 오래된거 그래서  scrollX 권장

// window.scrollTo({
//   left: s1coores.left + window.scrollX,
//   top: s1coores.top + window.scrollY,
//   behavior: 'smooth',
// });

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      // scrollIntoView  = 선택한 요소를 기준으로 이동
      behavior: 'smooth',
    });
  });
});

// 1. 공통 상위 요소에 이벤트 추가
//2. 요소확인

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //매칭
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      // scrollIntoView  = 선택한 요소를 기준으로 이동
      behavior: 'smooth',
    });
  }
});

///////////// dom 횡단 //////////////////
const h1 = document.querySelector('h1');
// 내려간다잉 : 하위요소부터
console.log(h1.querySelectorAll('.highlight')); // h1 하위 요소 highlight 선택
console.log(h1.childNodes); // 모든 하위요소 볼 수 있음 주석,텍스트 포함되어잇ㅇ므
console.log(h1.children); // 주석,텍스트 포함안됨
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

// 이제 올라간다잉 : 부모로
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(white)'; // 헤더요소에 모든 스타일 적용

console.log(h1.previousElementSibling); //특정요소의 이전 형제를 반환하는 읽기 전용
console.log(h1.nextElementSibling); // 다음요소를 가져옴

console.log(h1.parentElement.children); // 부모요소를 가져오고 그 부모요소의 자식들을 html컬렉션 (배열은아닌데 배열처럼 사용가능)

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)'; //h1.요소의 부모요소의 자식들을 돌면서 h1요소가 아닌 모든 요소 스타일 변경
//   }
// });

//  탭 구성 요소
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('tab'))); << 좋은거 아님.. 양이 많으면 페이지 느려짐

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //closest < 가장가까운 상위요소 찾음
  console.log(clicked);

  // 가드
  if (!clicked) return; // 상위 요소가 존재하지 않는다면 아무행동안함

  tabs.forEach(t => t.classList.remove('operations__tab--active')); // 먼저 모든 요소에서 제거
  tabsContent.forEach(c => c.classList.remove('operations__content--active')); // 요소 삭제

  //active 탭
  clicked.classList.add('operations__tab--active'); // 클릭한 요소만 추가

  //active 영역
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//메뉴 애니메이션

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // this는 함수를 호출한 객체를 가르키는데 여기서는 bind로 강제설정함
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5)); //bind는 this의 값을 영구적으로 설정
nav.addEventListener('mouseout', handleHover.bind(1));

// 스크롤 이벤트
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // 뷰 포트 기준으로 거리를 알 수 잇음

window.addEventListener('scroll', function () {
  // console.log(this.window.scrollY);
  if (this.window.scrollY > initialCoords.top) {
    // 이거 별로래
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//css 변수

document.documentElement.style.setProperty('--color-primary', 'orangered');
//('대상','변경')

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//클래스

logo.classList.add('c', 'j');
// console.log(logo.cl);
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

//이건사용하지마셈.. 기존 클래스를 모두 재정의
// logo.className = 'jonas'

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// 마우스이벤트

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   // css :hover 비슷 마우스가 특정요소에 들어갈때마다 실행
//   alert('제목 보는중');
// });

// const alertH1 = function (e) {
//   alert('test'); // (2) 결과 그리고
//   h1.removeEventListener('mouseenter', alertH1); // (3) 이벤트 제거 .... 한번만 알림창이 뜨고 이제 안뜸
// };
// h1.addEventListener('mouseenter', alertH1); // h1 이벤트 추가 (1)

// h1.onmouseenter = function (e) {
//   alert('제목 보는중2');
// }; // 이건 구식방법 위에는 최신방법

//버블링

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// // console.log(randomInt(0, 255));

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // e.defaultPrevented();
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   // e.defaultPrevented();
//   this.style.backgroundColor = randomColor();

//   console.log('LINK');
// });
