import { observable,computed,autorun,when,reaction,action,runInAction } from 'mobx';

class Store{
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable boolean = false;

    //computed值可以引用其他computed值，但不可以循环引用
    @computed get mixed(){
        return store.string + '/' + store.number;
     }
     @action.bound bar(){
         this.string = 'world';
         this.number = 30;
     };
}

//computed(把单独的可观察数据按照理想的方式组装起来，变成一个新的可观察数据)
var store = new Store();
/*//传给computed一个无参数的函数
var foo = computed(function(){return store.string + '/' + store.number;});
foo.observe(function(change){
    console.log(change);
})
store.string = 'world';
store.number = 30;*/

//autorun(在可观察数据修改之后，自动去修改依赖可观察数据的行为——一般指传入autorun的函数)
/*autorun(() => {
    console.log(store.mixed);
})
store.string = 'world';
store.number = 30;*/

//when提供条件执行逻辑，它是autorun的一种变种
//when(第一个参数必须根据可观察数据返回一个布尔类型返回值；如果函数一开始就返回真，第二个函数就会同步立即执行)
/*when(() => store.boolean, ()=>console.log("it's true"));
store.boolean = true;*/

//reaction（通过分离可观察数据声明与副作用的方式，对autorun作出改进）
reaction(() => [store.string,store.number],arr => console.log(arr.join('/')));

runInAction(() => {
    store.string = 'world';
    store.number = 30;
});

//observable.box
/*
var num = observable.box(20);
var str = observable.box('hello');
var bool = observable.box(true);

num.set(50);
str.set('world');
bool.set(false);

console.log(num.get(), str.get(), bool.get());
*/

//observable
/*
const map = observable.map({ key: "value"});
map.set("key", "new value");
console.log(map.has('key'));*/
