  <template>
    <div class="mui-content">
      <header class="mui-bar mui-bar-nav">
        <button @click="zlodin" class="mui-btn mui-pull-right">
          退出登陆
        </button>
        <h1 class="mui-title">快递查询</h1>
      </header>
      <div class="title">
        <input @focus="xianz=true" @blur="xianz=false" @input="chans" type="text" class="mui-input-clear" v-model="name" placeholder="请输入快递名称">
        <div class='appdatenober' v-show="xianz">
          <ul>
            <li v-for="(item,index) in row" @click="dd(item)" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <h1></h1>
        <input type="text" class="mui-input-clear" v-model="order" placeholder="请输入快递单号">
          <div class="mui-button-row">
        <button type="button" @click="btnajax" class="mui-btn mui-btn-primary" >查询</button>
        <button type="button" @click="quxiaoa" class="mui-btn mui-btn-danger" >清空</button>
    </div>
      </div>
	</div>
</template>
<script>
var appData = require('../../commons/js/keid.json');  // 引入address.json文件
export default {
  data() {
    return {
      row: null, //表单数据
      xianz: false,
      order:'',
      name:'',
      id:'',
      tableData3:appData, 
      tableData:'', //表单数据
    };
  },
  mounted() {
    var vm = this;
    vm.rounres(vm.$route.path);
    vm.tableData= vm.huoqu(this.tableData3);
    vm.row=vm.tableData;
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      // debugger;
      this.rounres(this.$route.path);
    },
    name:function(to, from){
      if(to){
        var s=[];
        for(var i in this.tableData){
          if(this.tableData[i].name.indexOf(to)!= -1){
            s.push(this.tableData[i])
          }
        }
        this.row=s;
      }else{
        this.id='';
        this.row=this.tableData;
      }
    }
  },
  methods: {
    btnajax(){
      var _this = this;
      if(!_this.id){
        return mui.toast("请输入快递名称！");
      }
      if(!_this.order){
        return mui.toast("请输入快递单号！");
      }
      if(_this.order.length<5){
        return mui.toast("单号不能小于5个字符，请您查证。");
      }
      _this.tiaodaikuan('https://m.kuaidi100.com/index_all.html?type='+_this.id+'&postid='+_this.order)
    },
    tiaodaikuan(url){
				var vm=this;
				var you='快递查询';
				mui.openWindowWithTitle({
					url:url,
					id:'detail'
				},{
					title:{//标题配置
						text:you,//标题文字
					},
					back:{//左上角返回箭头
						image:{
							base64Data:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII='
						},
						click:function(){
							plus.webview.close('detail')
						}
					}
				})
			},
    chans(to){

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
    },
    quxiaoa(){
      this.order='';
      this.name='';
      this.id='';
    },

    huoqu(key){
      var date=[]
      for(var i in key){
        var nv={}
        for(var s in key[i]){
          nv.id= s;
          nv.name= key[i][s]
        }
        date.push(nv)
      }
      return date
    },
    dd(item){
      this.id=item.id;
      this.name=item.name;
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
.appdatenober{
  
  padding: 10px;
}
.appdatenober ul{
  max-height: 300px;
  overflow: auto;
}
.appdatenober li{
    font-size: 14px;
    padding: 0 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
}
.appdatenober li:active{
    color: #409eff;
    font-weight: 700;
}

</style>
