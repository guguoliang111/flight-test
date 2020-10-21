const currentDraw = {
  id: null,
  latlngs: [],
  layers: {}
}

function drawPoint (L, map, fn) {
  if (currentDraw.id) {
    clearMapEvent(map)
    currentDraw.layers[currentDraw.id].remove()
    delete currentDraw.layers[currentDraw.id]
    currentDraw.id = null
    currentDraw.latlngs = []
  }
  map.on('mousemove', ({ latlng }) => {
    if (currentDraw.id) {
      currentDraw.layers[currentDraw.id].setLatLng(latlng)
    } else {
      const layer = L.marker(latlng, {
        icon: L.AwesomeMarkers.icon({
          prefix: 'fa',
          icon: '',
          markerColor: 'blue'
        })
      }).addTo(map)
      currentDraw.id = layer._leaflet_id
      currentDraw.layers[currentDraw.id] = layer
      currentDraw.layers[currentDraw.id].changeIcon = function (icon) {
        this.setIcon(L.AwesomeMarkers.icon(icon))
      }
    }
  })
  map.on('click', ({ latlng }) => {
    currentDraw.layers[currentDraw.id].setLatLng(latlng)
    clearMapEvent(map)
    fn(currentDraw.layers[currentDraw.id])
    currentDraw.id = null
  })
}

function drawLine (L, map, fn) {
  if (currentDraw.id) {
    clearMapEvent(map)
    currentDraw.layers[currentDraw.id].remove()
    delete currentDraw.layers[currentDraw.id]
    currentDraw.id = null
    currentDraw.latlngs = []
  }
  map.on('click', ({ latlng }) => {
    if (currentDraw.latlngs[0]) {
      currentDraw.latlngs[1] = latlng
      currentDraw.layers[currentDraw.id].setLatLngs(currentDraw.latlngs)
      clearMapEvent(map)
      fn(currentDraw.layers[currentDraw.id])
      currentDraw.id = null
      currentDraw.latlngs = []
    } else {
      currentDraw.latlngs[0] = latlng
      map.on('mousemove', ({ latlng }) => {
        currentDraw.latlngs[1] = latlng
        if (currentDraw.id) {
          currentDraw.layers[currentDraw.id].setLatLngs(currentDraw.latlngs)
        } else {
          const layer = L.polyline(currentDraw.latlngs, { color: '#ff7800', weight: 5 }).addTo(map)
          currentDraw.id = layer._leaflet_id
          currentDraw.layers[currentDraw.id] = layer
        }
      })
    }
  })
}

function drawRect (L, map, fn) {
  if (currentDraw.id) {
    clearMapEvent(map)
    currentDraw.layers[currentDraw.id].remove()
    delete currentDraw.layers[currentDraw.id]
    currentDraw.id = null
    currentDraw.latlngs = []
  }
  map.on('click', ({ latlng }) => {
    if (currentDraw.latlngs[0]) {
      currentDraw.latlngs[1] = latlng
      currentDraw.layers[currentDraw.id].setBounds(currentDraw.latlngs)
      clearMapEvent(map)
      fn(currentDraw.layers[currentDraw.id])
      currentDraw.id = null
      currentDraw.latlngs = []
    } else {
      currentDraw.latlngs[0] = latlng
      map.on('mousemove', ({ latlng }) => {
        currentDraw.latlngs[1] = latlng
        if (currentDraw.id) {
          currentDraw.layers[currentDraw.id].setBounds(currentDraw.latlngs)
        } else {
          const layer = L.rectangle(currentDraw.latlngs, { color: '#ff7800', weight: 1 }).addTo(map)
          currentDraw.id = layer._leaflet_id
          currentDraw.layers[currentDraw.id] = layer
        }
      })
    }
  })
}

function drawPolygon (L, map, fn) {
  if (currentDraw.id) {
    clearMapEvent(map)
    currentDraw.layers[currentDraw.id].remove()
    delete currentDraw.layers[currentDraw.id]
    currentDraw.id = null
    currentDraw.latlngs = []
  }
  map.on('click', ({ latlng }) => {
    currentDraw.latlngs.push(latlng)
    const tempLatlngs = [...currentDraw.latlngs]
    map.on('mousemove', ({ latlng }) => {
      tempLatlngs[currentDraw.latlngs.length] = latlng
      if (currentDraw.id) {
        currentDraw.layers[currentDraw.id].setLatLngs(tempLatlngs)
      } else {
        const layer = L.polygon(tempLatlngs, { color: '#ff7800', weight: 1 }).addTo(map)
        currentDraw.id = layer._leaflet_id
        currentDraw.layers[currentDraw.id] = layer
      }
    })
    map.on('dblclick', e => {
      clearMapEvent(map)
      fn(currentDraw.layers[currentDraw.id])
      currentDraw.id = null
      currentDraw.latlngs = []
    })
  })
}

function drawCircle (map) {}

function measureLine () {}

function measureArea () {}

function clearMapEvent (map) {
  map.removeEventListener('click')
  map.removeEventListener('dblclick')
  map.removeEventListener('mousemove')
}

export { drawPoint, drawLine, drawRect, drawPolygon, drawCircle, measureLine, measureArea }
