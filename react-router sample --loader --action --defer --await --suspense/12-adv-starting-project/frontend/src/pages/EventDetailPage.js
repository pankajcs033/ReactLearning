import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import { Suspense } from "react";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("eventId");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function getEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "unable to get events" }, { status: 500 });
  }
  const resData = await response.json();
  return resData.events;
}

async function getEvent(id) {
  const response = await fetch(`http://localhost:8080/events/` + id);

  if (!response.ok) {
    throw json({ message: "Unable to find event." }, { status: 500 });
  }
  const resData = await response.json();
  return resData.event;
}

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    events: getEvents(),
    event: await getEvent(id),
  });
}

export async function action({ request, params }) {
  const id = params.eventId;
  const response = await fetch(`http://localhost:8080/events/` + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Unable to delete event." }, { status: 500 });
  }
  return redirect("/events");
}
