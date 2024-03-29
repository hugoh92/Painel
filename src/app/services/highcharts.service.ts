import { Injectable } from '@angular/core';
import * as HighchartsMap from "highcharts/highmaps";
import * as Highcharts from "highcharts/highcharts";

import Sunburst from 'highcharts/modules/sunburst';
import Export from 'highcharts/modules/exporting';
import Histogram from 'highcharts/modules/histogram-bellcurve';



Histogram(Highcharts);
Sunburst(Highcharts)
Export(Highcharts)
Export(HighchartsMap)
declare var require: any;
const usaMap = require("../../assets/data/br.json");


@Injectable({
    providedIn: 'root'
})
export class HighchartsService {
    mapChart;

    constructor() { }

    quantile(arr: any, q: number) {
        const sorted = arr.sort(function (a, b) { return a - b; });
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return parseInt(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
        } else {
            return parseInt(sorted[base]);
        }
    }

    get_quantiles(arr: any) {
       /*  var min = this.quantile(arr, 0),
            p125 = this.quantile(arr, 0.125),
            q1 = this.quantile(arr, 0.30),
            p375 = this.quantile(arr, 0.4),
            median = this.quantile(arr, 0.55),
            p625 = this.quantile(arr, 0.70),
            q3 = this.quantile(arr, 0.79),
            p875 = this.quantile(arr, 0.88),
            p95 = this.quantile(arr, 0.99),
            max = this.quantile(arr, 1)

        var values = [min, p125, q1,p375, median, p625, q3, p875,p95, max] */
        var min = this.quantile(arr, 0)
        var q1 = this.quantile(arr, 0.25)
        var median = this.quantile(arr, 0.5)
        var q3 = this.quantile(arr, 0.75)
        var max = this.quantile(arr, 1)

        var values = [min, q1, median, q3, max]
        var uniqueValues = [...new Set(values)]

        if (uniqueValues.length == 2) {
            var aux = Math.round((uniqueValues[0] + uniqueValues[1]) / 2)
            uniqueValues.push(aux)
            uniqueValues = uniqueValues.sort(function (a, b) { return a - b; });
        } else if (uniqueValues.length == 1) {
            var aux = 0
            uniqueValues.push(aux)
            uniqueValues = uniqueValues.sort(function (a, b) { return a - b; });
        }

        return uniqueValues
    }

    getIntervalls(arr, nbIntervalls = 8) {
        var max = Math.max.apply(null, arr)
        var min = Math.min.apply(null, arr)
        var size = Math.round((max - min) / nbIntervalls);
        var result = [];

        for (let i = 0; i <= nbIntervalls; i++) {
            var inf = i + i * size;
            result.push(inf);
        }
        if (inf < max) {
            result.push(max + 1)
        }

        return result;
    }

    get_data_labels(arr: any) {
        var dataLabels = [];
        var colors = ["#fff3d1", "#ffe6a1","#FFE872", "#ffca34", "#f9a71f", "#c97f04", "#a16502","#8E3600", "#652600"];
        /* var colors = ["#FFFFFF","#E8E8e8","#D9D9D9","#FEFAA6","#FFE872", "#FFC227", "#FFA000", "#FF6100", "#8E3600", "#652600"]; */
        var current;

        for (var i = 0; i < arr.length - 1; i++) {
            current = {
                from: arr[i],
                to: arr[i + 1],
                color: colors[i],
                name: `De ${arr[i]} a ${arr[i + 1] - 1}`
            }

            dataLabels.push(current)
        }

        return dataLabels
    }

    getMapOptions(idHtml, result, metadata){
        var series;
        let geojson = usaMap
        let data = result.data
        
        var dataLabels = this.get_data_labels(this.getIntervalls(data.map(d => d[d.length - 1])));
        
        series = [{
            data: data,
            name: 'Dados 2021_',
            borderColor: '#0d542a',
            borderWidth: 1,
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            }
        }]

        var options: any = {
            chart: {
                map: geojson,
                backgroundColor: undefined
            },
           
            title: {
                text: ''
            },

            subtitle: {
                text: ''
            },
            
            legend: {
                title: {
                    text: `<span style = "color: #fff"> ${metadata.title} </span>`,
                    style: {
                        color: 'grey'
                    }
                },
                itemStyle: {
                    color: "black"
                },
                layout: "vertical",
                align: "left",
                width: 200,
                itemWidth: 100
            },

            credits: {
                enabled: false
            },

            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            colorAxis: {
                min: result.min,
                max: result.max,
                labels: {
                    format: "{value}"
                },
                tickAmount: 5
            },
            series: series
        }

        HighchartsMap.mapChart(idHtml, options);

        return options

    }
    draMap(idHtml, data, geojson = usaMap) {
        var series;
       
        //var dataLabels = this.get_data_labels(this.get_quantiles(data.map(d => d[d.length - 1])));
        var dataLabels = this.get_data_labels(this.getIntervalls(data.map(d => d[d.length - 1])));

        if (data.length == 27) {
            series = [{
                data: data,
                name: 'Dados 2021',
                borderColor: '#0d542a',
                borderWidth: 1,
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }]
        } else {
            series = [{
                data: data,
                //"name": "North",
                "value": "26",
                "path": "produtos.direm.org/painel/BA",
                url: "produtos.direm.org/painel/BA",

                keys: ['codarea', 'name', 'value'],
                joinBy: 'codarea',
                borderColor: '#0d542a',
                borderWidth: 1,
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }]
        }
        HighchartsMap.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
            var path = [
                // Arrow stem
                'M', x + w * 0.5, y,
                'L', x + w * 0.5, y + h * 0.7,
                // Arrow head
                'M', x + w * 0.3, y + h * 0.5,
                'L', x + w * 0.5, y + h * 0.7,
                'L', x + w * 0.7, y + h * 0.5,
                // Box
                'M', x, y + h * 0.9,
                'L', x, y + h,
                'L', x + w, y + h,
                'L', x + w, y + h * 0.9
            ];
            return path;
        };
        var options: any = {
            chart: {
                map: geojson,
                backgroundColor: undefined,
                height: (3 / 4 * 100) + '%' // 16:9 ratio
            },

            title: {
                text: ''
            },

            subtitle: {
                text: ''
            },
            
            legend: {
                title: {
                    text: '<span style = "color: #fff"> Legenda </span>',
                    style: {
                        color: 'white'
                    }
                },
                itemStyle: {
                    color: "white"
                },
                floating: false,
                align: 'right',
                x: 10,
                y: -40,
                layout: 'vertical',
                verticalAlign: 'bottom',
            },

            credits: {
                enabled: false
            },

            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },

            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function () {
                                if (this.name == "Maranhão") {
                                    return document.location.href = ("https://produtos.direm.org/painel/MA");
                                }
                                if (this.name == "Tocantins") {
                                    return document.location.href = ("https://produtos.direm.org/painel/TO");
                                }
                                if (this.name == "Rondônia") {
                                    return document.location.href = ("https://produtos.direm.org/painel/RO");
                                }
                                if (this.name == "Acre") {
                                    return document.location.href = ("https://produtos.direm.org/painel/AC");
                                }
                                if (this.name == "Amazonas") {
                                    return document.location.href = ("https://produtos.direm.org/painel/AM");
                                }
                                if (this.name == "Roraima") {
                                    return document.location.href = ("https://produtos.direm.org/painel/RR");
                                }
                                if (this.name == "Pará") {
                                    return document.location.href = ("https://produtos.direm.org/painel/PA");
                                }
                                if (this.name == "Amapá") {
                                    return document.location.href = ("https://produtos.direm.org/painel/AP");
                                }
                                if (this.name == "Sergipe") {
                                    return document.location.href = ("https://produtos.direm.org/painel/SE");
                                }
                                if (this.name == "Pernambuco") {
                                    return document.location.href = ("https://produtos.direm.org/painel/PE");
                                }
                                if (this.name == "Ceará") {
                                    return document.location.href = ("https://produtos.direm.org/painel/CE");
                                }
                                if (this.name == "Piauí") {
                                    return document.location.href = ("https://produtos.direm.org/painel/PI");
                                }
                                if (this.name == "Rio Grande do Norte") {
                                    return document.location.href = ("https://produtos.direm.org/painel/RN");
                                }
                                if (this.name == "São Paulo") {
                                    return document.location.href = ("https://produtos.direm.org/painel/SP");
                                }
                                if (this.name == "Bahia") {
                                    return document.location.href = ("https://produtos.direm.org/painel/BA");
                                }
                                if (this.name == "Paraíba") {
                                    return document.location.href = ("https://produtos.direm.org/painel/PB");
                                }
                                if (this.name == "Minas Gerais") {
                                    return document.location.href = ("https://produtos.direm.org/painel/MG");
                                }
                                if (this.name == "Espírito Santo") {
                                    return document.location.href = ("https://produtos.direm.org/painel/ES");
                                }
                                if (this.name == "Rio de Janeiro") {
                                    return document.location.href = ("https://produtos.direm.org/painel/RJ");
                                }
                                if (this.name == "Paraná") {
                                    return document.location.href = ("https://produtos.direm.org/painel/PR");
                                }
                                if (this.name == "Santa Catarina") {
                                    return document.location.href = ("https://produtos.direm.org/painel/SC");
                                }
                                if (this.name == "Rio Grande do Sul") {
                                    return document.location.href = ("https://produtos.direm.org/painel/RS");
                                }
                                if (this.name == "Mato Grosso do Sul") {
                                    return document.location.href = ("https://produtos.direm.org/painel/MS");
                                }
                                if (this.name == "Mato Grosso") {
                                    return document.location.href = ("https://produtos.direm.org/painel/MT");
                                }
                                if (this.name == "Goiás") {
                                    return document.location.href = ("https://produtos.direm.org/painel/GO");
                                }
                                if (this.name == "Distrito Federal") {
                                    return document.location.href = ("https://produtos.direm.org/painel/DF");
                                }
                            }
                        }
                    }
                }
            },
         

            colorAxis: {
                dataClasses: dataLabels,
                labels: {
                    format: '{value}'
                }
            },
            series: series
        }

        // Instantiate the map
        if (this.mapChart) {
            this.mapChart.destroy;
        }
        this.mapChart = HighchartsMap.mapChart(idHtml, options);
        return this.mapChart

    }

    drawPiePlot(idHtml, data) {


        Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
            var path = [
                // Arrow stem
                'M', x + w * 0.5, y,
                'L', x + w * 0.5, y + h * 0.7,
                // Arrow head
                'M', x + w * 0.3, y + h * 0.5,
                'L', x + w * 0.5, y + h * 0.7,
                'L', x + w * 0.7, y + h * 0.5,
                // Box
                'M', x, y + h * 0.9,
                'L', x, y + h,
                'L', x + w, y + h,
                'L', x + w, y + h * 0.9
            ];
            return path;
        };


        var options: any = {
            colors: [
                '#ffc905',
                '#e30086',
                'rgb(242, 104, 32)'

            ],
            chart: {
                backgroundColor: '#0d542a',
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: (7 / 12 * 100) + '%', // 16:9 ratio
                style: {
                    fontFamily: './assets/FONTES/gilr35a.TFT'
                }
            },
            title: {
                useHTML: true,
                text: `<small style="color: white; font-size: 10px">Cursos</small> <br> <b style="color: #e1e31d">${data.map(d => d.y).reduce((a, b) => a + b)}</b>`,
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    "text-align": "center",
                },
                y: 20
            },

            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },

            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },

            subtitle: {
                text: "<span>Organização Acadêmica</span>",
                useHTML: true,
                y: 2,
                align: "left",
                style: {
                    "text-align": "left",
                    color: "white",
                    "font-weight": "bold"
                },
            },
            tooltip: {
                headerFormat: "",
                pointFormat: '{point.name} <b>{point.y:.0f} cursos</b> '
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    borderWidth: 0,
                    borderColor: "Gill35a",
                    allowPointSelect: false,
                }
            },
            legend: {
                enabled: true
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: '',
                    innerSize: '100%',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        align: 'center',
                        format: '<span style = "font-size:12px">{point.name}</span><br><b style = "color: {point.color};font-size:14px;font-weight:bold">{point.percentage:.0f}%<b>',
                        style: {
                            fontAlign: 'center',
                            color: 'white',
                            textOutline: '0px'
                        },
                    },
                    colorByPoint: true,
                    data: data
                },
                {
                    name: '',
                    innerSize: '50%',
                    colorByPoint: true,
                    data: data,
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        format: '{point.y:.0f}',
                        style: {
                            fontSize: '12px',
                            color: 'white',
                            fontWeight: 'bold',
                            textOutline: '0px'
                        }
                    }
                },
            ]
        }

        Highcharts.chart(idHtml, options)
    }

    drawSuburnPlot(idHtml, data) {
        Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
            var path = [
                // Arrow stem
                'M', x + w * 0.5, y,
                'L', x + w * 0.5, y + h * 0.7,
                // Arrow head
                'M', x + w * 0.3, y + h * 0.5,
                'L', x + w * 0.5, y + h * 0.7,
                'L', x + w * 0.7, y + h * 0.5,
                // Box
                'M', x, y + h * 0.9,
                'L', x, y + h,
                'L', x + w, y + h,
                'L', x + w, y + h * 0.9
            ];
            return path;
        };

        var colors = ['#96bc31', '#00adef'],
            categories = [
                'Privada',
                'Pública',
            ],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
                color: data[i].color
            });

            // add version data
            drillDataLen = data[i].drilldown.data[0].length;

            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[0][j],
                    y: data[i].drilldown.data[0][j],
                    color: Highcharts.color(data[i].color).brighten(brightness).get()
                });
            }

        }

        // Create the chart
        var options: any = {
            chart: {
                type: 'pie',
                backgroundColor: '#0d542a',
                height: (7 / 12 * 100) + '%', // 16:9 ratio,
                style: {
                    fontFamily: 'Gill35a'
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                align: "left",
                useHTML: true,
                text: "<span>Natureza Jurídica</span>",
                y: 2,
                style: {
                    "text-align": "left",
                    color: "white",
                    "font-weight": "bold"
                },
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%'],
                    borderWidth: 0,
                    borderColor: "#0d542a",
                    point: {
                        events: {
                            legendItemClick: function () {
                                this.slice(null);
                                return false;
                            }
                        }
                    }
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },


            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            tooltip: {
                headerFormat: "",
                pointFormat: '{point.name} <b>{point.y:.1f}% cursos</b> '
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: -20,
                useHTML: true,
                labelFormat: '{name} | {y:.0f}%',
                itemStyle: {
                    color: 'white',
                },
            },
            series: [{
                borderWidth: 3,
                borderColor: '#0d542a',
                slicedOffset: 0,
                name: 'Cursos',
                data: versionsData,
                size: '80%',
                opacity: 0.7,
                innerSize: '60%',
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    align: 'center',
                    format: '<span style = "font-size:12px">{point.name}</span><br><b style = "color: {point.color};font-size:14px">{point.y:.0f}%<b>',
                    style: {
                        fontAlign: 'center',
                        color: 'white',
                        textOutline: '0px'
                    },
                },
                id: 'versions'
            },
            {
                name: 'Cursos',
                data: browserData,
                size: '55%',
                innerSize: '40%',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }],
        };

        Highcharts.chart(idHtml, options)


    }
    drawPlotPiram(idHtml) {

        var categories = [
            '15-19',
            '20-24', '25-29', '30-34', '35-39', '40-44',
            '45-49', '50-54', '55-59', '60-64', '65-69',
            '70-74', '75-79', '80-84', '85-89', '90-94',
            '95-99', '100 + '
        ];


        var options: any = {
            colors: [
                '#fff300',
                '#dc582c',

            ],
            chart: {
                type: 'bar',
                backgroundColor: '#0d542a',
                plotBorderWidth: 0
            },
            title: {
                text: 'Idade dos Docentes',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '19px',
                }
            },
            subtitle: {
                text: ''
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                }
            },
            credits: {
                enabled: false
            },
            xAxis: [{
                lineColor: 'transparent',
                categories: categories,
                reversed: false,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                plotBorderWidth: 0,
                labels: {
                    enabled: false
                    //step: 1
                },

                accessibility: {
                    description: 'Age (male)',

                }

            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                lineColor: 'transparent',
                categories: categories,
                linkedTo: 0,
                labels: {
                    enabled: false
                    //step: 1
                },
                accessibility: {
                    description: 'Age (female)'
                }
            }],
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                    /*   formatter: function () {
                          return Math.abs(this.value) + '%';
                      } */
                },
                accessibility: {
                    description: 'Percentage population',
                    rangeDescription: 'Range: 0 to 5%'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                }

            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
                }
            },

            series:
                [{
                    name: 'Feminino',
                    data: [
                        -2.4,
                        -2.7, -3.0, -3.3, -3.2,
                        -2.9, -3.5, -4.4, -4.1,
                        -3.4, -2.7, -2.3, -2.2,
                        -1.6, -0.6, -0.3, -0.0,
                        -0.0
                    ],
                }, {
                    name: 'Masculino',
                    data: [
                        2.3, 2.6,
                        2.9, 3.2, 3.1, 2.9, 3.4,
                        4.3, 4.0, 3.5, 2.9, 2.5,
                        2.7, 2.2, 1.1, 0.6, 0.2,
                        0.0
                    ]
                }],

            legend: {
                itemStyle: {
                    color: 'white'
                }
            }

        }
        Highcharts.chart(idHtml, options);
    }

    drawDonutRegime(idHtml, data) {

        var options: any = {

            colors: [
                '#F1C730',
                '#61ABEC',
                '#9EB01D',

            ],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: '#0d542a',
                align: 'center',

                style: {
                    fontFamily: './assets/FONTES/gilr35a.TFT',

                }

            },
            title: {
                text: 'Regime de trabalho dos docentes do IES',
                align: 'center',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '16px',
                }
                //verticalAlign: 'middle',
                //y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> </b><br/> qnt: 000',

            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,

                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: '16px',
                        }

                    },
                    center: ['50%', '50%'],
                    size: '80%'
                }
            },
            series: [{
                type: 'pie',
                //name: 'Browser share',
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    align: 'center',
                    format: '<span style = "font-size:16px">{point.name}</span><br><b style = "color: {point.color};font-size:14px">{point.y:.0f}%<b>',
                    style: {
                        fontAlign: 'center',
                        color: 'white',
                        textOutline: '0px'
                    },
                },
                align: 'center',
                data: data
            }]
        }
        Highcharts.chart(idHtml, options);
    }

    drawDonutTitulação(idHtml, data) {
        var options: any = {

            colors: [
                '#F1C730',
                '#61ABEC',
                '#9EB01D',
                '#D5672B',

            ],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: '#0d542a',
                style: {
                    fontFamily: './assets/FONTES/gilr35a.TFT'
                }

            },
            title: {
                text: 'Titulação do corpo docente do IES',
                align: 'center',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '16px',
                }
                //verticalAlign: 'middle',
                //y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> </b><br/>',

            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        align: 'center',
                        format: '<span style = "font-size:16px">{point.name}</span><br><b style = "color: {point.color};font-size:14px">{point.y:.0f}%<b>',
                        style: {
                            fontAlign: 'center',
                            color: 'white',
                            textOutline: '0px'
                        },
                    },
                    center: ['50%', '50%'],
                    size: '80%'
                }
            },
            series: [{
                type: 'pie',
                //name: 'Browser share',
                innerSize: '50%',
                align: 'center',
                data: data
            }]
        }
        Highcharts.chart(idHtml, options);
    }

    drawDonutAlunTip(idHtml, data) {
        var options: any = {

            colors: [
                '#F1C730',
                '#61ABEC',
                '#9EB01D',


            ],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: '#0d542a',
                style: {
                    fontFamily: './assets/FONTES/gilr35a.TFT'
                }

            },
            title: {
                text: 'Tipo de escola da conclusão do Ensino Médio',
                align: 'center',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '16px',
                }
                //verticalAlign: 'middle',
                //y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> </b><br/> qnt: 000',

            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        align: 'center',
                        format: '<span style = "font-size:16px">{point.name}</span><br><b style = "color: {point.color};font-size:14px">{point.y:.0f}%<b>',
                        style: {
                            fontAlign: 'center',
                            color: 'white',
                            textOutline: '0px'
                        },
                    },
                    center: ['50%', '50%'],
                    size: '80%'
                }
            },
            series: [{
                type: 'pie',
                //name: 'Browser share',
                innerSize: '50%',
                align: 'center',
                data: data
            }]
        }
        Highcharts.chart(idHtml, options);
    }

    drawDonutAlunPiram(idHtml) {

        var categories = [
            '15-19',
            '20-24', '25-29', '30-34', '35-39', '40-44',
            '45-49', '50-54', '55-59', '60-64', '65-69',
            '70-74', '75-79', '80-84', '85-89', '90-94',
            '95-99', '100 + '
        ];

        var options: any = {
            colors: [
                '#fff300',
                '#dc582c',

            ],
            chart: {
                type: 'bar',
                backgroundColor: '#0d542a',
                plotBorderWidth: 0
            },
            title: {
                text: 'Idade dos Alunos',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '19px',
                }
            },
            subtitle: {
                text: ''
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                }
            },
            credits: {
                enabled: false
            },
            xAxis: [{
                lineColor: 'transparent',
                categories: categories,
                reversed: false,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                plotBorderWidth: 0,
                labels: {
                    enabled: false
                    //step: 1
                },

                accessibility: {
                    description: 'Age (male)',

                }

            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                lineColor: 'transparent',
                categories: categories,
                linkedTo: 0,
                labels: {
                    enabled: false
                    //step: 1
                },
                accessibility: {
                    description: 'Age (female)'
                }
            }],
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                    /*   formatter: function () {
                          return Math.abs(this.value) + '%';
                      } */
                },
                accessibility: {
                    description: 'Percentage population',
                    rangeDescription: 'Range: 0 to 5%'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                }

            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
                }
            },

            series:
                [{
                    name: 'Feminino',
                    data: [
                        -2.4,
                        -2.7, -3.0, -3.3, -3.2,
                        -2.9, -3.5, -4.4, -4.1,
                        -3.4, -2.7, -2.3, -2.2,
                        -1.6, -0.6, -0.3, -0.0,
                        -0.0
                    ],
                }, {
                    name: 'Masculino',
                    data: [
                        2.3, 2.6,
                        2.9, 3.2, 3.1, 2.9, 3.4,
                        4.3, 4.0, 3.5, 2.9, 2.5,
                        2.7, 2.2, 1.1, 0.6, 0.2,
                        0.0
                    ]
                }],

            legend: {
                itemStyle: {
                    color: 'white'
                }
            }

        }
        Highcharts.chart(idHtml, options);

    }

    drawCorM(idHtml, data) {
        var options: any = {
            colors: [
                '#F1C730',
                '#61ABEC',
                '#9EB01D',
                '#D5672B',
                '#0069B4',
                '#C20082',
                '#CECECE',

            ],
            chart: {
                plotBorderWidth: 0,
                backgroundColor: null,
                //renderTo: 'container',

                align: 'center'
            },
            colorAxis: {
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },
            series: [{
                dataLabels: {
                    useHTML: true,
                    // this is optional formatter, if you need more editing on text with html tags and css then you can use
                    formatter() {
                        return '<div>' + this.point.name + '</div>';
                    }
                },
                type: 'treemap',
                colorByPoint: true,
                layoutAlgorithm: 'squarified',
                data: data
            }],
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            credits:
            {
                enabled: false,

            },

            title: {
                text: 'Cor\\Raça dos docentes da IES',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '19px',
                }

            },

        }
        Highcharts.chart(idHtml, options);
    }

    drawCorAlunM(idHtml, data) {
        var options: any = {
            colors: [
                '#F1C730',
                '#61ABEC',
                '#9EB01D',
                '#D5672B',
                '#0069B4',
                '#C20082',
                '#CECECE',

            ],
            chart: {
                plotBorderWidth: 0,
                backgroundColor: null,
                //renderTo: 'container',

                align: 'center'
            },
            series: [{
                dataLabels: {
                    useHTML: true,
                    // this is optional formatter, if you need more editing on text with html tags and css then you can use
                    formatter() {
                        return '<div>' + this.point.name + '</div>';
                    }
                },
                type: 'treemap',
                colorByPoint: true,
                layoutAlgorithm: 'squarified',
                data: data
            }],
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            credits:
            {
                enabled: false,

            },
            title: {
                text: 'Cor\\Raça dos alunos da IES',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '19px',
                }
            },

        }
        Highcharts.chart(idHtml, options);
    }

    drawHistogram(idHtml, data, metadata) {
        let year = data[0].data.map(d => d[0])
        data = data.map(d => { return { name: d.name, data: [d.data[0][1]] } })

        var options: any = {
            chart: {
                type: 'bar',
                events: {
                load: function (chart) {
                    var target = document.getElementById('customLegend');
                    target.innerHTML = '';
                }}
            },
            title: {
                text: metadata.title
            },
            subtitle: {
                text: `Dados de ${year}`
            },
            xAxis: {
                categories: data.map(d => d.name),
                title: {
                    text: null
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    colorByPoint: true
                }
            },
            credits: {
                text: "Direm.org",
                link: "https://direm.org/"
            },

            series: [{ name: metadata.metrica, data: data.map(d => d.data) }]
        }

        Highcharts.chart(idHtml, options);

        return options
    }

    drawLinePlot(idHtml, data, metadata) {
        let years = data[0].data.map(d => d[0])
        var options: any = {
            chart: {
                type: 'line',
                zoomType: 'x',
                events: {
                load: function (chart) {
                    var target = document.getElementById('customLegend');
                    target.innerHTML = '';
                }}
            },
            title: {
                text: `${metadata.title}`
            },
            subtitle: {
                text: `${data.name || ''} ${years[0]} a ${years[years.length - 1]}`
            },
            xAxis: {
                categories: data.map(d => d.years),
                title: {
                    text: null
                },

            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    colorByPoint: false
                }
            },
            credits: {
                text: "Direm",
                link: "https://direm.org/"
            },

            series: data
        }

        Highcharts.chart(idHtml, options);

        return options
    }

    drawHistogramCruz(idHtml, data, metadata) {
        var year = data[0].year

        var options: any = {
            chart: {
                type: 'bar',
                events: {
                load: function (chart) {
                    var target = document.getElementById('customLegend');
                    target.innerHTML = '';
                }}
            },
            title: {
                text: metadata.title
            },
            subtitle: {
                text: `Dados de ${year}`
            },
            xAxis: {
                type: "category",
                title: {
                    text: null
                }
            },
            credits: {
                text: "Direm.org",
                link: "https://direm.org/"
            },
            series: data
        }

        Highcharts.chart(idHtml, options);

        return options
    }

    drawColumnPlotCruz(idHtml, data, metadata) {
        var options: any = {
            chart: {
                type: 'column',
                events: {
                    load: function (chart) {
                        var target = document.getElementById('customLegend');
                        target.innerHTML = '';

                        var types = {}
                        this.series.forEach(function (series) {
                            let cur = series.userOptions.cat
                            if (!(cur in types)) {
                                target.insertAdjacentHTML('beforeend', ('<li class="item"><span class="symbol" style="color:' +
                                    series.color + '"></span>' +
                                    series.userOptions.cat + '</li>')
                                )
                                types[cur] = true
                            }
                        })
                    }
                }
            },
            title: {
                text: metadata.title
            },
            credits: {
                text: "Direm.org",
                link: "https://direm.org/"
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.userOptions.cat + " - " + this.x + '</b><br/>' +
                        this.series.userOptions.stack + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            xAxis: {
                lineWidth: 0,
                gridLineWidth: 1
            },

            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 1,
                },
                series: {
                    colorByPoint: false,
                }
            },

            series: data
        }

        Highcharts.chart(idHtml, options);

        return options
    }

    draNewMap(idHtml, data, geojson = usaMap) {
        var series;
       
        //var dataLabels = this.get_data_labels(this.get_quantiles(data.map(d => d[d.length - 1])));
        var dataLabels = this.get_data_labels(this.getIntervalls(data.map(d => d[d.length - 1])));
        if (data.length == 27) {
            series = [{
                data: data,
                name: 'Dados 2021',
                borderColor: '#0d542a',
                borderWidth: 1,
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }]
        } else {
            series = [{
                data: data,
                //"name": "North",
                "value": "26",
                "path": "produtos.direm.org/painel/BA",
                url: "produtos.direm.org/painel/BA",

                keys: ['codarea', 'name', 'value'],
                joinBy: 'codarea',
                borderColor: '#0d542a',
                borderWidth: 1,
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                }
            }]
        }
        HighchartsMap.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
            var path = [
                // Arrow stem
                'M', x + w * 0.5, y,
                'L', x + w * 0.5, y + h * 0.7,
                // Arrow head
                'M', x + w * 0.3, y + h * 0.5,
                'L', x + w * 0.5, y + h * 0.7,
                'L', x + w * 0.7, y + h * 0.5,
                // Box
                'M', x, y + h * 0.9,
                'L', x, y + h,
                'L', x + w, y + h,
                'L', x + w, y + h * 0.9
            ];
            return path;
        };
        var options: any = {
            chart: {
                map: geojson,
                backgroundColor: undefined,
                height: (3 / 4 * 100) + '%' // 16:9 ratio
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            legend: {
                title: {
                    text: '<span style = "color: #fff"> Legenda </span>',
                    style: {
                        color: 'white'
                    }
                },
                itemStyle: {
                    color: "white"
                },
                floating: false,
                align: 'left',
                x: 10,
                y: -40,
                layout: 'vertical',
                verticalAlign: 'bottom',
            },
            credits: {
                enabled: false
            },
            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                        // Good old text links
                        fill: '#c3081c',
                        color: 'white',
                        r: 15,

                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: 'download',
                        symbolStroke: '#fff',
                        symbolSize: 10,
                        height: 25,
                        width: 25,
                        enabled: true
                    },
                }
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function () {
                                if (this.name == "Maranhão") { 
                                    return document.location.href = document.location.href.concat('', '/MA'); //replicar
                                }
                                if (this.name == "Tocantins") {
                                    return document.location.href = document.location.href.concat('', '/TO');
                                }
                                if (this.name == "Rondônia") {
                                    return document.location.href = document.location.href.concat('', '/RO');
                                }
                                if (this.name == "Acre") {
                                    return document.location.href = document.location.href.concat('', '/AC');
                                }
                                if (this.name == "Amazonas") {
                                    return document.location.href = document.location.href.concat('', '/AM');
                                }
                                if (this.name == "Roraima") {
                                    return document.location.href = document.location.href.concat('', '/RR');
                                }
                                if (this.name == "Pará") {
                                    return document.location.href = document.location.href.concat('', '/PA');
                                }
                                if (this.name == "Amapá") {
                                    return document.location.href = document.location.href.concat('', '/AP');
                                }
                                if (this.name == "Sergipe") {
                                    return document.location.href = document.location.href.concat('', '/SE');
                                }
                                if (this.name == "Pernambuco") {
                                    return document.location.href = document.location.href.concat('', '/PE');
                                }
                                if (this.name == "Ceará") {
                                    return document.location.href = document.location.href.concat('', '/CE');
                                }
                                if (this.name == "Piauí") {
                                    return document.location.href = document.location.href.concat('', '/PI');
                                }
                                if (this.name == "Rio Grande do Norte") {
                                    return document.location.href = document.location.href.concat('', '/RN');
                                }
                                if (this.name == "São Paulo") {
                                    return document.location.href = document.location.href.concat('', '/SP');
                                }
                                if (this.name == "Bahia") {
                                    return document.location.href = document.location.href.concat('', '/BA');
                                }
                                if (this.name == "Paraíba") {
                                    return document.location.href = document.location.href.concat('', '/PB');
                                }
                                if (this.name == "Minas Gerais") {
                                    return document.location.href = document.location.href.concat('', '/MG');
                                }
                                if (this.name == "Espírito Santo") {
                                    return document.location.href = document.location.href.concat('', '/ES');
                                }
                                if (this.name == "Rio de Janeiro") {
                                    return document.location.href = document.location.href.concat('', '/RJ');
                                }
                                if (this.name == "Paraná") {
                                    return document.location.href = document.location.href.concat('', '/PR');
                                }
                                if (this.name == "Santa Catarina") {
                                    return document.location.href = document.location.href.concat('', '/SC');
                                }
                                if (this.name == "Rio Grande do Sul") {
                                    return document.location.href = document.location.href.concat('', '/RS');
                                }
                                if (this.name == "Mato Grosso do Sul") {
                                    return document.location.href = document.location.href.concat('', '/MS');
                                }
                                if (this.name == "Mato Grosso") {
                                    return document.location.href = document.location.href.concat('', '/MT');
                                }
                                if (this.name == "Goiás") {
                                    return document.location.href = document.location.href.concat('', '/GO');
                                }
                                if (this.name == "Distrito Federal") {
                                    return document.location.href = document.location.href.concat('', '/DF');
                                }
                            }
                        }
                    }
                }
            },
            colorAxis: {
                dataClasses: dataLabels,
                labels: {
                    format: '{value}'
                }
            },
            series: series
        }
        // Instantiate the map
        if (this.mapChart) {
            this.mapChart.destroy;
        }
        this.mapChart = HighchartsMap.mapChart(idHtml, options);
        return this.mapChart
    }

    plotCap(idHtml) {
        
        var options: any = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region',
                align: 'left'
            },
            subtitle: {
                text: 'Source: <a ' +
                    'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
                    'target="_blank">Wikipedia.org</a>',
                align: 'left'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe'],
                title: {
                    text: null
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                gridLineWidth: 0
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                    dataLabels: {
                        enabled: true
                    },
                    groupPadding: 0.1
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1990',
                data: [631, 727, 3202, 721]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 726]
            }, {
                name: 'Year 2018',
                data: [1276, 1007, 4561, 746]
            }]
        }
        
    Highcharts.chart(idHtml, options);
    }

    getChartOptions(idHtml,chartOptions): Highcharts.Options {
        return {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent',
                spacing: [0, 10, 10, 10],
              },
              title: {
                text: ''
              },
              xAxis: {
                lineWidth: 0,
                minorGridLineWidth: 0,
                minorTickLength: 0,
                tickLength: 0,
                categories: ['Centro-Oeste', 'Nordeste', 'Norte', 'Sudeste', 'Sul'],
                gridLineWidth: 0,
                labels: {
                  style: {
                    color: 'white', // Mudar a cor das categorias
                    fontSize: '16px' // Mudar o tamanho das categorias
                  }
                }
              },
              yAxis: {
                labels: {
                  enabled: false
                },
                title: {
                  text: ''
                },
                gridLineWidth: 0
              },
              plotOptions: {
                series: {
                  marker: {
                    enabled: false
                  },
                  showInLegend: false,
                  borderWidth: 0,
                  dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}%', // Formato para exibir a porcentagem
                    align: 'right',
                    inside: true,
                    style: {
                        color: 'white', // Mudar a cor das categorias
                        fontSize: '16px' // Mudar o tamanho das categorias
                    }
                  }
                },
               
                /* column: {
                  colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] // Defina as cores das barras aqui
                } */
              },
              navigation: {
                buttonOptions: {
                    enabled: false
                }
              },
              credits: {
                enabled: false
              },
              series: [{
                type: 'column',
                name: '',
                data: [
                  { y: 1, color: '#9EB01D' },
                  { y: 2, color: '#61ABEC' },
                  { y: 3, color: '#F1C730' },
                  { y: 4, color: '#D5672B' },
                  { y: 5, color: '#C20082' }]
              }]
        };
        Highcharts.chart( idHtml, chartOptions);
    } 


    getChartOrg(idHtml,chartOptions,data): Highcharts.Options {
   
        return {
        chart: {
          type: 'bar',
          backgroundColor: 'transparent',
          spacing: [5, 10, 10, 10],
        },
        title: {
          text: ''
        },
        xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          minorTickLength: 0,
          tickLength: 0,
          categories: ['Centro Universitário', 'Faculdade', 'Universidade'],
          gridLineWidth: 0,
          labels: {
            style: {
              color: 'white', // Mudar a cor das categorias
              fontSize: '16px' // Mudar o tamanho das categorias
            }
          }
        },
        yAxis: {
          labels: {
            enabled: false
          },
          title: {
            text: ''
          },
          gridLineWidth: 0
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false
            },
            showInLegend: false,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y}', // Formato para exibir a porcentagem
              align: 'right',
              inside: true,
              //crop: false,
              //overflow: 'allow'
                style: {
                  color: 'white', // Mudar a cor das categorias
                  fontSize: '16px' // Mudar o tamanho das categorias
                }
            }
          },
        },
        navigation: {
          buttonOptions: {
              enabled: false
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'column',
          name: '',
          data: [
            { y: data.filter(d => d.codigo_ies__org_academica=="Centro Universitário" ).map(d => d.n)[0], color: '#F1C730'},
            { y: data.filter(d => d.codigo_ies__org_academica=="Faculdade" ).map(d => d.n)[0], color: '#D5672B' },
            { y: data.filter(d => d.codigo_ies__org_academica=="Universidade" ).map(d => d.n)[0], color: '#C20082' }]
        }]
      };
  
      Highcharts.chart('chart-container-org', chartOptions);
    }

    getChartReg(idHtml,chartOptions,data): Highcharts.Options { 
        //let data=[{"localizacao": "Capital", "n": 102}, {"localizacao": "Interior", "n": 263}]
       
        return {
        chart: {
          type: 'bar',
          backgroundColor: 'transparent',
          spacing: [0, 10, 10, 15],
          //width: 500
        },
        title: {
          text: ''
        },
        xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            enabled: false
          },
          minorTickLength: 0,
          tickLength: 0,
          gridLineWidth: 0
        },
        yAxis: {
          labels: {
            enabled: false
          },
          title: {
            text: ''
          },
          gridLineWidth: 0
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          column: {
            pointWidth: 100 ,
            colorByPoint: true // Ajuste a largura dos pontos das barras
          },
          series: {
            stacking: 'normal',
              marker: {
                enabled: false
              },
              showInLegend: false,
              borderWidth: 0,
              dataLabels: {
              enabled: true,
              format: '{y}',
              style: {
                color: 'white', // Mudar a cor das categorias
                fontSize: '25px' // Mudar o tamanho das categorias
              }
            }
          }
        },
        navigation: {
          buttonOptions: {
              enabled: false
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'column',
          name: 'Capital', //alterar %
          data: data.filter(d => d.localizacao=="Capital" ).map(d => d.n),
          colors: ['#61ABEC']
        }, {
          type: 'column',
          name: 'Interior',
          data: data.filter(d => d.localizacao=="Interior" ).map(d => d.n),
          colors: ['#C20082']
        }]
      };
  
      Highcharts.chart('chart-container-bar', chartOptions);
    }
         
}
