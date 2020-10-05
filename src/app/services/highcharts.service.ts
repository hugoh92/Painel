import { Injectable } from '@angular/core';
import * as HighchartsMap from "highcharts/highmaps";
import * as Highcharts from "highcharts/highcharts";
import Sunburst from 'highcharts/modules/sunburst';
import Export from 'highcharts/modules/exporting';

Sunburst(Highcharts)
Export(Highcharts)
declare var require: any;
const usaMap = require("../../assets/data/br.json");

@Injectable({
    providedIn: 'root'
})
export class HighchartsService {

    constructor() { }

    draMap(idHtml) {
        var data = [
            ['br-sp', 69],
            ['br-ma', 6],
            ['br-pa', 7],
            ['br-sc', 17],
            ['br-ba', 24],
            ['br-ap', 1],
            ['br-ms', 5],
            ['br-mg', 46],
            ['br-go', 14],
            ['br-rs', 20],
            ['br-to', 6],
            ['br-pi', 7],
            ['br-al', 5],
            ['br-pb', 9],
            ['br-ce', 8],
            ['br-se', 3],
            ['br-rr', 2],
            ['br-pe', 11],
            ['br-pr', 20],
            ['br-es', 6],
            ['br-rj', 22],
            ['br-rn', 6],
            ['br-am', 5],
            ['br-mt', 6],
            ['br-df', 6],
            ['br-ac', 2],
            ['br-ro', 5]
        ];


        var options: any = {
            chart: {
                map: usaMap,
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
                enabled: false
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
                min: 0,
                max: 25,
                tickInterval: 5,
                stops: [[0, '#f5ee6c'], [0.65, '#ffca34'], [1, '#f9a71f']],
                labels: {
                    format: '{value}%'
                }
            },


            series: [{
                data: data,
                name: 'Random data',
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

        // Instantiate the map
        HighchartsMap.mapChart(idHtml, options);
    }

    drawPiePlot(idHtml) {
        var data = [
            {
                name: 'Universidades',
                y: 208,
                color: '#ffc905'
            },
            {
                name: 'Centros Universitários',
                y: 60,
                color: '#e30086'
            },
            {
                name: 'Faculdades',
                y: 70,
                color: '#f26820'
            },
        ]

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
            chart: {
                backgroundColor: undefined,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: (9 / 16 * 100) + '%', // 16:9 ratio
                style: {
                    fontFamily:  './assets/FONTES/gilr35a.TFT'
                }
            },
            title: {
                useHTML: true,
                text: `<small style="color: white; font-size: 10px">Cursos</small> <br> <b style="color: #e1e31d">338</b>`,
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    "text-align": "center",
                    "z-index": -5
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
                y:2,
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
            series: [{
                name: '',
                innerSize: '50%',
                colorByPoint: true,
                data: data,
                dataLabels: {
                    enabled: true,
                    distance: -20,
                    format: '{point.y:.0f}',
                    style: {
                        fontSize: '10px',
                        color: 'white',
                        fontWeight: 'bold',
                        textOutline: '0px'
                    }
                }
            },
            {
                name: '',
                innerSize: '100%',
                dataLabels: {
                    enabled:true,
                    useHTML: true,
                    align: 'center',
                    format: '<span style = "font-size:10px">{point.name}</span><br><b style = "color: {point.color};font-size:12px;font-weight:bold">{point.percentage:.0f}%<b>',
                    style: {
                        fontAlign: 'center',
                        color: 'white',
                        textOutline: '0px'
                    },
                },
                colorByPoint: true,
                data: data
            }]
        }

        Highcharts.chart(idHtml, options)
    }

    drawSuburnPlot(idHtml) {
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
            data = [
                {
                    y: 60.35,
                    color: colors[0],
                    drilldown: {
                        name: 'Privada',
                        categories: [
                            'Com fins lucrativos',
                            'Sem fins lucrativos',
                        ],
                        data: [
                            32.84,
                            27.51,
                        ]
                    }
                },
                {
                    y: 39.64,
                    color: colors[1],
                    drilldown: {
                        name: 'Pública',
                        categories: [
                            'Municipal',
                            'Federal',
                            'Estadual',
                        ],
                        data: [
                            5.3,
                            23.27,
                            10.94,
                        ]
                    }
                },

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
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.color(data[i].color).brighten(brightness).get()
            });
        }
    }

// Create the chart
    var options: any =  {
            chart: {
                type: 'pie',
                backgroundColor: undefined,
                height: (9 / 16 * 100) + '%', // 16:9 ratio,
                style: {
                    fontFamily:  'Gill35a'
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
                valueSuffix: '%'
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
                    enabled:true,
                    useHTML: true,
                    align: 'center',
                    format: '<span style = "font-size:10px">{point.name}</span><br><b style = "color: {point.color};font-size:12px">{point.y:.0f}%<b>',
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
                    enabled:false
                },
                showInLegend: true
            }],
        };

        Highcharts.chart(idHtml, options)

    }
}
