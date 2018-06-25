# Cache Test
## はじめに
とあるシステムにキャッシュを導入するため、使えそうな Node.js のライブラリを調査します。

## 性能測定
* キャッシュに次のデータをセットして、100万回 get した時の処理時間を計測します。(for ループを含見ます)

    | Key     | Value                     |
    |:--------|:--------------------------|
    | 'hello' | {message: 'Hello world.'} |

* 測定結果を以下に示します。

    | # | Module           | 1 million get(ms) | Test program                                         |
    |--:|:-----------------|------------------:|:-----------------------------------------------------|
    | 1 | memory-cache     | 78.907            | [memory-cache-test.js](memory-cache-test.js)         |
    | 2 | memory-cache-ttl | 3.269             | [memory-cache-ttl-test.js](memory-cache-ttl-test.js) |
    | 3 | lru-cache        | 83.017            | [lru-cache-test.js](lru-cache-test.js)               |
    | 4 | node-cache       | 642.604           | [node-cache-test.js](node-cache-test.js)             |

    > TTL: Time to Live

## まとめ
1. memory-cache

    [![NPM](https://nodei.co/npm/memory-cache.png?stars=true)](https://nodei.co/npm/memory-cache/)

    - license: BSD-2-Clause
    - データ書き込み時に個別に TTL(ms) を指定できます。
        - TTL を設定すると setTimeout 経由で削除しているようで、削除が終わるまでコンソールが復帰しません。(よって TTLは3秒に設定)
        - TTL を設定しない場合はとても速いです。15.549ms
1. memory-cache-ttl

    [![NPM](https://nodei.co/npm/memory-cache-ttl.png?stars=true)](https://nodei.co/npm/memory-cache-ttl/)

    - license: BSD-2-Clause
    - インスタンスに TTL (s) を指定できる。
        - 但し、インスタンスを一つしか作れません。
    - データ書き込み時にも個別に TTL(s) を指定できます。
    - 最速だけど結果が怪しい？ (空の for-loop よりも速い)
    - テストが終了してもコンソールが復帰しません。
1. lru-cache

    [![NPM](https://nodei.co/npm/lru-cache.png?stars=true)](https://nodei.co/npm/lru-cache/)

    - license: ISC
    - インスタンスに最大件数や TTL(ms) を指定できます。
        - TTL (maxAge) を設定しないととても速いです。 16.540ms
            - 最大件数 (max) だけで良い場合は効果的だと思います。
    - データ書き込み時にも個別に TTL(ms) を指定できます。
    - キーにオブジェクトを設定できます。
        - いいね！と思いましたが、参照が一致しないとヒットしません。どこで使うのでしょう？？

            ```javascript
            const key = {text: 'Hello'};
            cache.set(key, { message: 'Hello world.' });
            console.log(cache.get(key));                    // { message: 'Hello world.' }
            console.log(cache.get({text: 'Hello'}));        // undefined
            ```

1. node-cache

    [![NPM](https://nodei.co/npm/node-cache.png?stars=true)](https://nodei.co/npm/node-cache/)

    - license: MIT
    - インスタンスに TTL(s) や checkperiod(s) を指定できます。
    - データ書き込み時にも個別に TTL(s) を指定できます。
    - とても高機能、エラーハンドリングの方法も充実しています。
    - 但し、遅いです。