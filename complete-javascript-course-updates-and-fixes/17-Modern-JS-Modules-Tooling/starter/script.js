// // import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log('importing module');
// // addToCart('빵', 5);
// // console.log(price, tq);

// // import * as ShoppingCart from './shoppingCart.js'; // 클래스와 비슷함
// // ShoppingCart.addToCart('빵', 3);
// // console.log(ShoppingCart.totalPrice);

// // import add from './shoppingCart.js';  이것도 가능함
// // add('pizza', 2);

// // import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// // add('pizza', 2);
// // console.log(price);

import addd, { cart } from "./shoppingCart.js";
addd("빵", 2);
addd("과자", 4);
addd("피자", 5);
console.log(cart);

// //es2022 top-level await
// /*
// 모듈의 최상위 스코프에서 비동기 동작을 await하여 사용할 수 있다.
// 이전에는 async 키워드가 있는 스코프 내에서만 await를 통해 해당 스코프에서 비동기 동작이 완료되기까지 블로킹할 수 있었는데
// 모듈 단위에서 await를 통해 특정 비동기 함수의 동작이 완료되기까지 하위 모듈의 동작을 막을 수 있다.
// */

// // console.log('시작');
// // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // const data = await res.json();
// // console.log(data);
// // console.log('끝');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();
// console.log(lastPost);

// // lastPost.then(last => console.log(last));

// const lastPost2 = await getLastPost();
// console.log(lastPost2);
// console.log('끝');

// 모듈패턴

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shoppingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;
//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity},${product} 넣다 빵 죽 빵 `);
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity},${product} 주문 `);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })(); // iife = 한번만 실행 = 재사용안함

// ShoppingCart2.addToCart("사과", 4);
// ShoppingCart2.addToCart("피자", 4);
// // console.log(ShoppingCart2);
// console.log(ShoppingCart2.shoppingCost); // 못찾는 이유 리턴값반환안됨

//
//
// CommonJs 모듈
//

//내보내기의 경우 exports 및 module.exports,
// export. addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity},${product} 넣다 빵 죽 빵 `);
// };
// //가져오기의 경우 require
// const { addToCart } = require('./shoppingCart.js');

// 명령어 다루기
//https://www.youtube.com/watch?v=Af2qal0xdG4&list=PLOmL3sL-afbRVTvedkIrQcDwg2UY0JGTF&index=259

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es"; // 이렇게만해도 parcel이 알아서 경로 찾아감

const state = {
  cart: [
    { product: "빵", quantity: 5 },
    { product: "피자", quantity: 5 },
  ],
  user: { loggedin: true },
};

const stateClone = Object.assign({}, state); // Object.assign(초기값, ...객체) 얖은복사.. 주소값만 복사
const stateDeepClone = cloneDeep(state); // 깊은복사.. 통째로 따로 하나 더만듬..

console.log(stateClone);
state.user.loggedin = false; // 동일한 객체를 참조하고있기 때문에 콘솔로그 값 변경됨 false로
console.log(stateDeepClone); // 깊은 복사라서 초기 값ture 그대로 가지고있음

//parcel만 알아들음
//새로고침하지않아도 모듈을 업데이트할수있게 해줌 개발중 코드변경시 즉시 반영
if (module.hot) {
  // 현재 모듈이 hmr을 지원하는지 확인 활성화된 경우 실행
  module.hot.accept();
  // 모듈이 업데이트되었을때 해당 모듈을다시로드하도록 설정
  // 이거 없으면 모듈이 변경될 때 전체페이지가 새로고침
  // 쉽게 말하면 새로고침해도 데이터 유지한다.
}
