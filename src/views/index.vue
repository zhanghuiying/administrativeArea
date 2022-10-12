<template>
  <section>
    <div :style="{ height: innerHeight +'px'}" class="">
      <div class="Head_head__3xt6">
        <img src="../assets/logo.png" class="home_logo" />
        <span class="title">行政区信息搜索</span>
        <div class="Search_searchWrap__2QZNg fw">
          <div class="Search_lf">
            <el-input size="medium" clearable class="inline-input" v-model="inputLocation" placeholder="请输入关键字进行搜索"
              @input="changeInput"></el-input>
          </div>
          <div class="Search_fr" @click="handleSelect()">
            <img src="../assets/images/search.png" alt="">
          </div>
        </div>
        <div class="Head_login">
          <a :href="baseURL +'/pim/main.action'" target="_blank">登录</a>
        </div>

        <div class="Head_filter">
          <span class="SwitchCity_spanBtn__2N-F3 show" @click="switchBtn()">
            湖南 <img src="../assets/images/fold.png"
              :class="isShow ? 'swit-go anticon-caret-down' : 'anticon-caret-down'" alt="">
          </span>

          <div class="SwitchCity_cityPanel__10pJM" v-if="isShow">
            <div class="filter_list fw">
              <div class="filter_lf">市：</div>
              <div class="filter_fr">
                <span @click="cityClick('','')" :class="cityStat == '' ? 'sp_checked all_sp' : 'all_sp'">全部</span>
                <span v-for="(item, index) in selectCityList" :key="index" @click="cityClick(item.DM, item.MC)"
                  :class="cityStat == item.DM ? 'sp_checked all_sp' : 'all_sp'">{{ item.MC }}</span>
              </div>
            </div>
            <div class="filter_list fw" v-if="countyShow">
              <div class="filter_lf">县：</div>
              <div class="filter_fr f_fr_b">
                <span v-for="(item, index) in selectCountyList" :key="index" @click="countyClick(item.DM, item.MC)"
                  :class="countyStat == item.DM ? 'sp_checked all_sp' : 'all_sp'">{{ item.MC }}</span>
              </div>
            </div>
            <div class="filter_list fw" v-if="townshipShow">
              <div class="filter_lf">乡：</div>
              <div class="filter_fr f_fr_b">
                <span v-for="(item, index) in selectTownshipList" :key="index" @click="townshipClick(item.DM, item.MC)"
                  :class="townshipStat == item.DM ? 'sp_checked all_sp' : 'all_sp'">{{ item.MC }}</span>
              </div>
            </div>
            <div class="filter_list fw" v-if="villageShow">
              <div class="filter_lf">村：</div>
              <div class="filter_fr f_fr_b">
                <span v-for="(item, index) in selectVillageList" :key="index" @click="villageClick(item.DM, item.MC)"
                  :class="villageStat == item.DM ? 'sp_checked all_sp' : 'all_sp'">{{ item.MC }}</span>
              </div>
            </div>

          </div>
        </div>

        <div :class="isMap ? 'Sidebar_sidebar__3UC7F Sidebar_show__3grcm' : 'Sidebar_sidebar__3UC7F'"
          :style="{ height: innerHeight -63 +'px'}">
          <div v-if="homeList.length > 0">
            <h2 class="Sidebar_h2__1hWRj">搜 索</h2>
            <div class="no_conter">在 <span>{{ name_MC }}</span> 为您搜到 <span>{{ count }}</span> 条记录</div>

            <div class="map_list" :style="{ height: innerHeight -215 +'px'}">
              <div class="map_list_item">
                <div class="PoiItem_liItem__3JXjX" v-for="(item, index) in homeList" :key="index"
                  @click="handleAddPoint(item.ID)">
                  <div
                    :class="pointindex == item.ID ?'poi_title_a PoiItem_poiName__title over-flow' : 'PoiItem_poiName__title over-flow'">
                    <img src="../assets/images/map_latitude.png">
                    {{ item.XZQMC }}
                  </div>
                  <div class="detailItem f-display">
                    <div class="PoiItem_detailItem__lf">
                      <p>来源：{{ item.LY }}</p>
                      <p>更新时间：{{ item.GXSJ }}</p>
                      <p>行政区代码：{{ item.XZQDM }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <pagination v-show="count > 0" :total="count" :page.sync="queryParams.page" :limit.sync="queryParams.limit"
              layout="total, prev, pager, next" :pager-count="3" @pagination="getList" />
          </div>
          <div v-else class="no-data">
            <h2 class="Sidebar_h2__1hWRj">搜 索</h2>
            <div class="no_conter">没有查询到 <span>{{ name_MC }}</span> 的结果</div>
            <div class="Prompt_suggest__2nC5U">您还可以：</div>
            <div class="Prompt_suggest__2nC5U">1、检查输入是否正确或者输入其它词</div>
            <div class="Prompt_suggest__2nC5U">2、在天地图上 <a href="https://vgimap.tianditu.gov.cn/"
                target="_blank">添加该地点</a>
            </div>
          </div>

          <div class="close_list" @click="closeBtn()">
            <img src="../assets/images/fold.png" :class="isMap ? 'close-go' : 'close_list_down'">
          </div>
        </div>
        <div :class="isShowFullScreen ? 'dialog_details d_TOP2' : 'dialog_details d_TOP1'" v-if="isShowDetails">
          <div class="trade_title over-flow">
            {{ pubOneData.XZQMC }}
            <span class="full_screen" @click="fullScreen()">全屏</span>
            <img src="../assets/images/closure.png" class="closureImg" @click="closeDetails()">
          </div>
          <div :class="isShowFullScreen ? 'pub_conter2' : 'pub_conter'">
            <div class="source">
              发布时间： {{ pubOneData.GXSJ }}
              <div class="source_s" style="text-align: right;">来源：{{ pubOneData.LY }}</div>
            </div>
            <div class="source_dizhi">
              <a :href="pubOneData.LYURL" target="_blank">来源地址：{{ pubOneData.LYURL }}</a>
            </div>
            <div v-if="isShowFullScreen" class="new-content" :style="{ height: innerHeight -194 +'px'}">
              <div class="new_content_item">
                <div v-html="pubOneData.NR" class="p-item"></div>
              </div>
            </div>
            <div v-else class="new-content" :style="{ height: innerHeight -230 +'px'}">
              <div class="new_content_item">
                <div v-html="pubOneData.NR" class="p-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Map_conter" id="map">

        <div class="Draw_draw__pv">
          <el-tooltip class="item" effect="dark" content="测距" placement="left">
            <div class="point" @click="lineTool.open()">
              <img src="../assets/images/lineTool.png" class="pointImg">
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="测面" placement="left">
            <div class="point" @click="polygonTool.open()">
              <img src="../assets/images/polygonTool.png" class="pointImg2">
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { pubList, pubOne, selectNext } from '../api/home'
import MapInit from '../../components/tianditu/tianditu.api.js';
export default {
  components: {
    pubList, pubOne, selectNext, MapInit
  },
  data () {
    return {
      count: 0,
      homeList: [],
      pubOneData: [],
      queryParams: {
        page: 1,
        limit: 20,
        KEYWORD: '',
        XZQDM: '',//行政区代码
      },
      pointindex: '',
      inputLocation: '',
      isShow: false,
      isMap: true,
      isShowDetails: false,
      isShowFullScreen: false,
      name_MC: '',
      map: {},//地图
      infoWin: '',
      lineTool: '',//测距工具
      polygonTool: '',//测面工具
      ID: '',
      baseURL: '',
      innerHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      cityStat: '',
      countyStat: '',
      townshipStat: '',
      villageStat: '',
      countyShow: false,
      townshipShow: false,
      villageShow: false,
      selectCityList: [],
      selectCountyList: [],
      selectTownshipList: [],
      selectVillageList: [],
      XZQDM: '',//筛选 行政编码
    };
  },

  created() {
    this.getList()
    this.getselectNext()
    this.baseURL = Glod.VUE_APP_BASE_URL
    this.name_MC = '湖南省'
  },

  methods: {
    getHeight() {
      this.innerHeight = window.innerHeight || document.documentElement.innerHeight || document.body.clientHeight;
    },
    getList() {
      pubList(this.queryParams).then((res) => {
        this.count = res.count
        this.homeList = res.data
      })
    },
    getselectNext() {
      selectNext(this.XZQDM).then((res) => {
        this.selectCityList = res.data
      })
    },
    changeInput() {
      if (this.inputLocation == null || this.inputLocation == "") {
        this.queryParams.KEYWORD = ''
        this.clearAll();
        this.getList()
        this.isShow = false
      }
    },
    handleSelect() {
      if (this.inputLocation != '') {
        this.queryParams.KEYWORD = this.inputLocation
        this.isMap = true
        this.isShow = false
        this.count = 0
        this.clearAll();
        this.getList()
      } else {
        this.$message({ type: 'error', message: '搜索内容不能为空!', })
      }
    },
    closeBtn() {
      this.isMap = !this.isMap;
    },
    closeDetails() {
      this.isShowDetails = !this.isShowDetails;
    },
    fullScreen() {
      this.isShowFullScreen = !this.isShowFullScreen;
    },
    switchBtn() {
      this.isShow = !this.isShow;
    },
    cityClick(index, MC) {
      if (MC == null || MC == "") {
        this.name_MC = '湖南省'
      } else {
        this.name_MC = MC
      }
      this.count = 0
      this.queryParams.page = 1
      this.queryParams.XZQDM = index
      this.cityStat = index
      if (index == '') {
        this.countyShow = false
        this.townshipShow = false
        this.villageShow = false
      } else {
        this.countyShow = true
        this.townshipShow = false
        this.villageShow = false
        selectNext(index).then((res) => {
          this.selectCountyList = res.data
        })
      }
      this.getList()
    },
    countyClick(index, MC) {
      this.name_MC = MC
      this.count = 0
      this.queryParams.page = 1
      this.queryParams.XZQDM = index
      this.countyStat = index
      this.townshipShow = true
      this.villageShow = false
      selectNext(index).then((res) => {
        this.selectTownshipList = res.data
      })
      this.getList()
    },
    townshipClick(index, MC) {
      this.name_MC = MC
      this.count = 0
      this.queryParams.page = 1
      this.queryParams.XZQDM = index
      this.townshipStat = index
      this.villageShow = true
      selectNext(index).then((res) => {
        this.selectVillageList = res.data
      })
      this.getList()
    },
    villageClick(index, MC) {
      this.name_MC = MC
      this.count = 0
      this.queryParams.page = 1
      this.queryParams.XZQDM = index
      this.villageStat = index
      this.getList()
    },
    handleAddPoint(id) {
      this.pointindex = id
      this.ID = id
      pubOne(this.ID).then(res => {
        this.pubOneData = res.data

        if (this.pubOneData.GEOJSON == null || this.pubOneData.GEOJSON == '') {
          this.$message({ type: 'error', message: '定位不到相关位置!', })
          this.isShowDetails = true
          this.isShowFullScreen = false
          this.clearAll();
        } else {
          this.isShowDetails = false
          this.isShow = false
          this.getLinesFromGeojson(this.pubOneData.GEOJSON, this.pubOneData.XZQMC)
        }
      })
    },
    /**
     * 从GEOJSON获取所有linestring
     * @param {*} GEOJSON 
     * @returns  返回线段数组
     */
    getLinesFromGeojson(GEOJSON, name) {
      var json = JSON.parse(GEOJSON);
      let lines = [];
      let _bounds = [];
      let points = [];
      let geometries = json.geometry.coordinates[0];
      for (let i = 0; i < geometries.length; i++) {
        lines.push(geometries[i])
      }
      lines.forEach((coors) => {
        let polygon = this.createPolygon(coors, {
          fillOpacity: 0.001
        });
        this.map.addOverLay(polygon);

        if (this.infoWin) {
          this.map.removeOverLay(this.infoWin);
          this.infoWin = null;
        }
        var html = "<h5>" + name + "</h5>";
        this.infoWin = new T.InfoWindow(html, new T.Point([0, 0]));
        polygon.openInfoWindow(this.infoWin);
        
        polygon.addEventListener("click", function () {
          this.isShowDetails = true
        }, this);

        //设置中心点
        let _Bounds = polygon.getBounds();//拿到对象范围
        _bounds = _Bounds.getCenter();//获取中心点
        geometries.forEach((lonlat) => {
          points.push(new T.LngLat(lonlat[0], lonlat[1]));
        })
        this.map.setViewport(points); //设置范围
      })
      this.map.centerAndZoom(new T.LngLat(_bounds.lng, _bounds.lat), 10);
      return lines
    },
    /**
     * 创建polygon
     * @param {*} points 多边形坐标 二维数组
     * @param {*} option 
     * @returns  返回polygon
     */
    createPolygon(coors, option){
      let points = [];
      coors.forEach((lonlat) => {
        points.push(new T.LngLat(lonlat[0], lonlat[1]));
      })
      this.map.clearOverLays();
      let polygon = new T.Polygon(points, {
        color: "#167FFD", weight: 2, opacity: 1, fillColor: "#167FFD", fillOpacity: 0.5
      });
      return polygon
    },
    //清空地图及搜索列表
    clearAll() {
      this.map.clearOverLays();
      this.map.centerAndZoom(new T.LngLat(112.944895, 28.236163), 12);
    },
    load() {
      var T = window.T;
      var imageURL = 'http://t0.tianditu.gov.cn/img_c/wmts?tk=be50c7492442ecf4e61ca7bd578d6b8b';
      var lay = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
      var config = { layers: [lay], name: 'TMAP_SATELLITE_MAP' };

      this.map = new T.Map('map', config); // 地图实例

      // var ctrl = new T.Control.MapType();
      var ctrl = new T.Control.MapType([{
        title: "卫星混合",
        icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png",
        layer: TMAP_HYBRID_MAP
      }, {
        title: "地图",
        icon: "http://api.tianditu.gov.cn/v4.0/image /map/maptype/vector.png",
        layer: TMAP_NORMAL_MAP
      }])
      this.map.addControl(ctrl);
      this.map.setMapType(window.TMAP_HYBRID_MAP); 
      
      this.map.centerAndZoom(new T.LngLat(112.944895, 28.236163), 12);
      //允许鼠标双击放大地图
      this.map.enableScrollWheelZoom();
      this.map.enableDrag();
      //创建比例尺控件对象 添加比例尺控件
      var scale = new T.Control.Scale();
      this.map.addControl(scale);

      var config = {
        showLabel: true,
        color: "red", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
      };
      //创建标注工具对象
      this.lineTool = new T.PolylineTool(this.map, config);
      //创建标注工具对象
      this.polygonTool = new T.PolygonTool(this.map, config);
      this.GetMaps()
    },
    GetMaps() {
      let T = window.T;
      //设置显示地图的中心点和级别
      this.map.clearOverLays();
      this.map.centerAndZoom(new T.LngLat(111.52232, 25.116313), 9);
      var icon = new T.Icon({
        iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
        iconSize: new T.Point(33, 33),
        iconAnchor: new T.Point(10, 25)
      });
      var latlng = new T.LngLat(21, 22,); // 设置坐标点传入经度纬度
      let marker = new T.Marker(latlng, { icon: icon });// 创建标注

    },
  },
  mounted() {
    this.load();
    window.addEventListener('resize', this.getHeight, false);
    //   let script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=be50c7492442ecf4e61ca7bd578d6b8b'
    //   document.body.appendChild(script)
  },
  beforeDestroy() {
    window.addEventListener('resize', this.getHeight.false);
  }
}
</script>
<style>
.tdt-iconLayers-layer {
  width: 50px !important;
  height: 50px !important;
}
.Search_searchWrap__2QZNg .el-input,
.Search_searchWrap__2QZNg .el-input__inner {
  height: 38px;
}
#map{
  width: 100%;
  height: calc(100% - 62px);
}
.Map_conter {
  position: relative;
  width: 100%;
  height: calc(100% - 62px);
  overflow: hidden;
  z-index: 3;
}
.tdt-control-container .tdt-right {
  right: 3px;
}
.tdt-control-container .tdt-top {
  top: 46px;
}
</style>
<style lang='less' scoped>

</style>
