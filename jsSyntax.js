JavaScript

//Array
//배열은 객체
//배열은 mutable, 문자열은 immutable 특성을 가진다

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

var a = [1,2,3,4,5];
a.concat(6); -> [1,2,3,4,5,6]
a -> [1,2,3,4,5]
var a1 = a.concat(6);
a1 -> [1,2,3,4,5,6]
//concat은 배열을 합치지만 원본을 변경시키지는 않는다.변경하려면 새로운 변수 선언
a.concat[6,7,8]; -> [1,2,3,4,5,6,7,8]
// 배열을 더할 수 있다.

var s = "hello"
s.concat(" world");  -> "hello world"
// string 합치기 가능, +와 같다.

var a = [1,2,3,4,5];
a.join(); -> "1,2,3,4,5"
a.join(""); -> "12345"
a.join("--") -> "1--2--3--4--5"
//join은 배열을 문자열로 바꿔준다.

var a = [1,2,3,4,5,2,3]
a.indexOf(1); -> 0
a.indexOf(2); -> 1        // 중복되면 앞서 나온 것만 찾아진다.
a.lastIndexOf(2) -> 5     // 뒤에서 부터 찾기
a.indexOf(1000) -> -1     // 값이 없으면 -1 출력
//배열이나 문자열안의 원소를 가지고 인덱스를 찾을 수 있다.

var a = [1,2,3,4,5];
a.slice(0, 3) -> [1,2,3]  // 0부터 2까지 잘라서 배열, 원본은 변하지 않음
slice(startIndex, endIndex)
//기존 배열을 잘라서 새로운 배열 작성
//startIndex 부터 endIndex 직전까지 자른다
// 원본이 변하지 않으니, string도 가능

var a = [1,2,3,4,5,6,7];
var a1 = a.splice(5,2);
a2 -> [6,7]
a  -> [1,2,3,4,5]
// 원본이 변한다. 자르는 것 slice같지만 원본이 변하는 것만 다르다
splice(startIndex, 자를 개수)
// startIndex 다음부터 자를 개수 만큰 자른다.

var s = "hello, world";
s.split("")
-> ["h", "e", "l", "l", "o", ",", " ", "w", "o", "r", "l", "d"]
s.split(",") -> ["hello", " world"]
s.split("쪼갤값");
// split는 string를 쪼개서 배열로 저장한다. 쪼갤값을 넣어주면 그 값을 토대로 쪼갠다.


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

//object 생성자
//생성자 예제
var human = function(name, hp, pow) {

  this.name = name;
  this.hp = hp;
  thil.pow = pow;
  this.attack = function(target) {
    console.log(this.name + "이" +target.name+"공격하셨습니다");
    target.hp -= this.pow;
  };
  this.show = function() {
    console.log("[%s] %d", this.name, this.hp);
  };
};
//console 실행 명령은 var p1 = nuw human('name', hp, pow);
//생성자는 반복이 편리하게 하는 유용한 도구
//객체의 변수는 전부 참조 변수이다.


//DOM을 이용해 html 제어하기
//DOM을 이용해 html 객체 추가하
var el = document.getElementById('test');
var menu = document.createElement('ul');
menu.id = 'menupan';

var item1 = document.createElement('li');
item1.id = 'menu1';
item1.innerHTML = "설렁탕";

var item2 = document.createElement('li');
item2.id = 'menu2';
item2.innerHTML = "추어탕";

menu.appendChild(item1);
menu.appendChild(item2);

el.appendChild(menu);

//input ID로 내용 받아오기
var readInput = function(){
  document.getElementById('ID');
  console.log(input.value)  // input내용을 불러오는 방법은 input.value
}
//botton으로 내용 받아오기
//html
<button id="btn1" onclick='readInput()'>확인</button>
//js
btn1.onclick = readInput;
