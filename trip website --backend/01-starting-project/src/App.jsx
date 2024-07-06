import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchPlaces, saveSelectedPlace } from "./components/http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState("");

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await saveSelectedPlace([selectedPlace, ...userPlaces]);
    } catch (error) {
      // reverting
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Unable to update places",
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        const remainingPlaces = userPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        );
        await saveSelectedPlace(remainingPlaces);
        setModalIsOpen(false);
      } catch (error) {
        // reverting
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || "Unable to remove place",
        });
        setModalIsOpen(false);
      }
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  useEffect(() => {
    async function fetchUserPlaces() {
      try {
        setIsFetching(true);
        const places = await fetchPlaces();
        setUserPlaces(places);
        setIsFetching(false);
      } catch (error) {
        setError({ message: error.message || "unable to fetch user places" });
        setIsFetching(false);
      }
    }
    fetchUserPlaces();
  }, []);

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="failed update"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title="Fetch Failed" message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isFetching={isFetching}
            isFetchingText="fetching user places"
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
