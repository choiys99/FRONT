//내보내기
console.log('exporting module');

//블로킹
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/posts');
console.log('finish');

const shoppingCose = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity},${product} 넣다 빵 죽 빵 `);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity},${product} 넣다 ${product} 죽 ${product} `);
}
/*
export default 는 import 시 어떤 이름으로든 모듈을 불러오는 게 가능하기에 주의하자.
1개의 파일에 하나의 함수 또는 클래스가 있는 경우에만 사용을 권장하여 명확하게 사용하자.
*/
