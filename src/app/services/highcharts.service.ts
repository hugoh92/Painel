import { Injectable } from '@angular/core';
import * as HighchartsMap from "highcharts/highmaps";
import * as Highcharts from "highcharts/highcharts";
import Sunburst from 'highcharts/modules/sunburst';
import Export from 'highcharts/modules/exporting';
import { noUndefined } from '@angular/compiler/src/util';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

Sunburst(Highcharts)
Export(Highcharts)
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
        var min = this.quantile(arr, 0)
        var q1 = this.quantile(arr, 0.25)
        var median = this.quantile(arr, 0.5)
        var q3 = this.quantile(arr, 0.75)
        var max = this.quantile(arr, 1)

        var values = [min, q1, median, q3, max]
        var uniqueValues = [...new Set(values)]

        if(uniqueValues.length == 2){
            var aux = Math.round((uniqueValues[0] + uniqueValues[1])/2)
            uniqueValues.push(aux)
            uniqueValues = uniqueValues.sort(function (a, b) { return a - b; });
        } else if(uniqueValues.length == 1){
            var aux = 0
            uniqueValues.push(aux)
            uniqueValues = uniqueValues.sort(function (a, b) { return a - b; });
        }

        return uniqueValues
    }

    get_data_labels(arr:any){
        var dataLabels = [];
        var colors = ["#ffe6a1", "#ffca34", "#f9a71f", "#c97f04"];
        var current;

        for(var i = 0; i < arr.length - 1; i++){
            current = {
                from: arr[i],
                to: arr[i+1],
                color: colors[i],
                name: `De ${arr[i]} a ${arr[i+1]}`
            }

            dataLabels.push(current)
        }

        return dataLabels
    }

    draMap(idHtml, data, geojson = usaMap) {
        var series;

        var dataLabels = this.get_data_labels(this.get_quantiles(data.map(d => d[d.length - 1])));

        if (data.length == 27) {
            series = [{
                data: data,
                name: 'Dados 2019',
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
                itemStyle:{
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
    /*  drawDonutCor2(idHtml){
         var options: any =  {
            
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
                 type: 'bar',
                 align: 'center'
             },
             title: {
                 text: 'Cor\\Raça dos docentes da IES',
                 align: 'center',
                 style: {
                     fontWeight: 'bold',
                     color: 'white',
                     fontSize: '16px',
                 }
             },
             xAxis: {
                 minorGridLineWidth: 0,
                 lineColor: 'transparent',
                 gridLineWidth: 0,
                 enabled: false,
                 lineWidth: -1,
                 categories: [''],
                 labels: {
                     enabled: false
                 }
             },
             yAxis: {
                 enabled: false,
                 gridLineWidth: 0,
                 lineWidth: 0,
                 min: 0,
                 title: {
                     text: '',
                     margin: 0
                 },
                 labels: {
                     enabled: false
                 }
             },
             legend: {
                 enabled: false,
             },
             tooltip: {
                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> </b><br/> Qnt: 000',
                 
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
             credits: 
             {
                 enabled: false,
                 
             },
             plotOptions: {
                 series: {
                     stacking: 'normal',
                     align: 'center'
                 },
                 bar: {
                     dataLabels: {
                         enabled: true,
                         distance : -150,
                         formatter: function() {
                             var dlabel = this.series.name + '<br/>';
                             dlabel += Math.round(this.percentage*100)/100 + ' %';
                                 return dlabel
                          },
                         style: {
                             color: 'white',
                             },
                         },
                         center: ['50%', '50%'],
                         size: '50%'
                     },
                 },
          
             series: [ 
             {
                 name: 'Branco',
                 data: [9]
             },
             {
                 name: 'Preto',
                 data: [20]
             },
             {
                 name: 'Pardo',
                 data: [30]
             },
             {
                 name: 'Amarelo',
                 data: [30]
             },
             {
                 name: 'Indígena',
                 data: [9]
             },
             {
                 name: 'Não declarou',
                 data: [1]
             },
             {
                 name: 'Sem Informação',
                 data: [1]
             }],
          
         }
         $('.highcharts-axis').css('display','none');
             Highcharts.chart(idHtml, options);
     } */
    drawDonutAlunTip(idHtml) {
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
                data: [
                    ['Público', 11],
                    ['Privado', 29],
                    ['Sem informações', 60],

                ]
            }]
        }
        Highcharts.chart(idHtml, options);
    }

    /* drawDonutAlunCor(idHtml){
        var options: any =  {
           
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
                type: 'bar',
                align: 'center'
            },
            title: {
                text: 'Cor\\Raça dos alunos da IES',
                align: 'center',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '16px',
                }
            },
            xAxis: {
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                gridLineWidth: 0,
                enabled: false,
                lineWidth: -1,
                categories: [''],
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                enabled: false,
                gridLineWidth: 0,
                lineWidth: 0,
                min: 0,
                title: {
                    text: '',
                    margin: 0
                },
                labels: {
                    enabled: false
                }
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> </b><br/> Qnt: 000',
                
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
            credits: 
            {
                enabled: false,
                
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    align: 'center'
                },
                bar: {
                    dataLabels: {
                        enabled: true,
                        distance : -150,
                        formatter: function() {
                            var dlabel = this.series.name + '<br/>';
                            dlabel += Math.round(this.percentage*100)/100 + ' %';
                                return dlabel
                         },
                        style: {
                            color: 'white',
                            },
                        },
                        center: ['50%', '50%'],
                        size: '50%'
                    },
                },
         
            series: [ 
            {
                name: 'Branco',
                data: [9]
            },
            {
                name: 'Preto',
                data: [20]
            },
            {
                name: 'Pardo',
                data: [30]
            },
            {
                name: 'Amarelo',
                data: [30]
            },
            {
                name: 'Indígena',
                data: [9]
            },
            {
                name: 'Não declarou',
                data: [1]
            },
            {
                name: 'Sem Informação',
                data: [1]
            }],
         
        }
        $('.highcharts-axis').css('display','none');
            Highcharts.chart(idHtml, options);
    }
 */
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
            series: [{
                dataLabels: {
                    useHTML: true,
                    // this is optional formatter, if you need more editing on text with html tags and css then you can use
                    formatter() {
                        return '<div>' + this.point.name + '</div>';
                    }
                },
                type: 'treemap',

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

    drawCorAlunM(idHtml) {
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

                layoutAlgorithm: 'squarified',
                data: [{
                    name: 'Branco',
                    label: "A",
                    value: 6,
                    //colorValue: 1
                }, {
                    name: 'Preto',
                    value: 6,
                    //colorValue: 2
                }, {
                    name: 'Pardo',
                    value: 4,
                    colorValue: 3
                }, {
                    name: 'Amarelo',
                    value: 3,
                    colorValue: 4
                }, {
                    name: 'Índigena',
                    value: 2,
                    colorValue: 5
                }, {
                    name: 'Não declarou',
                    value: 2,
                    colorValue: 6
                }, {
                    name: 'Sem informação',
                    value: 1,
                    colorValue: 7
                }]
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
}
