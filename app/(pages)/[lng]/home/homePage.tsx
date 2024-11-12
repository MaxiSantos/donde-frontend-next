import Welcome from "./components/welcome";

export default function HomePage({ props }) {
  const { params: { lng } } = props;
  return (
    <div>
      <Welcome lng={lng} />
    </div>
  );
}