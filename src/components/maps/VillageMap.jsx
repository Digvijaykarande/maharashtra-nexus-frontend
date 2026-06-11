"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Division slug → its district names (must match GeoJSON NAME_2 values exactly)
const divisionToDistricts = {
  pune:          ["pune", "satara", "sangli", "solapur", "kolhapur"],
  nagpur:        ["nagpur", "wardha", "bhandara", "gondia", "chandrapur", "gadchiroli"],
  nashik:        ["nashik", "dhule", "jalgaon", "nandurbar", "ahmednagar"],
  konkan:        ["thane", "palghar", "raigad", "ratnagiri", "sindhudurg"],
  mumbai:        ["mumbai", "thane", "palghar", "raigad"],
  amravati:      ["amravati", "buldhana", "akola", "washim", "yavatmal"],
  sambhajinagar: ["aurangabad", "jalna", "parbhani", "hingoli", "nanded", "beed", "latur", "osmanabad"],
  aurangabad:    ["aurangabad", "jalna", "parbhani", "hingoli", "nanded", "beed", "latur", "osmanabad"],
};

const NAME_KEYS = ["NAME_2", "NAME_3", "district", "DISTRICT", "name", "NAME", "dtname", "Dist_Name"];

function getFeatureName(feature) {
  const p = feature?.properties || {};
  for (const key of NAME_KEYS) {
    if (p[key]) return p[key].toLowerCase().trim();
  }
  return "";
}

function isMatch(featureName, matchedNames) {
  if (!featureName) return false;
  const f = featureName.toLowerCase().trim();
  return matchedNames.some((d) => {
    const m = d.toLowerCase().trim();
    return f === m || f.includes(m) || m.includes(f) || f.split(" ")[0] === m || m.split(" ")[0] === f;
  });
}

function FitBounds({
  geoJsonData,
  matchedNames,
  mode,
}) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData) return;

    // Full Maharashtra

    if (mode === "state") {
      const bounds =
        L.geoJSON(geoJsonData).getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [20, 20],
          animate: true,
        });
      }

      return;
    }

    // Existing behavior

    const bounds = L.latLngBounds();

    let found = false;

    L.geoJSON(geoJsonData).eachLayer(
      (layer) => {
        if (
          isMatch(
            getFeatureName(layer.feature),
            matchedNames
          )
        ) {
          bounds.extend(
            layer.getBounds()
          );

          found = true;
        }
      }
    );

    if (
      found &&
      bounds.isValid()
    ) {
      map.fitBounds(bounds, {
        padding: [40, 40],
        animate: true,
        maxZoom: 10,
      });
    }

  }, [
    geoJsonData,
    matchedNames,
    mode,
    map,
  ]);

  return null;
}


function DebugNames({ geoJsonData }) {
  useEffect(() => {
    if (!geoJsonData) return;
    const names = new Set();
    L.geoJSON(geoJsonData).eachLayer((layer) => {
      const p = layer.feature?.properties || {};
      NAME_KEYS.forEach((k) => { if (p[k]) names.add(`${k}: ${p[k]}`); });
    });
    console.log("[VillageMap] All feature names:\n", [...names].sort().join("\n"));
  }, [geoJsonData]);
  return null;
}

export default function VillageMap({ lat, lng, placeName, divisionSlug, mode = "division" }) {
  if (typeof window !== "undefined") {
    console.log("[VillageMap] slug:", divisionSlug, "| mode:", mode);
  }
  const [geoJsonData, setGeoJsonData] = useState(null);

  const slugLower = (divisionSlug || "").toLowerCase();

let matchedNames = [];

if (mode === "state") {
  matchedNames = ["__ALL__"];
}
else if (mode === "single") {
  matchedNames = [slugLower];
}
else {
  matchedNames =
    divisionToDistricts[slugLower] || [slugLower];
}

  useEffect(() => {
    if (!divisionSlug) return;
    fetch("https://raw.githubusercontent.com/shuklaneerajdev/IndiaStateTopojsonFiles/master/Maharashtra.geojson")
      .then((r) => { if (!r.ok) throw new Error("fetch failed"); return r.json(); })
      .then(setGeoJsonData)
      .catch((e) => console.error("GeoJSON load error:", e));
  }, [divisionSlug]);

  const styleFeature = (feature) => {
    const highlighted =mode === "state" ? true: isMatch(getFeatureName(feature),matchedNames);
      if (highlighted) {
        return {
          color: "#065f46",
          weight: 4,
          opacity: 1,
          fillColor: "#10b981",
          fillOpacity: 0.18,
        };
      }
    return { color: "transparent", weight: 0, opacity: 0, fillColor: "transparent", fillOpacity: 0 };
  };

  const onEachFeature = (feature, layer) => {
    const active =
  mode === "state"
    ? true
    : isMatch(
        getFeatureName(feature),
        matchedNames
      );

if (!active) return;

    const label = getFeatureName(feature).replace(/\b\w/g, (c) => c.toUpperCase());
    layer.bindTooltip(label, {
      permanent: false,
      direction: "center",
      className: "mh-tooltip",
    });
    layer.on({
      mouseover: (e) => {e.target.setStyle({fillOpacity: 0.35,weight: 5,});
      e.target.bringToFront();},
      mouseout: (e) => {e.target.setStyle({fillOpacity: 0.18,weight: 4,});},
    });
  };

  const markerIcon = typeof window !== "undefined"
    ? L.divIcon({
        className: "",
        html: `<div style="filter:drop-shadow(0 3px 8px rgba(0,0,0,0.25))">
          <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C6.72 0 0 6.72 0 15C0 24.38 15 40 15 40C15 40 30 24.38 30 15C30 6.72 23.28 0 15 0Z" fill="#064e3b"/>
            <circle cx="15" cy="15" r="7" fill="white"/>
            <circle cx="15" cy="15" r="4" fill="#10b981"/>
          </svg></div>`,
        iconSize: [30, 40], iconAnchor: [15, 40], popupAnchor: [0, -42],
      })
    : null;

  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "inherit", overflow: "hidden" }}>
      <style>{`
        .leaflet-container { background: #f1f5f9 !important; }
        .leaflet-tile-pane { filter: saturate(0.35) brightness(1.1) contrast(0.92); }
        .leaflet-control-zoom { border: 1px solid #e2e8f0 !important; border-radius: 10px !important; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important; margin: 14px !important; }
        .leaflet-control-zoom a { color: #064e3b !important; background: #fff !important; border-color: #e2e8f0 !important; font-weight: 700 !important; width: 28px !important; height: 28px !important; line-height: 28px !important; font-size: 16px !important; }
        .leaflet-control-zoom a:hover { background: #f0fdf4 !important; }
        .leaflet-popup-content-wrapper { border-radius: 12px !important; box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; border: 1px solid #e2e8f0 !important; }
        .leaflet-popup-content { margin: 10px 14px !important; font-size: 13px !important; font-weight: 600; color: #0f172a; }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-control-attribution { font-size: 10px !important; background: rgba(255,255,255,0.75) !important; }
        .mh-tooltip { background: #064e3b !important; color: #fff !important; border: none !important; border-radius: 6px !important; font-size: 11px !important; font-weight: 600 !important; padding: 3px 8px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important; white-space: nowrap; }
        .mh-tooltip::before { display: none !important; }
      `}</style>

      <MapContainer
        center={[lat, lng]} zoom={6}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true} 
        scrollWheelZoom={false} /* ── FIXED: Swapped true to false here ── */
        doubleClickZoom={true} dragging={true} touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          url="https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          zIndex={10} pane="shadowPane"
        />

        {geoJsonData && (
          <>
            <DebugNames geoJsonData={geoJsonData} />
            <GeoJSON key={`${slugLower}-${mode}`} data={geoJsonData} style={styleFeature} onEachFeature={onEachFeature} />
            <FitBounds geoJsonData={geoJsonData} matchedNames={matchedNames} />
          </>
        )}

        {mode !== "state" &&markerIcon &&lat &&lng && (
          <Marker position={[lat, lng]} icon={markerIcon}>
            <Popup>{placeName || "Location"}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}