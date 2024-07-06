import { Link, Outlet, useParams, useNavigate } from "react-router-dom";

import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent, queryClient } from "../../util/http";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const {
    data: event,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal: signal }),
  });

  const {
    mutate,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    error: errorDelete,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleStartDelete() {
    setOpenDeleteModel(true);
  }

  function handleDelete() {
    mutate({ id: params.id });
  }

  function handleEndDelete() {
    setOpenDeleteModel(false);
  }

  return (
    <>
      <Outlet />
      {openDeleteModel && (
        <Modal onClose={handleEndDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event. This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {isPendingDelete && <p>Deleting...</p>}
            {isErrorDelete && (
              <ErrorBlock
                title="failed to delete event"
                message={
                  errorDelete.info?.message ||
                  "Failed to delete event, Please try again later."
                }
              />
            )}
            <button onClick={handleEndDelete} className="button-text">
              Cancel
            </button>
            <button onClick={handleDelete} className="button">
              Delete
            </button>
          </div>
        </Modal>
      )}
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && (
        <div id="event-details-content" className="center">
          <p>Loading...</p>
        </div>
      )}
      {isError && (
        <div id="event-details-content" className="center">
          <ErrorBlock
            title="Error Occurred"
            message={error.info?.message || "unable to get event details"}
          />
        </div>
      )}
      {event && (
        <article id="event-details">
          <header>
            <h1>{event.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img
              src={`http://localhost:3000/${event.image}`}
              alt={event.image}
            />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{event.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {event.date} @ {event.time}
                </time>
              </div>
              <p id="event-details-description">{event.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
