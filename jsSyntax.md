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
