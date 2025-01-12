import { Map, Marker } from "pigeon-maps";
import { useState } from "react";
const HEIGHT_RATIO = 0.25;
interface IpGeoVisualizationProps {
  loc: string | undefined;
}
const IpGeoVisualization = ({ loc }: IpGeoVisualizationProps) => {
    const [zoom, setZoom] = useState(12);

    let lat: number | undefined;
    let lon: number | undefined;

    if (loc) {
        const [latStr, lonStr] = loc.split(",");
        lat = parseFloat(latStr);
        lon = parseFloat(lonStr);
    }

    if (typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) {
        return <div>Invalid latitude or longitude values.</div>;
    }

  return (
    <>
      <div className="mt-5">
        <Map
          height={window.innerWidth * HEIGHT_RATIO}
          center={[lat, lon]}
          zoom={zoom}
        >
          <Marker
            width={50}
            anchor={[lat, lon] as [number, number]}
            hover={true}
          />
        </Map>
      </div>
    </>
  );
};

export default IpGeoVisualization;
