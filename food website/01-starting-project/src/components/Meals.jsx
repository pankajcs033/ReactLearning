import Meal from "./Meal";
import useHttp from "../hook/useHttp";
import Error from "./Error";

const configObject = {};

export default function Meals({ setCartItems }) {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", configObject, []);

  if (isLoading) {
    return <p className="center"> Fetching data...</p>;
  }

  if (error) {
    return <Error title="Failed" message={error.message} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} setCartItems={setCartItems} />
      ))}
    </ul>
  );
}
