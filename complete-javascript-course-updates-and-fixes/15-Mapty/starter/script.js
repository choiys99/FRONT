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
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [위도,경도]
    this.distance = distance; // km 거리
    this.duration = duration; // min 시간
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on 
    ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription(); // 메서드 재정의
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
    this._setDescription();
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
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // 어플 실행시 바로 실행되는곳 <
    //사용자 정보
    this._getPosition(); //this 는 App

    //로컬 정보 가져오괴
    this._getLocalStorage();

    //attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this)); // < 이벤트 (엔터?)제출시 실행 입력필드
    inputType.addEventListener('change', this._toogleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    // 위치정보 얻음
    // 성공시
    const { latitude } = position.coords; // 위도
    const { longitude } = position.coords; // 경도

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    //---------------(map(map) = html요소의 id < 지도가 표시될 곳 )
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // 지도클릭
    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden'); // 지도 클릭시 히든 제거해서 입력창 나옴
    inputDistance.focus(); // 지도 클릭시 바로 입력가능하도록 포커스 위치 설정
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 500);
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

    this._hideForm();
    // 입력후 발생
    //디스플레이 마커
    console.log(this.#mapEvent);

    this._setLocalStorage();
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
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.duration}`
      ) // text 작업
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
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

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    console.log(workout);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true, // 지도이동을 애니메이션으로
      pan: {
        duration: 1, // 지도 이동시 1초동안
      },
    });

    //공개 인터페이스
    // workout.click();
  }
  //로컬스토리지
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // 소량의 데이터만 저장하는게좋음
    // f12 > 애플리케이션 > 로컬 스트리지
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts')); //JSON.parse = json형식의 문자열을 js객체로 변환
    //기본적으로 로컬 저장 항목의 식별자

    if (!data) return;

    this.#workouts = data; // 로컬에 정보가 있을경우 work배열에 바로 정보를 집어넣어서 마크 표시하게만듬

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload(); // 콘솔창에서 app.reset() 하면됩
  }
}
// 개체에서 문자열 > 문자열에서 다시 개체 > 프로토타입체인 손실 == 일반개체가됨 == 상속없어짐
const app = new App();
