var map = new AMap.Map('mapdiv', {
    features: ['bg', 'road'],
    mapStyle: 'amap://styles/grey',
    center: [116.397475, 39.908668],
    pitch: 0,
    zoom: 10,
    viewMode: '2D'
});
var map2 = new AMap.Map('mapdiv2', {
    mapStyle: 'amap://styles/1de318cbb8d12c02303a22c550b9ccc9',
    viewMode: '3D',
    features: ['bg', 'road'],
    zoom: 9.6,
    pitch: 56
});

var flag1=0;
var flag2=0;
var flag3=0;
var flag4=0;
var flag5=0;
var flag6=0;
var layerHeatmap = new Loca.HeatmapLayer({
    map: map,
});
var layerHexagon = new Loca.HexagonLayer({
    map: map,
    fitView: true
});
var layerGrid = new Loca.GridLayer({
    map: map,
    fitView: true
});
var layerDistrict = new Loca.DistrictLayer({
    map: map,
    // fitView: true
});
var layerLabels = new Loca.LabelsLayer({
    fitView: true,
    map: map,
});
function HeatmapRender(){
    var list = [];
    var i = -1, length = heatmapData.length;
    while (++i < length) {
        var item = heatmapData[i];
        list.push({
            coordinate: [item.lng, item.lat],
            count: item.count
        })
    }

    layerHeatmap.setData(list, {
        lnglat: 'coordinate',
        value: 'count'
    });

    layerHeatmap.setOptions({
        style: {
            radius: 16,
            color: {
                0.5: '#2c7bb6',
                0.65: '#abd9e9',
                0.7: '#ffffbf',
                0.9: '#fde468',
                1.0: '#d7191c'
            }
        }
    });
    if(flag1==0){
        layerHeatmap.render();
        document.getElementById("Heatmap").style.backgroundColor="aqua";
        flag1=1;
    }
    else if(flag1==1){
        layerHeatmap.hide();
        document.getElementById("Heatmap").style.backgroundColor="white";
        flag1=2;
    }
    else if(flag1==2){
        layerHeatmap.show();
        document.getElementById("Heatmap").style.backgroundColor="aqua";
        flag1=1;
    }


    let file_url =
        '//a.amap.com/Loca/static/mock/heatmapData.js'
    let xhr = new XMLHttpRequest();
    xhr.open("get", file_url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            // if (callback) {
            // callback();
            console.log(this.response)
            const reader = new FileReader()
            reader.onload = function () {
                //console.log('reader.result', reader.result)
                document.getElementById("data").style.fontSize="5pt";
                document.getElementById("data").innerHTML=reader.result;
            }
            reader.readAsText(this.response);
        }
    };
    xhr.send();
    //document.getElementById("data").innerHTML=reader.result;
}

function HexagonRender(){
    $.get('//a.amap.com/Loca/static/mock/qingdao_500m.tsv', function (heatmapData) {


        layerHexagon.setData(heatmapData, {
            lnglat: function (obj) {
                var val = obj.value;
                return [val['lng'], val['lat']]
            },
            value: 'count',
            type: 'tsv'
        });

        layerHexagon.setOptions({
            mode: 'count',
            unit: 'meter',
            style: {
                color: ['#0868AC', '#43A2CA', '#43A2CA', '#7BCCC4', '#BAE4BC', '#F0F9E8', '#F0F9E8'],
                radius: 600,
                opacity: 0.9,
                gap: 300,
                height: [0, 100000]
            }
        });
        if(flag2==0){
            layerHexagon.render();
            document.getElementById("Hexagon").style.backgroundColor="aqua";
            flag2=1;
        }
        else if(flag2==1){
            layerHexagon.hide();
            document.getElementById("Hexagon").style.backgroundColor="white";
            flag2=2;
        }
        else if(flag2==2){
            layerHexagon.show();
            document.getElementById("Hexagon").style.backgroundColor="aqua";
            flag2=1;
        }

        let file_url =
            '//a.amap.com/Loca/static/mock/qingdao_500m.tsv'
        let xhr = new XMLHttpRequest();
        xhr.open("get", file_url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                // if (callback) {
                // callback();
                console.log(this.response)
                const reader = new FileReader()
                reader.onload = function () {
                    console.log('reader.result', reader.result)
                    document.getElementById("data").style.fontSize="5pt";
                    document.getElementById("data").innerHTML=reader.result;
                }
                reader.readAsText(this.response);
            }
        };
        xhr.send();
    });
}

function GridRender(){
    $.get('//a.amap.com/Loca/static/mock/qingdao_500m.tsv', function (heatmapData) {



        layerGrid.setData(heatmapData, {
            lnglat: function (obj) {
                var val = obj.value;
                return [val['lng'], val['lat']]
            },
            value: 'count',
            type: 'tsv'
        });

        layerGrid.setOptions({
            unit: 'px',
            mode: 'count',
            style: {
                color: ['#253494', '#225ea8', '#1d91c0', '#41b6c4', '#7fcdbb', '#c7e9b4', '#edf8b1'],
                radius: 17,
                opacity: 0.9,
                gap: 2,
                height: [0, 0],
                text: {
                    content: function(v){
                        return v.value.count;
                    },
                    direction: 'center',  // 文字方位
                    //offset: [2, -5],  // 偏移大小
                    fontSize: 12,  // 文字大小
                    fillColor: '#03101F',
                    strokeColor: 'rgba(255,255,255,0)',  // 文字描边颜色
                    strokeWidth: 0,  // 文字描边宽度
                }
            }
        });

        if(flag3==0){
            layerGrid.render();
            document.getElementById("Grid").style.backgroundColor="aqua";
            flag3=1;
        }
        else if(flag3==1){
            layerGrid.hide();
            document.getElementById("Grid").style.backgroundColor="white";
            flag3=2;
        }
        else if(flag3==2){
            layerGrid.show();
            document.getElementById("Grid").style.backgroundColor="aqua";
            flag3=1;
        }

        let file_url =
            '//a.amap.com/Loca/static/mock/qingdao_500m.tsv'
        let xhr = new XMLHttpRequest();
        xhr.open("get", file_url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                // if (callback) {
                // callback();
                console.log(this.response)
                const reader = new FileReader()
                reader.onload = function () {
                    console.log('reader.result', reader.result)
                    document.getElementById("data").style.fontSize="5pt";
                    document.getElementById("data").innerHTML=reader.result;
                }
                reader.readAsText(this.response);
            }
        };
        xhr.send();
    });
}

function DistrictRender(){
    $.get('//a.amap.com/Loca/static/mock/tourist_attractions.csv', function (data) {

        map.on('mapload', function () {
            map.getMap().plugin(['AMap.ControlBar'], function () {
                var controlBar = new AMap.ControlBar();
                map.getMap().addControl(controlBar);
            });
        });


        layerDistrict.setData(data, {
            type: 'csv',
            lnglat: '经纬度',
            value: '知名景区数量'
        });

        layerDistrict.setOptions({
            mode: 'count',
            style: {
                color: ['#0c2c84', '#225ea8', '#225ea8', '#41b6c4', '#7fcdbb', '#c7e9b4', '#ffffcc'],
                height: [0, 300000],
                opacity: 0.86
            }
        });
        if(flag4==0){
            layerDistrict.render();
            document.getElementById("District").style.backgroundColor="aqua";
            flag4=1;
        }
        else if(flag4==1){
            layerDistrict.hide();
            document.getElementById("District").style.backgroundColor="white";
            flag4=2;
        }
        else if(flag4==2){
            layerDistrict.show();
            document.getElementById("District").style.backgroundColor="aqua";
            flag4=1;
        }

        let file_url =
            '//a.amap.com/Loca/static/mock/tourist_attractions.csv'
        let xhr = new XMLHttpRequest();
        xhr.open("get", file_url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                // if (callback) {
                // callback();
                console.log(this.response)
                const reader = new FileReader()
                reader.onload = function () {
                    console.log('reader.result', reader.result)
                    document.getElementById("data").style.fontSize="5pt";
                    document.getElementById("data").innerHTML=reader.result;
                }
                reader.readAsText(this.response);
            }
        };
        xhr.send();
    });
}

function ContourRender() {
    if (flag5 == 0) {
        document.getElementById("mapdiv2").style.zIndex = "1000";
        var contourLayer = new Loca.ContourLayer({
            shape: 'isoline',
            map: map2
        });

        contourLayer.setData(districtData, {
            lnglat: 'lnglat',
            value: 'count'
        });

        contourLayer.setOptions({
            smoothNumber: 3,
            threshold: 3,
            interpolation: {
                step: 300,
                effectRadius: 800,
            },
            style: {
                height: 5 * 1E4,
                color: ["#0c2c84", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#ffffcc"]
            }
        });
        contourLayer.render();
        document.getElementById("Contour").style.backgroundColor = "aqua";
        flag5=1;
    }
    else if(flag5==1){
        document.getElementById("mapdiv2").style.zIndex = "0";
        document.getElementById("Contour").style.backgroundColor = "white";
        flag5=2;
    }
    else if(flag5==2){
        document.getElementById("mapdiv2").style.zIndex = "1000";
        flag5=1;
    }
}

function LabelsRender() {
    AMap.plugin('AMap.DistrictSearch', function () {
        var districtSearch = new AMap.DistrictSearch({
            // 关键字对应的行政区级别，country表示国家
            level: 'country',
            //  显示下级行政区级数，1表示返回下一级行政区
            subdistrict: 1
        });

        // 搜索所有省/直辖市信息
        districtSearch.search('中国', function (status, result) {
            // 查询成功时，result即为对应的行政区信息
            getCenter(result);
        });
    });

    // 获取行政区中心位置
    function getCenter(result) {
        var districtList = result.districtList[0].districtList;;
        var dist = {};

        for (var i = 0, len = districtList.length; i < len; i++) {
            dist[districtList[i].name] = [districtList[i].center.lng, districtList[i].center.lat];
        }

        if(flag6==0){
            $.get('//a.amap.com/Loca/static/mock/year_income.csv', function (datas) {
                layerLabels.setData(datas, {
                    type: 'csv',
                    lnglat: function (o) {
                        return dist[o.value['地区']]
                    }
                }).setOptions({
                    style: {
                        direction: 'center',
                        offset: [0, 0],
                        text: function (data) {
                            return '￥' + parseInt(data.value['2018年'])
                        },
                        fillColor: function (data) {
                            var income = +data.value['2018年'];
                            return income < 20000 ? '#0C6DB0' :
                                income < 50000 ? '#2DABBA' : '#82CF9C';
                        },
                        fontSize: function (data) {
                            var income = +data.value['2018年'];
                            return income < 20000 ? 12 :
                                income < 30000 ? 16 :
                                    income < 40000 ? 20 :
                                        income < 50000 ? 24 :
                                            income < 60000 ? 28 : 32;
                        },
                        strokeColor: '#000',
                        strokeWidth: 0,
                        opacity: 1,
                    },
                    selectStyle: {
                        fontSize: function (data) {
                            var income = +data.value['2018年'];
                            return income < 20000 ? 12 :
                                income < 30000 ? 16 :
                                    income < 40000 ? 20 :
                                        income < 50000 ? 24 :
                                            income < 60000 ? 28 : 32;
                        },
                        strokeColor: '#000',
                        strokeWidth: 1,
                    }
                })
                layerLabels.render();
                document.getElementById("Labels").style.backgroundColor="aqua";
                flag6=1;

                let file_url =
                    '//a.amap.com/Loca/static/mock/year_income.csv'
                let xhr = new XMLHttpRequest();
                xhr.open("get", file_url, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    if (this.status == 200) {
                        // if (callback) {
                        // callback();
                        console.log(this.response)
                        const reader = new FileReader()
                        reader.onload = function () {

                            document.getElementById("data").style.fontSize="5pt";
                            document.getElementById("data").innerHTML=reader.result;
                        }
                        reader.readAsText(this.response);
                    }
                };
                xhr.send();
            });

        }
        else if(flag6==1){
                layerLabels.hide();
                document.getElementById("Labels").style.backgroundColor="white";
                flag6=2;
        }
        else if(flag6==2){
                layerLabels.show();
                document.getElementById("Labels").style.backgroundColor="aqua";
                flag6=1;
        }
    }
}






































