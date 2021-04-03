import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const YOUR_KEY_HERE = "AIzaSyD3Sb5-qY0H1gba_zSU7GWvtJIvNIwtOQo";

const MapExampleScript = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={props.zoom || 12}
      defaultCenter={props.defaultCenter || { lat: 40.748817, lng: -73.985428 }}
      defaultMapTypeId="satellite"
      onClick={props.onMarkerClick}
    >
      {props.markers.map((marker, index) => {
        return (
          <Marker
            key={`marker${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        );
      })}
    </GoogleMap>
  ))
);

function MapExample(props) {
  const [position, setPosition] = React.useState(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (geo) {
      setPosition({ lat: geo.coords.latitude, lng: geo.coords.longitude });
    });
  }, []);

  return (
    <MapExampleScript
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${YOUR_KEY_HERE}`}
      loadingElement={<div className="h-full" />}
      containerElement={<div className="relative w-full rounded h-500-px" />}
      mapElement={<div className="rounded h-full" />}
      onMarkerClick={props.onMarkerClick}
      markers={props.markers || []}
      defaultCenter={props.defaultCenter || position}
      {...props}
    />
  );
}

export default MapExample;
