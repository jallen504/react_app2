import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {useState} from 'react';
import {RangeStepInput} from 'react-range-step-input';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";


function MagneticField() {
  
  const [altitude]=useState(10);
  const [year]=useState(2020);
  const [latitude,setLatitude] = useState(29);
  const [longitude,setLongitude] = useState(-90);
  const [inclination,setInclination] = useState();
  const [declination,setDeclination] = useState();
  const [total_intensity,setTotalIntensity] = useState();
  
  
  const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  const magnetUrl = "https://geomag.amentum.io/wmm/magnetic_field?latitude="+latitude+"&longitude="+ longitude +"&year="+year+"&altitude="+altitude;
  const access_token="ttwCWvNaCvNsYdzCeU7RNvxKBrJA9LiL";


  
  const getData=()=>{

    axios.get(magnetUrl,{headers : {

      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'API-Key' : `${access_token}`

    }}).then(res => {
     
      setInclination(res.data.inclination.value);
      setDeclination(res.data.declination.value);
      setTotalIntensity(res.data.total_intensity.value);

    }).catch(error=>{

      console.log(error)

    });
  }

  const handleLatChange=(event)=>{

    const value = event.target.value;
    setLatitude(value);

  }

  const handleLonChange=(event)=>{

    const value = event.target.value;
    setLongitude(value);

  }

  return (
    <>
      
      <h1>World Magnetic Model</h1>

      
      <div className="card">
      
      <h4>Latitude:{latitude}</h4>
      <div> 
      <RangeStepInput
            name="latitude"
            min={-90} max={90}
            value={latitude} step={1}
            onChange={handleLatChange}
      />

      </div>
      
      <h4>Longitude:{longitude}</h4>
      <div>
      <RangeStepInput
            name="longitude"
            min={-180} max={180}
            value={longitude} step={1}
            onChange={handleLonChange}
      />
      <br/><Button variant="primary"  onClick={getData}>Get Data</Button>
      </div>
     
      <table>
        <tbody>
          <tr>
            <th>Inclination:</th>
            <th>Declination:</th> 
            <th>Total Intensity:</th>
          </tr>
          <tr>
            <td>{inclination}</td>
            <td>{declination}</td>
            <td>{total_intensity}</td>
          </tr>
        </tbody>
      </table>
      </div>
      
      
      
      
      
      
      <ComposableMap className="card" id="mapcard" >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      <Marker coordinates={[longitude,latitude]}>
        <circle r={8} fill="#F53" />
      </Marker>
      </ComposableMap>



      <h2>Magnetic Field:</h2>

      

    </>
  );
}

export default MagneticField;
