/*
 * @file component ProductsBar
 */
//加载依赖
import React from 'react';
import { observer,PropTypes as ObservablePropTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import Mapproduct from '../Mapproduct';
import Tableproduct from '../Tableproduct';
import Chartproduct from '../Chartproduct';
import './style.scss';

@observer
class Products extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    render(){
        const items = this.props.data;
        const mainpart = items.length > 0
        ?(
            <div className="product-area">
                <Mapproduct items={items} />
                <Tableproduct items={items} />
                <Chartproduct items={items} />
            </div>
        )
        :(
            <div className="not-union">请拖动左侧数据表至上方画布</div>
        );

        return(
            <div className="col-md-2 product-perform-component">
                <div className="product-title">结果区</div>
                {mainpart}
            </div>
        )
    }
}

export default Products;