import { useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Location, QuestInfo } from '../../types/quest/quest-types';

import { IconrUrl, IconSize } from '../../const/icon-url';
import { CENTER_COORDINATES, ZOOM } from '../../const/coordinates';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeLocation } from '../../store/booking-process/booking-process';

const defaultIcon = new Icon({
  iconUrl: IconrUrl.Default,
  iconSize: IconSize.Size,
  iconAnchor: IconSize.Anchor
});

const activeIcon = new Icon({
  iconUrl: IconrUrl.Active,
  iconSize: IconSize.Size,
  iconAnchor: IconSize.Anchor
});

type bookingMapProps = {
  quest: QuestInfo;
}

function BookingMap({quest}: bookingMapProps):JSX.Element {
  const { locations } = quest;

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);// locations[0]

  useEffect(() => {
    setSelectedLocation(locations[0]);
  },[locations]);

  const dispatch = useAppDispatch();

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);

    dispatch(changeLocation(location));
  };

  return (
    <div className="page-content__item">
      <div className="booking-map">
        <div className="map">
          <div className="map__container">
            <MapContainer
              center={CENTER_COORDINATES}
              zoom={ZOOM}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
              />
              {locations.map((location) => (
                <Marker
                  position={location.coords}
                  icon={selectedLocation === location ? activeIcon : defaultIcon}
                  key={location.id}
                  eventHandlers={{
                    click: () => {
                      handleMarkerClick(location);
                    },
                  }}
                >
                </Marker>
              )
              )}
            </MapContainer>
          </div>
        </div>
        <p className="booking-map__address">
          {selectedLocation !== null ? `${'Вы выбрали'}: ${selectedLocation.address}` : 'Выберите локацию' }
        </p>
      </div>
    </div>
  );
}

export default BookingMap;
