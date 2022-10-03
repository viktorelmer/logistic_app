import "leaflet-routing-machine";
import "leaflet-contextmenu";
import "leaflet";

import { createLayerComponent } from "@react-leaflet/core";

declare var L: any;

interface Props {
    latX: number,
    latY: number,
    latB: number,
    latC: number
}


export const createContextMenu = true

const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const createRoutineMachineLayer = (latX, latY, latB, latC, cb) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(latX, latY),
      L.latLng(latB, latC),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 6 }],
    },
    createMarker: function(i, wp, nWps) {
      if (i === 0) return L.marker(wp.latLng, {icon: redIcon})
      return L.marker(wp.latLng)
    },
    show: false,
    collapsible: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
  });
  instance.on('routeselected', cb)
  return instance;
};


// const RoutingMachine = createControlComponent(createRoutineMachineLayer);

