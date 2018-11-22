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
import XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import './style.scss';

// var baidu = require("./../../utils/baiduTemplate.js");

@observer
class Products extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        this.exportAsWord = this.exportAsWord.bind(this);
        this.exportAsExcel = this.exportAsExcel.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.s2ab = this.s2ab.bind(this);
        this.html2canvasImg = this.html2canvasImg.bind(this);
    }

    exportAsWord = () => {

        this.html2canvasImg("map", function(canvas){
            var url = canvas.toDataURL();
            var merge = document.createElement("canvas");
            merge.width = "545px";
            merge.height = "432px";
            var ctx = merge.getContext('2d');
            //ctx.drawImage(mapCanvas, 0, 0);
            ctx.drawImage(canvas, 0, 0);
            $("#md-print").attr("src",merge.toDataURL('image/png'));
            //that.print.openPrintPanel();
            $(".product-perform-component").wordExport('生成word文档');
        });
/*        const baseData = "<script id=\"tmpl\" type=\"text/html\">\n" +
            "     <result version=\"A.3.0\">\n" +
            "         <body>\n" +
            "         <para heading=\"1\" lineSpacing=\"28\">\n" +
            "             <text class=\"head\" valign=\"center\" fontName=\"标宋\" fontSize=\"29\"><%=title%></text>\n" +
            "         </para>\n" +
            "         <para>\n" +
            "             <img  src=\"<%=img%>\" sizeType=\"autosize\"/>\n" +
            "         </para>\n" +
            "         <para lineSpacing=\"9\">\n" +
            "             <text class=\"content\" fontName=\"仿宋\" fontSize=\"18\"><%=content%></text>\n" +
            "         </para>\n" +
            "         </body>\n" +
            "     </result>\n" +
            " </script>";
        var type="docx";//pdf
        var data = {
            title: type+"文件",
            img: "http://www.wordlm.com/uploads/allimg/130101/1_130101000405_1.jpg",
            content: "我能导"+type+"文件啦",
        };
        var html=baseData.replace(/<%=title%>/,data.title)
            .replace(/<%=img%>/,data.img)
            .replace(/<%=content%>/,data.content);
        $("body").append(html);
        XDoc.to(baidu.template('tmpl', data), type, {}, "_blank");*/
    }

    html2canvasImg(targetElemId, callback){
        debugger;
        var $targetElem = $("#"+targetElemId);
        // 将svg标签转为canvas
        var nodesToRecover = [];
        var nodesToRemove = [];
        var $svgElem = $targetElem.find('svg');
        $svgElem.each(function(index, node) {
            var parentNode = node.parentNode;
            var canvas = document.createElement('canvas');

            canvg(canvas, parentNode, {ignoreMouse: true, ignoreAnimation: true});

            //将svg转换成canvas
            nodesToRecover.push({
                parent: parentNode,
                child: node
            });
            parentNode.removeChild(node);

            nodesToRemove.push({
                parent: parentNode,
                child: canvas
            });

            parentNode.appendChild(canvas);
        });

        html2canvas($targetElem[0], {
            useCORS: true,
            async: false
        }).then(function(canvas) {
            debugger;
            //document.body.appendChild(canvas);
            callback(canvas);
        });
    }

    exportAsExcel = (data) => {
        const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), "关联表数据" + '.' + (wopts.bookType=="biff2"?"xls":wopts.bookType));
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
            <div className="product-area">
                <Mapproduct items={items} />
                <Tableproduct items={items} />
                <Chartproduct items={items} />
                <div className="export-word" onClick={() => this.exportAsWord()}>导出为Word</div>
                <div className="export-excel" onClick={() => this.exportAsExcel(items)}>导出为Ecxel</div>
                <div id="md-print"></div>
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