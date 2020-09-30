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
                stops: [[0, '#fdffeb'], [0.65, '#faeca5'], [1, '#b26a42']],
                labels: {
                    format: '{value}%'
                }
            },


            series: [{
                data: data,
                name: 'Random data',
                borderColor: 'black',
                borderWidth: 0.1,
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
        var options: any = {
            chart: {
                backgroundColor: undefined,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: (9 / 16 * 100) + '%' // 16:9 ratio
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

                        enabled: true
                    },
                }
            },

            subtitle: {
                text: "Organização Acadêmica",
                y: -1,
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
                    borderColor: "#0d542a",
                    allowPointSelect: false,
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        format: '{point.percentage:.0f}%',
                        style: {
                            fontSize: '10px',
                            color: 'white',
                            fontWeight: 'bold',
                            textOutline: '0px'
                        }
                    },
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
                data: [
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
            }]
        }

        Highcharts.chart(idHtml, options)
    }

    drawSuburnPlot(idHtml) {
        var data = [{
            id: 'level0',
            name: 'Privada',
            color: '#96bc31'
        }, {
            id: 'level0.1',
            color: '#00adef',
            name: 'Pública',
        }, {
            id: 'level1',
            parent: 'level0',
            name: 'Sem fins lucrativos',
            value: 111
        },
        {
            id: 'level1.2',
            parent: 'level0',
            name: 'Com fins lucrativos',
            value: 93
        },
        {
            id: 'level1.1',
            parent: 'level0.1',
            name: 'Federal',
            value: 79

        },
        {
            id: 'level1.2',
            parent: 'level0.1',
            name: 'Estadual',
            value: 37

        },
        {
            id: 'level1.3',
            parent: 'level0.1',
            name: 'Municipal',
            value: 18

        }
        ]

        var options: any = {

            chart: {
                backgroundColor: undefined,
                height: (9 / 16 * 100) + '%' // 16:9 ratio
            },
            credits: {
                enabled: false
            },

            title: {
                text: ''
            },
            subtitle: {
                text: "Natureza Jurídica",
                y: -1,
                style: {
                    "text-align": "left",
                    color: "white",
                    "font-weight": "bold"
                },
            },
            plotOptions: {
                sunburst: {
                    borderWidth: 0,
                    borderColor: "#0d542a",
                    allowPointSelect: false,
                }
            },
            series: [{
                type: "sunburst",
                data: data,
                allowDrillToNode: true,
                innerSize: '50%',
                cursor: 'pointer',
  
                levels: [
                    {
                        level: 1,
                        levelIsConstant: false,
                        dataLabels: {
                            enabled: false
                        },
                        colorByPoint: true,

                    }, {
                        level: 2,

                        borderWidth: 2,
                        colorVariation: {
                            key: 'brightness',
                            to: 0.5
                        }
                    }]
            }],
            tooltip: {
                headerFormat: "",
                pointFormat: 'The population of <b>{point.name}</b> is <b>{point.value}</b>'
            }
        }

        Highcharts.chart(idHtml, options)

    }
}
