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

  draMap(idHtml){
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
            height: '400px'
        },
    
        title: {
            text: ''
        },
    
        subtitle: {
            text: ''
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
                enabled: true,
                format: '{point.name}'
            }
        }]
    }
    
    // Instantiate the map
    HighchartsMap.mapChart(idHtml, options);
  }

  drawPiePlot(idHtml){
      var options:any =  {
        chart: {
            backgroundColor: undefined,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: "300px"
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Brands',
            innerSize: '50%',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }]
        }]
    }

    Highcharts.chart(idHtml, options)
  }

  drawSuburnPlot(idHtml){
    var data = [ {
        id: 'level4',
        parent: 'level3',
        name: 'level4',
      }, {
        id: 'level4.1',
        parent: 'level3',
        name: 'level4.1',
      }, {
        id: 'level5',
        parent: 'level4',
        name: 'level5',
        value: 50
      },
      {
        id: 'level5.2',
        parent: 'level4',
        name: 'level5',
        value: 20
      },
      {
        id: 'level5.1',
        parent: 'level4.1',
        name: 'level5.1',
        value: 80
    
      },
      {
        id: 'level5.2',
        parent: 'level4.1',
        name: 'level5.1',
        value: 30
    
      }
    ]

    var options: any = {

        chart: {
            backgroundColor: undefined,
            height: '300px'
        },
    
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        series: [{
            type: "sunburst",
            data: data,
            allowDrillToNode: true,
            innerSize: '50%',
            cursor: 'pointer',
            dataLabels: {
                format: '{point.name}',
                filter: {
                    property: 'innerArcLength',
                    operator: '>',
                    value: 16
                },
                rotationMode: 'circular'
            },
            levels: [{
                level: 1,
                levelIsConstant: false,
                dataLabels: {
                    filter: {
                        property: 'outerArcLength',
                        operator: '>',
                        value: 64
                    }
                }
            }, {
                level: 2,
                colorByPoint: true
            },
            {
                level: 3,
                colorVariation: {
                    key: 'brightness',
                    to: -0.5
                }
            }, {
                level: 4,
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
