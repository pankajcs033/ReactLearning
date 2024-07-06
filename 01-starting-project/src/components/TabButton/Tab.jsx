export default function Tab({ children, buttons, ButtonsComponent = "menu" }) {
  return (
    <>
      <ButtonsComponent>{buttons}</ButtonsComponent>
      {children}
    </>
  );
}
