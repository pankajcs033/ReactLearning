export async function getEventDetail(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Unable to find events.");
  }
  return resData.event;
}

export async function getEvents() {
  const response = await fetch("http://localhost:8080/events");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Unable to find events.");
  }
  return resData.events;
}

export async function getEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw new Error("Unable to find events.");
  }
  const resData = await response.json();
  return resData.event;
}

export async function saveEvent(data) {
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) return response.message;
  const resData = await response.json();

  return resData.message;
}

export async function updateEvent(id, data) {
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) return response.message;
  const resData = await response.json();

  return resData.message;
}

export async function removeEvent(id) {
  const response = fetch(`http://localhost:8080/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) return response.message;
  const resData = await response.json();

  return resData.message;
}
