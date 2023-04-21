<template>
  <v-container fluid fill-height align-start ma-0 pa-2 class="container-height">
    <v-row no-gutters>
      <!-- 용접 이상 정보 -->
      <v-col cols="12" sm="12" lg="6" class="pa-2">
        <i-card-vertical headerTitle="">
          <template v-slot:body>
            <v-layout status-col-height overflow-auto align-center>
              <v-row>
                <!-- 알람(당일) -->
                <v-col cols="12" md="5">
                  <v-card class="py-md-0" outlined>
                    <v-card class="d-flex">
                      <v-card-text class="pa-2 text-body-1 text-md-h7 font-weight-bold">알람(당일)</v-card-text>
                      <v-spacer></v-spacer>
                      <v-icon color="primary" class="pr-2">$arrow_r</v-icon>
                    </v-card>
                    <v-card class="d-flex align-center justify-center pa-2 rounded ma-2" color="card_alarm_bg"
                      height="27.9vh">
                      <span class="pa-1 text-center text-h1 text-md-h1 font-weight-bold">22</span>
                      <span class="pt-11 text-h4">건</span>
                    </v-card>
                  </v-card>
                </v-col>
                <!-- 알람 이력(당일) -->
                <v-col cols="12" sm="12" md="7">
                  <div class="pa-0 pa-md-0">
                    <v-card outlined height="34vh">
                      <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="검색" single-line hide-details
                              class="ma-0 pa-4 pb-2"></v-text-field> -->
                      <v-data-table :headers="headers" fixed-header :items="desserts" class="flat pa-3 rounded-0"
                        hide-default-footer :search="search" height="31.3vh" disable-sort disable-pagination />
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <!-- 주간 용접 이상 발생량 -->
      <v-col cols="12" sm="12" lg="6" class="pa-2">
        <i-card-vertical headerTitle="">
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