    
    
function getPercentPositive (userId, callback) {
    getUserInfo(userId, (err, result) => {
        if(err) {
            callback(err);
        } else {
            try {
                let percentPositive = calcPercentPositive(result.feedback);
                callback(null, percentPositive);    
            } catch (e) {
                callback(e);
            }
        }
    });
}
function calcPercentPositive ({ totalReviews, ratings}) {
    const percentPositive 
        = Math.floor(100 * totalReviews / ratings.positive);
    return `${percentPositive} %`;
}

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

    // function wait (x) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => resolve(x), x);
    //     }).then((x) => {
    //         console.log('waited: ', x);
    //         return x;
    //     });
    // }

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

    // function dependantPromises () {
    //     var p1 = wait(100);
    //     var p2 = wait(200);
    //     var p3 = p1.then(_ => wait(1));
    //     var p4 = p3.then(_ => wait(2));
    //     var p5 = wait(50);
    //     Promise.all([p1, p2, p3, p4, p5])
    //     .then(results => console.log.apply(console, results));
    // }

    function immutablePromise () {
        var a = {x:1};
        var p = new Promise((resolve, reject) => {
            resolve(a);
        });
        p.then((r) => console.log(r));
    }

    // window.race = race;
    // window.dependantPromises = dependantPromises;
   // window.guddu = async(guddu);

   window.immutablePromise = immutablePromise;
