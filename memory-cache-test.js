/**
 * @file Cache Test: lru-cache
 * @author Ippei SUZUKI
 * @see {@link https://www.npmjs.com/package/memory-cache}
 */

'use strict';

// モジュールを読込む。
const cache = require('memory-cache');

// キャッシュにデータをセットする。
cache.put('hello', {message: 'Hello world.'});
console.log(cache.get('hello'));

// 計測 cache-get
console.time('cache-get');
for (let i = 0; i < 1000000; i++) {
    let temp = cache.get('hello');
}
console.timeEnd('cache-get');
