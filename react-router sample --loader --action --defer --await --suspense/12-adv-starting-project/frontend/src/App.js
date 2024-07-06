// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as getEvents } from "./pages/EventsPage";
import RootLayout from "./layouts/RootLayout";
import EditEventPage from "./pages/EditEventPage";
import NewEventPage from "./pages/NewEventPage";
import EventDetailPage, {
  loader as getEvent,
  action as deleteEvent,
} from "./pages/EventDetailPage";
import ErrorPage from "./pages/ErrorPage";
import EventLayout from "./layouts/EventLayout";
import { action as saveAndEditEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: getEvents,
          },
          {
            path: ":eventId",
            loader: getEvent,
            id: "eventId",
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEvent,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: saveAndEditEventAction,
              },
            ],
          },

          {
            path: "new",
            element: <NewEventPage />,
            action: saveAndEditEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
