/*
 * @file component PrepareBar
 */
import React from 'react';
import { observer,PropTypes as ObservablePropTypes } from 'mobx-react';
import { trace } from 'mobx';
import PropTypes from 'prop-types';
import './style.scss';

@observer
class PrepareBar extends React.Component {
    static propTypes = {
        onDragOver: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onDragStart: PropTypes.func.isRequired,
    };

    render(){
        return (
            <section className="pre-md-1 prepare-component">
                <div id="prepare-div" className="prepare-area" onDragOver={() => this.props.onDragOver(event)} onDrop={() => this.props.onDrop(event)}>
                    <div className="prepare-title">数据准备区</div>
                    <button id="drag1" value="行政区划表" className="btn btn-primitive" draggable="true" onDragStart={() =>this.props.onDragStart(event)}>行政区划表</button>
                    <button id="drag2" value="2016年GDP情况表" className="btn btn-primitive" draggable="true" onDragStart={() =>this.props.onDragStart(event)}>2016年GDP情况表</button>
                </div>
            </section>
        )
    }
}

export default PrepareBar;