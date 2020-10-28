import { Injectable } from '@angular/core';
import * as HighchartsMap from "highcharts/highmaps";
import * as Highcharts from "highcharts/highcharts";
import Sunburst from 'highcharts/modules/sunburst';
import Export from 'highcharts/modules/exporting';
import { noUndefined } from '@angular/compiler/src/util';

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

    draMap(idHtml, data, geojson = usaMap) {
        var series;

        if (data.length == 27) {
            series = [{
                data: data,
                name: 'Dados 2018',
                borderColor: '#f9a71f',
                borderWidth: 0.3,
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
                keys: ['codarea', 'name', 'value'],
                joinBy: 'codarea',
                borderColor: '#f9a71f',
                borderWidth: 0.3,
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
                floating:false,
                align: 'right',
                x: 10,
                y: -10,
                symbolRadius: 0,
                symbolHeight: 60,
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


            colorAxis: {

                tickInterval: 5,
                stops: [[0, '#f5ee6c'], [0.50, '#ffca34'], [1, '#f9a71f']],
                labels: {
                    format: '{value}'
                }
            },


            series: series
        }

        // Instantiate the map
        if(this.mapChart){
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
                '#f26820'
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
}
