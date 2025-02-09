import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DamageLevelChart from './model/BarChart.js'
import CityBarChart from './model/CityBarChart.js'
import StructureTypePieChart from './model/StructureTypePieChart.js'
import BackButton from './BackButton.js';

const PointStatistic = () => {
    const query = new URLSearchParams(useLocation().search);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const loadData = async () => {
        console.log('load data!')
        let lat = query.get('lat');
        let lng = query.get('lng');
        if (!lat || !lng) navigate('/404')
        lat = parseFloat(lat)
        lng = parseFloat(lng)
        const response = await axios.post("http://13.60.170.37:8000/get_cluster_data/", {
            lat: lat,
            lng: lng,
        });
        console.log(response.data)
        if(!response.data) navigate('/404', { state: { message: 'Data not found!' } })
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div >
            <h1 style={{ textAlign: 'center' }}>Statistic Page</h1>
            <BackButton/>
            
            {data && (
                <div style = {{display: "flex", justifyContent:"space-between", flexWrap: 'wrap', gap: '20px'}}>  
                    <StructureTypePieChart data={data['Structure Type']} />
                    <DamageLevelChart damageData={data['Damage level']}
                        barTitle='Damage Level Distribution' dataLable='Number of Incidents' />
                    <DamageLevelChart damageData={data['Street Type']}
                        barTitle='Street Type Distribution' dataLable='Number of Streets' />
                    <CityBarChart cityData={data['Cities']} />
                    
                </div>
            )}
        </div>
    );
};

export default PointStatistic;