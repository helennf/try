/*
 * @file component LinkBar
 */
import React, {Component} from 'react';
import { observer,PropTypes as ObservablePropTypes } from 'mobx-react';
import { trace } from 'mobx';
import PropTypes from 'prop-types';
import './style.scss';

@observer
class LinkFooter extends Component{
    static propTypes = {
/*        store: PropTypes.shape({
            left:PropTypes.func.isRequired, //mobx的@computed修饰什么类型
        }).isRequired,*/
    };
    render(){trace();
        const store = this.props.store;
        return <footer>{store.left} item(s) prepared</footer>;
    }
}

@observer
class LinkBar extends React.Component {
    static propTypes = {
        store: PropTypes.shape({
            createTodo:PropTypes.func,
            clearTodo:PropTypes.func,
            todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
        }).isRequired,
        onDragOver: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onDragStart: PropTypes.func.isRequired,
    };

    render(){
        const store = this.props.store;

        return(
            <div className="col-md-1 primitive-link-component">
                <div className="link-title">关联区</div>
                <div id="control-div" className="control-area" onDragOver={() => this.props.onDragOver(event)} onDrop={() => this.props.onDrop(event)}>

                </div>
                <LinkFooter store={store}/>
            </div>
        );
    }
}

export default LinkBar;

