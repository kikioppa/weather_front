import axios from "axios";
import { useCallback, useState } from "react";

import cities from "./assets/city.json";
import List from "./components/List";
import constants from "./utils/constants";
import SearchBar from "./components/SearchBar";
import UpdateField from "./components/UpdateField";
function App() {
  // const [name, setName] = useState('');
  const [keyword, setKeyword] = useState(); // keyword
  const [results, setResult] = useState([]); // keyword results
  const [searchResult, setSearchResult] = useState(''); // final results = on click

 
  
  
  //find data array by input text then save matching results
  const onSearch = useCallback(text => {
    var results = cities.filter(item => true === matchName(item.name, text));
    setResult({ results });
  }, []);


   // check if research text matching with keyword
   const matchName = (name, keyword) => {
    var keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
    // regExp = [^a-zA-Z0-9äöüÄÖÜß]
    // name = name.replace('ü', 'u')
    if (keyword === "") return false;
 
    
    return name === keyword.toString().toLowerCase();
  };


  
  const getWhetherData = async (lat, lon) => {
    const { data } = await axios.get(constants.weather_url, {
      params: {
        lat,
        lon,
      },
    });

    console.log(data);
    console.log(data.properties.timeseries[0].data.next_1_hours.summary.symbol_code)

    setSearchResult(data.properties.timeseries[0].data.next_1_hours.summary.symbol_code)
    setResult([])
    
  };

  
  const onChangeText = useCallback((e, isSearch = true) => {
    console.log(e.target.name, e.target.value);
    if(e.target.name === 'test'){
      const value = e.target.value;
      setKeyword(value);

      if(isSearch) {
        onSearch(value)
      }
    }
  }, [onSearch])

  const handleForceText = useCallback((value) => {
    setKeyword(value);
  }, [])



  return (
    <div className ="App">
      {/* <input name="city_name" value={name} onChange={onChangeText}/> */}
      {/* <List searchText={keyword} data={cities} onClick={getWhetherData} /> */}
      <SearchBar keyword={keyword} results={results} handleForceText={handleForceText} setResult={setResult}updateField={onChangeText} getWhetherData={getWhetherData}></SearchBar>
      {
        searchResult && <UpdateField searchResult={searchResult}></UpdateField>
      }
    </div>
  );
}

export default App;
