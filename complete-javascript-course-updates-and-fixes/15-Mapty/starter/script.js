'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); // 문자열로 변환 , 마지막 10자리 가져오기 임시용 아이디
  constructor(coords, distance, duration) {
    this.coords = coords; // [위도,경도]
    this.distance = distance; // km 거리
    this.duration = duration; // min 시간
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUppercase()}${this.type.slice(1)} on 
    ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    // 속도 계산
    this.pace = this.duration / this.distance;
    //     기간     /     거리
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // 속도 계산
    this.speed = this.duration / (this.distance / 60);
    //     기간     /     거리
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
class App {
  #map;
  #mapEvent;
  #workouts = [];

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
    // 입력필드
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // 배열을 반복해 숫자가 유한한지 여부 확인
    //every = 모든 요소가 만족하는지 확인
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // 데이터 가져오기

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //데이터 유효성 체크

    //달리기이면 달리기 객체 만들기
    if (type === 'running') {
      const cadence = +inputCadence.value; // 값을 숫자로 변환
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('양수가 아닙니다.'); // 유한수가 아니면 실행 맞으면 무시

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //사이클링이면 사이클링 만들기
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('양수가 아닙니다.'); // 유한수가 아니면 실행 맞으면 무시
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //if else 보다 if 여러개 사용이 더 깔끔하고 보기좋음

    // 워크아웃배열에 새 개체 추가
    this.#workouts.push(workout);
    console.log(workout);

    //지도에 마커로 운동을 렌더링
    this._renderWorkoutMarker(workout);

    //목록에 새운동 렌더링
    this._renderWorkout(workout);

    // 양식을 숨기고 입력필드 지우기

    //입력필드 초기화
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // 입력후 발생
    //디스플레이 마커
    console.log(this.#mapEvent);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords) // 위도 경도
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          // 팝업 설정
          maxWidth: 250,
          minWidth: 100,
          autoClose: false, // 팝업이 열릴때 다른 팝업이 닫히는 동작
          closeOnClick: false, //지도 클릭 할 때 마다 팝업이 닫히는 동작
          className: `${workout.type}-popup`, // < css 사용자 정의 css
        })
      )
      .setPopupContent('운동') // text 작업
      .openPopup();
  }
  _renderWorkout(workout) {
    const html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">Running on April 14</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '달리기이모티콘' : '자전거이모티콘'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>      
      `;
  }
}

const app = new App();
