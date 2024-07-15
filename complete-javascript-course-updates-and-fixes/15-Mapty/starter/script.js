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

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition(); //this 는 App

    form.addEventListener('submit', this._newWorkout.bind(this)); // < 이벤트 제출시 실행

    inputType.addEventListener('change', this._toogleElevationField);
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // this가 app 클래스의 인스턴스를 가르키도록 강제 바인딩 설정.
        function () {
          // 실패시
          alert('사용자의 위치 정보를 얻을 수 없습니다');
        }
      );
    }
  }
  _loadMap(position) {
    // 성공시
    const { latitude } = position.coords; // 위도
    const { longitude } = position.coords; // 경도

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);
    //---------------(map(map) = html요소의 id < 지도가 표시될 곳 )
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // 지도클릭
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden'); // 지도 클릭시 히든 제거
    inputDistance.focus(); // 지도 클릭시 바로 입력가능하도록 포커스 위치 설정
  }

  _toogleElevationField() {
    // 토글처리
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // 가장가까운부모선택
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    //입력필드 초기화
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // 입력후 발생
    //디스플레이 마커
    console.log(this.#mapEvent);

    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App();
