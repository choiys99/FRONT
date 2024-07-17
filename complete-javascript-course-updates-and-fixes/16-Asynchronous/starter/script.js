'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// https://github.com/public-apis/public-apis?tab=readme-ov-file#music

// 이벤트리스너를통해 해당 이벤트 가져올때까지 대기중
//데이터를 가져오면 콜백함수 function 실행

// console.log(this.responseText); // json 형태

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const name = data.name.common;
//     const flag = data.flags.svg;
//     const region = data.region;
//     const language = Object.values(data.languages)[0];
//     const currency = Object.values(data.currencies)[0].name;

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${name}</h3>
//       <h4 class="country__region">${region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${language}</p>
//       <p class="country__row"><span>💰</span>${currency}</p>
//     </div>
//   </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

const renderCountry = function (data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // 첫번째 ajax 호출
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // 다음 로드 이벤트 발생
    // 데이터가 도착하면 해당 데이터 처리
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    // render country 1
    renderCountry(data);

    // get neighbour country 2
    const [neighbour] = data.borders;

    if (!neighbour) return; // 국경? 이웃나라가 없는경우

    // ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      // console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('korea');

// 콜백지옥 ..탈출하기

//  Promise 사용하기
// 장점 비동기 결과를 처리하기 위해 더 이상 이벤트와 콜백함수에 의존할필요가없어짐

//  Pending : 대기상태 = 아직 비동기 처리 로직이 완료 되지 않은상태
// Fulfilled  : 이행상태 = 비동기 처리 로직이 성공적으로 완료 됬다는 표현
// Rejected  : 실패상태 = 비동기 로직이 실패
const request = fetch('https://restcountries.com/v3.1/name/korea');
// console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // .then(function (response) {
    //   // fetch 사용하면 즉시 Promise 가 반환
    //   return response.json(); // 비동기함수 json
    // })
    // .then(function (data) {
    //   // data = return 값
    //   renderCountry(data[0]);
    // });
    .then(response => response.json())
    .then(function (data) {
      renderCountry(data[0]);
    });
};
getCountryData('korea');
