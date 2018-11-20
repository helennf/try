/*
 * @file component Tableproduct
 */
//加载依赖
import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './style.scss';

//属性验证
const propTypes = {
    items: PropTypes.array.isRequired
}

function TableItem({item}){
    return(
        <tr className="table-content">
            <td>{item.id}</td>
            <td>{item.region}</td>
            <td>{item.GDP}</td>
        </tr>
    )
}

function Tableproduct({items}){
    const itemsContent = items.map(
        item => (
            <TableItem
                item={item}
                key={item.id}
            />
        )
    );
    return(
        <div className="col-md-2-3 table-product">
            <table cellSpacing="0">
                <tbody>
                    <tr className="table-header">
                        <th>行政区划编号</th>
                        <th>地区</th>
                        <th>GDP(亿元)</th>
                    </tr>
                    {itemsContent}
                </tbody>
            </table>
        </div>
    )
}

Tableproduct.propTypes =  propTypes;
export default Tableproduct;