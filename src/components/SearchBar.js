import React from "react";

// get keyward, results, update
const SearchBar = ({ keyword, results, setSearchResult, handleForceText, updateField, getWhetherData, setResult}) => {

    var renderResults;
    const arr = results['results'];
    if(arr) {
    // call SearchView when arr get research keyword
    renderResults = arr.map((values => {
            return (
                <SearchView
                    getWhetherData={getWhetherData}
                    name={values.name}
                    lat={values.latitude}
                    lon={values.longitude}
                    updateField={updateField}
                    handleForceText={handleForceText}
                />
            );
        }));
    }
    //Call updatefield by using onChange function evey input text, and rendering renderResults
    return (
        <div className="auto">
            <input
                name="test"
                className="search-bar"
                placeholder="Search"
                value={keyword || ''}
                // onChange={e => updateField("keyword", e.target.value)}
                onChange={updateField}
            />
            <div className="search-results">{renderResults}</div>
        </div>
    );
};

// print "name", and shows name on input by call updateText when click result keyword
const SearchView = ({ name, index, lat, lon, getWhetherData, updateField, handleForceText }) => {
    //console.log('search view:', name);

    return (
      <div
        onClick={() => {
          handleForceText(name);
          getWhetherData(lat, lon);
        }}
        className={`search-preview ${index === 0 ? "start" : ""}`}
      >
        <div className="first">
          <p className="name">{name}</p>
        </div>
      </div>
    );
  };

export default SearchBar;