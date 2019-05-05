// let salesOffices = {};


// salesOffices.clientList = [];


// salesOffices.listen = function(fn){
//     salesOffices.clientList.push(fn)
// }

// salesOffices.trigger = function(){
//     for(var i=0,fn;fn=salesOffices.clientList[i++];){
//         fn.apply(this, arguments);
//     }
// }



// salesOffices.listen(function(price, squareMeter){
//     console.log('价格：'+price)
//     console.log('面积：'+squareMeter)
// });

// salesOffices.trigger(300000, 88)


// //
let salesOffices ={};
salesOffices.clientList = {};


salesOffices.listen = function(key, fn){
    if(!this.clientList[key]){
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
}

salesOffices.trigger = function(){
    let key = Array.prototype.shift.call(arguments);
    let fns = this.clientList[key];

    if(!fns || fns.length == 0){
        return false;
    }
    for(var i=0,fn;fn=fns[i++];){
        fn.apply(this, arguments);
    }
}

salesOffices.listen('88', function(price){
    console.log('价格：'+price)
})
salesOffices.listen('88', function(price){
    console.log('价格价格：'+price)
})

salesOffices.listen('100', function(price){
    console.log('价格：'+price)
})


salesOffices.trigger('88',100000)

salesOffices.trigger('100',200000)


var event = {
    clientList: {},
    listen: function(key, fn){
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function(){
        let key = Array.prototype.shift.call(arguments);
        let fns = this.clientList[key];

        if(!fns || fns.length == 0){
            return false;
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn){
        var fns = this.clientList[key];

        if(!fns){
            return false;
        }

        if(!fn){
            fns && (fns.length = 0)
        }else{
            for(var l= fns.length-1;l>=0;l--){
                var _fn = fns[l];
                if(_fn === fn){
                    fns.splice(l,1)
                }
            }
        }
    }
}


let salse = {}

var installEvent = function( obj ){ 
    for ( var i in event ){
        obj[ i ] = event[ i ]; //给salse添加每一个event的属性
    }
};
installEvent(salse)


salse.listen('88', f1 = function(price){
    console.log('price:'+price)
}) 
salse.listen('88', f2 = function(price){
    console.log('price:'+price)
})
salse.remove('88', f1)
console.log(event.clientList);
salse.trigger('88',10000)


var login = {}


installEvent(login);

var header = (function(){
    login.listen('loginSuc', function(data){ //订阅登录成功
        header.setAvatar(data)
    });
    return {
        setAvatar: function(data){
            console.log(data)
            var head = document.getElementsByClassName('head')[0];
            head.innerHTML = '登录成功'+data;
        }
    }
})()

//假设登录成功

login.trigger('loginSuc', {'status': 'success'})
