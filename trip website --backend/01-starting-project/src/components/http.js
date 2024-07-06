export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Unable to find places.");
  }
  return resData.places;
}

export async function saveSelectedPlace(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Unable to update places.");
  }
  const resData = await response.json();

  return resData.message;
}

export async function fetchPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Unable to find user places.");
  }
  return resData.places;
}
