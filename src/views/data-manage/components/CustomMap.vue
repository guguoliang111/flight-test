<template>
  <div class="custom-map">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet.awesome-markers'
import 'leaflet.vectorgrid'
import 'leaflet-draw'
import '@/utils/leaflet.control.expand'
import { drawPoint, drawLine, drawRect, drawPolygon } from '@/utils/leaflet.control.expand/events'
import 'leaflet-imageoverlay-rotated'
import 'leaflet/dist/leaflet.css'
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import '@/utils/leaflet.control.expand/index.css'

export default {
  name: 'CustomMap',
  props: {
    center: {
      type: Array,
      default: () => ([35.1019, 102.5801])
    },
    zoom: {
      type: Number,
      default: 4
    },
    bounds: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      fullPage: false,
      showResetBtn: false,
      sjname: {
        大风: 'dafeng',
        寒潮: 'hanchao',
        干旱: 'ganhan',
        暴雨: 'baoyu',
        森林火险: 'huoxian',
        雷电: 'leidian',
        雷雨大风: 'leiyu',
        高温: 'gaowen',
        冰雹: 'bingbao',
        大雾: 'dawu',
        强对流: 'qita',
        干热风: 'ganrefeng',
        沙尘暴: 'shachenbao',
        暴雪: 'baoxue',
        道路结冰: 'daolujiebing',
        霾: 'mai',
        台风: 'taifeng'
      },
      colorname: {
        红色: 'red.png',
        橙色: 'orange.png',
        蓝色: 'blue.png',
        黄色: 'yellow.png'
      }
    }
  },
  methods: {
    init () { // 初始化
      this.map = L.map('map', {
        center: this.center,
        zoom: this.zoom,
        minZoom: 4,
        attributionControl: false
      })
      const baseLayers = {
        天地图矢量: L.layerGroup([
          L.tileLayer('http://t{s}.tianditu.com/DataServer?T=img_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}', {
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
          }),
          L.tileLayer('http://t{s}.tianditu.com/DataServer?T=cia_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}', {
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
          })
        ]).addTo(this.map),
        天地图影像: L.layerGroup([
          L.tileLayer('http://t{s}.tianditu.com/DataServer?T=vec_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}', {
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
          }),
          L.tileLayer('http://t{s}.tianditu.com/DataServer?T=cva_w&tk=4d98f25cc47a0a7cddfc4d4e30210dd1&x={x}&y={y}&l={z}', {
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
          })
        ]).addTo(this.map)
      }
      L.control.layers(baseLayers, null, {
        position: 'bottomright'
      }).addTo(this.map)
      this.map.zoomControl.options.zoomInTitle = '放大'
      this.map.zoomControl.options.zoomOutTitle = '缩小'
      this.map.zoomControl.setPosition('bottomright')
      this.map.rect = []
      this.map.polygon = []
      this.map.circle = []
      window.cusMap = this.map
      L.Control.fullscreen().addTo(this.map)
    },
    toggleLineMeasure () { // 测距切换
      if (this.map.lineMeasure && this.map.lineMeasure.options.showLineMeasure) {
        this.map.lineMeasure.onRemove()
      } else {
        this.map.lineMeasure = L.Control.lineMeasure().addTo(this.map)
        // L.drawLocal.draw.handlers.polyline.tooltip.start = '点击开始绘制线'
        // L.drawLocal.draw.handlers.polyline.tooltip.cont = '点击继续绘制线'
        // L.drawLocal.draw.handlers.polyline.tooltip.end = '点击最后一个点结束绘制线'
      }
    },
    toggleAreaMeasure () { // 测面积切换
      if (this.map.areaMeasure && this.map.areaMeasure.options.showAreaMeasure) {
        this.map.areaMeasure.onRemove()
      } else {
        this.map.areaMeasure = L.Control.areaMeasure().addTo(this.map)
      }
    },
    addShp (list) { // 展示shp数据
      const layers = list.map(item => {
        const { url } = item
        const layerURL = `${this.$geoServer}/geoserver/gwc/service/tms/1.0.0/${url}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
        const vectorGridOptions = {
          layerURL,
          rendererFactory: L.canvas.tile,
          vectorTileLayerStyles: this.getShpStyles(url),
          interactive: true,
          tms: true,
          zIndex: 2
        }
        return L.vectorGrid.protobuf(layerURL, vectorGridOptions)
      })
      const shpLayer = L.layerGroup(layers).addTo(this.map)
      return shpLayer
    },
    getShpStyles (layerName) { // 定义shp样式
      const style = {}
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
      return style
    },
    addDelTif (data) {
      const { topLeftLatitude, topLeftLongitude, bottomRightLatitude, bottomRightLongitude, url } = data
      if (this.trtif) {
        this.trtif.remove()
        this.trtif = null
      }
      var latlon = [[topLeftLatitude, topLeftLongitude], [bottomRightLatitude, bottomRightLongitude]]
      this.map.flyToBounds(latlon)
      console.log(url)
      this.trtif = L.tileLayer.wms(`${this.$geoServer}/geoserver/wms`, {
        layers: url,
        format: 'image/png',
        transparent: true
      }).addTo(this.map)
    },
    addTif (list) { // 展示tif数据
      const layers = list.map(item => {
        const { url } = item
        return L.tileLayer.wms(`${this.$geoServer}/geoserver/d/wms`, {
          layers: url,
          format: 'image/png',
          transparent: true,
          sld: `${this.$geoServer}/soil/sld/${url.split(':')[1]}.sld`,
          zIndex: 2
        })
      })
      const tifLayer = L.layerGroup(layers).addTo(this.map)
      return tifLayer
    },
    addImg (list) { // 展示图片数据
      const layers = list.map(item => {
        const {
          url,
          topLeftLatitude, topLeftLongitude, topRightLatitude, topRightLongitude,
          bottomLeftLatitude, bottomLeftLongitude
        } = item
        const topLeft = L.latLng(topLeftLatitude, topLeftLongitude)
        const topRight = L.latLng(topRightLatitude, topRightLongitude)
        const bottomLeft = L.latLng(bottomLeftLatitude, bottomLeftLongitude)
        return L.imageOverlay.rotated(this.$imgServer + url, topLeft, topRight, bottomLeft)
      })
      const imgLayer = L.layerGroup(layers).addTo(this.map)
      return imgLayer
    },
    addGeoJson (geojson) { // 展示tif数据
      const layer = L.geoJSON(geojson).addTo(this.map)
      this.map.flyToBounds(layer.getBounds(), {
        animate: false
      })
      return layer
    },
    addShuiba (list) { // 展示水坝数据
      const points = list.map(item => L.geoJSON(item, {
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
      const shuibaPoints = L.layerGroup(points).addTo(this.map)
      return shuibaPoints
    },
    addPolygon (list) { // 展示polygon数据
      console.log(list)
      const polygons = list.map(item => {
        const {
          topLeftLatitude, topLeftLongitude, topRightLatitude, topRightLongitude,
          bottomRightLatitude, bottomRightLongitude, bottomLeftLatitude, bottomLeftLongitude
        } = item
        const latlngs = [[topLeftLatitude, topLeftLongitude], [topRightLatitude, topRightLongitude], [bottomRightLatitude, bottomRightLongitude], [bottomLeftLatitude, bottomLeftLongitude]]
        return L.polygon(latlngs)
      })
      const imgLayer = L.layerGroup(polygons).addTo(this.map)
      return imgLayer
    },
    flyTo (bounds) { // 跳转到指定区域.
      const { maxX, maxY, minX, minY } = bounds
      const corner1 = L.latLng(maxY, maxX)
      const corner2 = L.latLng(minY, minX)
      this.map.flyToBounds(L.latLngBounds(corner1, corner2), {
        animate: false
      })
    },
    addWeatherPoints (id, points) {
      const pointList = points.map(item => L.marker([item.lat, item.lon], {
        icon: L.icon({
          iconUrl: `/images/yjimg/${this.sjname[item.codename]}/${this.colorname[item.signallevel]}`,
          iconSize: [45, 30],
          iconAnchor: [15, 30],
          popupAnchor: [10, -35]
        })
      }).addTo(this.map).bindPopup(item.issuecontent))
      this.weatherPoints[id] = pointList
    },
    removeWeatherPoints (id) {
      this.weatherPoints[id].forEach(item => item.remove())
      delete this.weatherPoints[id]
    },
    flyToPoint (latlng) {
      this.map.flyTo(latlng)
    },
    createPoint () {
      drawPoint(L, this.map, layer => {
        this.$emit('drawPoint', layer)
      })
    },
    createLine () {
      drawLine(L, this.map, layer => {
        this.$emit('drawLine', layer)
      })
    },
    createRect () {
      drawRect(L, this.map, layer => {
        this.$emit('drawRect', layer)
      })
    },
    createPolygon () {
      drawPolygon(L, this.map, layer => {
        this.$emit('drawPolygon', layer)
      })
    },
    showDrawBtn () {
      const that = this
      L.Control.drawRect({
        finishDrawRect: function (layer) {
          const latlngs = [...layer.getLatLngs()[0], layer.getLatLngs()[0][0]]
          that.$emit('drawRect', { latlngs, layer })
        }
      }).addTo(this.map)
      L.Control.drawPolygon({
        finishDrawPolygon: function (layer) {
          const latlngs = [...layer.getLatLngs()[0], layer.getLatLngs()[0][0]]
          that.$emit('drawPolygon', { latlngs, layer })
        }
      }).addTo(this.map)
    },
    measureArea (latlngs) {
      return L.GeometryUtil.geodesicArea(latlngs)
    }
  },
  created () {
    this.rect = []
    this.polygon = []
    this.weatherPoints = {}
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
    this.$once('hook:beforeDestroy', () => {
      this.map.remove()
      this.map = null
    })
  }
}
</script>

<style lang="scss" scoped>
  .custom-map {
    width: 100%;
    height: 100%;
    min-height: 300px;
    position: relative;
    #map {
      width: 100%;
      height: 100%;
      min-height: 300px;
    }
    .tools {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 999;
      background-color: #fff;
      padding: 5px;
      border-radius: 4px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.65);
      .tool-item {
        padding: 0 8px;
        cursor: pointer;
        &:not(:last-child) {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
</style>
