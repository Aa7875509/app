<template>
    <div class="mui-content">
        <header class="mui-bar mui-bar-nav">
            <button class="mui-btn mui-pull-left">
                <a href="#popover" id="openPopover">{{market}}</a>
            </button>
            <button @click="zlodin" class="mui-btn mui-pull-right">
            退出登陆
            </button> 
            <h1 class="mui-title">{{ticker.last}}</h1>
        </header>
        <div class="title">
            <div style="font-size:12px;">最新 {{ticker.last}}/24H 量{{ticker.vol}}</div>
            <div class="yuer">
                <div :class="type=='1min'?'active':''" @click="type='1min'">1min</div>
                <div :class="type=='3min'?'active':''" @click="type='3min'">3min</div>
                <div :class="type=='5min'?'active':''" @click="type='5min'">5min</div>
                <div :class="type=='15min'?'active':''" @click="type='15min'">15min</div>
                <div :class="type=='30min'?'active':''" @click="type='30min'">30min</div>
                <div :class="type=='1day'?'active':''" @click="type='1day'">1day</div>
            </div>
            <div id="main" style="width: 100%;height:300px;"></div>
            <div class="pk">
                <div class="left">
                  
                    <ul class="yuer" v-for="(itme,index) in asks" :key='index'>
                        <li>{{itme[0]}}</li>
                        <li>{{itme[1]}}</li>
                    </ul>
                    <div>最新成交:{{ticker.last}}</div>
                    <ul class="yuer" v-for="(itme,index) in bids" :key='index'>
                        <li>{{itme[0]}}</li>
                        <li>{{itme[1]}}</li>
                    </ul>
                </div>
                <div class="right">
                    <div>历史成交</div>
                    <ul class="yuer">
                        <li>时间</li>
                        <li>价格</li>
                        <li>数量</li>
                        <li>类型</li>
                        <li>委托</li>
                    </ul>
                    <ul class="yuer" v-for="(itme,index) in trades" :key='index'>
                        <li>{{getMyDate(itme.date)}}</li>
                        <li :class="itme.type=='buy'?'pr-green':'pr-red'">{{itme.price}}</li>
                        <li>{{itme.amount}}</li>
                        <li>{{itme.type=='buy'?'买':'卖'}}</li>
                        <li>{{itme.trade_type=='ask'?'卖':'卖'}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="popover" class="mui-popover">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="(itme,index) in marketlist" :key='index'><a href="#" @click="jiazai(itme)">{{itme}}</a></li>
            </ul>
        </div>
	</div>
</template>
<script>
var appData = require("../../commons/js/keid.json"); // 引入address.json文件
var echarts = require("echarts");
export default {
  data() {
    return {
      row: null, //表单数据
      xianz: false,
      api: "http://api.zb.cn/data/v1/",
      name: "",
      id: "",
      tableData3: appData,
      tableData: "", //表单数据
      type: "1min",
      market: "zb_qc",
      marketlist: [],//盘口
      ticker:{},//行情
      asks:[],// 卖方深度
      bids:[],// 买方深度
      trades:[]//历史成交
    };
  },
  mounted() {
    var vm = this;
    vm.rounres(vm.$route.path);
    vm.chans(vm.api + "markets", function(src) {
         vm.marketlist= vm.getmarkets(src);
    });
    vm.chans(vm.api+'kline?market='+vm.market+'&type='+vm.type+'&size=500',function(src){
        vm.echarts(src.data);
    });
    var aIntes
    clearInterval(aIntes);
    aIntes=setInterval(function(){
      vm.chans(vm.api+'kline?market='+vm.market+'&type='+vm.type+'&size=500',function(src){
        vm.echarts(src.data);
      });
    },20000)
    var aInte
    clearInterval(aInte);
    aInte =  setInterval(function(){
      vm.chans(vm.api+'ticker?market='+vm.market,function(src){
       vm.ticker=src.ticker
      });
      vm.chans(vm.api+'trades?market='+vm.market,function(src){
        
       vm.trades=vm.bubbleSort(src);
      });
      vm.chans(vm.api+'depth?market='+vm.market+'&size=10',function(src){
        vm.asks=src.asks
        vm.bids=src.bids
      });
      },1000)
  },
  watch: {
    $route(to, from) {
      this.rounres(this.$route.path);
    },
    type(to, from) {
      var vm = this;
      vm.chans(
        vm.api + "kline?market=" + vm.market + "&type=" + to + "&size=500",
        function(src) {
          vm.echarts(src.data);
        }
      );
    }
  },
  methods: {
      jiazai(itme){
        var vm = this;
          this.market=itme;
          mui('#popover').popover('toggle');
          vm.chans(vm.api+'kline?market='+vm.market+'&type='+vm.type+'&size=500',function(src){
                vm.echarts(src.data);
            });
      },
    //获取盘口
    getmarkets(src) {
      var s = [];
      for (var i in src) {
        s.push(i);
      }
      return s;
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      return Y + M + D;
    },
     bubbleSort:function(arr){
      for(var i=0;i<arr.length-1;i++){
        for(var j=i+1;j<arr.length;j++){
          if(arr[i].date<arr[j].date){//如果前面的数据比后面的大就交换
            var temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
          }
        }
      } 
      return arr;
    },

    getMyDate(str){  
            var oDate = new Date(str*1000),
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime =  this.getzf(oHour) +':'+ this.getzf(oMin) +':'+this.getzf(oSen);//最后拼接时间  
            return oTime;  
        },
        //补0操作
      getzf(num){  
          if(parseInt(num) < 10){  
              num = '0'+num;  
          }  
          return num;  
      },
    echarts(src) {
      var vm = this;
      var myChart = echarts.init(document.getElementById("main"));
      var colorList = [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ];
      var labelFont = "bold 12px Sans-serif";
      //日期
      // var dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08", "2016-04-11", "2016-04-12", "2016-04-13", "2016-04-14", "2016-04-15", "2016-04-18", "2016-04-19", "2016-04-20", "2016-04-21", "2016-04-22", "2016-04-25", "2016-04-26", "2016-04-27", "2016-04-28", "2016-04-29", "2016-05-02", "2016-05-03", "2016-05-04", "2016-05-05", "2016-05-06", "2016-05-09", "2016-05-10", "2016-05-11", "2016-05-12", "2016-05-13", "2016-05-16", "2016-05-17", "2016-05-18", "2016-05-19", "2016-05-20", "2016-05-23", "2016-05-24", "2016-05-25", "2016-05-26", "2016-05-27", "2016-05-31", "2016-06-01", "2016-06-02", "2016-06-03", "2016-06-06", "2016-06-07", "2016-06-08", "2016-06-09", "2016-06-10", "2016-06-13", "2016-06-14", "2016-06-15", "2016-06-16", "2016-06-17", "2016-06-20", "2016-06-21", "2016-06-22"];
      var dates = [];
      var data = [];
      var volumes = [];
      for (var i in src) {
        dates.push(vm.timestampToTime(src[i][0]));
        var a = [src[i][1], src[i][2], src[i][3], src[i][4], src[i][5]];
        data.push(a);
        volumes.push(src[i][5]);
      }
      var option = {
        animation: false,
        color: colorList,
        tooltip: {
          triggerOn: "none",
          transitionDuration: 0,
          confine: true,
          bordeRadius: 4,
          borderWidth: 1,
          borderColor: "#333",
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: {
            fontSize: 12,
            color: "#333"
          },
          position: function(pos, params, el, elRect, size) {
            var obj = {
              top: 60
            };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          }
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: [0, 1]
            }
          ]
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: [0, 1],
            realtime: false,
            start: 90,
            end: 100,
            top: 10,
            height: 20,
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "120%"
          },
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 40,
            end: 70,
            top: 10,
            height: 20
          }
        ],
        xAxis: [
          {
            type: "category",
            data: dates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: "#777" } },
            axisLabel: {
              formatter: function(value) {
                return echarts.format.formatTime("MM/dd", value);
              }
            },
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              show: true
            }
          },
          {
            type: "category",
            gridIndex: 1,
            data: dates,
            scale: true,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "#777" } },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              type: "shadow",
              label: { show: false },
              triggerTooltip: true,
              handle: {
                show: true,
                margin: 30,
                color: "#B80C00"
              }
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            splitNumber: 10,
            axisLine: { lineStyle: { color: "#777" } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
              inside: true,
              formatter: "{value}\n"
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        grid: [
          {
            left: 20,
            right: 20,
            top: 40,
            height: 120
          },
          {
            left: 20,
            right: 20,
            height: 40,
            top: 190
          }
        ],
        graphic: [
          {
            type: "group",
            left: "center",
            top: 70,
            width: 300,
            bounding: "raw"
          }
        ],
        series: [
          {
            name: "Volume",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#7fbe9e"
              },
              emphasis: {
                color: "#140"
              }
            },
            data: volumes
          },
          {
            type: "candlestick",
            name: "日K",
            data: data,
            itemStyle: {
              normal: {
                color: "#ef232a",
                color0: "#14b143",
                borderColor: "#ef232a",
                borderColor0: "#14b143"
              },
              emphasis: {
                color: "black",
                color0: "#444",
                borderColor: "black",
                borderColor0: "#444"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    chans(url, date) {
      $.ajax({
        url: url,
        dataType: "json",
        success: date
      });
    },
    rounres(date) {
      if (date != "/index") return false;
      var vm = this;
      mui.init({
        keyEventBind: {
          backbutton: true //关闭back按键监听
        }
      });
    },
    zlodin() {
      var v = this;
      var btnArray = ["确认", "取消"];
      mui.confirm("确认退出登录？", "提示！", btnArray, function(e) {
        if (e.index == 0) {
          localStorage.setItem("zidong", "");
          v.$router.push("/");
        }
      });
    },
    popverbtn(item) {
      this.$router.push({
        path: "/editdialog",
        query: item
      });
    },
    dtuichu() {
      this.$router.push("/");
    }
  },
  components: {}
};
</script>

<style scoped>
.title {
  margin-top: 54px;
  text-align: center;
}

.table {
  background: #fff;
}
.appdatenober {
  padding: 10px;
}
.appdatenober ul {
  max-height: 300px;
  overflow: auto;
}
.appdatenober li {
  font-size: 14px;
  padding: 0 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
}
.appdatenober li:active {
  color: #409eff;
  font-weight: 700;
}
.yuer {
  display: -webkit-box;
  -webkit-box-pack: justify;
  font-size: 12px;
}
.active {
  background: #409eff;
}
.pk {
  font-size: .12rem;
  padding-top:5px;
  border-top: 1px solid #cfcfcf;
  display: -webkit-box;
  height: 10rem;
  padding-bottom:50px;
}
.pk .left,
.pk .right {
  -webkit-box-flex:1;
  padding: .1rem;
}
.pk .right{
    border-left: 1px solid #cfcfcf;
    overflow: auto;
}
.pr-green{
    color: #3dc18e;
}
.pr-red{
    color: #de211d;
}

</style>
