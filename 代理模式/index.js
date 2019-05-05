//3代理模式
//3-1小明追MM的故事

var Flower = function(){}

var xiaoming = {
    sendFlower: function(target){
        var flower = new Flower();
        target.reviceFlower(flower);
    }
};

var B = {
    reviceFlower: function (flower) {
        A.reviceFlower(flower);
    }
}

var A = {
    reviceFlower: function(flower){
        console.log('收到花');
        console.log(flower)
    }
}

xiaoming.sendFlower(B);


//3-2保护代理和虚拟代理

//3-3虚拟代理实现图片预加载
var myImage  = (function(){
    var myNode = document.createElement('img');
    document.body.appendChild(myNode);
    return {
        setSrc: function(src){
            myNode.src = src;
        }
    }
})();
myImage.setSrc('http://wangjiaanimals.oss-cn-shanghai.aliyuncs.com/images/0005018657471708_b.jpg');



var proxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function(src){
            myImage.setSrc(''); //菊花图
            img.src = src;
        }
    }
})();


proxyImage.setSrc('http://wangjiaanimals.oss-cn-shanghai.aliyuncs.com/images/0df3d7ca7bcb0a46f8c4938f6763f6246a60afa5.jpg')


//3-4  代理的意义


var myImage1 = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    var img = new Image();
    img.onload = function(){
        imgNode.src = this.src;
    }
    return {
        setSrc: function(src){
            imgNode.src = ''; //加载菊花图片
            img.src =  src;
        }
    }
})()


function sendFile(id){
    console.log(id);
}

var proxySendFile = (function(){
    let cach = [];
    let timer;
    
    return function(id){
        cach.push(id);
        if(timer){
            return;
        }
        timer = setInterval(() => {
            sendFile(cach.join(','));
            clearTimeout(timer);
            timer = null;
            cach.length = 0;
        }, 1000);
    }
})()
var input = document.getElementsByTagName('input');


for(var i=0,c;c=input[i++];){
    console.log('c')
    c.onclick = function(){
        if(this.checked == true){
            proxySendFile(this.id)
        }
    }
}


