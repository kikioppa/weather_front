import axios from "axios";
import { useCallback, useState } from "react";

import cities from "./assets/city.json";
import List from "./components/List";
import constants from "./utils/constants";
import SearchBar from "./components/SearchBar";
import UpdateField from "./components/UpdateField";
function App() {
  // const [name, setName] = useState('');
  const [keyword, setKeyword] = useState(); // 검색어
  const [results, setResult] = useState([]); // 검색 결과들
  const [searchResult, setSearchResult] = useState(''); // 최종 텍스트 (눌렀을 때)

    // 필드를 업데이트 
    // const updateField = (field, value, update = true) => {
    //   if (update) onSearch(value);
    //   if (field === 'keyword') {
    //     setKeyword(value);
    //   }
    //   if (field === 'results') {
    //     setResult(value);
    //   }
    // }
  
      // 입력된 텍스트로 data 배열에서 찾아 매칭되는 결과들을 저장 
  const onSearch = useCallback(text => {
    var results = cities.filter(item => true === matchName(item.name, text));
    setResult({ results });
  }, []);

   // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크 
   const matchName = (name, keyword) => {
    var keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
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
