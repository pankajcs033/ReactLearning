import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent } from "../../util/http";
import { updateEvent } from "../../util/http";
import { queryClient } from "../../util/http";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const params = useParams();
  const { state } = useNavigation();
  const id = params.id;

  console.log(id);

  const {
    data: event,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   // (data) which we pass to mutate function to update with latest data
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     // stop any outgoing request to this key
  //     await queryClient.cancelQueries({ queryKey: ["events", params.id] });

  //     // we can save currently stored data in case we have to rollback the updates
  //     const previousEvent = queryClient.getQueryData(["events", params.id]);

  //     // we can set particular query data manually
  //     // it manipulates data with waiting for response
  //     queryClient.setQueryData(["events", params.id], newEvent);

  //     // In case of error this object will work as context
  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     // rolling back the changes
  //     queryClient.setQueryData(["events", params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     // this will execute at last no matter failed or successed
  //     queryClient.invalidateQueries(["events", params.id]);
  //   },
  // });

  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData });
    submit(formData, { method: "PUT" });
    // navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <LoadingIndicator />}
      {isError && (
        <>
          <ErrorBlock
            title="Unable to get event"
            message={
              error.info?.message ||
              "Unable to get Event. Please try again later."
            }
          />
          <div className="form-actions">
            <Link to="../" className="button">
              Okay
            </Link>
          </div>
        </>
      )}
      {event && (
        <EventForm inputData={event} onSubmit={handleSubmit}>
          {state === "submitting" ? (
            <p>updating...</p>
          ) : (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
        </EventForm>
      )}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
