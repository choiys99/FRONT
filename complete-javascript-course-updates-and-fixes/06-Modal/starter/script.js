'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
// console.log(btnCloseModal);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  // console.log('버튼클릭');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);

  btnCloseModal.addEventListener('click', closeModal);

  overlay.addEventListener('click', closeModal);
}
//키보드 이벤트
//키보드 이벤트는 일반적으로 전역변수?

document.addEventListener('keydown', function (e) {
  // console.log(e.key);
  if (e.key === 'Escape') {
    // 누른키보드가 esc 실행
    if (!modal.classList.contains('hidden')) {
      // 히든 클래스가 없다면
      closeModal();
      //다시 히든클래스를 넣어준다.
    }
  }
});
