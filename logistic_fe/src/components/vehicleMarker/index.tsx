import React, { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L, {type LatLngExpression} from "leaflet";

import truck from "../../assets/truck.png";

const icon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl: truck,
});

interface Props {
    data?: any
}

const AirplaneMarker:React.FunctionComponent<Props> = ({ data }) => {
  const { lat, lng } = data;
  const [prevPos, setPrevPos] = useState<LatLngExpression>([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
  }, [lat, lng, prevPos]);

  return (
    <LeafletTrackingMarker
        icon={icon}
        position={[lat, lng]}
        previousPosition={prevPos}
        duration={1000}
    />
  );
}

export default AirplaneMarker