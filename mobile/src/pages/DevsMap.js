import React, {useEffect, useState} from 'react'
import {
        StyleSheet,
        Image,
        View,
        Text, 
        TextInput,
        TouchableOpacity,
        Keyboard} from 'react-native'

import MapView, {Marker, Callout} from 'react-native-maps'

import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'

import api from '../services/api'

function DevsMap({navigation}){
    const [devs, setDevs] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null)
    const [techs, setTechs] = useState('')

    useEffect(() =>{
        async function devPosition(){
            const {granted} = await requestPermissionsAsync()
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords
                setCurrentLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            } 
            
        }
        devPosition()
    }, [])

    if(!currentLocation){
        return null
    }

    async function loadDevsAroundMe(){
        const {latitude, longitude} =  currentLocation
        const response = await api.get('/search', {
            params:{
            latitude, longitude, techs
            }
        })

        setDevs(response.data)
    }

    function handleRegionChanged(region){
        setCurrentLocation(region)
    }

    return (
        <>
            <MapView 
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentLocation} 
            style={style.map}>

                {devs.map(dev =>(
                    <Marker 
                    key={dev._id}    
                    coordinate={{
                        latitude: dev.location.coordinates.latitude,
                        longitude: dev.location.coordinates.longitude}}>
                        <Image style={style.avatar} 
                            source={{uri:dev.avatar_url}}/>
                        <Callout onPress={()=>{
                            navigation.navigate('DevProfile', {github_username: dev.github_username})
                        }}>
                        <View style={style.callout}>
                            <Text style={style.devName}>{dev.name}</Text>
                            <Text style={style.devTechs}>{dev.techs.join(', ')}</Text>
                            <Text style={style.devBio}>{dev.bio}</Text>
                        </View>
                    </Callout>    
                    </Marker>
                ))}
                
            </MapView>
            <View style={style.searchForm}>
                    <TextInput
                        style={style.searchInput}
                        placeholder= 'Find devs by techs...'
                        placeholderTextColor = '#999'
                        autoCapitalize = 'words'
                        autoCorrect = {false}
                        value={techs}
                        onChangeText={setTechs}/>
                    <TouchableOpacity onPress={loadDevsAroundMe} style={style.searchButton}>
                        <MaterialIcons name='my-location' size={20} color='#FFF'/>
                    </TouchableOpacity> 
            </View>
        </>
    )
}

const style = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#7d40e7'
    },
    callout:{
        width: 260
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 14
    },
    devTechs:{
        marginTop: 3
    },
    devBio:{
        color: '#7d40e7',
         marginTop: 5
    },
    searchForm:{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#7d40e7',
        borderRadius: 25,
        borderColor: '#7d40e7',
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#7d40e7',
        shadowOpacity: 0.3,
        shadowOffset:{
            width: 4,
            height: 4
        },
        elevation: 3
    },
    searchButton:{
        width: 50,
        height: 50,
        backgroundColor: '#7d40e7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        left: 5
    }
})

export default DevsMap