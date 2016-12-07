
import React, {Component} from 'react';
import Config from 'AppConfig'
import 'map.scss'

class Map extends Component{

    constructor(props){
        super(props);
        this.latitude = this.props.latitude;
        this.longitude = this.props.longitude;
    }

    componentDidMount(){

        var map = new AMap.Map('map',{
            resizeEnable: true,
            zoom: 10,
            center: [116.39,39.9]
        });

    }

    render(){

        return(
            <div className="map" id="map">

            </div>
        );
    }

}

export default Map;

