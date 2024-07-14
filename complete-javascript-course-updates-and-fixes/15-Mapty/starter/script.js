'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // 성공시
      const { latitude } = position.coords; // 위도
      const { longitude } = position.coords; // 경도

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);
      //---------------(map(map) = html요소의 id < 지도가 표시될 곳 )
      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // 지도클릭
      map.on('click', function (mapE) {
        // 지도 클릭시 얻는 데이터
        mapEvent = mapE;
        form.classList.remove('hidden'); // 지도 클릭시 히든 제거
        inputDistance.focus(); // 지도 클릭시 바로 입력가능하도록 포커스 위치 설정
      });
    },
    function () {
      // 실패시
      alert('사용자의 위치 정보를 얻을 수 없습니다');
    }
  );
}

form.addEventListener('submit', function (e) {
  // < 이벤트 제출시 실행
  e.preventDefault();

  //입력필드 초기화
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';
  // 입력후 발생
  //디스플레이 마커
  console.log(mapEvent);

  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        // 팝업 설정
        maxWidth: 250,
        minWidth: 100,
        autoClose: false, // 팝업이 열릴때 다른 팝업이 닫히는 동작
        closeOnClick: false, //지도 클릭 할 때 마다 팝업이 닫히는 동작
        className: 'running-popup', // < css 사용자 정의 css
      })
    )
    .setPopupContent('운동') // text 작업
    .openPopup();
});

inputType.addEventListener('change', function () {
  // 토글처리
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
