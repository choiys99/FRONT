'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
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
    // console.log(neighbour);

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

// Pending : 대기상태 = 아직 비동기 처리 로직이 완료 되지 않은상태
// Fulfilled  : 이행상태 = 비동기 처리 로직이 성공적으로 완료 됬다는 표현
// Rejected  : 실패상태 = 비동기 로직이 실패
// const request = fetch('https://restcountries.com/v3.1/name/korea');
// console.log(request);

const getJSON = function (url, errorMsg = '잘못했으') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    } // 이함수는 실제로 프로미스반환

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`찾을 수 없는 나라입니다 (${response.status})`); // 응답 200이아닌경우 예외처리

//       return response.json(); // 200일경우 문제없이 리턴
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`찾을 수 없는 나라입니다. (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       [data] = data;
//       renderCountry(data, 'neighbour');
//     })
//     .catch(err => {
//       // 해당 메소드내 오류 다잡음
//       console.error(`${err} 💥💥💥`);
//       renderError(`에러발생에러발생 💥💥 ${err.message}. 다시시도혀!`);
//     })
//     .finally(() => {
//       // 성공 실패 여부 상관없이 무조건 실행
//       countriesContainer.style.opacity = 1;
//     });
// };
// // getCountryData('korea');

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    '나라를 찾지 못했어요'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0]; //?. = 접근값이 null 이거나 undef일 경우 에러 없이 und 반환

      console.log(neighbour);

      if (!neighbour) {
        // 값이 없을경우 실행
        throw new Error('인접한 국가가 없습니다.');
      }

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        '나라를 찾지 못했어요'
      );
    })

    .then(data => {
      [data] = data;
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`에러에러 💥💥 ${err.message}. 다시시도혀!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('japan');
});
////////////////////////////////////////////////////
////////////////////////////////////////////////////

const whereAmI = function (lat, lng) {
  // 위도 경도를인자로 받아 사용자의 현재 위치 정보를 파악
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`) // ai를 사용하여 현재 위치 정보가져옴
    .then(res => {
      // api 응답이 성공적으로 받아졌을때 실행되는 코드
      if (!res.ok) {
        // 실패시 코드
        throw new Error(`지오코딩에서 문제 생김 ${res.status}`);
      }
      // console.log(res);
      return res.json(); //Response 객체에서 제공하는 메서드로, 응답 본문을 JSON으로 파싱하여 Promise 객체
      // 이렇게 반환된 객체는 다음 than에서 사용가능
    })
    .then(data => {
      console.log(data);
      //위에 then이 성공적으로 이루어졌을때 실행되는 코드
      console.log(`넌지금 ${data.city},${data.country}`); //도시,국가 정보를 콘솔에 출력

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`에러에러에러${res.status}`);
      }
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err =>
      console.error(`${err.message} 에러에러에러에러에러에러에러전역`)
    );
};
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////
/*


WEB APIs
dom.. timers.. fetch API... 등


콜백 큐
준비가된 콜백함수 보유
click,timer ,data

이벤트 루프
호출 스택이 비어있을때마다 이벤트 루프는 콜백큐에서 콜백을 가져와 실행 될 수 있도록 호출스택에 넣음
그래서 이벤트 루프는 js에서 비동기 가능하게해주는 필수 요소이다
js에서 비차단 동시성 모델을 가질 수 있는 이유

동시성 모델은 단순히 언어가 동시에 발생하는 여러가지작업을 처리하는방법

js는 싱글 스레드언어 = 하나의 작업만가능하다는것

비동기로 동작하는 핵심요소는 자바스크립트 언어가 아니라 브라우저라는 소프트웨어가 가지고 있다고 보면 된다. Node.js 에서는 libuv 내장 라이브러리가 처리한다
출처: https://inpa.tistory.com/entry/🔄-자바스크립트-이벤트-루프-구조-동작-원리 [Inpa Dev 👨‍💻:티스토리]


https://www.youtube.com/watch?v=zi-IG6VHBh8

*/

// const lotteryProm

const wait = function (seconds) {
  // Promise 객체 생성
  return new Promise(function (resolve) {
    // setTimeout을 사용하여 seconds 초 동안 대기
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images'); // html 선택

const createImage = function (imgPath) {
  //  imgpath파라미터 받음
  return new Promise(function (resolve, reject) {
    // 리턴으로 promise 객채 생성
    const img = document.createElement('img'); // img 태그 생성
    img.src = imgPath; //img. src(이미지 주소)

    img.addEventListener('load', function () {
      // 이미지 로드 대기
      imgContainer.append(img); // 로드되면실행 앞에 넣음
      resolve(img); // 성공시 img 반환
    });
    img.addEventListener('error', function () {
      //실패시
      reject(new Error('이미지를 찾을 수 없습니다.')); // 에러 메시지
    });
  });
};

let currentImg;
createImage('img/img-1.jpg') // createImage 파라미터에 이미지 주소 넣음
  .then(img => {
    //성공시
    currentImg = img; // 주소값공유
    console.log('이미지1'); // 콘솔로그
    return wait(2); // 대기 2초
  })
  .then(() => {
    //성공시
    currentImg.style.display = 'none'; // 디스플레이 none으로설정
    return createImage('img/img-2.jpg'); // 새로운 이미지 넣음
  })
  .then(img => {
    //새로운 이미지 성공시
    currentImg = img; //
    console.log('이미지 2'); //콘솔로그
    return wait(2); // 2초대기
  })
  .then(() => {
    //성공시
    currentImg.style.display = 'none'; // 디스플레이 none 으로 설정
  }) // 최종적으로 2초이미지 보여주고 쉬다가 다시 2초 이미지 보여주고 더이상 안보여줌
  .catch(err => console.error(err)); // 전체적인 에러메시지
//
//
//
//
//
//
const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), //성공시 얻는 값
    //   err => reject(err) // 실패시 에러값
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); //위랑ㄱ랕음..
  });
};
//
//동기화 대기
//
const whereAmI2 = async function () {
  // 지리적위치
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // console.log(pos);

    //역방향 지리 코딩
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) {
      throw new Error('위치 정보를 얻지 못했습니다.');
    }

    // console.log(resGeo);
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);
    // 함수 앞에 async가 붙여저 해당 함수가 비동기 함수임을 나타냄.. 항상 promise를 반환
    // 함수 내에 return없다면 암묵적으로 Promise.resolve(undefined) 반환

    // 나라 데이터

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    ); //프로미스가 처리 될 때까지 함수의 이 지점에서 실행을 중지
    //처리되길 기다리는 동안 다른엔진(다른스크립트실행,이벤트처리) 등을 할 수 있기 때문에 cpu리소스가 낭비되지 않는다.
    // console.log(res);

    if (!res.ok) {
      throw new Error('나라 정보를 얻지 못했습니다.');
    }

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `현재 위치는 ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // console.error(err);
    renderError(`${err.message}`);
    throw err;
  }
};
console.log('11111');
// const city = whereAmI2(''); //promise 반환
// console.log(city);

// whereAmI2()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2:${err.message}`))
//   .finally(() => console.log('3:33'));

// (async function () {
//   try {
//     const city = await whereAmI2();
//     console.log(`2:${city}`);
//   } catch (err) {
//     console.err(`2:err.message`);
//   }
// });

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   // 여기서 오류 잡아서 스크립트 사망안함
//   alert(err.message);
// }

console.log('==구분용==');
console.log('==구분용==');
console.log('==구분용==');

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // Promise.all() //promise를 동시에 받아서 실행

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

//Promise.rece : Promise 받고 가장 빠른 Promise 반환
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('요청 시간이 오래 걸렸습니다.'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),
  timeout(1),
  // 두개의 promise를 배열로 전달 둘 중 먼저 완료되는 결과를 반환
  // getjson vs timeout 대결 이라고 생각하면됨
  // getjson이 1초이내에 응답하면 json 반환 아니라면 timeout 요청 시간이 오래 걸렸다 반환
  // api 요청시간이 너무 오래 걸릴 경우를 대비하여 시간초과를 설정 하는예시
]);
//
//
//
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),
  timeout(0.01),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// 실패해도 넘어감 ,병렬적으로 처리
// 성공여부와 상관없ㅇ ㅣ결과를 배열로 리턴

// Promise.all 의 상위호환이 아닌 편의성을 위해 구현된 기능이기 때문에 필요한 기능을 적절한 판단
// 출처: //inpa.tistory.com/entry/JS-📚-더이상-Promiseall-쓰지말고-PromiseallSettled-사용하자 [Inpa Dev 👨‍💻:티스토리]
Promise.allSettled([
  Promise.resolve('성공'),
  Promise.reject(' 실패'),
  Promise.resolve('성공 2'),
]).then(res => console.log(res));

// all 은 하나라도 실패하면 성공한 응답도 무시된채 catch로 빠지게됨
Promise.all([
  Promise.resolve('성공'),
  Promise.reject(' 실패'),
  Promise.resolve('성공 2'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//any es 2021
// race와 비슷하며 다른점은 성공 실패 ㅕㅇ부 가리지 않음..
// 가장먼저 (fulfilled)이행된 promise의 결고를 반환
// 여러 비동기 작업중 하나라도 성공하면 그결과를 처리하고 모든 pro가 거부되면 오류 발생
Promise.any([
  Promise.resolve('성공'),
  Promise.reject(' 실패'),
  Promise.resolve('성공 2'),
]).then(res => console.log(res));

//문제풀이 2 파트1
const loadNPause = async function () {
  try {
    //이미지 1
    let img = await createImage('img/img-1.jpg');
    console.log('이미지 1');
    await wait(2);
    img.style.display = 'none';

    //이미지 2
    img = await createImage('img/img-2.jpg');
    console.log('이미지 2');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
loadNPause();

// 파트2

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    // console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    // console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-2.jpg', 'img/img-1.jpg', 'img/img-3.jpg']);
