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

// import addd, { cart } from './shoppingCart.js';
// addd('빵', 2);
// addd('과자', 4);
// addd('피자', 5);
// console.log(cart);

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

const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity},${product} 넣다 빵 죽 빵 `);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity},${product} 주문 `);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})(); // iife = 한번만 실행 = 재사용안함

ShoppingCart2.addToCart('사과', 4);
ShoppingCart2.addToCart('피자', 4);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shoppingCost);
