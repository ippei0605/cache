/**
 * @file Cache Test: lru-cache
 * @author Ippei SUZUKI
 * @see {@link https://www.npmjs.com/package/memory-cache}
 */

'use strict';

// モジュールを読込む。
const cache = require('memory-cache');

// キャッシュにデータをセットする。
cache.put('hello', {message: 'Hello world.'}, 1000);
console.log(cache.get('hello'));

setTimeout(() => {
    console.log(cache.get('hello'));
}, 2000);
