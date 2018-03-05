<template>
	<div class="mui-content">
		
		<header class="mui-bar mui-bar-nav">
		  <button @click="$router.push('/adddialog')" class="mui-btn mui-pull-left">
		    添加
		  </button>
		  <button @click="zlodin" class="mui-btn mui-pull-right">
		    退出登陆
		  </button>
		  <h1 class="mui-title">记事本</h1>
		</header>
		<div class="title" >
            <div class="table">
                <div class="table-head">
                    <div class="table-head-cell">名字</div>
                    <div class="table-head-cell">资料1</div>
                    <div class="table-head-cell">资料2</div>
                    <div class="table-head-cell">备注</div>
                </div>
				<div class="aout" id="shuzxonsd">
					<ul class="mui-table-view " v-for="(item,index) in tableData3" :key="index">
						<li class="mui-table-view-cell">
							<div  class="mui-slider-right mui-disabled">
								<a @click="handleDelete(item)" class="mui-btn mui-btn-red">删除</a>
								<a @click="popverbtn(item)" class="mui-btn mui-btn-primary">编辑</a>
							</div>
							<div class="mui-slider-handle table-body">
								<div class="table-body-cell">{{item.name}}</div>
								<div class="table-body-cell">{{item.date}}</div>
								<div class="table-body-cell">{{item.worde}}</div>
								<div class="table-body-cell">{{item.address}}</div>
							</div>
						</li>
					</ul>
                </div> 
            </div>
        </div>
		
	</div>
</template>
<script>
import adddialog from "./adddialog";
import editdialog from "./editdialog";
export default {
  data() {
    return {
      row: null, //表单数据
      xianz: true,
      dialogVisible: false, //添加弹窗
      dialogVisible1: false, //编辑弹窗
      tableData3: [], //表单数据
      // {
      // name: "王小虎",
      // date: "2016-05-03",
      // worde: "王小虎",
      // address: "上海市普陀区金沙江路 1518 弄"
      // }

      page: 1,
      total: 0
    };
  },
  mounted() {
    var vm = this;
    this.rounres(this.$route.path);
    vm.ajaxqurt();
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      // debugger;

      this.rounres(this.$route.path);
    }
  },
  methods: {
    rounres(date) {
      if (date != "/index") return false;
      var vm = this;
      mui.init({
        keyEventBind: {
          backbutton: true //关闭back按键监听
        },
        pullRefresh: {
          container: ".title", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up: {
            height: 50, //可选.默认50.触发上拉加载拖动距离
            auto: true, //可选,默认false.自动上拉加载一次
            contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore: "没有更多数据了", //可选，请求完毕若没有更多数据时显示的提醒内容；
            callback: function() {
              //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              if (vm.xianz) {
                vm.ajaxqurt();
              }
              //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
              //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
              this.endPullupToRefresh(true);
              // this.endPullupToRefresh(false);//结束上拉加载
              // mui('.title').pullRefresh().refresh(true);//重置上拉加载
              //mui('.title').pullRefresh().disablePullupToRefresh();//禁用上拉加载
              //mui('.title').pullRefresh().enablePullupToRefresh();//启用上拉加载
            }
          }
        }
      });
    },
    zlodin() {
      localStorage.setItem("zidong", "");
      this.$router.push("/");
    },
    popverbtn(item) {
      this.$router.push({
        path: "/editdialog",
        query: item
      });
    },
    ajaxqurt() {
      var v = this;
      v.$ajax({
        data: {
          s: "App.User_Set.GetList", // 待请求的接口服务名称
          uuid: localStorage.getItem("uuid"),
          token: localStorage.getItem("token"), // 更多接口参数
          key: "from",
          page: v.page,
          perpage: 20,
          callback: "onCallback" // 客户端的JS回调函数
        },
        done: function(r) {
          if (r.ret == "200") {
            if (r.data.err_code == "0") {
              var tableData3 = r.data.items;
              v.total = r.data.total;

              var dates = [];
              for (var i = 0; i < tableData3.length; i++) {
                tableData3[i].data.id = tableData3[i].id;
                tableData3[i].data.add_time = tableData3[i].add_time;
                dates.push(tableData3[i].data);
              }
              if (v.page == 1) {
                v.tableData3 = dates;
              } else {
                v.tableData3 = v.tableData3.concat(dates);
              }
              var st = 1;
              if (v.total < 21) {
                v.xianz = false;
              } else {
                st = v.total / 20;
                if (v.total % 20 > 0) {
                  st = st + 1;
                }
              }
              if (st != v.page) {
                v.page++;
              } else {
                v.xianz = false;
              }
            } else {
              mui.toast(r.data.err_msg);
            }
          } else {
            mui.toast(r.msg);
          }
        }
      });
    },

    dtuichu() {
      this.$router.push("/");
    },
    handleEdit(index, row) {
      this.row = row;
      this.dialogVisible1 = true;
    },
    handleDelete(row) {
      var v = this;
      var btnArray = ["确认", "取消"];
      mui.confirm("确认删除该条记录？", "提示！", btnArray, function(e) {
        if (e.index == 0) {
          v.$ajax({
            data: {
              s: "App.User_Set.Delete", // 待请求的接口服务名称
              uuid: localStorage.getItem("uuid"),
              token: localStorage.getItem("token"), // 更多接口参数
              id: row.id,
              callback: "onCallback" // 客户端的JS回调函数
            },
            done: function(r) {
              if (r.ret == "200") {
                if (r.data.err_code == "0") {
                  mui.toast("删除成功!");
                  v.page = 1;
                  v.ajaxqurt(); //获取列表
                } else {
                  mui.toast(r.data.err_msg);
                }
              } else {
                mui.toast(r.msg);
              }
            }
          });
        } else {
          mui.toast("取消删除！");
        }
      });
    }
  },
  components: {
    adddialog,
    editdialog
  }
};
</script>

<style scoped>
.title {
  margin-top: 44px;
}

.table {
  background: #fff;
}
.aout {
  overflow: auto;
}
.table-head {
  display: flex;
  display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0.3rem 0;
}

.table-head-cell {
  width: 25%;
  font-size: 0.28rem;
  border-right: 0.5px solid #e1e1e1;
}
.table-head-cell:last-child {
  border-right: 0;
}
.table-body {
  display: flex;
  display: -webkit-flexbox;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.table-body-cell {
  width: 25%;
  font-size: 0.22rem;
}
.popr_conter {
  width: 5rem;
  margin: 0 auto;
  height: 10%;
}
</style>
