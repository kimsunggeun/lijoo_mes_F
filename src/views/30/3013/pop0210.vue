<!--
공정관리 오른쪽 작업시작,작업정지,작업시간,비가동시간 
가공에서 자재투입 메뉴 데이터 더 걸러야함
현재 반응형 작업 안되있음

-->
<template>
  <v-container fluid align-start ma-0 pa-2 :class="isScreenFull ? 'containerFull-height' : 'container-height'" >
    <v-row no-gutters class="flex-column fill-height flex-nowrap">
      <v-col class="flex-grow-0 flex-shrink-0">
        <v-row no-gutters class="header pa-3">
          <v-col lg="5" md="4">
            <span class="headerText1">{{ display.company }} [{{ display.factory }}]</span>
            <span class="headerText2">{{ $t('processManagement') }}</span>
          </v-col>
          <v-col class="d-flex">
            <span class="headerText3">
              <v-icon class="mr-1 green_icon">$calendar_clock</v-icon>
              {{
                display.time.year +
                  '-' +
                  display.time.month +
                  '-' +
                  display.time.day +
                  ' [' +
                  display.time.week +
                  '] ' +
                  display.time.hour +
                  ':' +
                  display.time.minutes +
                  ':' +
                  display.time.second
              }}
            </span>
          </v-col>
         


          <v-col class="d-flex justify-end align-center" >
           
              <v-switch class="mx-4 white--text" color="info" v-model="KeyBoradOn" >
              <template v-slot:label >
                  <span style="color:#fff">가상키보드</span>
              </template>  
              </v-switch>
         
            <v-btn width="40" height="40" color="#2E8BF6" class="mr-1" @click="totalRefresh()">
              <v-icon color="white" size="40px">mdi-refresh</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-0">
        <!--*************************************************************************************************-->
        <v-row no-gutters>
          <v-col cols="11">
            <v-chip-group center-active mandatory show-arrows active-class="primary--text" class="chip-group" v-model="selection">
              <v-chip v-for="list in workList" :key="list.key" :value="list.key">
                <v-row no-gutters>
                  <v-col>
                    <p class="pa-0 ma-0 text-center font-weight-bold">{{ list.workDeName }}</p>
                    <p class="pa-0 ma-0 text-center">({{ list.workName }})</p>
                  </v-col>
                </v-row>
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="1" class="d-flex justify-end align-center">
            <v-btn width="30" height="30" color="#2E8BF6" class="mr-1" @click="popOpen('work')">
              <v-icon color="white" size="30px">{{ display.button.add }}</v-icon>
            </v-btn>
            <!--삭제 모드버튼 -->
            <!-- <v-btn width="30" height="30" class="mr-1" color="#F44336" @click="deleteMode(editMode)">
              <v-icon color="white" size="30px">{{ display.button.delete }} </v-icon>
            </v-btn>-->
          </v-col>
        </v-row>
        <!--*************************************************************************************************-->
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-0">
        <v-row no-gutters style="border-top: 1px solid;border-bottom:1px solid" class="py-2">
          <v-col cols="6" class="pr-2">
            <v-row no-gutters class="mt-1" style="    flex-direction: row; align-items: center;">
              <v-col cols="2" class="text-center d-flex justify-center align-center"></v-col>
              <v-col cols="12">
                <v-row no-gutters>
                  <!-- <v-col class="mx-1">
                    <p style="font-size: 10px; color: #9E9E9E; " class="ma-0">작업지시번호</p>
                    <p
                      style="color: #444; font-weight: bold; font-size: 16pt;letter-spacing:3px;"
                      class="ml-3 mb-0"
                    >{{workNoMark}}</p>
                  </v-col>

                  <v-col class="mx-1">
                    <p style="font-size: 10px; color: #9E9E9E;" class="ma-0">공정</p>
                    <p
                      style="color: #444; font-weight: bold; font-size: 16pt; letter-spacing:3px;"
                      class="ml-3 mb-0"
                    >{{ workCodeName }}</p>
                  </v-col>-->

                  <div class="work_num">
                    <ul class="work_num1">
                      <li class="work_text1">작업지시번호</li>
                      <li class="work_text2">{{ workNoMark }}</li>
                    </ul>
                    <ul class="work_num1">
                      <li class="work_text3">공정</li>
                      <li class="work_text4">{{ workCodeName }}</li>
                    </ul>
                  </div>

                  <!-- <v-col class="mx-1">
                    <v-autocomplete label="산입유형" outlined dense height="32" :items="comboList.type"
                      v-model="formObject.workType" item-text="name" item-value="value"
                      @change="valueChange('workType')"></v-autocomplete>
                  </v-col>
                  <v-col class="mx-1">
                    <v-autocomplete label="산출유형" :items="comboList.outputType" v-model="formObject.metGbn"
                      item-text="name" item-value="value" outlined dense height="32"></v-autocomplete>
                  </v-col>-->
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-row no-gutters class="mt-3">
              <v-col cols="2" class="text-center d-flex justify-center align-center">
                <span class="text-subtitle-2 font-weight-bold">조업시간</span>
              </v-col>
              <v-col cols="9">
                <v-row no-gutters>
                  <v-col cols="2" class="mx-1">
                    <v-autocomplete
                      label="작업조"
                      outlined
                      dense
                      height="32"
                      v-model="formObject.workCrew"
                      :items="comboList.workCrew"
                      item-text="name"
                      item-value="value"
                    ></v-autocomplete>
                  </v-col>
                  <v-col class="mx-1">
                    <v-menu
                      ref="popupState.workDateCal"
                      v-model="popupState.workDateCal"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="날짜"
                          v-model="formObject.workDate"
                          outlined
                          dense
                          height="32"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="formObject.workDate" no-title @input="popupState.workDateCal = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="1">
                <v-btn depressed class="pt-0 white--text" color="rgb(43,81,235)" height="32" width="100%" @click="newWork()">새작업</v-btn>
              </v-col>
            </v-row>

            <v-row no-gutters class="mt-3">
              <v-col cols="2" class="text-center d-flex justify-center align-center">
                <span class="pb-2 text-subtitle-2 font-weight-bold">작업자</span>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col cols="2" class="mx-1">
                    <v-text-field v-model="workerLeader" readonly outlined dense height="32"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-row no-gutters>
                      <v-col cols="2" class="mx-1">
                        <v-text-field v-model="workerCount" readonly outlined dense disabled height="32"></v-text-field>
                      </v-col>
                      <v-col class="mx-1">
                        <v-text-field v-model="workerArray" readonly outlined dense disabled height="32"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider class="mt-2" :thickness="2"></v-divider>
              </v-col>

              <v-col cols="1">
                <v-btn
                  depressed
                  class="pt-0 white--text"
                  color="rgb(43,81,235)"
                  height="32"
                  width="100%"
                  :disabled="this.display.disableCheck.workerBt"
                  @click="popOpen('crew')"
                  >선택</v-btn
                >
              </v-col>
            </v-row>

            <v-row no-gutters class="mt-3">
              <v-col cols="2" class="text-center d-flex justify-center align-center">
                <span class="text-subtitle-2 font-weight-bold">생산품목</span>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <!-- v-if="formObject.workType !== '20'" -->
                  <v-col class="mx-1">
                    <v-text-field v-model="formObject.partNo" outlined dense readonly height="32"></v-text-field>
                  </v-col>
                  <v-col class="mx-1">
                    <v-text-field v-model="formObject.partName" outlined dense readonly height="32"></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row no-gutters v-if="formObject.workType === '20'">
                  <v-col class="mx-1">
                    <v-text-field v-model="formObject.partNo" outlined dense readonly height="32"></v-text-field>
                  </v-col>
                  <v-col class="mx-1">
                    <v-text-field v-model="formObject.partName" outlined dense readonly height="32"></v-text-field>
                  </v-col>
                </v-row>-->
              </v-col>
              <v-col cols="1">
                <v-btn
                  depressed
                  class="pt-0 white--text"
                  color="rgb(43,81,235)"
                  height="32"
                  width="100%"
                  @click="popOpen('item')"
                  :disabled="display.disableCheck.workOrderBt"
                  >선택</v-btn
                >
              </v-col>
            </v-row>

            <v-row no-gutters class="mt-3">
              <v-col cols="6">
                <v-row no-gutters>
                  <v-col cols="4" class="text-center d-flex justify-center align-center">
                    <span class="text-subtitle-2 font-weight-bold">LOT NO</span>
                  </v-col>
                  <v-col class="mx-1">
                    <v-text-field v-model="formObject.lotNo" outlined dense readonly height="32"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="5">
                <v-row no-gutters>
                  <v-col cols="2" class="text-center d-flex justify-center align-center">
                    <span class="text-subtitle-2 font-weight-bold">경로명</span>
                  </v-col>
                  <v-col class="mx-1">
                    <v-text-field v-model="formObject.pathName" outlined dense readonly height="32"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-row no-gutters class="mt-3">
              <v-col cols="2" class="text-center d-flex justify-center align-center">
                <span class="text-subtitle-2 font-weight-bold">비고</span>
              </v-col>
              <v-row no-gutters>
                <v-col class="mx-1">
                  <v-text-field v-model="formObject.remark" outlined dense height="32" :disabled="display.disableCheck.remarkBt"></v-text-field>
                </v-col>
              </v-row>
              <v-col cols="1">
                <v-btn
                  depressed
                  class="pt-0 white--text"
                  color="rgb(43,81,235)"
                  height="32"
                  width="100%"
                  @click="remarkSave()"
                  :disabled="display.disableCheck.remarkBt"
                  >저장</v-btn
                >
              </v-col>
            </v-row>
            <v-col class="mx-2 my-1">
              <v-row no-gutters>
                <v-col>
                  <v-btn
                    depressed
                    class="ma-1 px-4 primary--text"
                    outlined
                    min-width="120"
                    height="30"
                    @click="workStandard()"
                    :disabled="display.disableCheck.workStandardBt"
                  >
                    <v-icon class="mr-1">$file_document</v-icon>작업표준서
                  </v-btn>
                  <v-btn
                    depressed
                    class="ma-1 px-4 primary--text"
                    outlined
                    min-width="120"
                    height="30"
                    @click="operatingSearch(true)"
                    :disabled="display.disableCheck.operatingBt"
                  >
                    <v-icon class="mr-1">$file_cog</v-icon>비가동이력
                  </v-btn>
                  <!--비가동관리-->
                  <v-btn
                    depressed
                    class="ma-1 px-4 primary--text"
                    outlined
                    min-width="120"
                    height="30"
                    @click="popOpen('process')"
                    :disabled="display.disableCheck.processBt"
                  >
                    <v-icon class="mr-1">$search</v-icon>공정검사
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-divider :thickness="2" vertical></v-divider>

          <!-- 상단 우측 부분 -->
          <v-col cols="6">
            <v-row no-gutters>
              <!--작업 시간부분  -->
              <v-col lg="2" md ="4">
                <v-col cols="12" class="text-center pr-1 pl-1 pb-0 pt-0">
                

               


                  <v-col cols="12" class="ml-1 my-1 py-1 work_timeBG">
                    <v-col class="pa-0 mt-1">
                      <v-icon class="font-size-2_5">mdi-clock-start</v-icon>
                    </v-col>
                    <v-col class="pt-1 text-subtitle-2 font-weight-bold">작업시작</v-col>
                    <v-col class="pa-0 mb-2 primary--text font-weight-bold">{{ stratTimeTop }}</v-col>
                  </v-col>

                  <v-col cols="12" class="ml-1 my-1 py-1 work_timeBG">
                    <v-col class="pa-0 mt-1">
                      <v-icon class="font-size-2_5">mdi-timer-outline</v-icon>
                    </v-col>
                    <v-col class="pt-1 text-subtitle-2 font-weight-bold">작업시간</v-col>
                    <v-col class="pa-0 mb-2 primary--text font-weight-bold">{{ workTimeTop }}</v-col>
                  </v-col>


                  <v-col cols="12" class="ml-1 my-1 py-1 work_timeBG">
                    <v-col class="pa-0 mt-1">
                      <v-icon class="font-size-2_5">mdi-pause</v-icon>
                    </v-col>
                    <v-col class="pt-1 text-subtitle-2 font-weight-bold">비가동시간</v-col>
                    <v-col class="pa-0 mb-2 primary--text font-weight-bold">
                      총
                      <span>{{ totalstopTime }}</span> 분
                    </v-col>
                  </v-col>
                </v-col>
              </v-col>
              <!-- 설비현황 / 품질검사 -->
              <v-col lg="10" md ="8">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-col>
                      <!-- 설비현황 -->
                      <v-row no-gutters class="card-style">
                        <v-col
                          class="text-center d-flex justify-center align-center border-right"
                          style="background-color:rgb(84, 115, 232);border-radius: 5px 0 0 5px;"
                        >
                          <div style="padding-top:25px;padding-bottom:25px;">
                            <span class="d-block">
                              <v-icon class="text-h4" style="color:#fff">mdi-cog-outline</v-icon>
                            </span>
                            <span class="d-block font-weight-bold" style="color:#fff">설비현황</span>
                          </div>
                        </v-col>
                        <v-col cols="9">
                          <v-row no-gutters>
                            <v-col>
                              <v-row no-gutters>
                                <v-col class="d-flex justify-center align-center">
                                  <span class="pt-5 font-weight-bold">가동</span>
                                </v-col>
                              </v-row>
                              <v-row no-gutters>
                                <v-col class="d-flex justify-center align-center">
                                  <span class="py-2">
                                    <span class="primary--text text-h3 font-weight-bold">
                                      {{ display.operate.working.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </span
                                    >개
                                  </span>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col>
                              <v-row no-gutters>
                                <v-col class="d-flex justify-center align-center">
                                  <span class="pt-5 font-weight-bold">비가동</span>
                                </v-col>
                              </v-row>
                              <v-row no-gutters>
                                <v-col class="d-flex justify-center align-center">
                                  <span class="py-2">
                                    <span class="sub_title--text text-h3 font-weight-bold">
                                      {{ display.operate.notWorking.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </span
                                    >개
                                  </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col>
                      <!-- 품질검사 -->
                      <v-row no-gutters class="card-style">
                        <v-col
                          class="text-center d-flex justify-center align-center"
                          style="background-color:rgb(84, 115, 232);border-radius: 5px 0 0 5px;"
                        >
                          <div style="padding-top:25px;padding-bottom:25px;">
                            <span class="d-block">
                              <v-icon class="text-h4" style="color:#fff">mdi-list-status</v-icon>
                            </span>
                            <span class="d-block font-weight-bold" style="color:#fff">품질검사</span>
                          </div>
                        </v-col>
                        <v-divider :thickness="2" vertical></v-divider>
                        <v-col cols="9">
                          <v-row no-gutters>
                            <v-col v-for="list in comboList.inspTimeList" :key="list.value">
                              <v-row no-gutters>
                                <v-col class="d-flex justify-center align-center">
                                  <span class="pt-5 font-weight-bold">{{ list.name }}</span>
                                </v-col>
                              </v-row>
                              <v-row no-gutters>
                                <v-col class="d-flex justify-center align-center">
                                  <span class="py-2">
                                    <v-icon color="red" v-if="list.type">mdi-circle-outline</v-icon>
                                    <v-icon color="red" v-if="!list.type">$clear</v-icon>
                                  </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-col>
                  <!-- 설비 가동 재가동부분 -->
                  <v-col>
                    <v-col class="flex-grow-1 flex-shrink-0">
                      <v-row no-gutters class="fill-height">
                        <v-col class="card-style mx-auto px-2 operate-chip-group" v-if="display.operateList.length !== 0">
                          <v-chip-group center-active show-arrows class="operate-chip-group pt-1 pb-1">
                            <v-chip v-for="list in display.operateList" :key="list.key" :value="list.key" >
                              <v-row no-gutters>
                                <v-col @click="toggleOperation(list)" style="padding: 4px;">
                                  <p class="px-0 py-1 ma-0 text-center font-weight-bold">{{ list.name }}</p>
                                  <p class="px-0 ma-0 text-center">({{ list.eqCode }})</p>
                                  <p class="px-0 py-1 ma-0 text-center" v-if="list.state === '20'">비가동 시간: {{ list.stopTime }} 분</p>
                                  <p class="px-0 py-1 ma-0 text-center">
                                    <v-icon :class="{ 'red-light': list.state === '20', 'green-light': list.state !== '20' }"
                                      >mdi-circle-medium</v-icon
                                    >
                                  </p>
                                </v-col>
                              </v-row>
                            </v-chip>
                          </v-chip-group>
                        </v-col>
                        <v-col class="card-style mx-auto px-2 operate-chip-group" v-if="display.operateList.length == 0">
                          <v-chip-group center-active show-arrows class="operate-chip-group pt-1 pb-1">
                            <div style="padding-top:22px;padding-bottom:22px;">
                              <v-chip class="pa-2 mx-2" color="red" text-color="white" size="x-large" disabled>
                                <v-icon start>$clear</v-icon>설비가 없습니다
                              </v-chip>
                            </div>
                          </v-chip-group>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- 상단 우측 부분 종료 -->
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="12">
            <v-row no-gutters class="fill-height">
              <!-- 탭시작 -->

              <v-tabs v-model="tab" class="fill-height bottom-tab-menu d-flex flex-column flex-nowrap">
                <v-tab v-for="item in display.tabMenu" :key="item.id" :v-if="item.show" @click="radioReset">
                  {{ item.name }}
                  <div v-if="item.value" class="pa-2 pt-1 pb-1 ml-1" style="background-color: rgb(153, 172, 245);color: #fff;border-radius:5px;">
                    {{ display.materialTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                  </div>
                </v-tab>

                <v-tabs-items v-model="tab">
                  <!-- 실적등록 탭 -->
                  <v-tab-item>
                    <v-row no-gutters class="fill-height pa-2" >
                      <v-col cols="6" class="fill-height -2">
                        <v-row no-gutters class="flex-column fill-height">
                          <v-col class="fill-height">
                            <v-row no-gutters class="fill-height align-center justify-center">
                              <v-col>
                                <v-row no-gutters class="py-3 justify-center align-center">
                                  <v-col cols="3" align="center" class="py-2 my-1">
                                    <div class="py-3" style="border:1px solid #e8e9f2;border-radius:10px;margin:5px;">
                                      <span style="font-size: 32pt;font-weight:bold;" class="CountingText">
                                        {{ performance.faireQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                      </span>
                                      <br />
                                      <span style="font-weight:bold;">양품</span>
                                    </div>
                                  </v-col>
                                  <v-col cols="3" align="center" class="py-2 my-1">
                                    <div class="py-3" style="border:1px solid #e8e9f2;border-radius:10px;margin:5px;">
                                      <span style="font-size: 32pt;color:red;font-weight:bold;" class="CountingText">{{
                                        performance.defectiveQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                      }}</span>
                                      <br />
                                      <span style="color:red;font-weight:bold;">불량</span>
                                    </div>
                                  </v-col>
                                  <v-col cols="5" style="text-align: center;" >
                                    <span style="font-weight: bold;">작업 지시 실적</span>
                                    <v-progress-linear class="mb-5 mt-1" color="primary darken-2 " style="border-radius:5px;" height="25" :value="ProgressOder" striped>
                                      <template v-slot:default="{ value }">
                                        <strong style="color: white">{{ value }}%</strong>
                                      </template>
                                    </v-progress-linear>
                                  
                                    <span style="font-weight: bold;">현 공정 실적</span>
                                    <v-progress-linear class="mb-5 mt-1" color="primary darken-2 " style="border-radius:5px;" height="25" :value="Progress" striped>
                                        <strong style="color: white">{{ Progress }}%</strong>
                                    </v-progress-linear>
                                  </v-col>

                                  
                                  <v-row no-gutters>
                                  <v-col cols="6" align="center">
                                    <div
                                      class="py-3 mx-4"
                                      style="border:1px solid #e8e9f2;border-radius:10px;margin:5px;box-shadow: 0 10px 35px rgba(0, 0, 0, 0.02), 0 3px 3px rgba(0, 0, 0, 0.1);"
                                    >
                                    <span class="primary--text CountingText" style="font-size: 32pt;font-weight:bold;"  >
                                      {{ performance.orderQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                    </span>
                                    
                                      
                                      <br />
                                      <span class="primary--text" style="font-weight:bold;">작업지시 실적</span>
                                    </div>
                                  </v-col>

                                  <v-col cols="6" align="center">
                                    <div
                                      class="py-3 mx-4"
                                      style="border:1px solid #e8e9f2;border-radius:10px;margin:5px;box-shadow: 0 10px 35px rgba(0, 0, 0, 0.02), 0 3px 3px rgba(0, 0, 0, 0.1);"
                                    >
                                    
                                      <span class="primary--text CountingText" style="font-size: 32pt;font-weight:bold;" >
                                        {{ performance.planQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                      </span>
                                      
                                      <br />
                                      <span class="primary--text" style="font-weight:bold;">현 공정  실적</span>
                                    </div>
                                  </v-col>
                                </v-row>
                         


                                </v-row>
                                <v-row no-gutters class="py-3">
                                  <v-col cols="12">
                                    <v-row no-gutters  ref="focusInput">
                                      <v-col class="fill-height">
                                        <v-row no-gutters class="fill-height PaddingRight40px"  >
                                          <v-col cols="1" align="right">
                                            <v-icon
                                              class="pa-2 mr-2 mt-1"
                                              @click="performance.mode = !performance.mode"
                                            
                                              style="cursor: pointer;background:#5473e8;color:#ffffff;border-radius:5px;"
                                              >mdi-refresh</v-icon
                                            >
                                          </v-col>
                                          
                                            <v-col lg="3" md="4" class="pa-0 paddingStyle">
                                              <v-text-field
                                                v-model="performance.qty"
                                                type="number"
                                                min="0"
                                                :disabled="false"
                                                outlined
                                                dense
                                                class="mt-1 input-center text-h6"
                                                height="40"
                                                @focus="KeyBoradOnRemote"
                                                @click="testtx('vi')"
                                                  />
                                                  <!-- @mouseHover = "ttx" -->
                                              <!-- 포커스 시  가상키보드 -->
                                                <pop0210KeyBorad 
                                               
                                                :Qty="Number(performance.qty)" 
                                                :focusInput="focusInput" 
                                                @mouseOut ="testdsaf"
                                                @outsideClick ='handleOutsideClick'
                                                @focusInput="testtes"  
                                                v-if="focusInput" />
                                              <!--  -->
                                              
                                            </v-col>

                                            <v-col lg="1" md="2" align="left" class="pa-0 pl-8 pt-4">x</v-col>
                                            <v-col cols="2" class="pa-0">
                                              <v-text-field
                                                v-model="performance.box"
                                                :disabled="false"
                                                type="number"
                                                min="0"
                                                label="box"
                                                outlined
                                                dense
                                                @focus="KeyBoradOnRemote"
                                                class="pl-1 mt-1 input-center text-h6"
                                                height="40"
                                              ></v-text-field>
                                            </v-col>
                                            <v-col cols="1" align="center" class="pa-0 pt-4">=</v-col>
                                            <v-col cols="2" class="pa-0">
                                              <v-text-field
                                                :value="totalQty"
                                                label="총수량"
                                                :disabled="true"
                                                @change="qtyCange(true)"
                                                outlined
                                                dense
                                                class="pl-1 mt-1 input-center text-h6"
                                                height="40"
                                              ></v-text-field>
                                            </v-col>
                                        
                                         
                                          <v-col lg="2" md="12" style="text-align: center;">
                                            <v-btn
                                              depressed
                                              class="white--text mt-1 float-right btnContent"
                                              color="rgb(35,66,189)"
                                              height="40"
                                              width="70%"
                                              @click="insertData('qtyAdd')"
                                              >양품등록
                                            </v-btn>
                                          </v-col>
                                        </v-row>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-divider :thickness="2" class="pb-1"></v-divider>
           

                          <!--  불량등록  -->
                          <v-row class="padding-2rem">
                            <v-col cols="3" v-for="list in comboList.defectiveCode" style="padding:10px" :key="list.id">
                              <button
                                style="cursor:pointer;width:100%;padding:2rem 0;border:1px solid #2E8BF6;  border-radius: 5px;"    
                                @click="defectiveCodeSelect(list)"

                                :class="{ 'code-select': list.value === performance.defectiveCode.value }"
                              >
                                {{ list.name }}
                                <v-text-field
                                  outlined
                                  dense
                                  color="pink"
                                  class="pt-1 px-4 input-center text-h6"
                                  type="number"
                                  min="0"
                                  @input="defectiveCodeSelect(list)"
                                  v-model="list.qty"
                                  height="30"
                                />
                              </button>
                            </v-col>
                            <v-row no-gutters>
                              <v-btn
                                depressed
                                class="white--text mt-3"
                                color="#5473e8"
                                height="60"
                                width="100%"
                                :disabled="defectiveAddbtn"
                                @click="insertData('defectiveAdd')"
                              >
                                <v-icon class="mr-2">mdi-pencil-plus</v-icon>불량등록
                              </v-btn>
                              <v-btn depressed class="white--text mt-3" color="red" height="60" width="100%" @click="insertData('Reset')">
                                <v-icon class="mr-2">mdi-refresh</v-icon>초기화
                              </v-btn>
                            </v-row>
                          </v-row>

                          <!-- 불량 등록 끝 -->
                        </v-row>
                      </v-col>

                      <v-divider :thickness="2" vertical></v-divider>
                      <v-col class="px-2 mainGridDiv">
                        <v-row no-gutters class="fill-height">
                          <i-card-vertical
                            :radio="false"
                            headerTitle
                            :useBtnList="[
                              'btnPrint', //삭제
                              'btnDelete'
                            ]"
                            @btnPrint="print('performanceRegistration')"
                            @btnDelete="btnDelete()"
                            class="fill-height d-flex flex-column"
                          >
                            <!-- <template v-slot:radioTag>
                          <v-radio-group row v-model="printradio">
                            <v-radio label="전체" :value="50"></v-radio>
                            <v-radio label="완료" :value="60"></v-radio>
                          </v-radio-group>
                            </template>-->
                            <!-- 수정해야할부분-->
                            <template v-slot:body>
                              <v-col cols="12" class="pa-0 fill-height">
                                <DxDataGrid
                                  id="mainGird"
                                  :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                                  :ref="gridData.mainGird.ref"
                                  :data-source="gridData.mainGird.data"
                                  :remote-operations="false"
                                  :hover-state-enabled="true"
                                  :allow-column-resizing="true"
                                  :allow-column-reordering="true"
                                  :row-alternation-enabled="true"
                                  :show-borders="true"
                                  :width="grid.width"
                                  :show-row-lines="true"
                                  key-expr="id"
                                  :focused-row-enabled="true"
                                  :column-hiding-enabled="false"
                                  @focused-row-changed="onFocusedRowChanged"
                                  :selection="{ mode: 'none' }"
                                >
                                  <DxScrolling column-rendering-mode="virtual" />
                                  <!--수정중  -->
                                  <DxColumn
                                  
                                    data-field="workDecode"
                                    caption="작업반"
                                    width="auto"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                  >
                                  <DxLookup :data-source="comboList.workDeCodeList" display-expr="name" value-expr="value"/>
                                  </DxColumn>
                                  <DxColumn
                                    data-field="workTime"
                                    caption="작업시간"
                                    width="auto"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                  />
                                  <DxColumn
                                    data-field="proType"
                                    caption="구분"
                                    width="15%"
                                    data-type="date"
                                    alignment="center"
                                    :allow-editing="false"
                                    format="yyyy-MM-dd"
                                  />
                                  <DxColumn
                                    data-field="defCode"
                                    caption="불량코드"
                                    width="15%"
                                    data-type="date"
                                    alignment="center"
                                    :allow-editing="false"
                                    format="yyyy-MM-dd"
                                  />
                                  <DxColumn
                                    data-field="qty"
                                    caption="수량"
                                    :customize-text="customizeText"
                                    width="150"
                                    data-type="string"
                                    alignment="right"
                                    :allow-editing="false"
                                  />

                                  <DxColumn
                                    data-field="lotNo"
                                    caption="LOT NO"
                                    width="auto"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                  />
                                  <DxColumn
                                    data-field="lotDetail"
                                    caption="전산번호"
                                    width="auto"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                  />
                                  <!--- 옵션-->

                                  <DxPaging :enabled="false" />
                                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />

                                  <DxPager :show-page-size-selector="false" />
                                </DxDataGrid>
                              </v-col>
                            </template>
                          </i-card-vertical>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-tab-item>

                  <!-- 자재투입 탭 -->

                  <v-tab-item>
                    <v-row no-gutters class="fill-height pa-0">
                      <v-col class="mainGridDiv">
                        <i-card-vertical
                          headerTitle
                          :input="true"
                          class="workOrder fill-height d-flex flex-column"
                          :useBtnList="[
                            'btnMaterialSelection' //자재선택
                          ]"
                          @btnMaterialSelection="btnMaterialSelection(true)"
                        >
                          <template v-slot:inputTag>
                            <v-row no-gutters class="pt-2 ml-2">
                              <v-col cols="11">
                                <v-row no-gutters>
                                  <v-col cols="3">
                                    <v-text-field
                                      label="전산번호"
                                      outlined
                                      dense
                                      height="32"
                                      v-model="materialInput.lotDetail"
                                      @keydown.enter="queuePush(materialInput.lotDetail)"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col class="d-flex align-center">
                                    <v-btn width="30" height="30" color="#2b49b7" class="mx-1" @click="queuePush(materialInput.lotDetail)">
                                      <v-icon color="white" size="20px">{{ display.button.insert }}</v-icon>
                                    </v-btn>
                                    <v-btn width="30" height="30" color="#F44336" @click="materialInput.lotDetail = null">
                                      <v-icon color="white" size="20px">{{ display.button.cancle }}</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </template>
                          <template v-slot:body>
                            <v-layout column overflow-auto class="fill-height">
                              <v-col cols="12" class="pa-0">
                                <DxDataGrid
                                  id="materialInput"
                                  :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                                  :ref="gridData.materialInputGird.ref"
                                  :data-source="gridData.materialInputGird.data"
                                  :remote-operations="false"
                                  :hover-state-enabled="false"
                                  :allow-column-resizing="true"
                                  :allow-column-reordering="true"
                                  :row-alternation-enabled="true"
                                  :show-borders="true"
                                  :width="grid.width"
                                  :show-row-lines="true"
                                  key-expr="id"
                                  :focused-row-enabled="false"
                                  :column-auto-width="true"
                                  :column-hiding-enabled="false"
                                  @cellPrepared="cellPrepared"
                                >
                                  <DxColumn
                                    data-field="whname"
                                    :caption="$t('whName')"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                    width="auto"
                                  />

                                  <DxColumn
                                    data-field="partno"
                                    :caption="$t('partNo')"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                    width="auto"
                                  />
                                  <DxColumn
                                    data-field="partname"
                                    :caption="$t('partName')"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                    width="auto"
                                  />

                                  <DxColumn
                                    data-field="total"
                                    :caption="$t('totalQty')"
                                    data-type="string"
                                    alignment="right"
                                    :customize-text="customizeText"
                                    :allowSorting="false"
                                    width="auto"
                                    :allow-editing="false"
                                  />

                                  <DxColumn
                                    data-field="qty"
                                    :caption="$t('qty')"
                                    data-type="string"
                                    alignment="right"
                                    :customize-text="customizeText"
                                    width="auto"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                  />
                                  <DxColumn
                                    data-field="lotno"
                                    :caption="$t('lotNo')"
                                    data-type="string"
                                    width="auto"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                  />

                                  <DxColumn
                                    data-field="lotdetail"
                                    :caption="$t('lotDetail')"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                    width="auto"
                                  />
                                  <DxColumn
                                    data-field="indate"
                                    :caption="$t('inDate')"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                    width="auto"
                                  />
                                  <DxColumn
                                    data-field
                                    :caption="$t('')"
                                    data-type="string"
                                    alignment="center"
                                    :allow-editing="false"
                                    :allowSorting="false"
                                    width="auto"
                                  />

                                  <!-- <DxColumn
                                  data-field="prodqty"
                                  :caption="$t('')"
                                  data-type="string"
                                  alignment="center"
                                  :allow-editing="false"
                                  :allowSorting="false"
                                  width="auto"
                                />
                                <DxColumn
                                  data-field="amount"
                                  :caption="$t('')"
                                  data-type="string"
                                  alignment="center"
                                  :allow-editing="false"
                                  :allowSorting="false"
                                  width="auto"
                                  />-->
                                  <!------------------------------옵션-------------------->
                                  <DxScrolling column-rendering-mode="virtual" />
                                  <DxPaging :enabled="false" />
                                  <DxSelection mode="none" :allow-select-all="false" />
                                  <DxPager :show-page-size-selector="false" />
                                </DxDataGrid>
                              </v-col>
                            </v-layout>
                          </template>
                        </i-card-vertical>
                      </v-col>
                    </v-row>

                    <!-- 작업대기 -->
                    <v-row no-gutters class="fill-height pa-0">
                      <v-col>
                        <i-card-vertical headerTitle :input="true" class="card-padding" @btnMaterialSelection="btnMaterialSelection()">
                          <template v-slot:inputTag>
                            <v-row no-gutters class="pt-2 ml-2">
                              <v-col cols="11">
                                <v-row no-gutters>
                                  <v-col cols="10">
                                    <v-text-field
                                      :label="$t('partCode')"
                                      outlined
                                      dense
                                      height="32"
                                      v-model="materialInput.lotDetail"
                                      @keydown="keyDown"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col class="d-flex align-center">
                                    <v-btn width="30" height="30" color="#879B77" class="mx-1">
                                      <v-icon color="white" size="20px">{{ display.button.insert }}</v-icon>
                                    </v-btn>
                                    <v-btn width="30" height="30" color="#F44336">
                                      <v-icon color="white" size="20px">{{ display.button.cancle }}</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </template>
                          <template v-slot:body>
                            <v-layout column overflow-auto>
                              <v-col cols="12" class="pa-0">
                                <DxDataGrid
                                  id="waitingWorkGrid"
                                  class="gridHeight"
                                  :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                                  :ref="gridData.waitingWorkGrid.ref"
                                  :data-source="gridData.waitingWorkGrid.data"
                                  :remote-operations="false"
                                  :hover-state-enabled="true"
                                  :allow-column-resizing="true"
                                  :allow-column-reordering="true"
                                  :row-alternation-enabled="true"
                                  :show-borders="true"
                                  :width="grid.width"
                                  :show-row-lines="true"
                                  key-expr="id"
                                  :focused-row-enabled="true"
                                  :column-auto-width="true"
                                  :column-hiding-enabled="false"
                                >
                                  <DxColumn data-field caption="등록시간" data-type="string" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field caption="품목코드" data-type="string" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field caption="품명" data-type="string" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field caption="수량" data-type="string" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field caption="전산번호" data-type="string" alignment="center" :allow-editing="false" />

                                  <DxScrolling column-rendering-mode="virtual" />
                                  <DxPaging :enabled="false" />
                                  <DxSelection mode="single" :allow-select-all="false" />
                                  <DxPager :show-page-size-selector="false" />
                                </DxDataGrid>
                              </v-col>
                            </v-layout>
                          </template>
                        </i-card-vertical>
                      </v-col>
                    </v-row>
                    <!-- 작업대기 끝 -->
                  </v-tab-item>

                  <!-- 작업이력 탭 -->
                  <v-tab-item>
                    <v-row no-gutters class="fill-height pa-0">
                      <v-col>
                        <i-card-vertical headerTitle :input="true" @btnMaterialSelection="btnMaterialSelection()">
                          <template v-slot:inputTag>
                            <v-row no-gutters class="pt-2 ml-2">
                              <v-col cols="10">
                                <v-row no-gutters>
                                  <v-col cols="1" class="mx-1 d-flex">
                                    <v-autocomplete
                                      label="작업장"
                                      outlined
                                      dense
                                      height="32"
                                      :items="comboList.workCodeList"
                                      v-model="workHistory.workCode"
                                      item-text="name"
                                      item-value="value"
                                      clearable
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="2" class="mr-1">
                                    <v-menu
                                      ref="workHistory.menu.start"
                                      v-model="workHistory.menu.start"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          label="날짜"
                                          v-model="workHistory.search.start"
                                          outlined
                                          dense
                                          height="32"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="workHistory.search.start"
                                        no-title
                                        @input="workHistory.menu.start = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-menu
                                      ref="workHistory.menu.start"
                                      v-model="workHistory.menu.end"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          :label="$t('endDate')"
                                          v-model="workHistory.search.end"
                                          outlined
                                          dense
                                          height="32"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker v-model="workHistory.search.end" no-title @input="workHistory.menu.end = false"></v-date-picker>
                                    </v-menu>
                                  </v-col>

                                  <v-col class="ml-2 d-flex align-start">
                                    <v-radio-group row v-model="printradio" @change="btnSearch('workHistory')">
                                      <v-radio label="공정실적" :value="50"></v-radio>
                                      <v-radio label="공정종료" :value="60"></v-radio>
                                    </v-radio-group>

                                    <v-btn class="search-bt mx-2" color="#2b51eb" height="32" @click="btnSearch('workHistory')">
                                      <v-icon right dark>mdi-magnify</v-icon>
                                      <span>검색</span>
                                    </v-btn>

                                    <v-btn class="search-bt mx-2" color="#2b51eb" height="32" @click="print('workHistory')">
                                      <v-icon right dark>mdi-printer</v-icon>
                                      <span>출력</span>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </template>
                          <template v-slot:body>

                            <!--  작업이력 그리드 -->
                            <v-layout overflow-auto style="justify-content: space-between;">
                              <v-col cols="9" >
                                <DxDataGrid
                                  id="workHistory"
                                  class="gridHeight"
                                  :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                                  :ref="gridData.workHistoryGrid.ref"
                                  :data-source="gridData.workHistoryGrid.data"
                                  :remote-operations="false"
                                  :hover-state-enabled="true"
                                  :allow-column-resizing="true"
                                  :allow-column-reordering="true"
                                  :row-alternation-enabled="true"
                                  @focused-row-changed="onFocusedRowWorkHistoryGrid"
                                  :show-borders="true"
                                  :width="grid.width"
                                  :show-row-lines="true"
                                  key-expr="id"
                                  :focused-row-enabled="true"
                                  :column-auto-width="true"
                                  :column-hiding-enabled="false"
                                >
                                  <DxColumn data-field="workName" caption="작업장" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="workDename" caption="작업반" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="workTime" caption="등록시간" data-type="string"    width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="partNo" caption="품번" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="partName" caption="품명" data-type="string"   width="auto" alignment="left" :allow-editing="false" />
                                  <DxColumn
                                    data-field="proType"
                                    caption="구분"
                                    width="auto"
                                    data-type="date"
                                    alignment="center"
                                    :allow-editing="false"
                                    format="yyyy-MM-dd"
                                  />
                                  <DxColumn data-field="defCode" caption="불량코드" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="lotNo" caption="LOT NO" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="lotDetail" caption="전산번호" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn
                                    data-field="qty"
                                    caption="수량"
                                    :customize-text="customizeText"
                                    width="auto"
                                    data-type="number"
                                    format ="#,###"
                                    alignment="right"
                                    :allow-editing="true"
                                  />
                                  <DxColumn/>

                                  <DxColumn data-field="workcrewName" caption="작업조" data-type="string"  :visible="false" />
                                  <DxColumn data-field="userName" caption="작업자" data-type="string" :visible="false" />
                                  <DxColumn data-field="orderState" caption="상태코드" data-type="string" :visible="false" />

                                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />

                                  <!------------------------------옵션-------------------->
                                  <DxScrolling column-rendering-mode="virtual" />
                                  <DxPaging :enabled="false" />

                                  <DxPager :show-page-size-selector="false" />
                                </DxDataGrid>
                              </v-col>



<!-- 수정주우우우우 0420 -->
                              <v-col cols="3" >
                                <DxDataGrid
                                  id="workHistoryDetail"
                                  class="gridHeight"
                                  :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                                  :ref="gridData.workHistoryDetail.ref"
                                  :data-source="gridData.workHistoryDetail.data"
                                  :remote-operations="false"
                                  :hover-state-enabled="true"
                                  :allow-column-resizing="true"
                                  :allow-column-reordering="true"
                                  :row-alternation-enabled="true"
                                  :show-borders="true"
                                  :width="grid.width"
                                  :show-row-lines="true"
                                  key-expr="id"
                                  :focused-row-enabled="true"
                                  :column-auto-width="true"
                                  :column-hiding-enabled="false"
                                >
                                  <!-- <DxColumn data-field="comCode" caption="회사명" data-type="string"   width="auto" alignment="center" :allow-editing="false" :visible="false"  />
                                  <DxColumn data-field="facCode" caption="공장명" data-type="string"   width="auto" alignment="center" :allow-editing="false"  :visible="false" /> -->
                                  <DxColumn data-field="partNo" caption="품번" data-type="string"    width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="partName" caption="품명" data-type="string"   width="auto" alignment="center" :allow-editing="false" />
                                  <DxColumn data-field="matQty" caption="자재소요수량" data-type="number" format="#,###"   width="auto" alignment="right" :allow-editing="false" />
                                  <DxColumn data-field="matLot" caption="자재전산번호" data-type="string"  width="auto" alignment="center" :allow-editing="false" />
                                 

                                  <DxSelection select-all-mode="allPages" :show-check-boxes-mode="gridData.checkBoxesMode" mode="none" />

                                  <!------------------------------옵션-------------------->
                                  <DxScrolling column-rendering-mode="virtual" />
                                  <DxPaging :enabled="false" />

                                  <DxPager :show-page-size-selector="false" />
                                </DxDataGrid>
                              </v-col>
                            </v-layout>
                          </template>
                        </i-card-vertical>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--  -->

    <DxPopup
      :title="display.factory"
      :visible.sync="popupState.workAddPopup.visible"
      :show-close-button="true"
      :show-title="true"
      height="auto"
      :maxWidth="1000"
      width="80%"
    >
      <!-- 작업반 선택 팝업 -->
      <v-row>
        <v-col cols="5">
          <DxTreeList
            id="workList"
            :ref="treeList.workCode.ref"
            :data-source="treeList.workCode.data"
            :show-row-lines="true"
            class="grid-height"
            :show-borders="true"
            :column-auto-width="true"
            :width="grid.width"
            :expanded-row-keys="treeList.workCode.expandedRow"
            key-expr="id"
            has-items-expr="hasItems"
            parent-id-expr="head"
            :select-by-click="true"
            :select-nodes-recursive="true"
            @selection-changed="workOnSelectionChanged"
          >
            <DxSearchPanel :visible="true" :width="250" />
            <DxScrolling column-rendering-mode="virtual" />
            <DxSelection :recursive="treeList.workCode.recursive" mode="multiple" />
            <DxPaging :enabled="true" :page-size="10" />
            <DxColumn data-field="codeName" :allow-editing="false" />
          </DxTreeList>
        </v-col>
        <v-col cols="2">
          <v-row no-gutters style="height: 100%">
            <v-col class="pop-bt">
              <div class="pop-bt-inner">
                <v-btn class="inline-block" fab dark small color="#5c78e3" @click="workAdd(false)">
                  <v-icon dark>mdi-arrow-left-thick</v-icon>
                </v-btn>

                <v-btn class="inline-block" fab dark small color="#2b51eb" @click="workAdd(true)">
                  <v-icon dark>mdi-arrow-right-thick</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5">
          <DxDataGrid
            id="workGrid"
            class="grid-height"
            :ref="gridData.workDecodePopup.ref"
            :data-source="gridData.workDecodePopup.data"
            :remote-operations="false"
            :hover-state-enabled="true"
            :allow-column-resizing="true"
            :allow-column-reordering="true"
            :row-alternation-enabled="true"
            :show-borders="true"
            :width="grid.width"
            :show-row-lines="true"
            key-expr="id"
            :focused-row-enabled="true"
            :column-hiding-enabled="false"
          >
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />

            <DxColumn data-field="codeName" caption="작업반이름" data-type="string" alignment="center" :allow-editing="false" />

            <!--*****************************************option****************************-->
            <DxPaging :enabled="false" />
            <DxPager :show-page-size-selector="false" />

            <DxSelection select-all-mode="allMode" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />
            <!--*****************************************option****************************-->
          </DxDataGrid>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            :disabled="popupState.workAddPopup.submitBt"
            @click="insertData('work')"
            >{{ $t('choice') }}</v-btn
          >
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="popupClose('work')">{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <!--*************************************************************************************************-->

    <DxPopup
      :title="display.factory"
      :visible.sync="popupState.crewPopup.visible"
      :show-close-button="true"
      :show-title="true"
      height="auto"
      :maxWidth="1000"
      width="80%"
    >
      <!-- 작업자 선택 팝업 -->
      <v-row>
        <v-col cols="5">
          <DxTreeList
            id="employeeList"
            :ref="treeList.crew.ref"
            :data-source="treeList.crew.data"
            :show-row-lines="true"
            class="grid-height"
            :show-borders="true"
            :column-auto-width="true"
            :width="grid.width"
            :expanded-row-keys="treeList.crew.expandedRow"
            key-expr="id"
            has-items-expr="hasItems"
            parent-id-expr="head"
            :select-by-click="true"
            :select-nodes-recursive="true"
            @selection-changed="onSelectionChanged"
          >
            <DxSearchPanel :visible="true" :width="250" />
            <DxScrolling column-rendering-mode="virtual" />
            <DxSelection :recursive="treeList.crew.recursive" mode="multiple" />
            <DxPaging :enabled="true" :page-size="10" />
            <DxColumn data-field="name" :allow-editing="false" />
          </DxTreeList>
        </v-col>
        <v-col cols="2">
          <v-row no-gutters style="height: 100%">
            <v-col class="pop-bt">
              <div class="pop-bt-inner">
                <v-btn class="inline-block" fab dark small color="#5c78e3" @click="workerAdd(false)">
                  <v-icon dark>mdi-arrow-left-thick</v-icon>
                </v-btn>

                <v-btn class="inline-block" fab dark small color="#2b51eb" @click="workerAdd(true)">
                  <v-icon dark>mdi-arrow-right-thick</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5">
          <DxDataGrid
            id="employeeGrid"
            class="grid-height"
            :ref="gridData.workerList.ref"
            :data-source="gridData.workerList.data"
            :remote-operations="false"
            :hover-state-enabled="true"
            :allow-column-resizing="true"
            :allow-column-reordering="true"
            :row-alternation-enabled="true"
            :show-borders="true"
            :width="grid.width"
            :show-row-lines="true"
            key-expr="id"
            :focused-row-enabled="true"
            :column-hiding-enabled="false"
          >
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />

            <DxColumn data-field="name" :caption="$t('workCrewName')" data-type="string" alignment="center" :allow-editing="false" />

            <!--*****************************************option****************************-->
            <DxPaging :enabled="false" />
            <DxPager :show-page-size-selector="false" />

            <DxSelection select-all-mode="allMode" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />
            <!--*****************************************option****************************-->
          </DxDataGrid>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            :disabled="popupState.crewPopup.submitBt"
            @click="insertData('crew')"
            >{{ $t('choice') }}</v-btn
          >
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="popupClose('crew')">{{ $t('cancel') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <!--*************************************************************************************************-->

    <DxPopup
      :title="display.factory"
      :visible.sync="popupState.workOrder.visible"
      :show-close-button="true"
      :show-title="true"
      height="auto"
      :maxWidth="1100"
      width="80%"
    >
      <!-- 작업지시팝업 -->
      <v-row no-gutters>
        <i-card-vertical headerTitle :radio="true" class="workOrder">
          <template v-slot:radioTag>
            <v-col cols="2" class="mx-1">
              <v-select
                label="진행상태"
                outlined
                dense
                height="32"
                v-model="planDateStatesSeacrh"
                :items="planDateStates"
                item-text="name"
                item-value="value"
              />
            </v-col>

            <div class="radio-input">
              <div>
                <p>계획일</p>
              </div>
              <div>
                <v-radio-group row v-model="popupState.workOrder.radio.planDate">
                  <v-radio label="전체" :value="false"></v-radio>
                  <v-radio label="당일" :value="true"></v-radio>
                </v-radio-group>
              </div>
            </div>

            <div class="radio-input">
              <div>
                <p>근무조</p>
              </div>
              <div>
                <v-radio-group row v-model="popupState.workOrder.radio.workCrew">
                  <v-radio label="전체" :value="false"></v-radio>
                  <v-radio label="현근무조" :value="true"></v-radio>
                </v-radio-group>
              </div>
            </div>
            <div>
              <v-btn class="search-bt" color="#2E8BF6" height="32" @click="btnSearch('workOrder')">
                <v-icon right dark>mdi-magnify</v-icon>
                <span>검색</span>
              </v-btn>
            </div>
          </template>
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="workOrder"
                  :class="isScreenFull ? 'gridHeightFull' : 'doubleListBox'"
                  :ref="gridData.workOrderGrid.ref"
                  :data-source="gridData.workOrderGrid.data"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="true"
                  :column-auto-width="true"
                  :column-hiding-enabled="false"
                  @cellClick="workOrderListClick"
                  @cellDblClick="cellDblClick"
                >
                  <DxColumn
                    data-field="orderStateNm"
                    width="auto"
                    :caption="$t('situation')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="workDeName"
                    width="auto"
                    :caption="$t('workDetail')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="workCrew"
                    :caption="$t('workCrewName')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="comboList.workCrew" display-expr="name" value-expr="value" />
                  </DxColumn>
                  <DxColumn data-field="workNo" :caption="$t('workNo')" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <!-- <DxColumn data-field="planNo" :caption="$t('planNo')" data-type="string" alignment="center" :allow-editing="false" /> -->
                  <DxColumn
                    data-field="planDate"
                    :caption="$t('planDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="workDate"
                    :caption="$t('workDate')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />

                  <DxColumn
                    data-field="itemType"
                    :caption="$t('itemTypeNm')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  >
                    <DxLookup :data-source="comboList.itemType" display-expr="name" value-expr="value" />
                  </DxColumn>
                  <DxColumn data-field="partNo" width="auto" :caption="$t('partNo')" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn data-field="partName" width="auto" :caption="$t('partName')" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="orderQty"
                    :caption="$t('orderQty')"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                    :customize-text="customizeText"
                  />
                  <DxColumn
                    data-field="preProCode"
                    width="auto"
                    :caption="$t('beforeProcessName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="preQty" width="auto" :caption="$t('preQty')" data-type="string" alignment="right" :allow-editing="false" />
                  <DxColumn
                    data-field="proCode"
                    width="auto"
                    :caption="$t('currentProcessName')"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="qty"
                    width="auto"
                    :caption="$t('currentPerformance')"
                    data-type="string"
                    alignment="right"
                    :allow-editing="false"
                  />

                  <!-- <DxColumn data-field="workName" :caption="$t('workName')" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="workDeName" :caption="$t('workDename')" data-type="string" alignment="center" :allow-editing="false" />-->

                  <DxColumn
                    data-field="maker"
                    :caption="$t('maker')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <DxColumn
                    data-field="editor"
                    :caption="$t('editor')"
                    width="auto"
                    data-type="string"
                    alignment="center"
                    :allow-editing="false"
                    :visible="false"
                  />
                  <!-- <DxColumn data-field="priCodeNm" :caption="$t('priority')" data-type="string" alignment="center" :allow-editing="false" /> -->
                  <!-- <DxColumn data-field="pathName" :caption="$t('pathName')" data-type="string" alignment="center" :allow-editing="false" /> -->
                  <!-- <DxColumn data-field="lotNo" :caption="$t('lotNo')" data-type="string" alignment="center" :allow-editing="false" /> -->

                  <!-- <DxColumn data-field="remark" :caption="$t('remark')" data-type="string" alignment="center" :allow-editing="false" /> -->
                  <!------------------------------옵션-------------------->
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-row>

      <!-- 작업지시 생성 구분 -->
      <!-- <v-row no-gutters style="padding: 0 12px" class="workOrder-bt">
        <v-col cols="2">
          <v-btn
            outlined
            width="120px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="onWorkOrderState('create')"
          >작업지시 생성</v-btn>
        </v-col>
        <v-col class="workOrder-bt">
          <v-btn
            outlined
            width="80px"
            :disabled="popupState.workOrder.orderState.start.state"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="onWorkOrderState('start')"
          >{{ $t('start') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            :disabled="popupState.workOrder.orderState.defer.state"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="onWorkOrderState('defer')"
          >{{ $t('hold') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            :disabled="popupState.workOrder.orderState.termination.state"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            @click="onWorkOrderState('termination')"
          >{{ $t('exit') }}</v-btn>
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="cancelBtn"
            @click="onWorkOrderState('close')"
          >
            {{
            $t('close')
            }}
          </v-btn>
        </v-col>
      </v-row>-->
      <!--  -->
    </DxPopup>
    <!--*************************************************************************************************-->
    <DxPopup
      :title="$t('createWorkOrder')"
      :visible.sync="popupState.workOrder.createWorkOrder.visible"
      :show-close-button="true"
      :show-title="true"
      height="auto"
      :maxWidth="1400"
      width="80%"
    >
      <!-- 작업지시 생성팝업 -->
      <v-row no-gutters>
        <v-col>
          <div class="radio-input">
            <div style="display: flex; align-items: center; margin-right: 20px">
              <p>{{ $t('createWorkOrder') }}</p>
            </div>
            <div>
              <v-radio-group row v-model="popupState.workOrder.radio.planDate">
                <v-radio label="전체" :value="false"></v-radio>
                <v-radio label="당일" :value="true"></v-radio>
              </v-radio-group>
            </div>
          </div>
        </v-col>
      </v-row>
      <hr style="margin: 10px 0 5px 0" />
      <v-row>
        <v-col>
          <v-row no-gutters>
            <v-col class="create-work-order">
              <p>기본정보</p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>작업지시 생성</v-col>
          </v-row>
        </v-col>
      </v-row>
    </DxPopup>
    <!--*************************************************************************************************-->

    <!--*************************************************************************************************-->
    <DxPopup :visible.sync="popupState.operatingPopup.visible" :show-close-button="true" :show-title="true" height="auto" :maxWidth="800" width="80%">
      <!-- 비가동 관리 팝업  -->

      <v-row no-gutters>
        <i-card-vertical headerTitle class="card-padding">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="operatingGrid"
                  class="gridHeigh"
                  :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                  :ref="gridData.operatingGrid.ref"
                  :data-source="gridData.operatingGrid.data"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  width="auto"
                  :show-row-lines="true"
                  key-expr="startTime"
                  :focused-row-enabled="true"
                  :column-hiding-enabled="false"
                  @focused-row-changed="operatingFocused"
                  @cell-prepared="onCellPrepared"
                  :selection="{ mode: 'none' }"
                >
                  <DxScrolling column-rendering-mode="virtual" />
                  <DxColumn data-field="eqCode" :caption="$t('eqName')" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="eqCodeList" display-expr="name" value-expr="value"></DxLookup>
                  </DxColumn>
                  <DxColumn data-field="stopCode" :caption="$t('reason')" :allow-editing="false" alignment="center">
                    <DxLookup :data-source="comboList.facStateCodeList" display-expr="name" value-expr="value" />
                  </DxColumn>
                  <DxColumn
                    data-field="startTime"
                    :caption="$t('startTime')"
                    data-type="date"
                    format="yyyy-MM-dd HH:mm:ss"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn
                    data-field="endTime"
                    :caption="$t('endTime')"
                    data-type="date"
                    format="yyyy-MM-dd HH:mm:ss"
                    alignment="center"
                    :allow-editing="false"
                  />
                  <DxColumn data-field="stopTime" :caption="$t('Downtime_minutes')" data-type="number" alignment="center" :allow-editing="false" />
                  <DxPaging :enabled="false" />
                  <DxSelection mode="single" :allow-select-all="false" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-row>
      <v-row no-gutters style="padding: 0 12px" class="workOrder-bt">
        <v-col class="workOrder-bt">
          <!-- <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="operation('stop')"
            :disabled="display.disableCheck.operationEndBt">{{ $t('nonOperation') }}</v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="operation('start')"
          :disabled="display.disableCheck.operationStartBt">{{ $t('operation') }}</v-btn>-->
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" @click="operation('close')">{{ $t('close') }}</v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <!--*************************************************************************************************-->
    <DxPopup :visible.sync="popupState.stopCodePopup.visible" :show-close-button="true" :show-title="true" height="auto" :maxWidth="800" width="80%">
      <!-- 비가동관리 비가동사유 팝업 -->
      <v-row>
        <v-tabs class="item-tab">
          <v-tab v-for="item in display.stopCodeTabMenu" :key="item.id">{{ item.name }}</v-tab>
          <v-tab-item v-for="item in display.stopCodeTabMenu" :key="item.id">
            <v-row class="padding-2rem" :v-show="item.name === '공통'">
              <v-col cols="3" v-for="list in comboList.stopCodeList" style="padding:10px" :key="list.id">
                <button
                  style="cursor:pointer;width:100%;padding:2rem 0;border:1px solid #2E8BF6;  border-radius: 5px;"
                  @click="stopCodeSelect(list)"
                  @dblclick="operation('stop', true)"
                  :class="{ 'code-select': list.value === gridData.operatingGrid.stopCodeData.value }"
                >
                  {{ list.name }}
                </button>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-row>

      <v-row>
        <v-col cols="12" align="right">
          <v-btn
            outlined
            width="80px"
            height="40px"
            class="rounded-0 mt-2 btn"
            ref="choice"
            :disabled="!performance.defectiveCode"
            @click="operation('stop', true)"
            >{{ $t('choice') }}</v-btn
          >
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="popupState.stopCodePopup.visible = false">
            {{ $t('close') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>
    <!--*************************************************************************************************-->
    <DxPopup :visible.sync="popupState.processPopup.visible" :show-close-button="true" :show-title="true" height="auto" :maxWidth="1500" width="80%">
      <!-- 공정검사 팝업  -->
      <v-row>
        <v-tabs class="item-tab">
          <v-tab>{{ display.processTabMenu[0].name }}</v-tab>
          <v-tab-item :eager="true">
            <v-row>
              <i-card-vertical headerTitle class="card-padding" :input="true">
                <template v-slot:inputTag>
                  <v-row no-gutters style="padding-top:5px">
                    <v-col cols="auto" style="margin-left:1rem;">
                      <v-radio-group row v-model="popupState.processPopup.radio" @change="inspTimeChange()">
                        <span v-for="list in comboList.inspTimeList" :key="list.value">
                          <v-radio :label="list.name" :value="list.value"></v-radio>
                        </span>
                      </v-radio-group>
                    </v-col>

                    <v-col style="justify-content: flex-end;display:flex;padding:0 12px">
                      <v-btn class="save-bt" color="#2E8BF6" height="32" @click="btnSave('process')">
                        <v-icon right dark style="font-size: 20px;padding-right: 4px;">mdi-content-save</v-icon>
                        <span style="margin-right: 4px ;margin-left: 4px ;letter-spacing: 0.5px;font-weight: bold;line-height: 1.8;">저장</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <v-col cols="12" class="pa-0">
                      <DxDataGrid
                        id="processGrid"
                        class="gridHeight"
                        :class="isScreenFull ? 'gridHeightFull' : 'gridHeight'"
                        :ref="gridData.processGrid.ref"
                        :data-source="gridData.processGrid.data"
                        :remote-operations="false"
                        :hover-state-enabled="true"
                        :allow-column-resizing="true"
                        :allow-column-reordering="true"
                        :row-alternation-enabled="true"
                        :show-borders="true"
                        :width="grid.width"
                        :show-row-lines="true"
                        key-expr="id"
                        :focused-row-enabled="false"
                        :column-hiding-enabled="false"
                        @row-updated="onRowUpdated"
                        @cellPrepared="cellPrepared2"
                        @editing-start="editingStart2"
                        :selection="{ mode: 'none' }"
                      >
                        <DxColumn
                          data-field="inspTime"
                          :caption="$t('inspClass')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                          :fixed="true"
                          fixed-position="left"
                        >
                          <DxLookup :data-source="comboList.inspTimeList" display-expr="name" value-expr="value" />
                        </DxColumn>

                        <DxColumn
                          data-field="insType"
                          :caption="$t('insType')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboList.insTypeList" display-expr="name" value-expr="value" />
                        </DxColumn>
                        <DxColumn
                          data-field="insMeth"
                          :caption="$t('insMeth')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboList.insMethList" display-expr="name" value-expr="value" />
                        </DxColumn>
                        <DxColumn
                          data-field="jugCodeh"
                          :caption="$t('jugCodeh')"
                          width="auto"
                          :allow-editing="false"
                          data-type="string"
                          alignment="center"
                        >
                          <DxLookup :data-source="comboList.jugCodehList" display-expr="name" value-expr="value" />
                        </DxColumn>

                        <DxColumn
                          data-field="insUnit"
                          :caption="$t('insUnit')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        >
                          <DxLookup :data-source="comboList.insUnitList" display-expr="name" value-expr="value" />
                        </DxColumn>

                        <DxColumn
                          data-field="insBase"
                          :caption="$t('insBase')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <DxColumn
                          data-field="insUpp"
                          :caption="$t('insUpp')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />
                        <DxColumn
                          data-field="insLow"
                          :caption="$t('insLow')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />

                        <DxColumn data-field="judge" :caption="$t('judge')" width="auto" data-type="string" alignment="center" :allow-editing="false">
                          <DxLookup :data-source="comboList.judgeList" display-expr="name" value-expr="value" />
                        </DxColumn>
                        <DxColumn
                          data-field="insCnt"
                          :caption="$t('insCnt')"
                          width="auto"
                          data-type="string"
                          alignment="center"
                          :allow-editing="false"
                        />

                        <DxColumn data-field="sample" :caption="$t('sample')" alignment="center" css-class="band-column">
                          <DxColumn
                            data-field="sample1"
                            :caption="$t('sampleQty1')"
                            width="auto"
                            data-type="string"
                            alignment="right"
                            edit-cell-template="myEditor"
                          />
                          <DxColumn
                            data-field="sample2"
                            :caption="$t('sampleQty2')"
                            width="auto"
                            data-type="string"
                            alignment="right"
                            edit-cell-template="myEditor"
                          />
                          <DxColumn
                            data-field="sample3"
                            :caption="$t('sampleQty3')"
                            width="auto"
                            data-type="string"
                            alignment="right"
                            edit-cell-template="myEditor"
                          />
                          <DxColumn
                            data-field="sample4"
                            :caption="$t('sampleQty4')"
                            width="auto"
                            data-type="string"
                            alignment="right"
                            edit-cell-template="myEditor"
                          />
                          <DxColumn
                            data-field="sample5"
                            :caption="$t('sampleQty5')"
                            width="auto"
                            data-type="string"
                            alignment="right"
                            edit-cell-template="myEditor"
                          />
                        </DxColumn>
                        <DxColumn data-field="remark" :caption="$t('remark')" width="auto" data-type="string" alignment="center" />
                        <template #myEditor="{ data: cellInfo }">
                          <DxSelectBox
                            v-if="cellInfo.data.jugCodeh == '10'"
                            :value="cellInfo.value"
                            :data-source="comboList.sampleList"
                            display-expr="name"
                            value-expr="value"
                            :onValueChanged="value => onCellValueChanged(value.value, cellInfo)"
                          />
                          <DxTextBox v-else :value="cellInfo.value" :onValueChanged="value => onCellValueChanged(value.value, cellInfo)" />
                        </template>
                        <!----------------옵션------------------->

                        <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                        <DxScrolling column-rendering-mode="virtual" />

                        <DxPaging :enabled="false" />
                        <DxSelection select-all-mode="allMode" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />
                        <DxPager :show-page-size-selector="false" />
                      </DxDataGrid>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-row>

            <v-row>
              <v-col cols="12" align="right">
                <v-btn outlined width="80px" height="40px" class="rounded-0 btn" ref="cancelBtn" @click="popupState.processPopup.visible = false">
                  {{ $t('close') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-row>

      <v-row></v-row>
    </DxPopup>
    <!--*************************************************************************************************-->
    <DxPopup :visible.sync="popupState.materialPopup.visible" :show-close-button="true" :show-title="true" height="auto" :maxWidth="1200" width="80%">
      <!-- 자재투입 팝업 -->
      <v-row no-gutters>
        <i-card-vertical headerTitle class="card-padding">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="processGrid"
                  class="grid-height"
                  :ref="gridData.materialGrid.ref"
                  :data-source="gridData.materialGrid.data"
                  :remote-operations="false"
                  :hover-state-enabled="true"
                  :allow-column-resizing="true"
                  :allow-column-reordering="true"
                  :row-alternation-enabled="true"
                  :show-borders="true"
                  :width="grid.width"
                  :show-row-lines="true"
                  key-expr="id"
                  :focused-row-enabled="false"
                  :column-hiding-enabled="false"
                  :selection="{ mode: 'none' }"
                >
                  <DxColumn data-field="inDate" :caption="$t('inDate')" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="whName" :caption="$t('whName')" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="lotNo" :caption="$t('lotNo')" data-type="string" alignment="center" :allow-editing="false" />

                  <DxColumn data-field="partNo" :caption="$t('partNo')" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="lotDetail" :caption="$t('lotDetail')" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="partName" :caption="$t('partName')" data-type="string" alignment="left" :allow-editing="false" />
                  <DxColumn
                    data-field="stockQty"
                    :caption="$t('qty')"
                    data-type="string"
                    alignment="right"
                    :customize-text="customizeText"
                    :allow-editing="false"
                  />

                  <!----------------옵션------------------->

                  <DxEditing :allow-updating="true" :allow-adding="true" mode="cell" />
                  <DxScrolling column-rendering-mode="virtual" />

                  <DxPaging :enabled="false" />
                  <DxSelection select-all-mode="allMode" :show-check-boxes-mode="gridData.checkBoxesMode" mode="multiple" />
                  <DxPager :show-page-size-selector="false" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" align="right">
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="choice" :disabled="processGridbtn" @click="manualMaterial()">{{
            $t('choice')
          }}</v-btn>
          <v-btn outlined width="80px" height="40px" class="rounded-0 mt-2 btn" ref="cancelBtn" @click="popupState.materialPopup.visible = false">
            {{ $t('close') }}
          </v-btn>
        </v-col>
      </v-row>
    </DxPopup>


  </v-container>
</template>

<script>
import iCardVertical from '@/components/common/iCardVertical.vue'
import pop0210KeyBorad from '@/views/30/3013/keyboard/pop0210KeyBorad.vue'
import { getDateFormat } from '@/utils/common.js'
import { DxPopup } from 'devextreme-vue/popup'
import themes from 'devextreme/ui/themes'
import { getCompany } from '@/api/system/companyManage'
import notify from 'devextreme/ui/notify' // message
import { DxDataGrid, DxColumn, DxScrolling, DxLookup, DxEditing, DxColumnFixing } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box'

import DxTextBox from 'devextreme-vue/text-box'
import baseview from '@/components/base/baseview.vue' // base page 추가
import { getDataFile } from '@/api/view/bas0240' //pdf
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import {
  getBas0034,
  getBas0035,
  setPro0020,
  getPro0020,
  delPro0020,
  getPro0021,
  setPro0021,
  getWorkerList,
  setPro0022,
  getPro0050,
  setPro0050,
  getPro0023,
  getPro23Select,
  setPro0023,
  getPro0024,
  setPro0025,
  getPro0026,
  getPro0025,
  getBack,
  getEqp0010,
  setOperating,
  getProcess,
  setProcess,
  getEqp0010Main,
  getStopTime,
  exportRpt,
} from '@/api/view/pop0210'
import { getItemInfo } from '@/api/view/bas0040'
import { getDepartment } from '@/api/system/departmentManage'
import { getFactoryInfoData } from '@/api/view/bas0030'
import { DxTreeList, DxSelection, DxSearchPanel } from 'devextreme-vue/tree-list'
import { getQuaStanInfo } from '@/api/view/bas0420'
import { getUser } from '@/api/system/userManage'
import { getComCode, getUserId } from '@/utils/token'
import { getCmChildCode } from '@/api/system/cmCodeManage'
import { getFacilityInfo } from '@/api/view/bas0250'
import { number } from 'echarts'

export default {
  name: 'pop0210',
  mixins: [baseview, BaseDataGrid],
  components: {
    'i-card-vertical': iCardVertical,
    DxLookup,
    DxTreeList,
    DxSelection,
    DxDataGrid,
    DxColumn,
    DxSearchPanel,
    DxPopup,
    DxScrolling,
    DxSelectBox,
    DxTextBox,
    pop0210KeyBorad
  },

  // 데이터 부분
  data() {
    return {
      KeyBoradOn:false,
      focusInput: false,
      ResetQty:'',
      workTimeTop: '',
      stratTimeTop: '',
      countNumber: 0,
      printradio: 50,
      editModebtn: true,
      defectiveAddbtn: true,
      planDateStates: [
        { name: '전체', value: '20,70' },
        { name: '진행', value: '20,50' },
        { name: '완료', value: '60,70' }
      ],
      planDateStatesSeacrh: '20,50',
      planDateStatesarray: [],
      totalstopTime: 0,
      processGridbtn: true,
      eqCodeList: [],
      test: [],
      workNoMark: '',
      gridHeight: null,
      lotDetailQue: [],
      workQueueList: [],
      stopTimeA: 0,
      stopTimeB: 0,
      res: {},
      tab: null,
      //메뉴
      //선택데이터
      radioGroup: 1,
      selectionMode: 'leaveOnly',
      //콤보리스트
      comboList: {
        type: [],
        outputType: [],
        workCrew: [],
        itemType: [],
        defectiveCode: [],
        workCodeList: [],
        workDeCodeList: [],
        stopCodeList: [],
        insCodeList: [],
        insTypeList: [],
        insMethList: [],
        jugCodehList: [],
        insUnitList: [],
        sampleList: [],
        judgeList: [],
        inspTimeList: [],
        facStateCodeList: []
      },
      //유저정보
      userData: {
        company: getComCode(),
        userId: getUserId(),
        factory: {
          code: ''
        },
        name: ''
      },
      //화면표시 데이터
      display: {
        company: '',
        factory: '',
        time: {
          year: '00',
          month: '00',
          day: '00',
          week: '',
          hour: '00',
          minutes: '00',
          second: '00'
        },
        tabMenu: [
          {
            id: 0,
            name: '실적등록'
          },
          {
            id: 1,
            name: '자재투입',
            value: true
          },
          {
            id: 2,
            name: '작업이력'
          }
        ],
        //비가동관리 텝메뉴
        stopCodeTabMenu: [
          {
            id: 0,
            name: '공통'
          }
        ],
        //공정검사 텝메뉴
        processTabMenu: [
          {
            id: 0,
            name: '공정검사'
          },
          {
            id: 1,
            name: '순회검사'
          }
        ],
        //설비 리스트
        operateList: [],
        materialTotal: 0, //자재투입 메뉴 표시  총수량

        button: {
          add: 'mdi-plus-thick',
          delete: 'mdi-trash-can-outline',
          insert: 'mdi-arrow-collapse-right',
          cancle: 'mdi-close-circle'
        },
        disableCheck: {
          workerBt: true,
          workOrderBt: false,
          operationStartBt: true,
          operationEndBt: true,
          operatingBt: true,
          workStandardBt: true,
          processBt: true,
          remarkBt: true
        },
        operate: {
          working: 0,
          notWorking: 0
        }
      },
      //시간 메소드
      timeCounter: {
        func: null, //메소드 이름
        delay: 1000 // 지연시간
      },
      //그리드 관련
      gridData: {
        mainGird: {
          //메인그리드
          data: [],
          ref: 'mainGirdRef',
          focusRowData: {}
        },
        workDecodePopup: {
          //작업반 선택 그리드
          data: [],
          ref: 'workDecodePopupRef'
        },
        workerList: {
          //작업자 선택 그리드
          data: [],
          ref: 'workerListRef'
        },
        workOrderGrid: {
          //작업지시 선택 그리드
          data: [],
          ref: 'wokerOrderRef',
          selectData: null
        },
        materialInputGird: {
          //자재투입 그리드
          data: [],
          ref: 'materialInput',
          selectData: null
        },
        waitingWorkGrid: {
          // 작업대기 그리드
          data: [],
          ref: 'waitingWorkRef',
          selectData: null
        },
        workHistoryGrid: {
          // 작업이력 그리드
          data: [],
          ref: 'workHistory'
        },
        operatingGrid: {
          // 작업이력 그리드
          data: [],
          ref: 'operatingRef',
          selectData: {},
          stopCodeData: {}
        },
        processGrid: {
          data: [],
          ref: 'processRef',
          selectData: {},
          insCnt: []
        },
        materialGrid: {
          //수동 자재투입 그리드
          data: [],
          ref: 'materialRef'
        },
        // 추가
        workHistoryDetail: {
          //수동 자재투입 그리드
          data: [],
          ref: 'workHistoryDetailRef'
        },





        autoExpandAll: true,
        checkBoxesMode: 'always'
      },
      //트리
      treeList: {
        crew: {
          // data: employees,
          data: [],
          ref: 'crewTreeList',
          mode: 'all',
          recursive: true,
          expandedRow: [1],
          selectedData: []
        },
        workCode: {
          // data: employees,
          data: [],
          ref: 'workCodeTreeList',
          mode: 'all',
          recursive: true,
          expandedRow: [1],
          selectedData: []
        }
      },
      //삭제모드 or 일반모드
      editMode: false,
      // 작업장선택
      selection: '0',
      //타겟

      //작업장리스트
      workList: [],
      //팝업상태관련
      popupState: {
        workAddPopup: {
          visible: false,
          submitBt: true // true 비활성화  false 활성화
        },
        workDateCal: false, //달력

        workOrder: {
          createWorkOrder: {
            visible: false
          },
          visible: false,
          orderState: {
            start: {
              //시작
              state: true,
              value: ''
            },
            defer: {
              //보류
              state: true,
              value: ''
            },
            termination: {
              //종료
              state: true,
              value: ''
            }
          },
          radio: {
            planDate: true,
            workCrew: true
          }

          //품목
        }, //작업지시
        crewPopup: {
          // 크루원팝업
          visible: false,
          submitBt: true
        }, //작업자 팝업
        defectiveCode: {
          visible: false,
          submitBt: true
        },
        operatingPopup: {
          visible: false
        },
        stopCodePopup: {
          visible: false
        },
        processPopup: {
          visible: false,
          radio: ''
        },
        materialPopup: {
          visible: false
        }
      },
      formObject: {
        workName: '', //작업반이름
        workCode: '', //작업장코드
        workDeCode: '',
        workDeName: '',
        //////////////////////////////////
        workType: '', //작업종류 [작업지시,로트] (공통코드)
        metGbn: '', //자재투입유형 [선입선출,로트](공통코드)
        //////////////////////////////////
        workCrew: '', //작업조 [주간,야간] (공통코트)
        workDate: '', //작업일짜
        ilno: '', //작업일련번호
        lotNo: '', // lot 번호
        workNo: '', //작업지시번호
        worker: [],
        workOrder: {
          //작업지시  라디오 값
          planDate: true,
          workCrew: true
        },

        partNo: '', //품번
        partName: '', //품명
        pathCode: '', //경로코드
        pathName: '', //경로명
        remark: '' //비고
      },
      process: {
        //공점검사
        data: []
      },

      //자재투입
      materialInput: {
        lotDetail: ''
      },
      //실적등록
      performance: {
        mode: true,
        faireQty: 0, //양품 수량
        defectiveQty: 0, // 불량수량
        defectiveQtyInput: 0, //불량수량 인풋
        planQty: 0, // 계획수량
        orderQty:0,
        qty: 0, // 수량  인풋
        box: 1, //박스수량 인풋
        total: 0,
        defectiveCode: {}, //불량코드
        defectiveList: []
      },
      ////////////////////////////////////

      errorCode: 0,

      btnList: [
        {
          btnColor: true,
          btnColor2: false,
          btnColor3: false,
          btnColor4: false,
          btnColor5: false,
          btnColor6: false,
          btnColor7: false,
          btnColor8: false
        }
      ],
      workHistory: {
        search: {
          start: getDateFormat(new Date(new Date().setDate(new Date().getDate() - 7))),
          end: getDateFormat(new Date()),
          workCode: null,
          workDeCode: null
        },
        menu: {
          start: false,
          end: false
        }
      },
      state: this.$store.state.app.isScreenFull,
      queue: {
        array: [],
        inProgress: false
      }
    }
  },
  created() {},
  watch: {
    'performance.defectiveList'() {
      if (this.performance.defectiveList.length === 0) {
        this.defectiveAddbtn = true
        this.editModebtn = true
      } else {
        this.editModebtn = false
        this.defectiveAddbtn = false
      }
    },

    //실적등록 mode 감지
    'process.data'(value) {
      try {
        let array = value
        if (array.length) {
          this.comboList.inspTimeList.forEach(e => {
            let filterArray = array.filter(word => word.inspTime === e.value)
            let count = 0
            filterArray.forEach(item => {
              if (item.judge === '10') {
                count = count + 1
              }
            })
            if (filterArray.length === count) {
              e.type = true
            } else {
              e.type = false
            }
          })
        }
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    'performance.mode'(value) {
     
        this.performance.qty = Number(this.ResetQty)
        this.performance.box = 1
      
    },
    //작업자 버튼 활성화
    formObject: {
      handler(value) {
        if (!!value.workType && !!value.metGbn && !!value.workCrew && !!value.workDate) {
          this.display.disableCheck.workerBt = false
        } else {
          this.display.disableCheck.workerBt = false
        }
      },
      deep: true
    },
    'gridData.workOrderGrid.selectData': function(value) {
      // 10 생성

      let confirm = '20' //20 확정
      let Progress = '30' //30 진행
      let defer = '40' //40 보류
      //50 강제종료
      //60 종료
      if (value === null) {
        this.popupState.workOrder.orderState.start.state = true
        this.popupState.workOrder.orderState.defer.state = true
        this.popupState.workOrder.orderState.termination.state = true
      } else {
        if (value.data.orderState === confirm) {
          this.popupState.workOrder.orderState.start.state = false
          this.popupState.workOrder.orderState.defer.state = false
          this.popupState.workOrder.orderState.termination.state = true
        } else if (value.data.orderState === Progress) {
          this.popupState.workOrder.orderState.start.state = true
          this.popupState.workOrder.orderState.defer.state = false
          this.popupState.workOrder.orderState.termination.state = false
        } else if (value.data.orderState === defer) {
          this.popupState.workOrder.orderState.start.state = false
          this.popupState.workOrder.orderState.defer.state = true
          this.popupState.workOrder.orderState.termination.state = false
        }
      }
    },
    //작업반 변경
    //큰문재
    selection: function(value) {
      this.griMainInstance.deselectAll() //작업반 변경시 그리드 체크된거 전부 해제
      if (this.workList.length !== 0) {
        let array = [...this.workList]
        this.workHistory.workCode = array[value].workCode
        this.formObject.workName = array[value].workName
        this.formObject.workCode = array[value].workCode
        this.formObject.workDeCode = array[value].workDeCode
        this.formObject.workDeName = array[value].workDeName
        this.getPopData(array[value])
        this.performance.defectiveList = []
        this.gridData.workHistoryDetail.data = []
        this.totalstopTime = 0
        this.test = [...array]
   

      }
      
    },

    'gridData.workDecodePopup.data': function(value) {
      if (value.length === 0) {
        this.popupState.workAddPopup.submitBt = true
      } else {
        this.popupState.workAddPopup.submitBt = false
      }
    },
    'gridData.workerList.data': function(value) {
      if (value.length === 0) {
        this.popupState.crewPopup.submitBt = true
      } else {
        this.popupState.crewPopup.submitBt = false
      }
    },
    // 'formObject.ilno': function (value) {
    //   if (value === '' || this.formObject.workType === '20') {
    //     this.display.disableCheck.workOrderBt = true
    //   } else if (value !== '' && this.formObject.workType !== '20') {
    //     this.display.disableCheck.workOrderBt = false
    //   }
    // },
    'formObject.partNo': function(value) {
      if (!value) {
        this.display.disableCheck.operatingBt = true
        this.display.disableCheck.workStandardBt = true
        this.display.disableCheck.processBt = true
        this.display.disableCheck.remarkBt = true
        this.process.data = []
        this.comboList.inspTimeList.forEach(e => {
          e.type = false
        })
      } else {
        this.display.disableCheck.operatingBt = false
        this.display.disableCheck.workStandardBt = false
        this.display.disableCheck.processBt = false
        this.display.disableCheck.remarkBt = false
      }
    }
  },
  computed: {
    ////////////큐//////////////////////////
    isEmpty() {
      return this.queue.array.length === 0
    },
    ////////////큐//////////////////////////
    //박스수량 계산
    box() {
      let value = 0
      return value
    },
    Progress() {


      let Progress = 0
      let conditional = (this.performance.faireQty / this.performance.planQty) * 100
      Progress = isNaN(conditional) ? 0 : Math.floor((this.performance.faireQty / this.performance.planQty) * 100)
      if (!isFinite(Progress)) {
        Progress = 0
      }
      return Progress
    

    

    },
    ProgressOder() {


      let ProgressOder = 0
      let conditional = (this.performance.faireQty / this.performance.orderQty) * 100
      ProgressOder = isNaN(conditional) ? 0 : Math.floor((this.performance.faireQty / this.performance.orderQty) * 100)
      if (!isFinite(ProgressOder)) {
        ProgressOder = 0
      }
      return ProgressOder
    

    

    },

   
    totalQty() {
      let value = 0
      let qty = !this.performance.qty ? 0 : this.performance.qty
      let box = !this.performance.box ? 0 : this.performance.box
      value = parseInt(qty) * parseInt(box)
      return value
    },
    workCodeName() {
      let text = ''
      text = this.formObject.workName
      return text
    },
    workerCount() {
      let arrayLength = this.formObject.worker.length
      let text = ''
      if (arrayLength > 0) {
        text = `외 ${arrayLength - 1}명`
      }
      return text
    },
    //선택한 데이터
    workerArray() {
      let Array = []
      let nameArray = []
      if (this.formObject.worker.length > 0) {
        Array = [...this.formObject.worker]

        Array.shift()
        Array.forEach(e => {
          nameArray.push(e.name)
        })
      }
      return nameArray
    },
    workerLeader() {
      let text = ''
      let Array = []
      if (this.formObject.worker.length > 0) {
        Array = [...this.formObject.worker]
        text = Array[0].name
      }
      return text
    },
    // isScreenFull: state => this.$store.state.app.isScreenFull
    isScreenFull() {
      return this.$store.state.app.isScreenFull
    },
    ////////////////////////////////////////grid///////////////////
    griMainInstance() {
      return this.GetDataGrid(this.gridData.mainGird.ref)
    },

    workDecodePopupInstance() {
      return this.GetDataGrid(this.gridData.workDecodePopup.ref)
    },
    workerListInstance() {
      return this.GetDataGrid(this.gridData.workerList.ref)
    },
    treeListInstance() {
      return this.GetDataGrid(this.treeList.crew.ref)
    },
    treeListWorkCodeInstance() {
      return this.GetDataGrid(this.treeList.workCode.ref)
    },
    workOrderGridCodeInstance() {
      return this.GetDataGrid(this.gridData.workOrderGrid.ref)
    },
    materialInputInstance() {
      return this.GetDataGrid(this.gridData.materialInputGird.ref)
    },

    operatingGridInstance() {
      return this.GetDataGrid(this.gridData.operatingGrid.ref)
    },
    processGridInstance() {
      return this.GetDataGrid(this.gridData.processGrid.ref)
    },
    workHistoryGridInstance() {
      return this.GetDataGrid(this.gridData.workHistoryGrid.ref)
    },

    materialGridInstance() {
      return this.GetDataGrid(this.gridData.materialGrid.ref)
    },
    workHistoryDetailInstance() {
      return this.GetDataGrid(this.gridData.workHistoryDetail.ref)
    }

    ////////////////////////////////////////grid///////////////////
  },

  beforeMount() {
    this.comboListSet()
  },
  mounted() {
    this.dataSettting()
    this.nowTime()
    this.StopTimeInterval()
    document.addEventListener('click', this.handleOutsideClick);
  },

  destroyed() {
    clearInterval(this.timeFunc)
    clearInterval(this.Stoptick)
    document.removeEventListener('click', this.handleOutsideClick);
  },

  methods: {
    //  매서드 시작
    handleOutsideClick(e){
    if(this.KeyBoradOn){
      if(!this.$refs.focusInput.contains(e.target)){
        this.focusInput = false
      }
    }
      
    },

    KeyBoradOnRemote(){
      this.focusInput = this.KeyBoradOn == true ? true : false

      console.log(this.focusInput)
     
    },
    
    onFocusedRowWorkHistoryGrid(e){
      this.gridData.workHistoryDetail.data = []
      
     
      this.getPro0024(e.row.data)
    },

    async getPro0024(e){
    try{
   
      let params = {
        comCode:this.userData.company,
        facCode:this.userData.factory.code,
        lotDetail:e.lotDetail
      }
      let pama = await getPro0024(params)
     let cnt = 0
      this.gridData.workHistoryDetail.data = pama.list
      this.gridData.workHistoryDetail.data.map(x=> x.id = cnt +=1 )
  
      
    }
    catch{
      console.log('error')
    
    }
    },

    


    testdsaf(e){
    
      console.log(e)
    
    },



    testtx(e){
    
      console.log(e)
    }
    ,

    testtes(e){
    if(e.value === false){
      this.focusInput = false
     } 
    else if(e.value === '초기화'){
      this.performance.qty = 0
     }
     else{
      this.performance.qty = String(this.performance.qty) + String(e.value)
      this.performance.qty = Number(this.performance.qty)
     }
    },


    radioReset() {
      this.printradio = 50
    },

    StopTimeInterval() {
    
     this.Stoptick = setInterval(() => {
      this.operatingSearch()
      }, 30000)
    },

    // 프린트

    async print(e) {
      let tagData = null
      if (e === 'performanceRegistration') {
        tagData = await this.griMainInstance.getSelectedRowsData()
      } else if (e === 'workHistory') {
        tagData = await this.workHistoryGridInstance.getSelectedRowsData()
      }

      if (tagData.length <= 0) {
        this.vToastify(this.$t('SelectCheck'), 'warn')
        return
      }

      let params = {
        comCode: this.userData.company,
        comName: this.display.company,
        detailData: tagData
      }

      this.printradio == 50 ? (params.repType = 'PRO_TRANS') : (params.repType = 'PART_IDNT')

      await exportRpt(params)
        .then(res => {
          let blob = new Blob([res], {
            type: 'application/pdf'
          })
          let blobURL = URL.createObjectURL(blob)
          const iframe = document.createElement('iframe')
          document.body.appendChild(iframe)
          iframe.style.display = 'none'
          iframe.src = blobURL
          iframe.onload = function() {
            // 딜레이 이슈
            setTimeout(function() {
              iframe.focus()
              iframe.contentWindow.print()
            }, 1)

            //
          }
        })
        .finally(() => {
          //iframe 2분후 삭제
          let iframes = document.querySelectorAll('iframe')
          iframes.forEach(function(iframe) {
            setTimeout(function() {
              document.body.removeChild(iframe)
            }, 120000)
          })
          //
        })
    },

    async StopTime(e) {
      let parmas = {
        comCode: this.userData.company,
        facCode: this.userData.factory.code,
        workNo: this.formObject.workNo,
        workDecode:this.formObject.workDecode
      }


      await getStopTime(parmas).then(res => {

        this.totalstopTime = 0
       
        for (let i of e) {
          this.totalstopTime += Number(i.stopTime)
        }
    
        for (let i of res.list) {
         
          this.totalstopTime = this.totalstopTime + Number(i.stopTime)
        }
     
      })
    },

    toggleOperation(value) {
      this.gridData.operatingGrid.selectedData = value
      this.gridData.operatingGrid.selectedData.quick = true
      let nowOn = '10'
      let nowOff = '20'
      if (value.state === nowOn) {
        this.popupState.stopCodePopup.visible = true
      } else if (value.state === nowOff) {
        this.vToastifyPrompt(
          this.$t('doRunning'),
          'info',
          current => {
            this.operation('start', true)
          },
          null,
          true
        )
      }
    },
    //비고 저장
    async remarkSave() {
      try {
        this.openLoading()
        let idArray = []
        this.formObject.worker.forEach(item => {
          idArray.push(item.id)
        })
        let param = {
          comCode: this.userData.company,
          facCode: this.userData.factory.code,
          workCode: this.formObject.workCode,
          workDecode: this.formObject.workDeCode,
          ilno: this.formObject.ilno,
          workType: '',
          // metGbn: this.formObject.metGbn,
          workCrew: this.formObject.workCrew,
          workDate: this.formObject.workDate,
          // workTime: 'string',
          // worker: 'string',
          // workerName: 'string',
          workNo: this.formObject.workNo,
          lotNo: this.formObject.lotNo,
          remark: this.formObject.remark,
          makeDate: this.formObject.makeDate,
          maker: this.formObject.maker,
          editDate: this.formObject.editDate,
          editor: this.formObject.editor,
          userId: idArray
        }
        await setPro0021(param)
        let array = [...this.workList]
        this.getPopData(array[this.selection])
        notify(this.$t('save'), 'success', 1500)
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    //수동자재투입
    async manualMaterial() {
      let selectedMainRows = await this.materialGridInstance.getSelectedRowsData()

      selectedMainRows.forEach(e => {
        this.queuePush(e.lotDetail)
      })
      this.btnMaterialSelection()
      this.popupState.materialPopup.visible = false
    },
    async btnMaterialSelection(event) {
      this.materialGridInstance.clearSelection()

      let params = {
        comCode: this.userData.company,
        facCode: this.userData.factory.code,
        workCode: this.formObject.workCode,
        pathCode: this.formObject.pathCode,
        partNo: this.formObject.partNo,
        workDecode: this.formObject.workDecode
      }

      let res = await getPro23Select(params)

      let array = res.list

      let cont = 0
      if (array !== null) {
        array.forEach(e => {
          e.id = cont++
        })
        this.gridData.materialGrid.data = array
        if (event) {
          this.popupState.materialPopup.visible = true
          this.processGridbtn = false
        }
      } else {
        this.gridData.materialGrid.data = []
        if (event) {
          this.popupState.materialPopup.visible = true
          this.processGridbtn = true
        }
      }
    },

    //공정검사 ->라디오 버튼 변경
    inspTimeChange() {
      this.getProcessData()
    },
    ///저장 관련
    async btnSave(target) {
      let message = ''
      try {
        if (target === 'process') {
          await this.processGridInstance.saveEditData()
          let selectedMainRows = await this.processGridInstance.getSelectedRowsData()

          if (!selectedMainRows.length) {
            this.vToastify(this.$t('SelectCheck'), 'warn')
            return
          }
          for (let row of selectedMainRows) {
            if (row.__created__ !== true) {
              row.editor = this.userData.userId
            }
          }
          // await setProcess(selectedMainRows)
          // this.getProcessData()
          this.vToastifyPrompt(
            this.$t('doSaveData'),
            'info',
            current => {
              this.openLoading()
              this.processGridInstance.beginUpdate()
              setProcess(selectedMainRows)
                .then(res => {
                  message = selectedMainRows[0].__created__ == true ? 'Saved' : 'changed'
                  this.getProcessData()
                  notify(this.$t(message), 'success', 1500)
                })
                .catch(error => {
                  notify(error, 'error', 1500)
                })
                .finally(() => {
                  this.processGridInstance.endUpdate()
                  this.processGridInstance.clearSelection()
                  this.endLoading()
                })
            },
            null,
            true
          )
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    editingStart2(e) {
      let cnt = e.data.insCnt // 만약 시료수(e.data.insCnt)의 수가 2라면

      for (let i = 0; 5 - cnt > i; i++) {
        // 5에서 2를 뺀 3보다 i값이 적을때만 for문 작동 (0,1,2)
        if (e.column.index == 15 - i) {
          // 만약 컬럼 인덱스가 18-i인 17, 16, 15인 컬럼을
          e.cancel = true // 작성하지 못하게 막음
        }
      }
    },
    //공정검사 cellPrepared
    cellPrepared2(e) {
      if (e.rowType === 'data') {
        let cnt = e.data.insCnt
        if (e.column.index > 10 && e.column.index <= 15) {
          if (e.column.index > 10 + parseInt(cnt) && e.column.index <= 15) {
            e.cellElement.style.backgroundColor = 'red'
          }
        }
      }
    },
    //공정검사 update
    async onRowUpdated(e) {
      let upAndLower = [e.data.insLow, e.data.insUpp]
      let upAndLowerMax = Math.max.apply(null, upAndLower)
      let upAndLowerMin = Math.min.apply(null, upAndLower)
      let newArr = [e.data.sample1, e.data.sample2, e.data.sample3, e.data.sample4, e.data.sample5]
      if (e.data.jugCodeh == '10') {
        for (let faill of newArr) {
          if (faill.includes('NG') || faill === '' || faill === null) {
            return (e.data.judge = '20')
          } else {
            e.data.judge = '10'
          }
        }
      } else {
        let fiter = newArr.filter(x => x != '')
        for (let faill of fiter) {
          if (faill !== '') {
            if (upAndLowerMax >= faill && upAndLowerMin <= faill) {
              e.data.judge = '10'
            } else {
              return (e.data.judge = '20')
            }
          }
        }
      }
    },
    //공정검사 조회
    async getProcessData() {
      this.processGridInstance.clearSelection()
      this.openLoading()
      try {
        this.gridData.processGrid.data = []
        this.process.data = []
        const dataObject = []

        const searchData = {
          comCode: this.userData.company,
          partNo: this.formObject.partNo
        }
        let getProInsp = await getItemInfo(searchData)

        let proInsp = getProInsp.list.length ? getProInsp.list[0].proInsp : 'N'

        if (proInsp === 'Y') {
          let params = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            partNo: this.formObject.partNo,
            insCode: 'LQC',
            ilno: this.formObject.ilno,
            workDate: this.formObject.workDate,
            inspTime: ''
          }

          // let res = await getQuaStanInfo(params)

          let processRes = await getProcess(params)

          // for (let i = 0; i < this.comboList.inspTimeList.length; i++) {
          //   res.list.forEach(e => {
          //     dataObject.push({
          //       comCode: this.userData.company, //회사코드
          //       facCode: this.userData.factory.code, //공장코드
          //       ilno: this.formObject.ilno,
          //       partNo: this.formObject.partNo,
          //       insCnt: e.insCnt,
          //       insCode: e.insCode, //검사유형 코드
          //       insMeth: e.insMeth, //측정방법  코드
          //       insType: e.insType, //검사항목 코드
          //       insUnit: e.insUnit, //검사단위 코드
          //       inspNo: e.inspNo, //검사순서
          //       jugCodeh: e.jugCodeh, //판정방법 코드
          //       makeDate: e.makeDate, //
          //       editDate: e.editDate, //수정날짜
          //       maker: e.maker, //생성자
          //       insBase: e.insBase, //검사기준
          //       insLow: e.insLow, // 하한치
          //       insUpp: e.insUpp, //상한치
          //       inspTime: this.comboList.inspTimeList[i].value, // 초품/중품/종품
          //       remark: '',
          //       judge: '20',
          //       sample1: '',
          //       sample2: '',
          //       sample3: '',
          //       sample4: '',
          //       sample5: '',
          //       __created__: true
          //     })
          //   })
          // }

          if (processRes.list) {
            processRes.list.forEach(e => {
              let findIndex = dataObject.findIndex(
                obj =>
                  obj.insMeth === e.insMeth &&
                  obj.insType === e.insType &&
                  obj.insUnit === e.insUnit &&
                  obj.inspNo === e.inspNo &&
                  obj.jugCodeh === e.jugCodeh &&
                  obj.inspTime === e.inspTime
              )
              if (findIndex >= 0) {
                dataObject[findIndex].judge = e.judge
                dataObject[findIndex].inspTime = e.inspTime
                dataObject[findIndex].sample1 = e.sample1
                dataObject[findIndex].sample2 = e.sample2
                dataObject[findIndex].sample3 = e.sample3
                dataObject[findIndex].sample4 = e.sample4
                dataObject[findIndex].sample5 = e.sample5
                dataObject[findIndex].remark = e.remark
                dataObject[findIndex].__created__ = false
              }
            })
          }

          this.process.data = dataObject
          this.gridData.processGrid.data = dataObject.filter(word => word.inspTime === this.popupState.processPopup.radio)
          let cont = 0
          this.gridData.processGrid.data.forEach(e => {
            e.id = cont++
          })
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    /////////////////////////LotDetail Queue //////////////////////////////////////////////
    queuePush(lotDetail) {
      this.queue.array.push(lotDetail)
      this.autoAction()
    },
    autoAction() {
      if (this.queue.inProgress === false) {
        this.queue.inProgress = true
        this.action()
      }
    },
    async action() {
      try {
        let allowLength = 15 //글자수 제한
        let textLengthCheck = !this.queue.array[0].length || this.queue.array[0].length > allowLength
        if (textLengthCheck) {
          return notify('글자수제한 15글자', 'error', 1500)
        }
        if (!textLengthCheck) {
          let params = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            ilno: this.formObject.ilno,
            lotDetail: this.queue.array[0],
            userId: this.userData.userId,
            pathCode: this.formObject.pathCode,
            workCode: this.formObject.workCode,
            workDecode: this.formObject.workDeCode,
            workNo: this.formObject.workNo
          }

          await setPro0023(params)

          let array = [...this.workList]
          this.getPopData(array[this.selection])
          this.materialInput.lotDetail = ''
          notify(this.$t('save'), 'success', 1500)
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.queue.array.shift()
        if (this.isEmpty) {
          this.clear()
          this.btnMaterialSelection()
        } else {
          this.action()
        }
      }
      ///// Working  coede//////

      ///////////////////////////
    },
    clear() {
      this.queue.inProgress = false
      this.queue.array = []
    },
    ///////////////////////////////////////////////////////////////////////

    //비가동 사유
    stopCodeSelect(list) {
      this.gridData.operatingGrid.stopCodeData = list
    },

    async operation(target, boolean) {
      try {
        if (target === 'start') {
          this.gridData.operatingGrid.selectedData.__order__ = true
          // this.gridData.operatingGrid.selectedData.stopCode = '' // 스탑코드 필요시 주석해재 (파라미터삽입)
          let array = [this.gridData.operatingGrid.selectedData]
          //시간계산
          let b = new Date(array[0].startTime)

          let a = new Date()

          let c = a.getTime() - b.getTime()

          let resultdate = c / (60 * 1000)

          let t = Math.floor(Math.abs(resultdate))
          ///

          array[0].workDeCode = this.formObject.workDeCode
          array[0].workCode = this.formObject.workCode
          array[0].editor = this.userData.userId
          ;(array[0].comCode = this.userData.company),
            (array[0].facCode = this.userData.factory.code),
            (array[0].workNo = this.formObject.workNo),
            (array[0].stopTime = t)

          await setOperating(array)
        } else if (target === 'stop') {
          if (!boolean) {
            this.gridData.operatingGrid.stopCodeData = {}
            this.popupState.stopCodePopup.visible = true
          } else {
            this.gridData.operatingGrid.selectedData.__order__ = false
            this.gridData.operatingGrid.selectedData.stopCode = this.gridData.operatingGrid.stopCodeData.value
            this.gridData.operatingGrid.selectedData.workNo = this.formObject.workNo
            let array = [this.gridData.operatingGrid.selectedData]
            array[0].workDeCode = this.formObject.workDeCode
            array[0].workCode = this.formObject.workCode
            array[0].maker = this.userData.userId
            ;(array[0].comCode = this.userData.company), (array[0].facCode = this.userData.factory.code), await setOperating(array)
            this.popupState.stopCodePopup.visible = false
          }
        } else if (target === 'close') {
          this.popupState.operatingPopup.visible = false
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        if (target !== 'close' && this.gridData.operatingGrid.selectedData.quick !== true) {
          this.operatingSearch(true)
        } else {
          this.operatingSearch(false)
        }
      }
    },

    // 문재의 구간 ////////////////////////////////////////////////////
    async operatingSearch(event) {
      try {
        if (event) {
          this.display.disableCheck.operationEndBt = true
          this.display.disableCheck.operationStartBt = true
          this.popupState.operatingPopup.visible = true
          this.operatingGridInstance.clearSelection()
          this.operatingGridInstance.option('focusedRowKey', undefined)
        }

        let params = {
          comCode: this.userData.company,
          facCode: this.userData.factory.code,
          workCode: this.formObject.workCode,
          workDecode: this.formObject.workDeCode,
          workNo: this.formObject.workNo
        }
        let operationCount = 0
        let noOperatingCount = 0
        let resList = await getEqp0010Main(params)
        let res = await getEqp0010(params)

        let cont = 0
        this.display.operateList = []

        res.list.forEach(e => {
         
          e.stopTime = ''
          e.id = cont++
          e.startTime = e.startTime ? e.startTime.substr(0, 16) : '-'
          e.endTime = e.endTime ? e.endTime.substr(0, 16) : '-'
          if (e.stopCode) {
            e.state = '20'
            noOperatingCount = noOperatingCount + 1
            e.operation
          } else {
            e.state = '10'
            operationCount = operationCount + 1
          }
          if (e.periInspDt && e.periInspNextDt) {
            e.dayInsp = `${e.periInspDt}/${e.periInspNextDt}`
          } else {
            e.dayInsp = '-/-'
          }
          if (e.dayInspDt && e.dayInspNextDt) {
            e.periInsp = `${e.dayInspDt}/${e.dayInspNextDt}`
          } else {
            e.periInsp = '-'
          }

          if (e.startTime != '-') {
            let b = new Date(e.startTime)

            let a = new Date()

            let c = a.getTime() - b.getTime()

            let resultdate = c / (60 * 1000)

            e.stopTime = Math.floor(resultdate)
          }
          
          this.display.operateList.push({
            id: e.no,
            name: e.eqName,
            eqCode: e.eqCode,
            state: e.state,
            nonIlno: e.nonIlno,
            no: e.no,
            comCode: e.comCode,
            facCode: e.facCode,
            workCode: e.workCode,
            startTime: e.startTime,
            stopTime: e.stopTime
          })

          // this.stopTimeA = parseInt(e.sumStopTime / 60)
          // this.stopTimeB = parseInt(e.sumStopTime % 60)
         
          this.StopTime(this.display.operateList)
          
        })

        this.gridData.operatingGrid.data = resList.list
        this.display.operate.working = operationCount
        this.display.operate.notWorking = noOperatingCount
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },

    //그리드 이벤트////////////////////////////////////////////////////////////////
    onCellPrepared(e) {
      let conditional = e.rowType === 'data' && e.column.dataField === 'state'
      if (conditional && e.value === this.$t('nonOperation')) {
        e.cellElement.style.color = 'red'
      } else if (conditional && e.value === '가동') {
        // e.cellElement.style.color = 'blue'
      }
    },
    //작업자들 선택 이벤트
    async onSelectionChanged(e) {
      this.openLoading()
      try {
        this.treeList.crew.selectedData = await e.component.getSelectedRowsData('all')
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    onFocusedRowChanged(e) {
      this.gridData.mainGird.focusRowData = e.row.data
    },
    operatingFocused(e) {
      if (e.rowIndex !== -1) {
        if (e.row.data.endTime) {
          this.display.disableCheck.operationEndBt = false
          this.display.disableCheck.operationStartBt = true
        } else {
          this.display.disableCheck.operationEndBt = true
          this.display.disableCheck.operationStartBt = false
        }

        this.gridData.operatingGrid.selectedData = e.row.data
      }
    },
    async cellDblClick(e) {
      let idArray = []
      this.formObject.worker.forEach(item => {
        idArray.push(item.id)
      })
      let param = {
        comCode: this.userData.company,
        facCode: this.userData.factory.code,
        workCode: this.formObject.workCode,
        workDecode: this.formObject.workDeCode,
        ilno: this.formObject.ilno,
        workType: this.formObject.workType,
        // metGbn: this.formObject.metGbn,
        workCrew: this.formObject.workCrew,
        workDate: this.formObject.workDate,
        // workTime: 'string',
        // worker: 'string',
        // workerName: 'string',
        workNo: e.data.workNo,
        lotNo: e.data.lotNo,
        remark: e.data.remark,
        makeDate: e.data.makeDate,
        maker: this.userData.userId,
        editDate: e.data.editDate,
        editor: e.data.editor,
        userId: idArray,
        btnOrderState: 30
      }

      await setPro0050(param)
      await setPro0021(param)
      let array = [...this.workList]
      this.getPopData(array[this.selection])

      this.popupClose('workOrder')
    },
    cellPrepared(e) {
      if (e.rowType == 'data') {
        let array = ['partno', 'partname']
        let count = 1
        let a = 0
        let conditional = array.includes(e.column.dataField)
        if (e.component.cellValue(e.rowIndex - 1, e.column.dataField) !== e.component.cellValue(e.rowIndex, e.column.dataField)) {
          e.MergeCellRowStart = true
        }

        let boolean = true
        if (conditional) {
          if (e.MergeCellRowStart) {
            let total = 0

            for (count; boolean; count++) {
              let next = e.component.cellValue(e.rowIndex + count, e.column.dataField)
              let now = e.component.cellValue(e.rowIndex, e.column.dataField)
              let qty = Number(e.component.cellValue(e.rowIndex + a++, 'qty'))

              total = total + qty

              if (next !== now) {
                boolean = false
              }
            }
            if (count > 1) {
              e.cellElement.rowSpan = count - 1
              e.data.spanCount = count - 1
              e.data.total = total
            }
          } else {
            e.cellElement.style.display = 'none'
          }
        } else if (e.column.dataField === 'total') {
          if (e.data.spanCount) {
            e.cellElement.rowSpan = e.data.spanCount
            e.cellElement.innerHTML = e.data.total
          } else {
            e.cellElement.style.display = 'none'
          }
        }

        // }
      }
    },
    //그리드 클릭
    workOrderListClick(e) {
      if (e.rowType === 'data') {
        this.gridData.workOrderGrid.selectData = e
      }
    },
    //작업지시 버튼 (생산품목 가동 버튼)
    async onWorkOrderState(target) {
      this.openLoading()
      try {
        let idArray = []
        this.formObject.worker.forEach(item => {
          idArray.push(item.id)
        })
        if (this.gridData.workOrderGrid.selectData !== null) {
          let targetData = this.gridData.workOrderGrid.selectData.data
          let params = {
            comCode: targetData.comCode,
            facCode: targetData.facCode,
            planDate: targetData.planDate,
            workCrew: targetData.workCrew,
            workCode: targetData.workCode,
            workDecode: targetData.workDecode,
            workNo: targetData.workNo,
            lotNo: targetData.lotNo,
            workDate: targetData.workDate,
            ilno: this.formObject.ilno,
            userId: idArray,
            // metGbn: this.formObject.metGbn,
            workType: this.formObject.workType,
            maker: this.userData.userId
          }
          if (target === 'start') {
            //진행버튼 클릭
            params.btnOrderState = 30
            await setPro0050(params)
            await setPro0021(params).finally(() => {
              this.workNoMark = params.workNo
            })

            this.btnSearch('workOrder')
            this.popupClose('workOrder')
          } else if (target === 'defer') {
            //보류버튼 클릭
            params.btnOrderState = 40
            await setPro0050(params)
            this.btnSearch('workOrder')
          } else if (target === 'termination') {
            // 강제종료 버튼 클릭
            params.btnOrderState = 50
            await setPro0050(params)
            this.btnSearch('workOrder')
          } else if (target === 'close') {
            let idArray = []
            this.formObject.worker.forEach(e => {
              idArray.push(e.id)
            })

            let param = {
              comCode: this.userData.company,
              facCode: this.userData.factory.code,
              workCode: this.formObject.workCode,
              workDecode: this.formObject.workDeCode,
              ilno: this.formObject.ilno,
              workType: this.formObject.workType,
              // metGbn: this.formObject.metGbn,
              workCrew: this.formObject.workCrew,
              workDate: this.formObject.workDate,
              // workTime: 'string',
              // worker: 'string',
              // workerName: 'string',
              workNo: targetData.workNo,
              lotNo: targetData.lotNo,
              remark: targetData.remark,
              makeDate: targetData.makeDate,
              maker: targetData.maker,
              editDate: targetData.editDate,
              editor: targetData.editor,
              userId: idArray
            }
            //await setPro0021(param)

            let array = [...this.workList]
            this.getPopData(array[this.selection])
            this.popupClose('workOrder')
          }

          notify(this.$t('save'), 'success', 1500)
        } else if (target === 'create') {
          //작업지시 생성 버튼 이벤트
          this.popupState.workOrder.createWorkOrder.visible = true
        } else if (target === 'close') {
          //닫기 버튼 이벤트
          this.popupClose('workOrder')
        } else {
          throw new SyntaxError(this.$t('SelectCheck'))
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    //숫자 포메터
    customizeText(cellInfo) {
      return cellInfo.valueText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    ////////////////////////////////////////////////////////////////////////////

    valueChange(target) {
      try {
        this.openLoading()
        if (target === 'workType') {
          this.formObject.ilno = ''
          this.formObject.workCrew = this.comboList.workCrew[0].value
          this.formObject.workDate = getDateFormat(new Date())
          // this.formObject.metGbn = this.comboList.outputType[0] ? this.comboList.outputType[0].value : ''
          this.formObject.worker = []
          this.formObject.lotNo = ''
          this.formObject.partNo = ''
          this.formObject.partName = ''
          this.formObject.pathCode = ''
          this.formObject.pathName = ''
          this.formObject.remark = []
          this.formObject.workNo = ''
          this.display.orderQty = 0
          this.performance.planQty = 0
          this.performance.orderQty = 0
          this.gridData.mainGird.data = []
          this.gridData.materialInputGird.data = []
          this.display.materialTotal = 0
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    async workStandard() {
      try {
        this.openLoading()
        let params = {
          comCode: this.userData.company,
          upType: 'WS',
          proCode: this.formObject.workCode,
          upFileName: `${this.formObject.partNo + '.pdf'}`,
          upFileSize: '316576'
        }

        let res = await getDataFile(params)
        let binaryString = window.atob(res.list[0].imageBase64)
        let binaryLen = binaryString.length
        let bytes = new Uint8Array(binaryLen)
        for (let a = 0; a < binaryLen; a++) {
          let ascii = binaryString.charCodeAt(a)
          bytes[a] = ascii
        }
        let blob = new Blob([bytes], {
          type: res.list[0].contentType
        })
        window.open(URL.createObjectURL(blob) + '#view=fitH', '_blank')
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    async newWork() {
      try {

       if(this.gridData.mainGird.data.length === 0 ){ 

        this.vToastifyPrompt(
          this.$t('newDataAlert'),
          'info',
          () => {



           
             


            this.openLoading()
            this.formObject.ilno = ''
            this.formObject.workCrew = ''
            this.formObject.workType = '10'
            // this.formObject.metGbn = this.comboList.outputType[0] ? this.comboList.outputType[0].value : ''
            this.formObject.workDate = getDateFormat(new Date())
            this.formObject.worker = []
            this.formObject.lotNo = ''
            this.formObject.partNo = ''
            this.formObject.partName = ''
            this.workNoMark = ''
            this.formObject.pathCode = ''
            this.formObject.pathName = ''
            this.formObject.remark = []
            this.formObject.workNo = ''
            this.display.orderQty = 0
            this.performance.planQty = 0
            this.performance.orderQty = 0
            this.gridData.mainGird.data = []
            this.gridData.materialInputGird.data = []
            this.display.materialTotal = 0
            this.gridData.workHistoryDetail.data = []
   
            this.workTimeTop = 0
            this.stratTimeTop = '작업 시작 전'


    
    
          },
          null,
          true
        )
      }
      else{
        return  notify('실적이 있어서 새작업을 진행할 수 없습니다', 'error', 1500)
      }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
       
        this.endLoading()
      }
    },
    // 여기 코드받음
    defectiveCodeSelect(code) {
      
 

      if(code !== undefined || code.qty !== 0){
      
      this.performance.defectiveCode = code
      
     
      this.insertData('defective')

    }


     
    },

    ////////////////////////////////////키다운 이벤트//////////////////////////
    keyDown(e) {
      if (e.key === 'Enter') {
        // this.insertData('lotDetail')
        this.queuePush(this.materialInput.lotDetail)
      }
    },
    

    async btnDelete() {
      try {
        let deleteRows = await this.griMainInstance.getSelectedRowsData()
        if (deleteRows.length === 0) {
          notify('삭제할 데이터가 없습니다.', 'error', 1500)
          return
        }
        
        for(let i of deleteRows){
          if(i.workDecode !== this.formObject.workDecode){
            return notify('같은 반만 삭제 가능합니다', 'error', 1500) 
          }
        }
   
        let proSumQty = 0
        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          () => {
            this.openLoading()
        
            deleteRows.forEach(e => {
              if (e.proType === '양품') {
                proSumQty += Number(e.qty)
              }
            })
            deleteRows.forEach(e => {
              e.proSumQty = proSumQty
              e.workNo = this.formObject.workNo
              e.userId = this.userData.userId
              e.workCode = this.formObject.workCode
              e.pathCode = this.formObject.pathCode
              e.whCode = this.formObject.workDeCode
            })

          
            getBack(deleteRows)
              .then(res => {
                let array = [...this.workList]
                this.getPopData(array[this.selection])
                this.griMainInstance.saveEditData()
                this.griMainInstance.clearSelection()
                notify(this.$t('changed'), 'success', 1500)
              })
              .catch(error => {
                notify(error, 'error', 1500)
              })
          },
          null,
          true
        )
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    //조회
    async btnSearch(target) {
      try {
        if (target === 'workOrder') {
          this.openLoading()
          this.workOrderGridCodeInstance.option('focusedRowKey', undefined)
          this.workOrderGridCodeInstance.clearSelection()
          let nowData = `${new Date().getFullYear()}-${this.display.time.month}-${this.display.time.day}`
          let params = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            planDate: this.popupState.workOrder.radio.planDate ? nowData : '',
            workCrew: this.popupState.workOrder.radio.workCrew ? this.formObject.workCrew : '',
            workCode: this.formObject.workCode,
            workDecode: this.popupState.workOrder.radio.workCrew ? this.formObject.workDecode : '',
            orderState: this.planDateStatesSeacrh
          }

          this.gridData.workOrderGrid.data = []
          let res = await getPro0050(params)

          let cont = 0
          res.list.forEach(e => {
            e.id = cont++
          })
          this.gridData.workOrderGrid.data = res.list
        }
        if (target === 'workHistory') {
          let workHistoryParams = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            ilNo: this.formObject.ilno,
            workNo: this.formObject.workNo,
            frDate: this.workHistory.search.start,
            toDate: this.workHistory.search.end,
            workCode: this.workHistory.workCode,
            orderState: this.printradio == 50 ? '' : 60
          }

          let res = await getPro0025(workHistoryParams)
          let cont = 0

          res.list.forEach(e => {
            e.id = cont++
          })

   

          this.gridData.workHistoryGrid.data = res.list
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        // this.workHistoryGridInstance.clearSelection()
        this.endLoading()
      }
    },

    ////////////////////////////////작업장 작업반관련/////////////////////////////////////
    //작업장 추가
    async workAdd(event) {
      try {
        this.openLoading()
        if (event) {
          //push
          let selectArray = this.treeListWorkCodeInstance.getSelectedRowsData()
          if (selectArray.length > 0) {
            let filterArray = this.treeList.workCode.selectedData.filter(word => word.type === 'workDecode')

            filterArray.forEach(e => {
              let boolean = this.gridData.workDecodePopup.data.some(item => item.code === e.code)
              if (!boolean) {
                this.gridData.workDecodePopup.data.push(e)
              }
            })
          } else {
            throw new SyntaxError(this.$t('SelectCheck'))
          }
        } else {
          //<- pop
          await this.workDecodePopupInstance.saveEditData()
          let selectedMainRows = await this.workDecodePopupInstance.getSelectedRowsData()
          if (selectedMainRows.length !== 0) {
            let copyWorker = [...this.gridData.workDecodePopup.data]
            selectedMainRows.forEach(e => {
              let index = this.gridData.workDecodePopup.data.findIndex(item => item.id === e.id)
              let listIndex = this.treeList.workCode.data.findIndex(item => item.id === e.id)
              this.treeListWorkCodeInstance.deselectRows(listIndex + 1)
              copyWorker.splice(index, 1)
              this.gridData.workDecodePopup.data = [...copyWorker]
              this.workDecodePopupInstance.option('focusedRowKey', undefined)
            })
          } else {
            throw new SyntaxError(this.$t('SelectCheck'))
          }
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    //작업반 선택이벤트
    async workOnSelectionChanged(e) {
      this.openLoading()
      try {
        this.treeList.workCode.selectedData = await e.component.getSelectedRowsData('all')
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },

    //작업장 변경할때 데이터 조회
    async getPopData(object) {


      this.openLoading()
      try {
        let param = {
          comCode: this.userData.company,
          facCode: this.userData.factory.code,
          workCode: object.workCode,
          workDecode: object.workDeCode,
          whCode :this.formObject.workDeCode
        }

        let res = await getPro0021(param)
        console.log('asd',res)
        this.res = res
        
        //   //
        if (!res.code) {
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          this.formObject.worker = []

          let idArray = []
          let nameArray = []

          if (res.worker) {
            idArray = res.worker.split(',')
            nameArray = res.workerName.split(',')
          }

          idArray.forEach((e, index) => {
            this.formObject.worker.push({
              id: e,
              name: nameArray[index]
            })
          })


          
          //  //시간계산
          //  let b = new Date(res.makeTime)

          //   let a = new Date()

          //   let c = a.getTime() - b.getTime()

          //   let resultdate = c / (60 * 1000)

          //   let t = Math.floor(Math.abs(resultdate))
          //   ///



          this.workNoMark =  res.workNo ?? ''
          this.formObject.ilno =  res.ilno ?? ''
          this.formObject.workCode =  res.workCode ?? ''
          this.formObject.workCrew =  res.workCrew ?? ''
          this.formObject.workType = '10'
          // this.formObject.metGbn = res.metGbn
          this.formObject.workDate =  res.workDate ?? ''
          this.formObject.lotNo =  res.lotNo ?? ''
          this.formObject.partNo =  res.partNo ?? ''
          this.formObject.partName =  res.partName ?? ''
          this.formObject.pathCode =  res.pathCode ?? ''
          this.formObject.pathName = res.pathName ?? ''
          this.formObject.remark = res.remark ?? ''
          this.formObject.workNo = res.workNo ?? ''
          this.formObject.workDecode = res.workDecode ?? ''
          this.performance.qty = res.lotSize ?? 0
          this.performance.planQty = res.planQty ?? 0
          this.performance.orderQty = res.orderQty ?? 0
          this.stratTimeTop = res.makeDate ?? '작업 시작 시간 없음'
          this.workTimeTop = res.makeTime ?? '작업시간 없음'
          this.ResetQty =  res.lotSize ?? 0
          this.operatingSearch(false)
          this.getProcessData()

          

          let materialInputParams = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            workCode: object.workCode,
            workDecode: object.workDeCode,
            partNo: res.partNo,
            lotNo: res.lotNo,
            ilno: res.ilno,
            userId: this.userData.userId,
            pathCode: res.pathCode
          }

          let materialRes = await getPro0023(materialInputParams)

          let filterArray = []
          if (materialRes.list[0]) {
            filterArray = JSON.parse(materialRes.list[0]).filter(word => !!Number(word.qty))
          }

          let cont = 0
          let materialTotal = 0
          let array = []
          if (filterArray.length) {
            filterArray.forEach(e => {
              e.id = cont++
              materialTotal = e.prodqty //자재투입 표시 데이터 합계this.gridDat
            })
            array = filterArray
          }

          array.sort((a, b) => {
            let partnoA = a.partno.toUpperCase()
            let partnoB = b.partno.toUpperCase()

            if (partnoA > partnoB) {
              return 1
            }
            if (partnoA < partnoB) {
              return -1
            }
            return 0
          })

          this.gridData.materialInputGird.data = array

          if (isNaN(materialTotal)) {
            this.display.materialTotal = 0
          } else {
            this.display.materialTotal = materialTotal
          }
          // if (this.formObject.workType === '10') {
          //   this.performance.planQty = res.orderQty ? res.orderQty : 0
          // }
          // if (this.formObject.workType === '20' && filterArray.length) {
          //   this.formObject.lotNo = filterArray[0].lotno
          //   this.formObject.partNo = filterArray[0].partno
          //   this.formObject.partName = filterArray[0].partname
          //   this.formObject.pathName = filterArray[0].pathname
          //   this.formObject.pathCode = filterArray[0].pathcode
          // }
          // if (this.formObject.workType === '20') {
          //   this.performance.planQty = materialTotal
          // }
          let workHistoryParams = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            workNo: this.formObject.workNo,
            workCode:this.formObject.workCode
            
          }
          let workHistoryRes = await getPro0026(workHistoryParams)
          cont = 1
          let faireQty = 0
          let defectiveQty = 0
          // let planQty2 = workHistoryRes.list[0].planQty

          workHistoryRes.list.forEach(e => {
            e.id = cont++
            if (e.proType === '양품') {
              faireQty = faireQty + parseInt(e.qty)
            } else if (e.proType === '불량') {
              defectiveQty = defectiveQty + parseInt(e.qty)
            }
          })
          this.performance.faireQty = faireQty
          this.performance.defectiveQty = defectiveQty
          this.gridData.mainGird.data = workHistoryRes.list //그리드 데이터 넣어주는 부분
          
          // this.performance.planQty = planQty2
          // this.performance.planQty = workHistoryRes.list.planQty
          ///작업이력탭//////////////////////////////////////
          this.btnSearch('workHistory')
        } else {
          this.formObject.ilno = ''

          this.formObject.workCrew = ''
          this.formObject.workType = '10'
          // this.formObject.metGbn = ''

          this.formObject.workDate = ''
          this.formObject.worker = []
          this.formObject.lotNo = ''
          this.formObject.partNo = ''
          this.formObject.partName = ''
          this.formObject.pathCode = ''
          this.formObject.pathName = ''
          this.formObject.remark = []
          this.formObject.workNo = ''
          this.display.orderQty = 0
          // this.performance.planQty = 0
          this.gridData.mainGird.data = []
          this.gridData.materialInputGird.data = []
          this.display.materialTotal = 0
          this.performance.defectiveList = []
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    //작업반 push/pop
    async workerAdd(event) {
      this.openLoading()
      try {
        if (event) {
          // ->push
          let selectArray = this.treeListInstance.getSelectedRowsData()
          if (selectArray.length !== 0) {
            let filterArray = this.treeList.crew.selectedData.filter(word => word.type === 'person')

            filterArray.forEach(e => {
              let boolean = this.gridData.workerList.data.some(item => item.userId === e.userId)
              if (!boolean) {
                this.gridData.workerList.data.push(e)
              }
            })
          } else {
            throw new SyntaxError(this.$t('SelectCheck'))
          }
        } else {
          //<- pop
          await this.workerListInstance.saveEditData()
          let selectedMainRows = await this.workerListInstance.getSelectedRowsData()
          if (selectedMainRows.length !== 0) {
            let copyWorker = [...this.gridData.workerList.data]
            selectedMainRows.forEach(e => {
              let index = this.gridData.workerList.data.findIndex(item => item.id === e.id)
              let listIndex = this.treeList.crew.data.findIndex(item => item.id === e.id)
              this.treeListInstance.deselectRows(listIndex + 1)
              copyWorker.splice(index, 1)
              this.gridData.workerList.data = [...copyWorker]
              this.workerListInstance.option('focusedRowKey', undefined)
            })
          } else {
            throw new SyntaxError(this.$t('SelectCheck'))
          }
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    async workListSetting() {
      this.openLoading()
      try {
        let params = {
          comCode: this.userData.company,
          userId: this.userData.userId,
          facCode: this.userData.factory.code
        }
        this.workList = []

        let userWorkList = await getPro0020(params)
        await userWorkList.list.forEach(e => {
          this.workList.push({
            workCode: e.workCode,
            workName: e.workName,
            workDeCode: e.workDecode,
            workDeName: e.workDename,
            key: this.workList.length
          })
        })
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    /////////////////////////////////////////////////////////////////////////////////////
    async insertData(target) {
      this.openLoading()
      try {
        if (target === 'work') {
          await this.workDecodePopupInstance.saveEditData()
          let selectData = this.gridData.workDecodePopup.data
          await selectData.forEach(e => {
            e.workDecode = e.code
            e.comCode = this.userData.company
            e.facCode = this.userData.factory.code
            e.userId = this.userData.userId
          })
          await setPro0020(selectData)
          await this.workListSetting()
          this.popupState.workAddPopup.visible = false
        } else if (target === 'crew') {
          await this.workerListInstance.saveEditData()
          let selectData = this.gridData.workerList.data
          this.formObject.worker = []
          selectData.forEach(e => {
            this.formObject.worker.push({
              id: e.userId,
              name: e.name
            })
          })
          let workerArray = []
          this.popupState.crewPopup.visible = false
          this.formObject.worker.forEach(e => {
            workerArray.push(e.id)
          })

          let parmas = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code,
            workCode: this.formObject.workCode,
            workDecode: this.formObject.workDeCode,
            ilno: this.formObject.ilno,
            workType: this.formObject.workType,
            // metGbn: this.formObject.metGbn,
            workCrew: this.formObject.workCrew,
            workDate: this.formObject.workDate,
            // worker: '',
            workNo: '',
            lotNo: '',
            remark: '',
            makeDate: '',
            maker: '',
            editDate: '',
            editor: '',
            userId: workerArray
          }

          await setPro0022(parmas) //set0022 -> setPro0022이름 변경
          ////주석 추가
          let array = [...this.workList]
          this.getPopData(array[this.selection])
        } else if (target === 'qtyAdd') {
        
            let totalQty = parseInt(this.totalQty)
            if (totalQty === 0) {
              notify('총수량이 0입니다.', 'error', 1500)
              return
            }

            let addArray = []
            // if (totalQty <= this.display.materialTotal) {
            let params = {
              comCode: this.userData.company, //회사코드
              facCode: this.userData.factory.code, // 공장코드
              ilNo: this.formObject.ilno, // 일련번호
              whCode: this.formObject.workDeCode, //창고코드
              workNo: this.formObject.workNo, // 작업지시번호
              workDate: this.formObject.workDate, //일자
              workCode: this.formObject.workCode, //작업장코드
              pathCode: this.formObject.pathCode, // 경로코드
              proType: '10', //양품
              defCode: '', //불량코드
              partNo: this.formObject.partNo, //품번
              qty: this.totalQty.toString(), // 투입개수
              lotNo: this.formObject.lotNo, // 출하LOT
              userId: this.userData.userId, // ID
              inputQty: this.performance.qty, // 수량
              box: this.performance.box, // 박스
              workType: this.formObject.workType,
              proCode: this.formObject.proCode // 공정코드
            }
            addArray.push(params) //저장시킬 값을 배열에 넣음
            await setPro0025(addArray)

            this.performance.qty = 0
            this.performance.box = 1
            this.getPopData(this.workList[this.selection])
            // } else {
            // throw new SyntaxError('투입된자재보다 실적양이 많습니다.')
            // }
         

          //양품등록
        } else if (target === 'defective') {
          let code = this.performance.defectiveCode // 선택된 값 들고오
      

          if(code.value !== undefined){
          let newQty = Number(code.qty) // 바꿀 qty

          for (let i = 0; i < this.performance.defectiveList.length; i++) {
            let obj = this.performance.defectiveList[i]
            let oldQty = this.performance.defectiveList[i].qty

            if (obj.code === code.value && obj.qty === oldQty) {
              obj.qty = newQty
              break
            }
          } // qty 새로운 qty 추가

          let uniqueSet = new Set(this.performance.defectiveList.map(obj => JSON.stringify(obj))) // 중복제거를위해 새로운 newSet 생성

          let newObject = { code: code.value, name: code.name, qty: newQty } // 비교할 obj 생성
          let newObjectStr = JSON.stringify(newObject)
          if (!uniqueSet.has(newObjectStr)) {
            this.performance.defectiveList.push(newObject)
          }
          this.performance.defectiveList =  this.performance.defectiveList.filter(x=> x.qty !== 0)
          
        }
      

        } else if (target === 'defectiveAdd') {
        
          let array = [...this.workList]
          let defArray = []
          //불량등록 데이터 -> 수량,불량코드는 배열로 들어옴
          //불량등록 종류만큼 파라미터생성
          for (let i = 0; i < this.performance.defectiveList.length; i++) {
            let defParam = {
              comCode: this.userData.company, //회사코드
              facCode: this.userData.factory.code, // 공장코드
              ilNo: this.formObject.ilno, // 일련번호
              whCode: this.formObject.workDeCode, //창고코드
              workNo: this.formObject.workNo, // 작업지시번호
              workDate: this.formObject.workDate, //일자
              workCode: this.formObject.workCode, //작업장코드
              pathCode: this.formObject.pathCode, // 경로코드
              proType: '20', //불량
              defCode: this.performance.defectiveList[i].code, //불량코드
              partNo: this.formObject.partNo, //품번
              qty: this.performance.defectiveList.reduce((sum, a) => sum + Number(a.qty), 0).toString(), //불량총수량
              lotNo: this.formObject.lotNo, // 출하LOT
              userId: this.userData.userId, // ID
              inputQty: this.performance.defectiveList[i].qty.toString(), //수량
              box: '1', // 박스
              workType: this.formObject.workType,
              proCode: this.formObject.proCode // 공정코드
            }
            
            defArray.push(defParam) //저장시킬 값을 배열에 넣음
          }

          await setPro0025(defArray)
         
          .then(res => {
     

          })
          .finally(()=>{
            this.performance.defectiveList = [] // 초기화
            for (let i of this.comboList.defectiveCode) {i.qty = 0}// 초기화
            this.griMainInstance.clearSelection()
            this.getPopData(array[this.selection])
          
            notify('불량 등록 되었습니다', 'success', 1500)

          })

        } 
        else if (target === 'Reset') {
          this.performance.defectiveList = []
          for (let i of this.comboList.defectiveCode) {
            i.qty = 0
          }
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    async removeList(id) {
      this.openLoading()
      try {
        let copyArray = [...this.performance.defectiveList]
        let filterArray = await copyArray.filter(word => word.id !== id)
        let cont = 0
        filterArray.forEach(e => {
          e.id = cont++
        })
        this.performance.defectiveList = filterArray
        this.editMode = false
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    ////////////////////////////////팝업 관련////////////////////////////////////////////
    async popOpen(text) {
      try {
        if (text === 'crew') {
          this.gridData.workerList.data = []
          let param = {
            comCode: this.userData.company
          }
          let workerList = await getWorkerList(param)
          let dpList = await getDepartment(param)
          let dpGroup = [
            {
              id: 1,
              head: 0,
              name: 'All',
              code: 'All',
              type: 'group',
              hasItems: true
            }
          ]

          await dpList.list.forEach(e => {
            if (!dpGroup.some(item => item.name === e.paDecode)) {
              e.state = false
              this.treeList.crew.expandedRow.push(dpGroup.length + 1)

              dpGroup.push({
                id: dpGroup.length + 1,
                head: 1,
                name: e.depName,
                code: e.depCode,
                type: 'group',
                hasItems: true
              })
            } else {
              dpGroup.forEach(item => {
                this.treeList.crew.expandedRow.push(dpGroup.length + 1)
                if (item.name === e.paDecode) {
                  dpGroup.push({
                    id: dpGroup.length + 1,
                    head: item.id,
                    name: e.depName,
                    code: e.depCode,
                    type: 'group',
                    hasItems: true
                  })
                }
              })
            }
          })
          await workerList.list.forEach(e => {
            let index = dpGroup.findIndex(obj => obj.code === e.depCode)

            dpGroup.push({
              id: dpGroup.length + 1,
              head: index + 1,
              name: e.userName,
              userId: e.userId,
              type: 'person',

              hasItems: false
            })
          })
          this.treeList.crew.data = [...dpGroup]
          this.workerListInstance.saveEditData()

          //  작업자 리스트  푸시
          this.formObject.worker.forEach(e => {
            this.gridData.workerList.data.push(this.treeList.crew.data.find(word => word.userId === e.id))
          })

          let listIndex = []
          this.gridData.workerList.data.forEach(e => {
            listIndex.push(this.treeList.crew.data.findIndex(item => item.id === e.id) + 1)
            this.treeListInstance.selectRows(listIndex, true)
          })
          this.workerListInstance.option('focusedRowKey', undefined)
          this.workerListInstance.clearSelection()

          this.popupState.crewPopup.visible = true
        } else if (text === 'work') {
          this.gridData.workDecodePopup.data = []

          let params = {
            comCode: this.userData.company,
            facCode: this.userData.factory.code
          }
          let workCodeRes = await getBas0034(params)
          let workDeCodeRes = await getBas0035(params)
          let array = [
            {
              id: 1,
              head: 0,
              code: 'All',
              codeName: 'All',
              type: 'work',
              hasItems: true
            }
          ]

          workCodeRes.list.forEach(e => {
            this.treeList.workCode.expandedRow.push(array.length + 1)
            array.push({
              id: array.length + 1,
              code: e.code,
              codeName: e.codename,
              head: 1,
              hasItems: true
            })
          })
          workDeCodeRes.list.forEach(e => {
            let index = array.findIndex(obj => obj.code === e.workCode)
            this.treeList.workCode.expandedRow.push(array.length + 1)
            array.push({
              id: array.length + 1,
              head: index + 1,
              code: e.code,
              codeName: e.codename,
              type: 'workDecode',

              hasItems: false
            })
          })

          this.workDecodePopupInstance.clearSelection()
          this.treeList.workCode.data = [...array]

          //리스트  작업장 리스트  푸시
          this.workList.forEach(e => {
            this.gridData.workDecodePopup.data.push(this.treeList.workCode.data.find(word => word.code === e.workDeCode))
          })
          let listIndex = []
          this.gridData.workDecodePopup.data.forEach(e => {
            listIndex.push(this.treeList.workCode.data.findIndex(item => item.id === e.id) + 1)
            this.treeListWorkCodeInstance.selectRows(listIndex, true)
          })
          this.workOrderGridCodeInstance.option('focusedRowKey', undefined)
          this.workDecodePopupInstance.clearSelection()
          //////////////////////
          this.popupState.workAddPopup.visible = true
        } else if (text === 'item') {
          this.btnSearch('workOrder')
          this.gridData.workOrderGrid.selectData = null
          this.workOrderGridCodeInstance.option('focusedRowKey', undefined)
          this.workOrderGridCodeInstance.clearSelection()

          this.popupState.workOrder.visible = true
        } else if (text === 'process') {
          this.getProcessData()
          this.popupState.processPopup.visible = true
        }
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },

    //////////////////////////////////공통코드, 기본셋팅 //////////////////////////////////

    async comboListSet() {
      this.openLoading()
      try {
        let params = {
          comCode: this.userData.company,
          facCode: this.userData.factory.code,
          code:
            'WORK_TYPE,MET_GBN,WORK_CREW,ITEM_TYPE,DEF_CODE,STOP_CODE,INS_METH,INS_TYPE,INPT,JUG_CODEH,UNIT,SAMPLE,JUDGE,INPT1,FAC_ST_CODE,ORDER_STATE'
        }
        let resData = await getCmChildCode(params)

        // 설비 LookUp
        let a = await getFactoryInfoData({ comCode: this.userData.company })
        let param = {
          comCode: this.userData.company,
          facCode: a.list[0].facCode
        }
        let eqDatas = await getFacilityInfo(param)

        this.eqCodeList = eqDatas.list.map(e => {
          return { name: e.eqName, value: e.eqCode }
        })

        let filterData = resData.list

        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'WORK_CREW' && word.codegr === 'PRO')
          .forEach(e => {
            this.comboList.workCrew.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'ITEM_TYPE' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.itemType.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'DEF_CODE' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.defectiveCode.push({
              id: this.comboList.defectiveCode.length + 1,
              name: e.sysName,
              value: e.sysCode,
              qty: 0
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'STOP_CODE' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.stopCodeList.push({
              id: this.comboList.stopCodeList.length + 1,
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'INPT' && word.codegr === 'QAT')
          .forEach(e => {
            this.comboList.insCodeList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'INS_TYPE' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.insTypeList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'INS_METH' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.insMethList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'JUG_CODEH' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.jugCodehList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'UNIT' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.insUnitList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'SAMPLE' && word.codegr === 'QAT')
          .forEach(e => {
            this.comboList.sampleList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'JUDGE' && word.codegr === 'QAT')
          .forEach(e => {
            this.comboList.judgeList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'INPT1' && word.codegr === 'QAT')
          .forEach(e => {
            this.comboList.inspTimeList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })
        filterData
          .filter(word => word.userFlag === 'Y' && word.code === 'STOP_CODE' && word.codegr === 'COM')
          .forEach(e => {
            this.comboList.facStateCodeList.push({
              name: e.sysName,
              value: e.sysCode
            })
          })

        this.popupState.processPopup.radio = this.comboList.inspTimeList[0].value
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },
    deleteMode(editMode) {
      this.editMode = !editMode
    },

    popupClose(target) {
      if (target === 'work') {
        this.popupState.workAddPopup.visible = false
      } else if (target === 'crew') {
        this.popupState.crewPopup.visible = false
      } else if (target === 'workOrder') {
        this.popupState.workOrder.visible = false
      }
    },

    //////////////////////////////////////////////////////////////////
    async listClick(e) {
      this.openLoading()
      if (e.rowType === 'data') {
        try {
          if (e.rowIndex !== -1) {
            let param = {
              comCode: this.userData.company,
              facCode: this.userData.factory.code,
              workCode: e.data.code
            }
            let workCodeRes = await getBas0035(param)
            let cnt = 0

            workCodeRes.list.forEach(e => {
              e.id = cnt++
            })
            this.gridData.workDecodePopup.data = workCodeRes.list
            this.workDecodePopupInstance.clearSelection()
            this.workDecodePopupInstance.option('focusedRowKey', undefined)
            this.popupState.workAddPopup.submitBt = true
          }
        } catch (error) {
          notify(error, 'error', 1500)
        }
      }
    },
    async dataSettting() {
      try {
        let params = {
          comCode: this.userData.company,
          userId: this.userData.userId
        }

        let resData = await getCompany(params) //회사정보
        let userFacData = await getUser(params) //사원정보
        let factoryList = await getFactoryInfoData(params) //공장정보
        this.userData.factory.code = userFacData.list[0].facCode

        let workListParams = {
          comCode: this.userData.company,
          facCode: this.userData.factory.code
        }
        let workCodeRes = await getBas0034(workListParams) //작업장정보
        let workDeCodeRes = await getBas0035(workListParams) //작업반정보

        workCodeRes.list.forEach(e => {
          this.comboList.workCodeList.push({
            name: e.codename,
            value: e.code
          })
        })
        workDeCodeRes.list.forEach(e => {

          this.comboList.workDeCodeList.push({
            name: e.codename,
            value: e.code
          })
        })
        this.userData.name = userFacData.list[0].userName
        this.display.company = resData.list[0].comName
        let factoryFilterData = factoryList.list.filter(word => word.facCode === this.userData.factory.code)
        this.display.factory = factoryFilterData[0].facName
        this.workListSetting()
      } catch (error) {
        notify(error, 'error', 1500)
      } finally {
        this.endLoading()
      }
    },

    nowTime() {
      this.timeFunc = setInterval(() => {
        let date = new Date()
        this.display.time.year = date
          .getFullYear()
          .toString()
          .substr(2)
        this.display.time.month = String(date.getMonth() + 1).padStart(2, '0')
        this.display.time.day = String(date.getDate()).padStart(2, '0')
        this.display.time.week = this.$t(`weekArray[${date.getDay()}]`)
        this.display.time.hour = String(date.getHours()).padStart(2, '0')
        this.display.time.minutes = String(date.getMinutes()).padStart(2, '0')
        this.display.time.second = String(date.getSeconds()).padStart(2, '0')
      }, this.timeCounter.delay)
    },
    //새로고침
    async totalRefresh() {
      //셀렉션 구간
      this.selection = 0
      let array = [...this.workList]
      this.formObject.workName = array[this.selection].workName
      this.formObject.workCode = array[this.selection].workCode
      this.formObject.workDeCode = array[this.selection].workDeCode
      this.formObject.workDeName = array[this.selection].workDeName
      this.getPopData(array[this.selection])
      this.performance.defectiveList = []
      this.gridData.workHistoryDetail.data = []
      //버튼 초기화
      this.display.disableCheck.workerBt = false
      this.display.disableCheck.workOrderBt = false
      this.display.disableCheck.remarkBt = false

      /// 실적등록 수량탭

      this.performance.qty = 0
      this.performance.box = 1
      this.performance.defectiveQtyInput = 0
      this.gridData.mainGird.data = []
      //자재투입 탭
      this.materialInput.lotDetail = ''
      this.gridData.materialInputGird.data = []
      // 탭초기화
      this.tab = 0

      notify('refresh', 'success', 1500)
    },
    async btnAdd() {},
    //////////////////////////////////////////////////////////////////////////
    btnPerfomance(event, target) {
      try {
        if (target === 'qty') {
          if (event) {
            //+버튼
            this.performance.qty = parseInt(this.performance.qty) + 100
          } else {
            //-버튼

            this.performance.qty = parseInt(this.performance.qty) - 100
            if (this.performance.qty < 0) {
              this.performance.qty = 0
            }
          }
        } else if (target === 'defectiveQty') {
          if (event) {
            //+버튼
            this.performance.defectiveQtyInput = parseInt(this.performance.defectiveQtyInput) + 100
          } else {
            //-버튼

            this.performance.defectiveQtyInput = parseInt(this.performance.defectiveQtyInput) - 100
            if (this.performance.defectiveQtyInput < 0) {
              this.performance.defectiveQtyInput = 0
            }
          }
        }
      } catch (error) {
        notify(error, 'error', 1500)
      }
    },
    qtyCange(event) {
      if (event) {
        console.log('')
      }
    },

    btnClick(gbn) {
      this.btnList[0].btnColor = false
      this.btnList[0].btnColor2 = false
      this.btnList[0].btnColor3 = false
      this.btnList[0].btnColor4 = false
      this.btnList[0].btnColor5 = false
      this.btnList[0].btnColor6 = false
      this.btnList[0].btnColor7 = false
      this.btnList[0].btnColor8 = false
      this.btnList[0][gbn] = true
    }
  }
}
</script>
<style scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  width: 100%;
  padding-top: 4px;
  padding-bottom: 0px;
  padding-left: 12px;
  padding-right: 12px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.work_num {
  overflow: hidden;
  width: 100%;
  margin-bottom: 5px;
}
.work_num1 {
  float: left;
  width: 49%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  border: 1px solid #dadada;
  border-radius: 5px;
}
.work_text1 {
  float: left;
  width: 30%;
  height: 36px;
  background: #dde2f1;
  text-align: center;
  padding-top: 7px;
  font-size: 11pt;
  font-weight: bold;
  color: #1943bf;
}
.work_text2 {
  float: left;
  width: 70%;
  text-indent: 10px;
  font-weight: bold;
  color: #2c49b8;
  font-size: 18pt;
  text-indent: 15px;
}

.work_text3 {
  float: left;
  width: 15%;
  height: 36px;
  background: #dde2f1;
  text-align: center;
  padding-top: 7px;
  font-size: 11pt;
  font-weight: bold;
  color: #1943bf;
}
.work_text4 {
  float: left;
  width: 85%;
  text-indent: 10px;
  font-weight: bold;
  color: #333333;
  font-size: 18pt;
  text-indent: 15px;
}

.work_timeBG {
  background: #e5ebf9;
  border-radius: 10px;
}
.gridHeight {
  max-height: 100vh;
  height: calc(100vh - 700px);
}

.grid-height {
  max-height: 100vh;
  height: calc(100vh - 500px);
}

.gridHeightFull {
  max-height: 100vh;
  height: calc(100vh - 600px);
}

.regField {
  width: 50px;
}

.regField2 {
  width: 10px;
}

.btnGroup {
  color: #ff0000;
}

::v-deep #employeeList .dx-treelist-header-panel .dx-toolbar,
::v-deep #workList .dx-treelist-header-panel .dx-toolbar {
  display: block !important;
}

::v-deep #employeeGrid .dx-datagrid-header-panel .dx-toolbar,
::v-deep #workGrid .dx-datagrid-header-panel .dx-toolbar {
  display: block !important;
}

::v-deep .chip-group .v-slide-group__content {
  border-bottom: none !important;
  height: 60px !important;
}

::v-deep .operate-chip-group {
  height: 100%;
}

::v-deep .operate-chip-group .v-ripple__container {
  display: none !important;
}

::v-deep .operate-chip-group .v-slide-group__content {
  border-bottom: none !important;
  height: 100% !important;
}

::v-deep .operate-chip-group .v-chip {
  height: 100% !important;
}

::v-deep .dx-datagrid-header-panel .dx-datagrid-save-button,
::v-deep .dx-datagrid-header-panel .dx-datagrid-cancel-button {
  display: none !important;
}

::v-deep .dx-treelist-header-panel .dx-treelist-save-button,
::v-deep .dx-treelist-header-panel .dx-treelist-cancel-button {
  display: none !important;
}

::v-deep .dx-treelist-search-panel {
  width: 160px !important;
}

::v-deep #workOrder .v-card__title {
  padding: 0 !important;
}

::v-deep .v-chip.v-size--default {
  border-radius: 4px;
}

::v-deep .chip-group .v-chip.v-size--default {
  height: 100%;
}

::v-deep .edit-mode .v-chip__content > button {
  display: none;
}

::v-deep .dx-item .dx-toolbar-item .dx-toolbar-button {
  display: none;
}

.add-button {
  width: 30px;
}

.btn {
  background-color: #2b51eb;
  color: white;
}

.pop-bt {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-bt > .pop-bt-inner {
  display: flex;
  flex-direction: column;
}

.pop-bt-inner > button {
  margin: 10px;
}

::v-deep .item-tab .v-tabs-bar {
  margin-bottom: 1rem;
}

::v-deep .item-tab .v-tab--active {
  border-bottom: 2px solid #455b59;
}




.popup-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bt {
  color: white;
}

.save-bt {
  color: white;
  border-radius: 0;
  height: 30px;
  min-height: 30px;
  max-height: 30px;
  box-shadow: none;
}

.search-bt span {
  padding: 0 10px;
}

.padding-2rem {
  padding: 0 2rem;
}

.code-select {
  background-color: #2e8bf6;
  color: #fff;
  cursor: Default !important;
}

::v-deep .radio-input {
  display: flex;
}

::v-deep .radio-input p {
  font-size: 1rem;
  padding: 0 10px;
}

::v-deep .card-padding .v-card__text {
  padding: 0;
}

::v-deep .card-padding .v-card__title {
  padding: 0 0 0 12px;
}

::v-deep .workOrder-bt {
  display: inline-flex;
  justify-content: flex-end;
}

::v-deep .workOrder-bt button {
  margin-left: 10px;
}

::v-deep .create-work-order p {
  font-size: 1.2rem;
}

::v-deep .icon-rotate {
  transform: rotate(90deg);
}

::v-deep .input-center input {
  text-align: center;
}

::v-deep #processGrid .dx-datagrid-headers .dx-datagrid-table .dx-row > td {
  border-bottom: none;
}

::v-deep #processGrid .dx-datagrid-headers .dx-datagrid-table .dx-row > .band-column {
  border-bottom: 1px solid #bcc0c9 !important;
}

.card-style {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.red-light {
  color: rgb(255, 30, 14);
}

.green-light {
  color: rgb(2, 182, 2);
}

.font-size-2_5 {
  font-size: 2.5rem;
}

.text-color-gray {
  color: rgba(0, 0, 0, 0.54);
}

.defectiveBox {
  border-radius: 5px;
  border: 1px solid #c6cbd5;
}

::v-deep .bottom-tab-menu .v-tabs-bar {
  flex-grow: 0;
  flex-shrink: 0;
}

::v-deep .bottom-tab-menu .v-tabs-items {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
}

::v-deep .bottom-tab-menu .v-window__container {
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

::v-deep .defectiveBox .defectiveBox-group {
  height: 100%;
}

::v-deep .defectiveBox .v-slide-group__content {
  height: 100% !important;
  border-bottom: none !important;
}

::v-deep .defectiveBox .v-slide-group__content .v-chip {
  height: 100% !important;
}

::v-deep .mainGridDiv .v-card__title {
  flex-grow: 0;
  flex-shrink: 0;
}

::v-deep .mainGridDiv .v-card__text {
  flex-grow: 1;
  flex-shrink: 0;
}

.text_center {
  text-align: center;
  border: 1px solid;
  border-radius: 3px;
}

.PaddingRight40px{
  padding-right: 40px;
}









/*  */
</style>
