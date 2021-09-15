import axios from "axios";
import { useCallback, useState } from "react";

import cities from "./assets/city.json";
import List from "./components/List";
import constants from "./utils/constants";

function App() {
  const [name, setName] = useState('');
  const getWhetherData = async (lat, lon) => {
    const { data } = await axios.get(constants.weather_url, {
      params: {
        lat,
        lon,
      },
    });

    console.log(data);
  };

  const onChangeText = useCallback((e) => {
    if(e.target.name === 'city_name'){
      const value = e.target.value;
  
      setName(value);
    }
  }, [])

  return (
    <div>
      <input name="city_name" value={name} onChange={onChangeText}/>
      <List searchText={name} data={cities} onClick={getWhetherData} />
    </div>
  );
}

export default App;
