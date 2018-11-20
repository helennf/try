import React from 'react';
import {render} from 'react-dom';
import uuid from 'uuid';
import {action, computed, observable, observe, toJS} from "mobx";
import Root from './components/Root';

class Todo {
    id = uuid.v4();
    @observable title = '';

    constructor(title){
        this.title = title;
    }
}

class Store{
    @observable todos = [];

    disposers = [];

    constructor(){
        observe(this.todos, change =>{
            this.disposers.forEach(disposer => disposer());
            this.disposers = [];
            for(let todo of change.object){
                var disposer = observe(todo, changex =>{
                    this.save();
                    //console.log(changex);
                });
                this.disposers.push(disposer);
            }
            this.save();
            //console.log(change);
        })
    }

    save(){
        localStorage.setItem('todos',JSON.stringify(toJS(this.todos)));
        console.log(toJS(this.todos));
    }

    @action.bound clearTodo(){
        this.todos = [];
    }
    @action.bound createTodo(title){
        this.todos.push(new Todo(title));
    }

    @computed get left(){
        return this.todos.length;
    }
}

const store = new Store();

const ele = document.createElement('div');
document.body.appendChild(ele);
render(<Root  store={store}/>,ele);