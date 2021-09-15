function City({ name, lat, lon, onClick }) {
  return (
    <span
      onClick={() => {
        onClick(lat, lon);
      }}
    >
      {name} / {lat} / {lon}
    </span>
  );
}

export default City;
