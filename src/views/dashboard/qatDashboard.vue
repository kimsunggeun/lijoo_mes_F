<template>
  <v-container fluid fill-height align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-vertical headerTitle="품질대시보드">
          <template v-slot:body>
            <v-layout weekly-chart-height overflow-auto column>
              <echart :style="chartSet1.style" :ref="chartSet1.ref" :options="chartSet1.options" :theme="getTheme"
                autoresize class="fill-height pt-4"></echart>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import iCardVertical from '@/components/common/iCardVertical.vue'
  import echart from '@/components/echart/ECharts.vue' // echart 컴포넌트
  import alarmData from './mock/alarmData' // 알람당일이력 목업

  export default {
    name: 'Dashboard',
    components: {
      'i-card-vertical': iCardVertical,
      'echart': echart,

    },
    computed: {
      getTheme() {
        return this.$vuetify.theme.dark ? 'dark' : 'light'
      }
    },
    data() {
      return {
        // table
        headers: alarmData.headers,
        desserts: alarmData.desserts,
        search: '',
        chartSet1: {
          ref: 'chart1',
          options: {
            title: {
              text: '',
              subtext: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Rainfall', 'Evaporation']
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {
                  show: true,
                  readOnly: false
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            calculable: true,
            xAxis: [{
              type: 'category',
              // prettier-ignore
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
                name: 'Rainfall',
                type: 'bar',
                data: [
                  2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ],
                markPoint: {
                  data: [{
                      type: 'max',
                      name: 'Max'
                    },
                    {
                      type: 'min',
                      name: 'Min'
                    }
                  ]
                },
                markLine: {
                  data: [{
                    type: 'average',
                    name: 'Avg'
                  }]
                }
              },
              {
                name: 'Evaporation',
                type: 'bar',
                data: [
                  2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ],
                markPoint: {
                  data: [{
                      name: 'Max',
                      value: 182.2,
                      xAxis: 7,
                      yAxis: 183
                    },
                    {
                      name: 'Min',
                      value: 2.3,
                      xAxis: 11,
                      yAxis: 3
                    }
                  ]
                },
                markLine: {
                  data: [{
                    type: 'average',
                    name: 'Avg'
                  }]
                }
              }
            ]
          },
          style: ''
        },
        chartSet2: {
          ref: 'chart2',
          options: {
            title: {
              text: '',
              subtext: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Rainfall', 'Evaporation']
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {
                  show: true,
                  readOnly: false
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            calculable: true,
            xAxis: [{
              type: 'category',
              // prettier-ignore
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
                name: 'Rainfall',
                type: 'bar',
                data: [
                  2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ],
                markPoint: {
                  data: [{
                      type: 'max',
                      name: 'Max'
                    },
                    {
                      type: 'min',
                      name: 'Min'
                    }
                  ]
                },
                markLine: {
                  data: [{
                    type: 'average',
                    name: 'Avg'
                  }]
                }
              },
              {
                name: 'Evaporation',
                type: 'bar',
                data: [
                  2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ],
                markPoint: {
                  data: [{
                      name: 'Max',
                      value: 182.2,
                      xAxis: 7,
                      yAxis: 183
                    },
                    {
                      name: 'Min',
                      value: 2.3,
                      xAxis: 11,
                      yAxis: 3
                    }
                  ]
                },
                markLine: {
                  data: [{
                    type: 'average',
                    name: 'Avg'
                  }]
                }
              }
            ]
          },
          style: ''
        },
        chartSet3: {
          ref: 'chart3',
          options: {
            title: {
              text: '',
              subtext: '',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'horizontal',
              left: 'left'
            },
            series: [{
              name: 'Access From',
              type: 'pie',
              radius: ['55%', '80%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: [{
                  value: 100,
                  name: ''
                },
                {
                  value: 74,
                  name: ''
                }
              ]
            }]
          },
          style: 'height:300px'
        },

      }
    }
  }
</script>

<style lang="scss" scoped>
  $appBarHeight: 64px;
  $cardTitleHeight: 48px;
  $paddingHeight: 8px;


  @media (min-width: 600px),(max-width: 600px) {
    .status-col-height {
      height: 100vh;
      max-height: calc(100vh - (#{$appBarHeight} + #{$cardTitleHeight} + (#{$paddingHeight} * 6)));
    }
    
    .weekly-chart-height {
      height: 100vh;
      max-height: calc((100vh - (#{$appBarHeight} + #{$cardTitleHeight} + (#{$paddingHeight} * 6))) / 2);
    }    
  }

  @media (min-width: 960px) {
    .status-col-height {
      height: 100vh;
      max-height: calc((100vh - (#{$appBarHeight} + #{$cardTitleHeight} + (#{$paddingHeight} * 6))) / 2);
    }

    .weekly-chart-height {
      height: 100vh;
      max-height: calc((100vh - (#{$appBarHeight} + #{$cardTitleHeight} + (#{$paddingHeight} * 6))) / 2);
    }
  }

  @media (min-width: 1264px) {
    .status-col-height {
      height: 100vh;
      max-height: calc((100vh - (#{$appBarHeight} + (#{$paddingHeight} * 2) + ((#{$cardTitleHeight} + (#{$paddingHeight} * 4)) * 2))) / 2);
    }
    
    .weekly-chart-height {
      height: 100vh;
      max-height: calc((100vh - (#{$appBarHeight} + (#{$paddingHeight} * 2) + ((#{$cardTitleHeight} + (#{$paddingHeight} * 4)) * 2))) / 2);
    }
  }
  
  .alarm_bg {
    border: 1px solid transparent;
  }

  .doughnutChart {
    position: relative;

    .doughnutChartLabel {
      position: absolute;
      top: 55%;
      left: 49%;
      transform: translateX(-50%);
    }

    .doughnutChartLabel1 {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>