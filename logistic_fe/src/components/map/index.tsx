import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"
import { createControlComponent } from "@react-leaflet/core";

import { createRoutineMachineLayer } from "components/routMachine";
import { SET_ORDER_ROUTE_KEY, SET_ORDER_ROUTE_START } from "redux/orders/orders.constants";
import { useDispatch, useSelector } from "react-redux";
import { IOrder } from "exports/types";
import ContextMenu from "components/contextMenu";
import AirplaneMarker from "components/vehicleMarker";
;
interface Props {
    selectedOrder: null | IOrder;
    coords?: number[][]
}

function MapActions({onContextMenu}) {
  const map = useMapEvents({
    contextmenu: (e) => {
      onContextMenu(e);
    },
  });

  return null
}

let count = 0
const Map:React.FunctionComponent<Props> = ({ selectedOrder, coords}) => {
    const disptach = useDispatch()
    const {data: orderRoute} = useSelector((state: any) => state.order[SET_ORDER_ROUTE_KEY])

    // const [coords, setCoords] = React.useState<null | number[][]>(null);
    const [anchorPoint, setAnchorPoint] = React.useState({x:  0, y: 0})
    const [showContext, setShowContext] = React.useState(false)
    const [mapObj, setMapObj] = React.useState<any>()
    const [currentTrack, setCurrentTrack] = React.useState(0)

    const interval = React.useRef<any>()

    useEffect(() => {
        if (orderRoute?.data) {
            console.log(orderRoute)
            if (interval.current) {
                clearInterval(interval.current)
                count = 0
            }
            startRoadTrip()
        }
    }, [orderRoute])


    function startRoadTrip() {
        const {coordinates: route} = orderRoute.data.route

        interval.current = setInterval(() => {
          if (count === route.length - 1) {
            setCurrentTrack(route[count]);
            clearInterval(interval.current);
            return;
          }

        //   if ()

          count += 1;
          setCurrentTrack(route[count]);
        }, 1000);
    }

    useEffect(() => {
      document.addEventListener("click", handleClick);
    }, [])

    const handleClick = React.useCallback(() => {
        setShowContext(false)
    }, [setShowContext])

    const CONTEXT_MENU = [
        {id: 1, text: 'Отсюда', cb: setFromMarker},
        {id: 1, text: 'Сюда', cb: setToMarker},
    ]


    function setFromMarker(id, mapData) {
        // setCoords([[mapData.lat, mapData.lng], coords[1]]);
    }

    function setToMarker(id, mapData) {
        // setCoords([coords[0], [mapData.lat, mapData.lng]]);
    }

        
    const newRoute = React.useCallback((data) => {
        disptach({type: SET_ORDER_ROUTE_START, data})
    }, [disptach])

    const getRoute = React.useMemo(() => {
        if (coords) {
            console.log('get route')
            const route = createRoutineMachineLayer,
            [from, to] = [...coords]
            
            const Element = createControlComponent(() => route(from[0], from[1], to[0], to[1], newRoute));
            return <Element/>
            
        }
    }, [coords, newRoute])


    const onContextMenu = React.useCallback((e) => {
        const {clientX, clientY} = e.originalEvent
        setAnchorPoint({ x: clientX, y: clientY });
        setShowContext(true);
        setMapObj(e.latlng);
    }, [])

    return (
        <>
            {mapObj && <ContextMenu cbData={mapObj} anchorPoints={anchorPoint} show={showContext} items={CONTEXT_MENU} />}
            <MapContainer center={[53.893009, 27.567444]} zoom={13} className="h-full w-full pl-5">
            <TileLayer
                attribution='@viktorelmer - test task'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedOrder && coords && getRoute}
            <MapActions onContextMenu={onContextMenu}/>
            {orderRoute?.data && currentTrack && <AirplaneMarker data={currentTrack} />}
            </MapContainer>
        </>
    );
}

export default Map