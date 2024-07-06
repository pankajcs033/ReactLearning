import { cartActions } from "./cart";
import { uiActions } from "./cart-ui";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    // save into db call
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Request Sent",
        message: "Data Sent Successfully",
      })
    );

    async function sentData() {
      const res = await fetch(
        "https://testproject-73b4c-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!res.ok) {
        throw new Error("Failed to send data");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data Saved",
          message: "Data Saved Successfully",
        })
      );
    }

    await sentData().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Unable to Send",
          message: "Data Sent Failed",
        })
      );
    });
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      async function fetchData() {
        const response = await fetch(
          "https://testproject-73b4c-default-rtdb.firebaseio.com/cart.json"
        );
        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }
        const resData = await response.json();
        return resData;
      }
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalPrice: cartData.totalPrice,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching data Failed",
        })
      );
    }
  };
};
