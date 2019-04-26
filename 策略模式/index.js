//2-1使用策略模式计算奖金

var performanceS = function(){}
performanceS.prototype.calculate = function(salary){
    return salary*4
}

var performanceA = function(){}
performanceA.prototype.calculate = function(salary){
    return salary*3
}

var performanceB = function(){}
performanceB.prototype.calculate = function(salary){
    return salary*2
}



var bounce =function () {
    this.salary = null;
    this.strategy = null;
}

bounce.prototype.setSalary = function(salary){
    this.salary = salary
}

bounce.prototype.setStrategy = function(strategy){
    return this.strategy = strategy; 
}

bounce.prototype.getBounce = function(){
    return this.strategy.calculate(this.salary)
}


var Bounce  = new bounce()

Bounce.setSalary(10000);
Bounce.setStrategy(new performanceS())
console.log(Bounce.getBounce())