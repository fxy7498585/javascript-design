# javascript-design
javascript 设计模式(学习笔记)


1.实现单例模式
要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。代码如下


var singleton = function(name){
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

//或者。。。。


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
