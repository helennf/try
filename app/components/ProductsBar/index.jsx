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
// import XDoc from './../../utils/xdoc.js';
import fs from 'file-saver';
import '../../utils/jquery.wordexport.js'
import '../../utils/jquery.base64.js'
import XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import Canvas2Image from '../../../external/canvas2image/canvas2image.js'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import './style.scss';

// var baidu = require("./../../utils/baiduTemplate.js");

@observer
class Products extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        this.exportAsPdf = this.exportAsPdf.bind(this);
        this.exportAsWord = this.exportAsWord.bind(this);
        this.exportAsExcel = this.exportAsExcel.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.s2ab = this.s2ab.bind(this);
    }

    exportAsPdf = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var docDefinition = {
            pageSize:'A4',
            content: [
                {
                    text: '表格', fontSize: 22, style: 'subheader', color: '#36B7AB', alignment: 'center'
                },
                {
                    image: document.getElementById("tableImg").src,
                    width:document.getElementById("tableImg").width,
                    height:document.getElementById("tableImg").height,
                    alignment: 'center'
                },
                {
                    text: '饼状图', fontSize: 22, style: 'subheader', color: '#36B7AB', alignment: 'center'
                },
                {
                    image: document.getElementById("chartImg").src,
                    width:document.getElementById("chartImg").width,
                    height:document.getElementById("chartImg").height,
                    alignment: 'center'
                },
                {
                    text: 'mapbox地图', fontSize: 22, style: 'subheader', color: '#36B7AB', alignment: 'center'
                },
                {
                    image: document.getElementById("mapImg").src,
                    width:document.getElementById("mapImg").width,
                    height:document.getElementById("mapImg").height,
                    alignment: 'center'
                }
            ],
            defaultStyle: {
                font: '微软雅黑'
            },
            styles: {
                per_info_header: {
                    fontSize: 24,
                    alignment: 'center'
                },
                per_info: {
                    alignment: 'center'
                },
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                }
            }
        }
        pdfMake.fonts = {
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            },
            微软雅黑: {
                normal: '微软雅黑.ttf',
                bold: '微软雅黑.ttf',
                italics: '微软雅黑.ttf',
                bolditalics: '微软雅黑.ttf',
            }
        };
        var a = new Date();
        //a =a.replace(/\//g,'-');
        const time = "生成pdf文档"+ a.toLocaleString() +".pdf";
        pdfMake.createPdf(docDefinition).download(time);
    }

    exportAsWord = () => {
        var a = new Date();
        //a =a.replace(/\//g,'-');
        const time = "生成word文档"+ a.toLocaleString();
        $(".product-area").wordExport(time);
    }

    exportAsExcel = (data) => {
        const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        data.map(item =>{
            item.geojson = JSON.stringify(item.geojson)
        });
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
        var a = new Date();
        //a =a.replace(/\//g,'-');
        const time = "生成excel表格"+ a.toLocaleString();
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), time + '.' + (wopts.bookType=="biff2"?"xls":wopts.bookType));
    }

    saveAs(obj, fileName){
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        tmpa.href = URL.createObjectURL(obj); //绑定a标签
        tmpa.click(); //模拟点击实现下载
        setTimeout(function () {
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    }

    s2ab(s){
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            var buf = new Array(s.length);
            for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    }

    render(){
        const items = this.props.data;

        const mainpart = items.length > 0
        ?(
            <div className="product-content">
                <div className="product-area">
                    <Mapproduct items={items} />
                    <Tableproduct items={items} />
                    <Chartproduct items={items} />

                </div>
                <div className="export-pdf" onClick={() => this.exportAsPdf()}>导出为Pdf</div>
                <div className="export-word" onClick={() => this.exportAsWord()}>导出为Word</div>
                <div className="export-excel" onClick={() => this.exportAsExcel(items)}>导出为Ecxel</div>
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