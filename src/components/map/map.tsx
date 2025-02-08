import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { IconSize, IconrUrl } from '../../const/icon-url';
import { Coordinates } from '../../types/quest/quest';
import { ZOOM } from '../../const/coordinates';

type MapProps = {
coordinates: Coordinates;
}

const defaultIcon = new Icon({
  iconUrl: IconrUrl.Default,
  iconSize: IconSize.Size,
  iconAnchor: IconSize.Anchor
});

function Map({coordinates}: MapProps): JSX.Element {


  return (
    <MapContainer
      center={coordinates}
      zoom={ZOOM}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      <Marker
        position={coordinates}
        icon={defaultIcon}
      >
      </Marker>
    </MapContainer>
  );

}

export default Map;
