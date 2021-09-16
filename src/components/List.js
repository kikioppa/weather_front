import City from "./City";

function List({ searchText, data, onClick }) {
  return (
    <>
      {data.map((values) => {
        if(searchText !== values.name)  return null;
        return (
          <div key={`div-${values.name}-${values.latitude}`}>
            <City
              key={`city-component-${values.name}-${values.latitude}`}
              name={values.name}
              lat={values.latitude}
              lon={values.longitude}
              onClick={onClick}
            />
          </div>
        );
      })}
    </>
  );
}

export default List;
