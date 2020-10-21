import { drawRect, drawPolygon } from './events'
(function (factory, window) {
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], function (L) {
      factory(L, window.toGeoJSON)
    })

    // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === 'object') {
    module.exports = function (L) {
      if (L === undefined) {
        if (typeof window !== 'undefined') {
          L = require('leaflet')
        }
      }
      factory(L)
      return L
    }
  } else if (typeof window !== 'undefined' && window.L) {
    factory(window.L)
  }
}(function (L) {
  /**
   * 全屏按钮
   */
  const fullScreenApi = {
    supportsFullScreen: false,
    isFullScreen: function () { return false },
    requestFullScreen: function () {},
    cancelFullScreen: function () {},
    fullScreenEventName: '',
    prefix: ''
  }
  const browserPrefixes = 'webkit moz o ms khtml'.split(' ')

  if (typeof document.exitFullscreen !== 'undefined') {
    fullScreenApi.supportsFullScreen = true
  } else {
    // check for fullscreen support by vendor prefix
    for (var i = 0, il = browserPrefixes.length; i < il; i++) {
      fullScreenApi.prefix = browserPrefixes[i]
      if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
        fullScreenApi.supportsFullScreen = true
        break
      }
    }
    if (typeof document.msExitFullscreen !== 'undefined') {
      fullScreenApi.prefix = 'ms'
      fullScreenApi.supportsFullScreen = true
    }
  }

  if (fullScreenApi.supportsFullScreen) {
    if (fullScreenApi.prefix === 'ms') {
      fullScreenApi.fullScreenEventName = 'MSFullscreenChange'
    } else {
      fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange'
    }
    fullScreenApi.isFullScreen = function () {
      switch (this.prefix) {
        case '':
          return document.fullscreen
        case 'webkit':
          return document.webkitIsFullScreen
        case 'ms':
          return document.msFullscreenElement
        default:
          return document[this.prefix + 'FullScreen']
      }
    }
    fullScreenApi.requestFullScreen = function (el) {
      switch (this.prefix) {
        case '':
          return el.requestFullscreen()
        case 'ms':
          return el.msRequestFullscreen()
        default:
          return el[this.prefix + 'RequestFullScreen']()
      }
    }
    fullScreenApi.cancelFullScreen = function () {
      switch (this.prefix) {
        case '':
          return document.exitFullscreen()
        case 'ms':
          return document.msExitFullscreen()
        default:
          return document[this.prefix + 'CancelFullScreen']()
      }
    }
  }

  L.Control.FullScreen = L.Control.extend({
    statics: {
      TITLE: 'FullScreen'
    },
    options: {
      position: 'bottomright',
      title: '全屏',
      titleCancel: '退出全屏',
      forceSeparateButton: false,
      forcePseudoFullscreen: false,
      fullscreenElement: false
    },
    onAdd: function (map) {
      const className = 'leaflet-control-zoom-fullscreen fullscreen-icon'
      let container = null
      const content = ''
      if (map.zoomControl && !this.options.forceSeparateButton) {
        container = map.zoomControl._container
      } else {
        container = L.DomUtil.create('div', 'leaflet-bar')
      }
      this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this)
      this._map.fullscreenControl = this
      this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this)
      return container
    },
    onRemove: function (map) {
      L.DomEvent
        .off(this.link, 'click', L.DomEvent.stopPropagation)
        .off(this.link, 'click', L.DomEvent.preventDefault)
        .off(this.link, 'click', this.toggleFullScreen, this)

      L.DomEvent
        .off(this._container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
        .off(this._container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
        .off(this._container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this)

      L.DomEvent
        .off(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
        .off(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
        .off(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this)
    },
    _createButton: function (title, className, content, container, fn, context) {
      this.link = L.DomUtil.create('a', className, container)
      this.link.href = '#'
      this.link.title = title
      this.link.innerHTML = content
      this.link.setAttribute('role', 'button')
      this.link.setAttribute('aria-label', title)

      L.DomEvent
        .on(this.link, 'click', L.DomEvent.stopPropagation)
        .on(this.link, 'click', L.DomEvent.preventDefault)
        .on(this.link, 'click', fn, context)

      L.DomEvent
        .on(container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
        .on(container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
        .on(container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context)

      L.DomEvent
        .on(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
        .on(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
        .on(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context)

      return this.link
    },
    toggleFullScreen: function () {
      const map = this._map
      map._exitFired = false
      if (map._isFullscreen) {
        if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
          fullScreenApi.cancelFullScreen()
        } else {
          L.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen')
        }
        map.fire('exitFullscreen')
        map._exitFired = true
        map._isFullscreen = false
      } else {
        if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
          fullScreenApi.requestFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container)
        } else {
          L.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen')
        }
        map.fire('enterFullscreen')
        map._isFullscreen = true
      }
    },
    _toggleTitle: function () {
      this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel
    },
    _handleFullscreenChange: function () {
      const map = this._map
      map.invalidateSize()
      if (!fullScreenApi.isFullScreen() && !map._exitFired) {
        map.fire('exitFullscreen')
        map._exitFired = true
        map._isFullscreen = false
      }
    }
  })
  L.Map.include({
    toggleFullscreen: function () {
      this.fullscreenControl.toggleFullScreen()
    }
  })
  L.Map.addInitHook(function () {
    if (this.options.fullscreenControl) {
      this.fullscreen = L.Control.FullScreen().addTo(this)
    }
  })
  L.Control.fullscreen = function (options) {
    return new L.Control.FullScreen(options)
  }

  function clearMapEvent (map) {
    map.removeEventListener('click')
    map.removeEventListener('dblclick')
    map.removeEventListener('mousemove')
  }

  L.Polyline.Measure = L.Draw.Polyline.extend({
    addHooks: function () {
      L.Draw.Polyline.prototype.addHooks.call(this)
      if (this._map) {
        this._markerGroup = new L.LayerGroup()
        this._map.addLayer(this._markerGroup)

        this._markers = []
        this._map.on('click', this._onClick, this)
        this._startShape()
      }
    },

    removeHooks: function () {
      L.Draw.Polyline.prototype.removeHooks.call(this)

      this._clearHideErrorTimeout()

      // !\ Still useful when control is disabled before any drawing (refactor needed?)
      this._map
        .off('pointermove', this._onMouseMove, this)
        .off('mousemove', this._onMouseMove, this)
        .off('click', this._onClick, this)

      this._clearGuides()
      this._container.style.cursor = ''

      this._removeShape()
    },

    _startShape: function () {
      this._drawing = true
      this._poly = new L.Polyline([], this.options.shapeOptions)
      // this is added as a placeholder, if leaflet doesn't recieve
      // this when the tool is turned off all onclick events are removed
      this._poly._onClick = function () {}

      this._container.style.cursor = 'crosshair'

      this._updateTooltip()
      this._map
        .on('pointermove', this._onMouseMove, this)
        .on('mousemove', this._onMouseMove, this)
    },

    _finishShape: function () {
      this._drawing = false

      this._cleanUpShape()
      this._clearGuides()

      this._updateTooltip()

      this._map
        .off('pointermove', this._onMouseMove, this)
        .off('mousemove', this._onMouseMove, this)

      this._container.style.cursor = ''
    },

    _removeShape: function () {
      if (!this._poly) return
      this._map.removeLayer(this._poly)
      delete this._poly
      this._markers.splice(0)
      this._markerGroup.clearLayers()
    },

    _onClick: function () {
      if (!this._drawing) {
        this._removeShape()
        this._startShape()
      }
    },

    _getTooltipText: function () {
      var labelText = L.Draw.Polyline.prototype._getTooltipText.call(this)
      if (!this._drawing) {
        labelText.text = ''
      }
      return labelText
    }
  })

  /**
   * 测距
   */
  L.Control.LineMeasure = L.Control.extend({
    statics: {
      TITLE: '测距'
    },
    options: {
      title: '测距',
      position: 'bottomright',
      showLineMeasure: false
    },
    onAdd: function (map) {
      const className = 'leaflet-control-zoom-line-measure line-measure'
      let container = null
      const content = ''
      if (map.zoomControl && !this.options.forceSeparateButton) {
        container = map.zoomControl._container
      } else {
        container = L.DomUtil.create('div', 'leaflet-bar')
      }
      this._createButton(this.options.title, className, content, container, this.takeMeasureLine, this)
      this.options.showLineMeasure = true
      return container
    },
    onRemove: function (map) {
      this.link.remove()
      this.options.showLineMeasure = false
    },
    _createButton: function (title, className, content, container, fn, context) {
      this.link = L.DomUtil.create('a', className, container)
      this.link.href = '#'
      this.link.title = title
      this.link.innerHTML = content
      this.link.setAttribute('role', 'button')
      this.link.setAttribute('aria-label', title)

      L.DomEvent
        .on(this.link, 'click', L.DomEvent.stopPropagation)
        .on(this.link, 'click', L.DomEvent.preventDefault)
        .on(this.link, 'click', fn, context)

      return this.link
    },
    takeMeasureLine: function () {
      const map = this._map
      console.log(map)
    }
  })
  L.Map.addInitHook(function () {
    if (this.options.showLineMeasure) {
      this.lineMeasure = L.Control.LineMeasure().addTo(this)
    }
  })
  L.Control.lineMeasure = function (options) {
    return new L.Control.LineMeasure(options)
  }

  /**
   * 测面积
   */
  L.Control.AreaMeasure = L.Control.extend({
    statics: {
      TITLE: '测面积'
    },
    options: {
      title: '测面积',
      position: 'bottomright',
      showAreaMeasure: false
    },
    onAdd: function (map) {
      const className = 'leaflet-control-zoom-area-measure area-measure'
      let container = null
      const content = ''
      if (map.zoomControl && !this.options.forceSeparateButton) {
        container = map.zoomControl._container
      } else {
        container = L.DomUtil.create('div', 'leaflet-bar')
      }
      this._createButton(this.options.title, className, content, container, this.takeMeasureArea, this)
      this.options.showAreaMeasure = true
      return container
    },
    onRemove: function (map) {
      this.link.remove()
      this.options.showAreaMeasure = false
    },
    _createButton: function (title, className, content, container, fn, context) {
      this.link = L.DomUtil.create('a', className, container)
      this.link.href = '#'
      this.link.title = title
      this.link.innerHTML = content
      this.link.setAttribute('role', 'button')
      this.link.setAttribute('aria-label', title)

      L.DomEvent
        .on(this.link, 'click', L.DomEvent.stopPropagation)
        .on(this.link, 'click', L.DomEvent.preventDefault)
        .on(this.link, 'click', fn, context)

      return this.link
    },
    takeMeasureArea: function () {
      const map = this._map
      console.log('测面积', map)
    }
  })
  L.Map.addInitHook(function () {
    if (this.options.showAreaMeasure) {
      this.areaMeasure = L.Control.AreaMeasure().addTo(this)
    }
  })
  L.Control.areaMeasure = function (options) {
    return new L.Control.AreaMeasure(options)
  }

  /**
   * 绘制矩形
   */
  L.Control.DrawRect = L.Control.extend({
    statics: {
      TITLE: '绘制矩形'
    },
    options: {
      title: '绘制矩形',
      position: 'bottomright',
      showDrawRectBtn: false
    },
    onAdd: function (map) {
      const className = 'leaflet-control-zoom-draw-rect draw-rect'
      let container = null
      const content = ''
      if (map.zoomControl && !this.options.forceSeparateButton) {
        container = map.zoomControl._container
      } else {
        container = L.DomUtil.create('div', 'leaflet-bar')
      }
      this._createButton(this.options.title, className, content, container, this.startDrawRect, this)
      this.options.showDrawRectBtn = true
      this.latlngs = []
      this.rect = {}
      this.rectId = null
      return container
    },
    onRemove: function () {
      const map = this._map
      this.rectId = null
      this.rect = {}
      this.latlngs = []
      this.options.drawRect = false
      this.link.remove()
      this.options.showDrawRectBtn = false
      clearMapEvent(map)
    },
    _createButton: function (title, className, content, container, fn, context) {
      this.link = L.DomUtil.create('a', className, container)
      this.link.href = '#'
      this.link.title = title
      this.link.innerHTML = content
      this.link.setAttribute('role', 'button')
      this.link.setAttribute('aria-label', title)

      L.DomEvent
        .on(this.link, 'click', L.DomEvent.stopPropagation)
        .on(this.link, 'click', L.DomEvent.preventDefault)
        .on(this.link, 'click', fn, context)

      return this.link
    },
    startDrawRect: function (e) {
      drawRect(L, this._map, layer => this.options.finishDrawRect(layer))
    }
  })

  L.Map.mergeOptions({
    drawRect: false
  })

  L.Map.addInitHook(function () {
    if (this.options.showDrawRectBtn) {
      this.drawRect = L.Control.DrawRect().addTo(this)
    }
  })
  L.Control.drawRect = function (options) {
    return new L.Control.DrawRect(options)
  }

  /**
   * 绘制多边形
   */
  L.Control.DrawPolygon = L.Control.extend({
    statics: {
      TITLE: '绘制多边行'
    },
    latlngs: [],
    polygon: {},
    polygonId: null,
    options: {
      title: '绘制多边行',
      position: 'bottomright',
      showDrawPolygonBtn: false
    },
    onAdd: function (map) {
      const className = 'leaflet-control-zoom-draw-polygon draw-polygon'
      let container = null
      const content = ''
      if (map.zoomControl && !this.options.forceSeparateButton) {
        container = map.zoomControl._container
      } else {
        container = L.DomUtil.create('div', 'leaflet-bar')
      }
      this._createButton(this.options.title, className, content, container, this.startDrawPolygon, this)
      this.options.showDrawPolygonBtn = true
      this.latlngs = []
      this.polygon = {}
      this.polygonId = null
      return container
    },
    onRemove: function () {
      const map = this._map
      this.polygonId = null
      this.polygon = {}
      this.latlngs = []
      this.options.drawRect = false
      this.link.remove()
      this.options.showDrawPolygonBtn = false
      clearMapEvent(map)
    },
    _createButton: function (title, className, content, container, fn, context) {
      this.link = L.DomUtil.create('a', className, container)
      this.link.href = '#'
      this.link.title = title
      this.link.innerHTML = content
      this.link.setAttribute('role', 'button')
      this.link.setAttribute('aria-label', title)

      L.DomEvent
        .on(this.link, 'click', L.DomEvent.stopPropagation)
        .on(this.link, 'click', L.DomEvent.preventDefault)
        .on(this.link, 'click', fn, context)

      return this.link
    },
    startDrawPolygon: function (e) {
      drawPolygon(L, this._map, layer => this.options.finishDrawPolygon(layer))
    }
  })
  L.Map.mergeOptions({
    drawPolygon: false
  })
  L.Map.addInitHook(function () {
    if (this.options.showDrawPolygonBtn) {
      this.drawPolygon = L.Control.DrawPolygon().addTo(this)
    }
  })
  L.Control.drawPolygon = function (options) {
    return new L.Control.DrawPolygon(options)
  }

  L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
    geodesicArea: function (latLngs) {
      var pointsCount = latLngs.length
      var area = 0.0
      var d2r = Math.PI / 180
      var p1; var p2

      if (pointsCount > 2) {
        for (var i = 0; i < pointsCount; i++) {
          p1 = latLngs[i]
          p2 = latLngs[(i + 1) % pointsCount]
          area += ((p2.lng - p1.lng) * d2r) *
                (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r))
        }
        area = area * 6378137.0 * 6378137.0 / 2.0
      }

      return Math.abs(area)
    },

    readableArea: function (area, isMetric) {
      var areaStr

      if (isMetric) {
        if (area >= 10000) {
          areaStr = (area * 0.0001).toFixed(2) + ' ha'
        } else {
          areaStr = area.toFixed(2) + ' m&sup2;'
        }
      } else {
        area *= 0.836127 // Square yards in 1 meter

        if (area >= 3097600) { // 3097600 square yards in 1 square mile
          areaStr = (area / 3097600).toFixed(2) + ' mi&sup2;'
        } else if (area >= 4840) { // 48040 square yards in 1 acre
          areaStr = (area / 4840).toFixed(2) + ' acres'
        } else {
          areaStr = Math.ceil(area) + ' yd&sup2;'
        }
      }

      return areaStr
    },

    readableDistance: function (distance, isMetric) {
      var distanceStr

      if (isMetric) {
        // show metres when distance is < 1km, then show km
        if (distance > 1000) {
          distanceStr = (distance / 1000).toFixed(2) + ' km'
        } else {
          distanceStr = Math.ceil(distance) + ' m'
        }
      } else {
        distance *= 1.09361

        if (distance > 1760) {
          distanceStr = (distance / 1760).toFixed(2) + ' miles'
        } else {
          distanceStr = Math.ceil(distance) + ' yd'
        }
      }

      return distanceStr
    }
  })
}, window))
