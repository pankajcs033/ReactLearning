import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "./http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetching(true);
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          let sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places. please try again later.",
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error !== "") {
    return (
      <Error title="unable to process the request" message={error.message} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isFetching={isFetching}
      isFetchingText="Looking for places"
    />
  );
}
