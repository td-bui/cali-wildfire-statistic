import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, Circle, useMap } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MapComponent = () => {
  const navigate = useNavigate();
  const [markerPosition, setMarkerPosition] = useState([38.322953, -121.179297]);
  const [radius, setRadius] = useState(30);
  const [showPopup, setShowPopup] = useState(false);
  const loadWarningPoints = async (setWarningPoints, lat, lng, rad) => {
    try {
      console.log('setWarningPoints', setWarningPoints)
      console.log('markerPosition[0]:', lat)
      console.log('markerPosition[1]:', lng)
      console.log('radius:', rad)
      const response = await axios.post("http://127.0.0.1:8000/get_clusters/", {
        lat: lat,
        lng: lng,
        radius: milesToKm(rad) * 1000
      });
      console.log(response.data)
      setWarningPoints(response.data.clusters)
    } catch (error) {
      console.error("API call error:", error);
    }
  }

  const [warningPoints, setWarningPoints] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    loadWarningPoints(setWarningPoints, 38.322953, -121.179297, 30);
  }, []);

  const milesToKm = (miles) => miles * 1.60934;

  const handleRadiusChange = (value) => {
    loadWarningPoints(setWarningPoints, markerPosition[0], markerPosition[1], value)
    setRadius(value);
  };

  const handleCircleClick = (point) => {
    navigate(`/point-statistic?lat=${point.lat}&lng=${point.lng}`);
  }

  const AddGeocoder = () => {
    const map = useMap();

    useEffect(() => {
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on("markgeocode", function (e) {
          const { center } = e.geocode;
          setMarkerPosition([center.lat, center.lng]);
          loadWarningPoints(setWarningPoints, center.lat, center.lng, radius)
          map.setView(center, 8);
        })
        .addTo(map);

      return () => map.removeControl(geocoder);
    }, [map]);

    return null;
  };

  const MapClickHandler = () => {
    useMapEvent('click', async (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      loadWarningPoints(setWarningPoints, lat, lng, radius)
    });
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div style={{ textAlign: "center", fontFamily: "'Arial', sans-serif", marginTop: "50px" }}>
      <h1 style={{ marginBottom: '0px' }}>California wildfire statistic</h1>
      <div style={{
        height: '100vh',
        width: '100vw',
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px"

      }}>

        <div style={{
          display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", margin: "auto",
          marginTop: "80px"
        }}>
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Choose radius ({Math.round(radius)} miles):
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={radius}
            onChange={(e) => handleRadiusChange(e.target.value)}
            style={{ marginLeft: "10px", width: "200px" }}
          />
          <h3 style={{ margin: '100px 30px 0px 30px' }}> There {warningPoints.length == 1 ? 'is ' + warningPoints.length + ' wildfire case' : 'are ' + warningPoints.length + ' wildfire cases'} in your selected area. </h3>
        </div>
        <MapContainer
          center={markerPosition}
          zoom={8}
          style={{ height: '70vh', width: '70vw', marginRight: "50px" }}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <AddGeocoder />
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>
              <b>Position: {markerPosition[0]}, {markerPosition[1]}</b>
            </Popup>
          </Marker>
          <Circle
            center={markerPosition}
            radius={milesToKm(radius) * 1000}
            color="blue"
            fillColor="blue"
            fillOpacity={0.3}
          />
          {warningPoints.map((point, index) => (
            <Circle
              key={index}
              center={[point.lat, point.lng]}
              radius={milesToKm(point.radius) * 1000}
              pathOptions={{ color: point.color }}
              eventHandlers={{
                click: () => handleCircleClick(point),
                mouseover: (e) => {
                  setShowPopup(true);
                  e.target.openPopup(); // Mở popup khi hover
                },
                mouseout: (e) => {
                  setShowPopup(false);
                  e.target.closePopup(); // Đóng popup khi rời chuột
                },
              }}
            >
                <Popup>
                  <b>Primary damage level: {point.damageLevel}</b>
                  <br />
                  Number of incidents: {point.numOfFire} cases
                </Popup>
            </Circle>
          ))}
          <MapClickHandler />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
