'use strict';

// モジュールを読込む。
const
    assert = require('assert'),
    LRU = require("lru-cache"),
    options = {
        max: 500,
        maxAge: 1000 * 60 * 60
    },
    cache = LRU(options),
    otherCache = LRU(50); // sets just the max size

cache.set("key", "value");
cache.get("key"); // "value"

// non-string keys ARE fully supported
// but note that it must be THE SAME object, not
// just a JSON-equivalent object.
const someObject = {a: 1};
cache.set(someObject, 'a value');
// Object keys are not toString()-ed
cache.set('[object Object]', 'a different value');
assert.equal(cache.get(someObject), 'a value');
// A similar object with same keys/values won't work,
// because it's a different object identity
assert.equal(cache.get({a: 1}), undefined);


cache.reset();    // empty the cache


const key = {text: 'Hello'};

cache.set(key, {message: 'Hello world.'});
console.log(cache.get(key));