/*
 * @file component Mapproduct
 */
//加载依赖
import React from 'react';
import { observer,PropTypes as ObservablePropTypes } from 'mobx-react';
import { trace } from 'mobx';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import './style.scss';

@observer
class Mapproduct extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    componentDidMount(){
        const that = this;
        MapboxGL.accessToken = "pk.eyJ1IjoiaHNhY2NvdW50IiwiYSI6ImNqb2k5aGI5ZjA2dHgzcnQ2YjQ2Zzh2ZmkifQ.OtSQtiTzfeSD8cYuUGiBxA";

        //设置地图区域
        let bounds = [
        [118.21, 28.11], // Southwest coordinates，西南坐标
        [122.40, 31.33]  // Northeast coordinates，东北坐标
        ];

        const map = new MapboxGL.Map({
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [114.316052, 30.520348], //地图中心经纬度
            zoom: 4.5, //缩放级别
            minZoom: 2,
            maxZoom: 19,
            pitch: 45,
            bearing: -17.6,
            container: 'container',
            preserveDrawingBuffer: true,
            //maxBounds: bounds
        });

        var language = new MapboxLanguage();
        map.addControl(language);

        //通过设置设备像素比，提高图片清晰度
        var dpi = 300;
        Object.defineProperty(window, 'devicePixelRatio', {
            get: function() {return dpi / 96}
        });

        var clock = setInterval(function(){
            if(map.isStyleLoaded()){
                var mapContent = map.getCanvas().toDataURL('image/png');
                //console.log(mapContent);
                var img = document.createElement("img");
                img.setAttribute("id", "mapImg");
                img.setAttribute('style','display:none;');
                img.src = mapContent;
                var mapCanvas = document.getElementById("map");
                img.width = mapCanvas.offsetWidth;
                img.height = mapCanvas.offsetHeight;
                // 解决图片的跨域问题
                //img.crossOrigin = "Anonymous";
                document.getElementById('map').appendChild(img);

                clearInterval(clock);
            }
        }, 1000);

        map.on('load', function () {
            that.props.items.map(item =>
            {
                map.addLayer({
                    'id': item.id,
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': item.geojson
                    },
                    'layout': {},
                    'paint': {
                        'fill-color': that.getFillPaintValue(item),
                        'fill-outline-color': '#3385ff',
                        'fill-opacity': 0.6
                    }
                });
            });
        });
    }

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
        return fillColor;
    };

    render() {
        return (
            <div className="col-md-2-1 map-product" id="map">
                <p className="f-dn">mapbox地图</p>
                <div id="container"></div>
            </div>
        )
    }
}

export default Mapproduct;