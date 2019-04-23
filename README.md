# javascript-design
javascript 设计模式(学习笔记)


1.实现单例模式
要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。代码如下

单例模式的核心是确保只有一个实例，并提供全局访问。

(1)var singleton = function(name){
    this.name = name;
    this.instance = null;
}


singleton.prototype.getName = function(){
    console.log(this.name);
}
singleton.getInstance = function(name){
    console.log("this.instance")
    console.log(this.instance)
    if(!this.instance){
        this.instance = new singleton(name);
    }
    return this.instance
}


var singleton1 = singleton.getInstance('bob')
var singleton2 = singleton.getInstance('alla')

console.log(singleton1);
console.log(singleton2);
console.log(singleton1 === singleton2)

(2)或者。。。。


var Singleton = function (name) {
    this.name = name;
}

Singleton.prototype.getName = function(){
    console.log(this.name)
}

Singleton.getInstance = (function(name){
    var instance = null;
    return function( name ){
        if ( !instance ){
            instance = new Singleton( name );
        }
        return instance; 
    }
})()

var Singleton1 = Singleton.getInstance('bob')
var Singleton2 = Singleton.getInstance('alla')

console.log(Singleton1);
console.log(Singleton2);
console.log(Singleton1 === Singleton2)

(3)透明的单例模式

var CreateDiv = (function(){
    var instance;
    var CreateDiv = function(html){
        console.log('instance')
        console.log(instance)
        if(instance){
            return instance
        }

        this.html = html;
        this.init();
        console.log('this')
        console.log(this)
        return instance = this;
    }
    CreateDiv.prototype.init = function (paras) {
        var content = document.getElementById('content');
        var div = document.createElement( 'div' );
        div.innerHTML = this.html;
        content.appendChild(div);
    }
    return CreateDiv;
})()


var a = new CreateDiv( 'sven1' ); 
var b = new CreateDiv( 'sven2' );
console.log(a)
console.log(b)

(4)用代理实现单例模式

var CreateDiv1 = (function(){
    var instance;
    var CreateDiv = function(html){
        this.html = html;
        this.init();
    }
    CreateDiv.prototype.init = function (paras) {
        var content = document.getElementById('content');
        var div = document.createElement( 'div' );
        div.innerHTML = this.html;
        content.appendChild(div);
    }
    return CreateDiv;
})()


var ProxySingletonCreateDiv = (function(){
    var instance;
    return function(html){
        if(!instance){
            instance = new CreateDiv1(html);
        }
        return instance;
    }
})()


var a1 = new ProxySingletonCreateDiv( 'bob' ); 
var b1 = new ProxySingletonCreateDiv( 'bob1' );
console.log(a1)
console.log(b1)

console.log(a1 == b1)


(5)JavaScript 中的单例模式

    5-1 使用命名空间
    (1) 对象字面量
    var namespace1 = {
        a: function () {
            console.log('a')
        },
        b: function () {
            console.log('b')
        }
    }

    (2)动态的创建命名空间

    var MyApp = {};
    MyApp.namespace = function( name ){ 
        var parts = name.split( '.' ); 
        var current = MyApp;
        for ( var i in parts ){
            if ( !current[ parts[ i ] ] ){ 
                current[ parts[ i ] ] = {};
            }
            current = current[ parts[ i ] ]; //current[ parts[ i ] ]  的引用指向 dom
        } 
    };

    MyApp.namespace( 'event' );
    MyApp.namespace( 'dom.style' );


