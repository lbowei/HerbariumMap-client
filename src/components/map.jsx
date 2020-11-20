import React, { Component} from 'react';
import styled from "styled-components";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {getColorFromTimesofAccess,calCounts} from './functions_inuse.js';

require('dotenv').config();

const Style = styled.div`
    display: flex;
    color: #888;
    margin-top: 45%;
    margin-left: 2%;
`;

class Map extends Component {
    state = { 
        value: 2018,
        target_date: Date.parse('01/01/1900'),
        viewport: {
            width: "100vw",
            height: "100vh",
            latitude: 35.913200,
            longitude: -79.055847,
            zoom: 4
          },
        //maxcunt=0, // add the number here if you wants to reveal the number of different level of color, otherwise there is presentage
        selectedPlant: null,
        plants: [],
        modified_plants: [],
        yellow_plants: [],
        blue_plants: [],
        red_plants: [],
        orange_plants: []
    }

    plantHelper(data) {
        var new_plants = [];
        var yellow_plants = []
        var blue_plants = []
        var red_plants = []
        var orange_plants = []
        var maxcunt=0;
        data.slice(0,25).forEach(plant => {
            var { Access, occid, catalogNumber, country, stateProvince, county, decimalLatitude, decimalLongitude } = plant;
            var sum_count = calCounts(Access, this.state.target_date);
            if (sum_count>maxcunt) maxcunt=sum_count;
            var modifited_plant = {
                "occid": occid,
                "catalogNumber": catalogNumber,
                "country": country,
                "stateProvince": stateProvince,
                "county": county,
                "decimalLatitude": decimalLatitude,
                "decimalLongitude": decimalLongitude,
                "sum_count": sum_count,
                "color": 'NULL'
            }
            new_plants.push(modifited_plant)
        })
        new_plants.forEach(plant => {
            var color = getColorFromTimesofAccess(plant.sum_count,maxcunt);
            plant.color=color;
            if (plant.color === "yellow") {
                yellow_plants.push(plant)
            } else if (plant.color === "blue") {
                blue_plants.push(plant)
            } else if (plant.color === "red") {
                red_plants.push(plant)
            } else if (plant.color === "orange") {
                orange_plants.push(plant)
            }
        })
        this.setState({plants: data})
        this.setState({modified_plants: new_plants})  
        this.setState({yellow_plants: yellow_plants}) 
        this.setState({blue_plants: blue_plants})
        this.setState({red_plants: red_plants})
        this.setState({orange_plants: orange_plants});
    }

    componentDidMount() {
        fetch("https://herbarium-map-server.herokuapp.com/herbarium")
        .then((response) => response.json())
        .then((data)=>this.plantHelper(data))
     }

    componentDidUpdate(pP, pS, sS) {
        if (pS.target_date !== this.state.target_date) {
            this.plantHelper(this.state.plants);
        }
    }

    handleOnChange = (e) => {
        this.setState({value: e.target.value});
        if (e.target.value === "2015") {
            this.setState({target_date: Date.parse("01/01/2015")})
        } else if (e.target.value === "2016") {
            this.setState({target_date: Date.parse("01/01/2016")})
        } else if (e.target.value === "2017") {
            this.setState({target_date: Date.parse("01/01/2017")})
        } else if (e.target.value === "2018") {
            this.setState({target_date: Date.parse("01/01/2018")})
        } else if (e.target.value === "2019") {
            this.setState({target_date: Date.parse("01/01/2019")})
        } else if (e.target.value === "2020") {
            this.setState({target_date: Date.parse("01/01/2020")})
        }
        console.log(this.state.target_date)
    }

    render() { 
        const {selectedPlant} = this.state;
        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={(viewport) => this.setState({viewport})}
                >
                <h1
                className = "title"
                ><div
                className = "titleContent"
                >
                    UNC Herbarium Map
                    </div></h1>
                {this.state.orange_plants.map(plant => 
                    (
                    <Marker key = {plant.occid}
                            latitude={plant.decimalLatitude}
                            longitude={plant.decimalLongitude}
                            color = {plant.color}
                    >   
                    <button className="markers" color = {plant.color} onClick={()=>{this.setState({selectedPlant: plant})}} style = {{weight: 0+"em", height:0+"em", color: "red"}}>
                        <div className="pin1" style = {{color: "orange"}}></div>
                    </button>
                    </Marker>
                ))}
                {this.state.yellow_plants.map(plant => 
                    (
                    <Marker key = {plant.occid}
                            latitude={plant.decimalLatitude}
                            longitude={plant.decimalLongitude}
                            color = {plant.color}
                    >   
                    <button className="markers" color = {plant.color} onClick={()=>{this.setState({selectedPlant: plant})}} style = {{weight: 0+"em", height:0+"em", color: "red"}}>
                        <div className="pin1" style = {{color: "yellow"}}></div>
                    </button>
                    </Marker>
                ))}
                {this.state.blue_plants.map(plant => 
                    (
                    <Marker key = {plant.occid}
                            latitude={plant.decimalLatitude}
                            longitude={plant.decimalLongitude}
                            color = {plant.color}
                    >   
                    <button className="markers" color = {plant.color} onClick={()=>{this.setState({selectedPlant: plant})}} style = {{weight: 0+"em", height:0+"em", color: "red"}}>
                        <div className="pin1" style = {{color: "blue"}}></div>
                    </button>
                    
                    </Marker>
                ))}
                {this.state.red_plants.map(plant => 
                    (
                    <Marker key = {plant.occid}
                            latitude={plant.decimalLatitude}
                            longitude={plant.decimalLongitude}
                            color = {plant.color}
                    >   
                    <button className="markers" color = {plant.color} onClick={()=>{this.setState({selectedPlant: plant})}} style = {{weight: 0+"em", height:0+"em", color: "red"}}>
                        <div className="pin1" style = {{color: "red"}}></div>
                    </button>
                    </Marker>
                ))}

                {selectedPlant && <Popup
                        className='cpopup'
                        latitude={selectedPlant.decimalLatitude}
                        longitude={selectedPlant.decimalLongitude}
                        closeButton={true}
                        closeOnClick={true}
                        //closeOnMove={true}
                        onClose={() => this.setState({selectedPlant: false})}
                        anchor="top" >
                            <div className='popup_div'>
                                <p className='popup_content'><strong>occid:</strong> {selectedPlant.occid} </p>
                                <p className='popup_content'><strong>Catalog Number:</strong> {selectedPlant.catalogNumber}</p>
                                <p className='popup_content'><strong>{selectedPlant.county}, {selectedPlant.stateProvince}, {selectedPlant.country}</strong></p>
                                <p className='popup_content'><strong>Access Times:</strong> {selectedPlant.sum_count}</p>
                            </div>
                        </Popup>}
                
                <Style>
                    <input type="range" min={2015} max={2020} value={this.state.value} className="slider" onChange={this.handleOnChange}/>
                    <div className="value">{this.state.value}</div>
                </Style>
                <a href="../report.html" target="view_window" className="reportButton" >report<div id="report"></div></a> 
                <div className="legend">
                    <img src="./blue.png" alt=" 20%<"></img><br/>
                    <img src="yellow.png" alt=" 50%<"></img><br/>
                    <img src="orange.png" alt=" 80%<"></img><br/>
                    <img src="red.png" alt=" max<="></img><br/>
                </div>
                </ReactMapGL>
                
            </div>
        )
    }
}
export default Map;