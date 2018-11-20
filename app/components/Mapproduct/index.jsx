/*
 * @file component Mapproduct
 */
//加载依赖
import React from 'react';
import { observer,PropTypes as ObservablePropTypes } from 'mobx-react';
import { trace } from 'mobx';
import PropTypes from 'prop-types';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import './style.scss';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiaHNhY2NvdW50IiwiYSI6ImNqb2k5aGI5ZjA2dHgzcnQ2YjQ2Zzh2ZmkifQ.OtSQtiTzfeSD8cYuUGiBxA"
});

//标志点数据
const symbolpoints = require('./../../data/geojson.json');
//设定标志点图层Layout与Paint
const symbolLayout = MapboxGL.SymbolLayout = {
    'text-field': '{place}',
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.3],
    'text-anchor': 'top'
};
const symbolPaint = MapboxGL.SymbolPaint = {
    'text-color': '#3385ff'
};
const circleLayout = MapboxGL.CircleLayout = { visibility: 'visible' };
const circlePaint = MapboxGL.CirclePaint = {
    'circle-color': '#3385ff',
    'circle-radius': 3
};
//设定面图层Layout
const fillLayout = MapboxGL.FillLayout = { visibility: 'visible' };

@observer
class Mapproduct extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    getFillPaintValue(item)
    {
        let fillColor;
        let itemGdp = parseFloat(item.GDP);
        if (1000 < itemGdp && itemGdp <= 11000) {
            fillColor = '#ffffea';
        } else if (11000 < itemGdp && itemGdp <= 21000) {
            fillColor = '#fff8b3';
        } else if (21000 < itemGdp && itemGdp <= 31000) {
            fillColor = '#fffa78';
        } else if (31000 < itemGdp && itemGdp <= 41000) {
            fillColor = '#ffdf2a';
        } else if (41000 < itemGdp && itemGdp <= 51000) {
            fillColor = '#ffa308';
        } else if (51000 < itemGdp && itemGdp <= 61000) {
            fillColor = '#ff821c';
        } else if (61000 < itemGdp && itemGdp <= 71000) {
            fillColor = '#ff3d1d';
        } else if (71000 < itemGdp && itemGdp <= 81000) {
            fillColor = '#ff009f';
        }
        const fillPaint = MapboxGL.FillPaint = {
            'fill-color': fillColor,
            'fill-outline-color': '#3385ff',
            'fill-opacity': 0.6
        };
        return fillPaint;
    };

    render() {
        const itemsGeojson = this.props.items.map(
            item => (
                <GeoJSONLayer
                    data={item.geojson}
                    fillLayout={fillLayout}
                    fillPaint={this.getFillPaintValue(item)}
                    key={item.id}
                />
            )
        );
        return (
            <div className="col-md-2-1 map-product">
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "432px",
                        width: "545px"
                    }}
                    center={[114.316052, 30.520348]}
                    zoom={[5]}
                >
                    {itemsGeojson}
                    <GeoJSONLayer
                        data={symbolpoints}
                        circleLayout={circleLayout}
                        circlePaint={circlePaint}
                        symbolLayout={symbolLayout}
                        symbolPaint={symbolPaint}
                    >
                    </GeoJSONLayer>
                </Map>
            </div>
        )
    }
}

export default Mapproduct;