import { Injectable } from '@angular/core';
import * as HighchartsMap from "highcharts/highmaps";
import * as Highcharts from "highcharts/highcharts";
import Sunburst from 'highcharts/modules/sunburst'

Sunburst(Highcharts)
declare var require: any;
const usaMap = require("../../assets/data/br.json");

@Injectable({
    providedIn: 'root'
})
export class HighchartsService {

    constructor() { }

    draMap(idHtml) {
        var data = [
            ['br-sp', 0],
            ['br-ma', 1],
            ['br-pa', 2],
            ['br-sc', 3],
            ['br-ba', 4],
            ['br-ap', 5],
            ['br-ms', 6],
            ['br-mg', 7],
            ['br-go', 8],
            ['br-rs', 9],
            ['br-to', 10],
            ['br-pi', 11],
            ['br-al', 12],
            ['br-pb', 13],
            ['br-ce', 14],
            ['br-se', 15],
            ['br-rr', 16],
            ['br-pe', 17],
            ['br-pr', 18],
            ['br-es', 19],
            ['br-rj', 20],
            ['br-rn', 21],
            ['br-am', 22],
            ['br-mt', 23],
            ['br-df', 24],
            ['br-ac', 25],
            ['br-ro', 26]
        ];


        var options: any = {
            chart: {
                map: usaMap,
                backgroundColor: undefined,
                height: '250px'
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
                min: 0
            },

            series: [{
                data: data,
                name: 'Random data',
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
                height: '200px'
            },
            title: {
                useHTML: true,
                text: `<small style="color: white; font-size: 10px">Cursos</small> <br> <b style="color: #e1e31d">317</b>`,
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    "text-align": "center",
                    "z-index": -5
                },
                y: 20
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
            value: 50
        },
        {
            id: 'level1.2',
            parent: 'level0',
            name: 'Com fins lucrativos',
            value: 20
        },
        {
            id: 'level1.1',
            parent: 'level0.1',
            name: 'Federal',
            value: 80

        },
        {
            id: 'level1.2',
            parent: 'level0.1',
            name: 'Estadual',
            value: 30

        },
        {
            id: 'level1.3',
            parent: 'level0.1',
            name: 'Municipal',
            value: 30

        }
        ]

        var options: any = {

            chart: {
                backgroundColor: undefined,
                height: '200px'
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
