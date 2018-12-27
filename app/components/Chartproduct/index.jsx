/*
 * @file component Chartproduct
 */
import React from 'react';
import { observer,PropTypes as ObservablePropTypes } from 'mobx-react';
import { trace } from 'mobx';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';

import './style.scss';

@observer
class Chartproduct extends React.Component{
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    componentDidMount() {
        const chartData = this.props.items.map(
            item => ({
                value: item.GDP,
                name:item.region
            })
        );
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '全国GDP比重图',//标题文本内容
                textStyle: {//设置标题的文本样式
                    color: '#4e4e4e',
                    fontSize:15,
                    //fontWeight:'lighter'
                }
            },
            //animation: false,
            backgroundColor: '#fefdddD8',
            toolbox: { //可视化的工具箱
                show: true,
                feature: {
                    dataView: { //数据视图
                        show: true
                    },
/*                    restore: { //重置
                        show: true,
                        title : '还原',
                        color : 'black'
                    },
                    dataZoom: { //数据缩放视图
                        show : true,
                        title : {
                            dataZoom : '区域缩放',
                            dataZoomReset : '区域缩放-后退'
                        }
                    },*/
                    saveAsImage: {//保存图片
                        show : true,
                        title : '保存为图片',
                        type : 'jpeg',
                        lang : ['点击本地保存']
                    },
/*                    magicType: {//动态类型切换
                        show : true,
                        title : {
                            line : '动态类型切换-折线图',
                            bar : '动态类型切换-柱形图',
                        },
                        type: ['line', 'bar']
                    }*/
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
                // 不显示 visualMap 组件，只用于明暗度的映射
                show: false,
                // 映射的最小值为 80
                min: 1500,
                // 映射的最大值为 600
                max: 1800,
                inRange: {// 明暗度的范围是 0 到 1
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: '全国各地区GDP占比',
                type: 'pie',
                radius: '40%',
                //roseType: 'angle',
                data: chartData,
                label: {
                    normal: {
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {//将标签的视觉引导线的颜色设为浅色
                            color: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                },
                itemStyle: {//阴影的配置,还可以设置扇形的颜色，在normal中编辑color来设置，设置后的扇形颜色是一样的
                    normal: {
                        // 阴影的大小
                        shadowBlur: 200,
                        // 阴影颜色
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });
        setTimeout(function(){
            var img = document.createElement("img");
            img.setAttribute("id", "chartImg");
            img.setAttribute('style','display:none;');
            img.src = myChart.getConnectedDataURL();
            document.getElementById('chart').appendChild(img);
        }, 1000);
    };

    render(){
        return (
            <div className="col-md-2-3 chart-product" id="chart">
                <p className="f-dn">饼状图</p>
            </div>
        )
    }
}

export default Chartproduct;