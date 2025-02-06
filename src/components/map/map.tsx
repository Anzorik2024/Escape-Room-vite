import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { IconSize, IconrUrl } from '../../const/icon-url';
import { Coordinates } from '../../types/quest/quest-types';
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
  console.log (coordinates);

  return(
    <div></div>
  );
}

export default Map;
