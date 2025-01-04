import {Map, Marker} from "pigeon-maps"
import {useState} from "react";

const IpGeoVisualization = ({lat, lon}: { lat: number, lon: number}) => {
    const [center, setCenter] = useState([lat, lon])
    const [zoom, setZoom] = useState(12)
    return (
        <>
            <div className="mt-5">
                <Map height={300}
                     center={center}
                     zoom={zoom}
                     onBoundsChanged={({center, zoom}) => {
                         setCenter(center)
                         setZoom(zoom)
                     }}
                >
                    <Marker
                        width={50}
                        anchor={[lat, lon]}
                        hover={`Server Co-Ordinates<br>Lat: ${lat}<br> Lon: ${lon}`}
                    />
                </Map>

            </div>
        </>
    )
}

export default IpGeoVisualization
