JavaScript

//Array
//배열은 객체
var arr = [];
var arr2 = [10,20,30];

arr[0] = 10;        // 배열의 삽입
arr.length          // 배열의 길이
arr[arr.length -1]  // 배열의 마지막 문자

//겍체는 속성과 메소드가 있다.

var b = [];
b.push(1);   //배열의 마지막에 넣는다.
b.push(2);
b.push(3);
b = [1,2,3]

var d = b.pop();    //배열의 마지막을 꺼낸다.
d = [3]
b = [1,2]
//push, pop을 스택이라고 한다. 쌓아놓는 것을 뺗고 넣는 것

var b = [];
b.unshift(1);     // 배열의 앞에 넣는다.
b.unshift(2);
b.unshift(3);
b =[3,2,1]

var d = b.shift(); //배열의 맨 앞을 꺼낸다.
d = [3]

//push, pop, unshift, shift는 활용도가 높은 배열의 메소드다.

//Function
// 함수는 매개변수(x) - > 처리 - > 리턴값

var a = function(x) {
  var y = x + 2;
  return y;
}

//함수 예제 - 매개변숙 두 개를 사용하는 함수
var repeat = function(text.num) {
  var i = 0;
  while (i < num) {
    document.write(text);
    i++;
  }
}

  //return 값은 변수에 값을 넣을 수 있다. 반대로 반드시 리턴 값이 있어야 변수에 넣을 수 있다.
  // roof 를 빠져나갈 때 break; fuction을 빠져나갈 때 return;
  // 2중 roof를 빠져나갈 때는 함수로 묶어서 return;하면 빠져나간다.


//object
//객체는 함수와 변수를 묶어서 관리, 속성과 메소드를 가진다

var p1 = {};
p1.name = "woon" //p1의 속성 name의 값 "woon" 삽입
p1.eat = function(food) {
  console.log(food + "먹습니다");
}                 // p1의 메소드 eat에 function

  //this
  //메소드 안에서 사용시 함수를 소유한 객체를 가르킨다
 var p2 = {};
 p2.name = "woon";
 p2.weight = 110;
 p2.say = function(word) {
   console.log(this.name + "say, " + world);  //this는 p2를 가르킨
 }

  // json표기법을 이용하여 객체 작성
