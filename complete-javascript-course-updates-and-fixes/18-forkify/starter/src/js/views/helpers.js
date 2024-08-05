import { TIMEOUT_SEC } from '../../js/views/config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    // uploadData의 값이 없으면 단순히 get 요청을 보냄

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// //get json
// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // https://chanhohan.github.io/posts/publish-subscribe-pattern/
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// //post json
// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url);

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}(${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
