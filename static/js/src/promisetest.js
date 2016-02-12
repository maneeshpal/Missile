    
    
    function async(gen) {
        return function () {
            var iterator = gen.apply([].slice.apply(arguments));
            var output = iterator.next();
            function next (o) {
                if(!o.done) {
                    if (o.value.then) {
                        o.value.then((_) => {
                            console.log('resolved to ', _);
                            next(iterator.next(_));
                        });
                    } else {
                        next(iterator.next(o.value));
                    }
                }
                else {
                    return o;
                }
            }

            next(output);
        }
    }

    function wait (x) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(x), x);
        }).then((x) => {
            console.log('waited: ', x);
            return x;
        });
    }

    function imm () {
        return 'laddu guddu';
    }

    // function* guddu () {
    //     console.log('inside guddu');
    //     let y = yield wait(1000);
    //     console.log('wait completed y:', y);
    //     let z = yield wait(1000);
    //     console.log('wait completed z:', z);
    //     let l = yield imm();
    //     console.log('wait completed laddu:', l);
    // }

    // function race () {
    //     var pr = new Promise((resolve, reject) => {
    //         resolve();
    //     });
    //     pr.then(console.log.bind(console, 'success handler executed'));
    //     console.log('reached the end');
    // }

    function dependantPromises () {
        var wait100 = wait(100);
        var waitMore = wait100.then(_ => wait(1));
        var wait50 = wait(50);
        Promise.all([wait100, waitMore, wait50])
        .then(results => console.log.apply(console, results));
    }

/* output
    waited:  50
    waited:  100
    waited:  1
    50 100 1
*/

    function mutablePromiseValue () {
        var p = new Promise((resolve, reject) => {
            resolve({ value : 1 });
        });
        
        p.then((result) => {
            console.log(result);
            result.value = 50;
        });

        // making sure this piece of code runs after the above .then
        wait(1).then(() => {
            p.then(result => {
                console.log(result);
            });
        })
    }

    function jQueryDoneThen () {
        somejQueryPromise() // resolves to 1
        .then((result) => {
            //result is 1
            return 2;
        })
        .done((result) => {
            //result is 2;
            return 3;
        })
        .done((result) => {
            //result is 2;
        })
    }
    // window.race = race;
     window.dependantPromises = dependantPromises;
    //window.guddu = async(guddu);


   window.mutablePromiseValue = mutablePromiseValue;