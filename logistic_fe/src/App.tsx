import React, { useCallback, useEffect } from 'react';
import { createControlComponent } from "@react-leaflet/core";

import {Divider} from 'antd'

import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDERS_DATA_KEY, GET_ORDERS_DATA_START, SET_ORDER_ROUTE_KEY, SET_ORDER_ROUTE_START } from 'redux/orders/orders.constants';
import Order from 'components/order';
import { IOrder } from 'exports/types';

import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet'

import {createRoutineMachineLayer} from "components/routMachine";
import ContextMenu from 'components/contextMenu';
import Map from 'components/map';

function MapActions({onContextMenu}) {
  const map = useMapEvents({
    contextmenu: (e) => {
      onContextMenu(e);
    },
  });

  return null
}

function App() {
  const disptach = useDispatch();
  const {data: ordersData} = useSelector((state: any) => state.order[GET_ORDERS_DATA_KEY])

  const [selectedOrder, setSelectedOrder] = React.useState<null | IOrder>(null)
  const [coords, setCoords] = React.useState<null | number[][]>(null);

  const orderMenuRef = React.useRef<HTMLDivElement>(),
    mapMenuRef = React.useRef<HTMLDivElement>(),
    containerRef = React.useRef<HTMLDivElement>()

    useEffect(() => {
      disptach({type: GET_ORDERS_DATA_START})
      

      // document.addEventListener('contextmenu', e => e.preventDefault())
      return () => {
        // remove resizing event on component unmount
        document.removeEventListener('mousemove', onMouseMove)
      }
    }, [])

  function onMouseMove(e: MouseEvent) {
    const screenW = containerRef.current.clientWidth;

    if (e.pageX > 200 && screenW - e.pageX > 300) {
      orderMenuRef.current.style.width = `${e.pageX}px`;
      mapMenuRef.current.style.width = `${screenW - e.pageX}px`;
    }
  }

  const selectOrder = useCallback((item, from, to) => {
    setSelectedOrder(item)
    setCoords([from, to])
  }, [])

  return (
    <>
      <div className="flex h-screen p-5 bg-slate-100" ref={containerRef}>
        {/* ORDERS */}
        <div className='orders max-h-full flex flex-col overflow-auto w-auto' ref={orderMenuRef}>
          <span className="font-bold text-base text-blue-900 flex justify-center whitespace-nowrap">Active Orders</span>
          {/* ORDERS LIST */}
          <div className="orders-list max-h-full flex flex-col">
            {Array.isArray(ordersData) && (ordersData as IOrder[]).map(item => 
              <Order key={item.id} order={item} selected={selectedOrder?.id === item.id} onSelect={selectOrder}/>
            )}
          </div>
        </div>
        {/* MAP */}
        <div className='cursor-ew-resize h-full' onMouseDown={() => {
            document.addEventListener('mousemove', onMouseMove)

            // disable resizing
            document.addEventListener('mouseup', (e) => {
              document.removeEventListener('mousemove', onMouseMove)
            })
          }}>
          <Divider type="vertical" className='h-full bg-slate-800 z-10'/>
        </div>
        <div className="map w-full flex" ref={mapMenuRef}>
          <Map selectedOrder={selectedOrder} coords={coords}/>
        </div>
      </div>
    </>
  );
}

export default App;
