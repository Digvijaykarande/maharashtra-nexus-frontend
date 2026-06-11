"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function ContactMap() {
  const locations = [
    {
      name: "Mumbai",
      position: [19.076, 72.8777],
    },
    {
      name: "Pune",
      position: [18.5204, 73.8567],
    },
    {
      name: "Nagpur",
      position: [21.1458, 79.0882],
    },
    {
      name: "Nashik",
      position: [19.9975, 73.7898],
    },
  ];

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-[1000] rounded-2xl border border-white/30 bg-white/95 p-4 shadow-xl backdrop-blur-md">
        <h3 className="font-bold">
          Maharashtra Overview
        </h3>

        <div className="mt-3 space-y-1 text-sm text-slate-600">
          <p>6 Divisions</p>
          <p>36 Districts</p>
          <p>358 Talukas</p>
          <p>43K+ Villages</p>
          <p>125M+ Population</p>
        </div>
      </div>

      <MapContainer
        center={[19.5, 75.5]}
        zoom={7}
        scrollWheelZoom={false}
        style={{
          height: "220px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <Marker
            key={location.name}
            position={location.position}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-emerald-600">
                  {location.name}
                </h3>

                <p className="text-sm text-slate-600">
                  Maharashtra Nexus Region
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}