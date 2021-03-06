import { observable,action } from 'mobx';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

class Store{
    @observable cache = {queue:[]};

    @action.bound refresh(){
        this.cache.queue.push(1);
    }
}

const store = new Store();

//Bar Foo
@observer
class Bar extends Component{
    static propTypes = {
        queue: PropTypes.array
    };
    render(){
        const queue = this.props.queue;

        return <span>{queue.length}</span>;
    }
}

class Foo extends Component{
    static propTypes = {
        cache: PropTypes.object
    }

    render(){
        const cache = this.props.cache;

        return <div><button onClick={this.props.refresh}>Refresh</button><Bar queue={cache.queue} /></div>
    }
}

ReactDOM.render(<Foo cache={store.cache} refresh={store.refresh}/>,document.querySelector('#root'));