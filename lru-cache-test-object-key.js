/**
 * @file Cache Test: lru-cache オブジェクトキー
 * @author Ippei SUZUKI
 * @see {@link https://www.npmjs.com/package/lru-cache}
 */

'use strict';

// モジュールを読込む。
const
    LRU = require("lru-cache"),
    options = {
        max: 500,
        maxAge: 1000 * 60 * 60
    },
    cache = LRU(options);

const key = {text: 'Hello'};
cache.set(key, {message: 'Hello world.'});

// 参照: OK
console.log(cache.get(key));

// 値: NG
console.log(cache.get({text: 'Hello'}));

// 計測 for-loop
console.time('for-loop');
for (let i = 0; i < 1000000; i++) {
}
console.timeEnd('for-loop');

// 計測 cache-get
console.time('cache-get');
for (let i = 0; i < 1000000; i++) {
    let temp = cache.get(key);
}
console.timeEnd('cache-get');
