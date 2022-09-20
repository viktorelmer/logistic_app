import "leaflet-routing-machine";

import "leaflet";

declare var L: any;

interface Props {
    latX: number,
    latY: number,
    latB: number,
    latC: number
}


const createRoutineMachineLayer = (latX, latY, latB, latC) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(latX, latY),
      L.latLng(latB, latC),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 6 }],
    },
    show: false,
    collapsible: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
  });

  return instance;
};

// const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default createRoutineMachineLayer;
