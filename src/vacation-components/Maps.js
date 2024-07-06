import React, { useMemo, useContext } from "react";
import "azure-maps-control/dist/atlas.min.css";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  AzureMapsContext,
} from "react-azure-maps";
import { AuthenticationType } from "azure-maps-control";
import { Container } from "@mantine/core";
import Markers from "./Markers";

//Set the map to focus on wanted point
const CameraController = ({ longitude, latitude }) => {
  const { mapRef, isMapReady } = useContext(AzureMapsContext);
  if (mapRef && isMapReady) {
    mapRef.setCamera({ center: [longitude, latitude], zoom: 14.5 });
    mapRef.resize();
  }
  return null;
};

//Calculate the median point, later will be focusing on
const findMedianPoint = (points) => {
  // Function to calculate the median of an array
  const median = (arr) => {
    const sortedArr = arr.sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);
    return sortedArr.length % 2 !== 0
      ? sortedArr[mid]
      : (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  };

  // Extract latitudes and longitudes into separate arrays
  const latitudes = points.map((point) => point.lat);
  const longitudes = points.map((point) => point.lng);

  // Calculate median latitude and longitude
  const medianLatitude = median(latitudes);
  const medianLongitude = median(longitudes);

  const medianPoint = { lat: medianLatitude, lng: medianLongitude };

  return medianPoint;
};

//Arranging the coordinates object to fit the azure maps
const arrangeLocations = (locations) => {
  if (!locations) {
    return [[], []];
  }
  const transformedArray = [];
  const coordsRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/; //Regex that fits the way the coordinates sent from the server
  for (const [locationName, coords] of Object.entries(locations)) {
    if (coordsRegex.test(coords)) {
      const [lat, lng] = coords.split(",").map(Number);

      if (!isNaN(lat) && !isNaN(lng)) {
        transformedArray.push({ name: locationName, lat: lat, lng: lng });
      }
    }
  }

  const coordinatesArrays = [];

  for (const location in locations) {
    if (locations.hasOwnProperty(location)) {
      if (coordsRegex.test(locations[location])) {
        const [lat, lng] = locations[location].split(",");

        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          coordinatesArrays.push([longitude, latitude]);
        }
      }
    }
  }
  return [transformedArray, coordinatesArrays];
};
//Configuration of controls on the map
const controls = [
  {
    controlName: "StyleControl",
    controlOptions: {
      mapStyles: ["road", "satellite"],
    },
    options: {
      position: "bottom-left",
    },
  },
  {
    controlName: "ZoomControl",
    options: {
      position: "bottom-right",
    },
  },
  {
    controlName: "PitchControl",
    controlOptions: { pitchDegreesDelta: 5, style: "dark" },
    options: { position: "bottom-right" },
  },
  {
    controlName: "TrafficControl",
    controlOptions: { incidents: true },
    options: { position: "top-left" },
  },
  {
    controlName: "TrafficLegendControl",
    controlOptions: {},
    options: { position: "bottom-left" },
  },
];

const Maps = (props) => {
  const [transformedArray, coordinatesArrays] = arrangeLocations(
    props.locations
  );

  const markers = transformedArray;
  const medianPoint = findMedianPoint(transformedArray);

  const option = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: "uR5XRwVcsUbV8m1mn7-5S7viu9uEcucQE0cr-WvqIXk",
    },
    zoom: 12,
    view: "Auto",
    showLogo: false,
    showFeedbackLink: false,
  };

  const memoizedMarkerRender = useMemo(
    () =>
      markers &&
      markers.map((marker, index) => (
        <Markers key={[marker.id, index]} marker={marker} />
      )),
    [markers]
  );
  //If the array is empty- the coordinates didn't get in the wanted way, than exit without returning map
  return coordinatesArrays.length > 0 ? (
    <Container mt={20}>
      <AzureMapsProvider>
        <div className="map-container">
          <AzureMap
            options={option}
            controls={controls}
            containerClassName="map"
          >
            <AzureMapDataSourceProvider
              options={{
                lineMetrics: true,
              }}
            >
              {/* Put line layer on the map to draw the route */}
              <AzureMapLayerProvider
                options={{
                  strokeWidth: 5,
                  strokeColor: "#57333d",
                }}
                lifecycleEvents={{
                  layeradded: (e) => {
                    console.log("LAYER ADDED TO MAP", e);
                  },
                }}
                type={"LineLayer"}
              />

              <AzureMapFeature
                key={"Line String Feature"}
                id={"Line String ID"}
                type={"LineString"}
                coordinates={coordinatesArrays}
              />
              {/* Added markers and popups on the */}
              {memoizedMarkerRender}
              {markers[0] && (
                <CameraController
                  longitude={medianPoint.lng}
                  latitude={medianPoint.lat}
                />
              )}
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </Container>
  ) : null;
};

export default Maps;
