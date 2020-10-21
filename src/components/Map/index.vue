<template>
  <l-map class="mapbox" ref="mapObj" :zoom="mapData.zoom" :center="mapData.center" :minZoom="mapData.minZoom" :maxZoom="mapData.maxZoom" @click="pointHandle" :options="options" @mousemove="moveMap">
    <l-tile-layer :url="x.url" :options="x.option" v-for="x in mapData.titeLayer" :key="x.value"></l-tile-layer>

    <!-- 显示中国界限 -->
    <!-- <l-tile-layer :url="GLOBAL.geoserverip+'/gwc/service/wmts?layer=d%3Achina&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}'"></l-tile-layer> -->

    <l-control-attribution position="bottomright" :prefix="brcon"></l-control-attribution>
    <slot></slot>
    <!-- 以下为定义的按钮 -->
    <div class="leaflet-tools topleft">
      <div class="tuceng tools-item" @mouseover="overlayer" @mouseout="outlayer">
        <!-- <i style="font-size: 20px" class="el-icon-rank"></i> -->
        <img style="width: 90%; height: 90%" src="./ditu.png" alt="">
        <div class='layerbox' v-show="tucengshow">
          <p>
            <el-radio v-model="blayer" label="tianditu_img">天地图影像</el-radio>
          </p>
          <p>
            <el-radio v-model="blayer" label="tianditu">天地图矢量</el-radio>
          </p>
        </div>
      </div>

      <div class="iconfont iconfuwei tuceng tools-item" title="复位" @click.stop="fuwei">
        <!-- <i class="el-icon-aim" style="font-size: 20px"></i> -->
        <img style="width: 90%; height: 90%" src="./fuwei.png" alt="">
      </div>

      <div class="fangda tools-item" @click.stop="fangda">
        <img style="width: 90%; height: 90%" src="./add.png" alt="">
      </div>
      <div class="suoxiao tools-item" @click.stop="suoxiao">
        <img style="width: 90%; height: 90%" src="./pdd.png" alt="">
      </div>
    </div>
  </l-map>
</template>

<script>
import L from 'leaflet'
// eslint-disable-next-line no-unused-vars
import { LMap, LTileLayer, LMarker, LControlAttribution } from 'vue2-leaflet'

import 'leaflet.awesome-markers'
import 'leaflet/dist/leaflet.css'
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css'
import 'leaflet.vectorgrid'
import './L.ImageTransform.js'
// const shpDataStyle = {}
export default {
  data () {
    return {
      map: '',
      shp: [],
      type: null,
      mapData: {
        center: [36.0613769373, 103.8341600069],
        zoom: 4,
        minZoom: 2,
        maxZoom: 17,
        //  crs:L.CRS.EPSG4326
        titeLayer: [
          {
            //  url:"http://222.190.243.175:8080/geoserver/gwc/service/wmts?layer=wtms_0314%3AM2001_GF1_0314&style=&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=3857%3A{z}&TileCol={x}&TileRow={y}",
            url:
              'http://t{s}.tianditu.com/DataServer?T=img_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          },
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=cia_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          }
        ]
      },
      blayer: 'tianditu_img',
      tucengshow: false,
      brcon: '',
      options: {
        zoomControl: false,
        attributionControl: false
      },
      qxrlt: null,
      tifurl: ''
    }
  },
  methods: {
    addBottomLayer (m) {
      if (m === 'tianditu') {
        this.mapData.titeLayer = [
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=vec_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          },
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=cva_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          }
        ]
      } else if (m === 'tianditu_img') {
        this.mapData.titeLayer = [
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=img_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          },
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=cia_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          }
        ]
      } else {
        this.mapData.titeLayer = [
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=img_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          },
          {
            url:
              'http://t{s}.tianditu.com/DataServer?T=cia_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}',
            option: {
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            }
          }
        ]
      }
    },
    // 展示polygon数据
    addPolygon (data) {
      console.log(data)
      this.clearShp()
      // eslint-disable-next-line camelcase
      const { max_lat, max_lon, min_lat, min_lon } = data
      // eslint-disable-next-line camelcase
      this.map.flyToBounds([[max_lat, max_lon], [min_lat, min_lon]])
      if (this.imgLayer) {
        this.imgLayer.remove()
        this.imgLayer = null
      } else {
        const polygons = data.data.map(item => {
          const {
            topLeftLatitude, topLeftLongitude, topRightLatitude, topRightLongitude,
            bottomRightLatitude, bottomRightLongitude, bottomLeftLatitude, bottomLeftLongitude
          } = item
          const latlngs = [[topLeftLatitude, topLeftLongitude], [topRightLatitude, topRightLongitude], [bottomRightLatitude, bottomRightLongitude], [bottomLeftLatitude, bottomLeftLongitude]]
          return L.polygon(latlngs)
        })
        this.imgLayer = L.layerGroup(polygons).addTo(this.map)
        this.shp.push(this.imgLayer)
      }
    },
    // 展示详情页面中的polygon数据
    detailAddPolygon (data) {
      var Arr = []
      Arr.push(data)
      this.clearShp()
      // eslint-disable-next-line camelcase
      const {
        topLeftLatitude, topLeftLongitude,
        bottomRightLatitude, bottomRightLongitude
      } = data
      // eslint-disable-next-line camelcase
      this.map.flyToBounds([[topLeftLatitude, topLeftLongitude], [bottomRightLatitude, bottomRightLongitude]])
      if (this.imgLayer) {
        this.imgLayer.remove()
        this.imgLayer = null
      } else {
        const polygons = Arr.map(item => {
          const {
            topLeftLatitude, topLeftLongitude, topRightLatitude, topRightLongitude,
            bottomRightLatitude, bottomRightLongitude, bottomLeftLatitude, bottomLeftLongitude
          } = item
          const latlngs = [[topLeftLatitude, topLeftLongitude], [topRightLatitude, topRightLongitude], [bottomRightLatitude, bottomRightLongitude], [bottomLeftLatitude, bottomLeftLongitude]]
          return L.polygon(latlngs)
        })
        this.imgLayer = L.layerGroup(polygons).addTo(this.map)
        this.shp.push(this.imgLayer)
      }
    },
    // 渲染摄像头点位信息
    addMarkObj (list) {
      if (this.markObj) {
        this.markObj.remove()
        this.markObj = null
      } else {
        const points = list.map(item => L.marker([item.lat, item.lon], {
          icon: L.icon({
            iconUrl: 'images/camera.png',
            iconSize: [20, 20],
            popupAnchor: [-3, -76]
          })
        })
        )
        this.markObj = L.layerGroup(points).addTo(this.map)
      }
    },
    addTif (data, type, latlon) { // 添加tif
      this.clearShp()
      console.log(data)
      if (this.trtif) {
        this.trtif.remove()
      }
      if (type === 1) {
        this.map.flyTo([35.1019, 102.5801], 4)
        this.trtif = L.tileLayer.wms(`${this.$geoServer}/geoserver/wms`, {
          layers: data.data.url,
          format: 'image/png',
          transparent: true,
          sld: `${this.$geoServer}/soil/sld/${data.data.url.split(':')[1]}.sld`
        }).addTo(this.map)
      } else {
        console.log(data)
        this.map.flyToBounds(latlon)
        this.trtif = data.data.map(item => {
          console.log(item.url)
          L.tileLayer.wms(`${this.$geoServer}/geoserver/wms`, {
            layers: item.url,
            format: 'image/png',
            transparent: true
          }).addTo(this.map)
        })
      }
      this.shp.push(this.trtif)
    },
    addDelTif (data, latlon) {
      if (this.trtif) {
        this.trtif.remove()
        this.trtif = null
      }
      this.map.flyToBounds(latlon)
      console.log(data.url)
      this.trtif = L.tileLayer.wms(`${this.$geoServer}/geoserver/wms`, {
        layers: data.url,
        format: 'image/png',
        transparent: true
      }).addTo(this.map)
    },
    addShowDot (data) {
      const _this = this
      for (let i = 0; i < data.length; i++) {
        var myIcon = L.icon({
          iconUrl: 'images/plot.png',
          iconSize: [20, 20],
          popupAnchor: [-3, -76]
        })
        L.marker([data[i].y, data[i].x], { icon: myIcon })
          .on('click', (e) => {
            _this.$emit('showDetail', { lat: data[i].x, lon: data[i].y, id: data[i].id })
          })
          .on('mouseover', (e) => {
            console.log('mouseover  ---', data[i])
            L.popup().setLatLng(e.latlng).setContent(`
              <div>
                <span>${data[i].dk_name}</span>
              </div>
            `).openOn(this.map)
          })
          .addTo(_this.map)
      }
    },
    // detail渲染jeoGson
    addDetailGeoJson (json) {
      this.clearShp()
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: JSON.parse(json)
      }
      this.detailJson = L.geoJSON(geojson).addTo(this.map)
      this.shp.push(this.detailJson)
      this.map.flyToBounds(this.detailJson.getBounds(), { animate: false })
    },
    clearShp () { // 清除shp
      if (this.shp && this.shp.length > 0) {
        this.shp.forEach(item => item.remove())
      }
      this.shp = []
    },
    // x渲染geoJson
    addGeoJson (data) {
      this.clearShp()
      if (this.shuibaPoints) {
        this.shuibaPoints.remove()
        this.shuibaPoints = null
      } else {
        const options = data.map(item => L.geoJSON(item, {
          pointToLayer: (geoJsonPoint, latlng) => L.marker(latlng, {
            icon: L.icon({
              iconUrl: 'images/bam.png',
              iconSize: [20, 20],
              popupAnchor: [-3, -76]
            })
          })
        }).on('click', (e) => {
          L.popup().setLatLng(e.latlng).setContent(`
              <div>
                <span>${item.properties.name}</span>
              </div>
            `).openOn(this.map)
        }))
        this.shuibaPoints = L.layerGroup(options).addTo(this.map)
      }
    },
    addShp (shpUrl, list) {
      this.clearShp()
      if (this.showShp) {
        this.showShp.remove()
        this.showShp = null
      }
      if (this.sdUrl === shpUrl) {
        this.clearShp()
        this.sdUrl = ''
        return
      } else {
        this.sdUrl = shpUrl
      }
      const sfList = list
      this.area = null
      const layerUrl = `${this.$geoServer}/geoserver/gwc/service/tms/1.0.0/${shpUrl}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      const vectorTileOptions = {
        layerURL: layerUrl,
        rendererFactory: L.canvas.tile,
        vectorTileLayerStyles: this.getVectorStyles(shpUrl, list, 'CityNameC'),
        interactive: true,
        tms: true,
        zIndex: 1,
        getFeatureId: function (f) {
          return f.id
        }
      }
      this.showShp = L.vectorGrid.protobuf(layerUrl, vectorTileOptions).addTo(this.map)
      this.shp.push(this.showShp)
      this.showShp.on('click', (e) => {
        for (let i = 0; i < sfList.length; i++) {
          if (e.layer.properties.CityNameC === sfList[i].name) {
            L.popup().setLatLng(e.latlng).setContent(`
                <div>
                  <span>施肥量: ${sfList[i].number} 吨</span>
                </div>
              `).openOn(this.map)
          }
        }
      })
    },
    getVectorStyles (layerName, list, CityNameC) {
      const style = {}
      if (list && list.length > 0) {
        var prodData = list.map(function (item) {
          return item.name
        })
        var index = layerName.lastIndexOf(':')
        // eslint-disable-next-line no-redeclare
        var layerName = layerName.substring(index + 1, layerName.length)
        style[layerName] = function (properties, zoom) {
          var p = properties[CityNameC]
          if (prodData.indexOf(p) !== -1) {
            return {
              color: '#22b4ff',
              fillOpacity: 0.4,
              stroke: true,
              fill: true,
              weight: 2
            }
          } else {
            return {
              color: '#fff',
              fillOpacity: 0,
              stroke: false,
              fill: false,
              weight: 0
            }
          }
        }
      } else {
        style[layerName] = (properties, zoom) => {
          return {
            fillColor: '#ff0000',
            fillOpacity: 0,
            stroke: true,
            fill: true,
            color: '#ff0000',
            opacity: 1,
            weight: 2
          }
        }
      }
      return style
    },
    overlayer () {
      this.tucengshow = true
    },
    outlayer () {
      this.tucengshow = false
    },
    moveMap (e) {
      this.brcon = '经度：' + e.latlng.lng.toFixed(3) + '纬度：' + e.latlng.lat.toFixed(3)
    },
    fuwei () {
      var _this = this
      this.map.setView(_this.mapData.center, _this.mapData.zoom)
    },
    fangda () {
      var zoom = this.map.getZoom()
      this.map.setZoom(zoom + 1)
    },
    suoxiao () {
      var zoom = this.map.getZoom()
      this.map.setZoom(zoom - 1)
    },
    pointHandle (e) {
    },
    getGjx () {
      var _this = this
      this.gjxobj = L.tileLayer.wms(_this.GLOBAL.geoserverip + '/wms', {
        layers: 'd:china',
        format: 'image/png',
        transparent: true,
        zIndex: 2001
        // attribution: "Weather data © 2012 IEM Nexrad"
      })
      this.gjxobj.addTo(this.map)
    },
    imageOverlay (url, bounds, type) {
      if (type === this.type) {
        this.qxrlt.remove()
        this.qxrlt = null
        this.type = ''
      } else {
        this.type = type
        if (this.qxrlt) {
          this.qxrlt.remove()
          this.qxrlt = null
        }
        this.qxrlt = L.imageOverlay(url, bounds, {
          zIndex: 2
        }).addTo(this.map)
      }
    },
    imageTransform (latlons) {
      this.clearShp()
      if (this.yxt) {
        this.yxt.remove()
        this.yxt = null
      } else {
        // eslint-disable-next-line camelcase
        const { max_lat, max_lon, min_lat, min_lon } = latlons
        // eslint-disable-next-line camelcase
        this.map.flyToBounds([[max_lat, max_lon], [min_lat, min_lon]])
        const optiopns = latlons.data.map(item => {
          const topLeft = [item.topLeftLatitude, item.topLeftLongitude]
          const topRight = [item.topRightLatitude, item.topRightLongitude]
          const botLeft = [item.bottomLeftLatitude, item.bottomLeftLongitude]
          const botRight = [item.bottomRightLatitude, item.bottomRightLongitude]
          item.latlons = [topLeft, topRight, botRight, botLeft]
          return L.imageTransform(this.$imgServer + item.url, item.latlons, {
            zIndex: 2
          })
        })
        this.yxt = L.layerGroup(optiopns).addTo(this.map)
        this.shp.push(this.yxt)
      }
    },
    // 详情数据展示
    detailImageTransform (latlons) {
      this.clearShp()
      var Arr = []
      Arr.push(latlons)
      if (this.yxt) {
        this.yxt.remove()
        this.yxt = null
      } else {
        // eslint-disable-next-line camelcase
        const { topLeftLatitude, topLeftLongitude, bottomRightLatitude, bottomRightLongitude } = latlons
        // eslint-disable-next-line camelcase
        this.map.flyToBounds([[topLeftLatitude, topLeftLongitude], [bottomRightLatitude, bottomRightLongitude]])
        const optiopns = Arr.map(item => {
          const topLeft = [item.topLeftLatitude, item.topLeftLongitude]
          const topRight = [item.topRightLatitude, item.topRightLongitude]
          const botLeft = [item.bottomLeftLatitude, item.bottomLeftLongitude]
          const botRight = [item.bottomRightLatitude, item.bottomRightLongitude]
          item.latlons = [topLeft, topRight, botRight, botLeft]
          return L.imageTransform(this.$imgServer + item.url, item.latlons, {
            zIndex: 2
          })
        })
        this.yxt = L.layerGroup(optiopns).addTo(this.map)
        this.shp.push(this.yxt)
      }
    }
  },
  components: {
    LMap,
    LTileLayer,
    LControlAttribution
  },
  watch: {
    blayer (val, oldVal) {
      this.addBottomLayer(val)
    }
  },
  mounted () {
    this.map = this.$refs.mapObj.mapObject
    // setTimeout(() => {
    //   console.log('jiru ')
    //   this.addAreaLine('land')
    // }, 500)
  }
}
</script>

<style lang="scss">
.mapbox {
width: 100%;
height: 98%;
z-index: 1;
.leaflet-tools {
    position: absolute;
    right: 10px;
    bottom: 8%;
    z-index: 401;
    text-align: center;
    line-height: 40px;
    // background: #FFFFFF;
    width: 40px;
    // border: 2px solid rgba(0,0,0,0.2);
    .tools-item {
      background: #ffffff;
      position: relative;
      height: 40px;
      border-bottom: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
    }
    .fangda {
      border-radius: 5px 5px 0 0;
      margin-top: 10px;
    }
    .suoxiao {
      border-radius: 0 0 5px 5px;
    }
    .tuceng {
      .layerbox {
        background: #ffffff;
        position: absolute;
        right: 30px;
        top: 0px;
        padding: 5px;
      }
    }
  }
}
</style>
