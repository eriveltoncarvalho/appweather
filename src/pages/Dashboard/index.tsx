import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import moment from 'moment';

import api from '../../services/api';

import {
  Container,
  Header,
  TempText,
  CityText,
  TempContainer,
  TempMinMaxContainer,
  TempMaxText,
  TempMinText,
  ContainerRefreshButton,
  WeathersList,
  TempMinDayText,
  TempMaxDayText,
  TempDayContent,
  TitleContainer,
  TitleText
} from './styles';

interface Coords {
  latitude?: number; 
  longitude?: number;
}

interface State {
  state: 'started' | 'loading' | 'finished';  
}

interface Coords {
  latitude?: number; 
  longitude?: number;
}

interface TCurrent {
  temp: number;
  dt: number;
}

interface TDaily {
  dt: number;
  temp?: {
    max: number;
    min: number;
  },
}

interface THourly {
  dt: number;
}

interface TAlerts {
  sender_name: string,
  event: string,
  description: string    
}

interface Tcity {
  name: string
}

const Dashboard: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState(''); 
  const [coords, setCoords] = useState<Coords>();
  const [loanding, setLoading] = useState<State>({state:'started'});
  const [currentWeather, setCurrentWeather] = useState<TCurrent>();
  const [hourlyWeather, setHourlyWeather] = useState<THourly>();
  const [dailyWeather, setDailyWeather] = useState<TDaily[]>([]);
  const [alertsWeather, setAlertsWeather] = useState<TAlerts[]>([]);
  const [cityWeather, setCityWeather] = useState<Tcity>();
  
  function handleRefresh() {
    setLoading({state: 'loading'})
  }
  
  useEffect(() => {
    async function loadLocation() {
      const result = await requestMultiple(
        [
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        ]).then(
          (statuses) => {
            const statusFine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]; 
            const statusBack = statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION]; 
            if (Platform.Version < 29) { 
              if (statusFine == 'granted') {
                return true;
              } else {
                setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
              }
            }
            if (statusFine == 'granted' && statusBack == 'granted') {
              return true;
            } else {
              setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
            }
          },
        );

      if (result) {
        await Geolocation.getCurrentPosition(
          ({ coords }) => {
          setCoords({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
            if (loanding.state==='started') {
              setLoading({state: 'loading'});
            }
           
          }, (error) => {
            setErrorMsg('Não foi possível obter a localização');
          }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true } 
        )
      } 
    }

    async function loadWeather() {
      if (coords) {
        await api.get('onecall', {params: 
                    {
                    lat: coords?.latitude,
                    lon: coords?.longitude,                                
                    units: 'metric'
                    }
                }).then((response) => {
                    const { current, daily, hourly, alerts } = response.data;
                    
                    setCurrentWeather(current);
                    setHourlyWeather(hourly);
                    setDailyWeather(daily);
                    setAlertsWeather(alerts) 
                }); 

         await api.get('forecast', {params: 
                  {
                  lat: coords?.latitude,
                  lon: coords?.longitude,                                
                  units: 'metric',
                  cnt: 1
                  }
              }).then((response) => {
                  const { city } = response.data;
                  setCityWeather(city)
              });      
      }

      setLoading({state: 'finished'})
    }

    if (loanding.state==='started') {
      loadLocation();
    }
    
    if (loanding.state==='loading') {
      loadWeather();
    }    
     
  }, [loanding])
 
  moment.locale('pt');
  return (
    <Container>
      <Header>
        <CityText>{cityWeather?.name}</CityText>

        <ContainerRefreshButton>
          <Icon
            style={{ width: 40, height: 40, paddingTop: 7, paddingLeft: 10}}
            name="refresh"
            size={30}
            color="#416cc9"
            onPress={() => handleRefresh()}
          />
        </ContainerRefreshButton>
      
      </Header>
      
      <TempContainer>
        <TempText>{Math.round(Number(currentWeather?.temp))}°|</TempText>  
        
        <TempMinMaxContainer>
          <TempMaxText>{Math.round(Number(dailyWeather[0]?.temp?.max))}°</TempMaxText>  
          <TempMinText>{Math.round(Number(dailyWeather[0]?.temp?.min))}°</TempMinText>  
        </TempMinMaxContainer>
      </TempContainer>

      <TitleContainer>
        <TitleText>Previsão para os próximos dias</TitleText>  
      </TitleContainer>

      <WeathersList>
         {dailyWeather.map(weather => (
          <TempDayContent key={weather.dt}>
            <TempMinDayText>{Math.round(Number(weather.temp?.max))}° / </TempMinDayText>
            <TempMaxDayText>{Math.round(Number(weather.temp?.min))}°</TempMaxDayText>
          </TempDayContent>
        
        ))}
       </WeathersList>
   </Container>
  )

}

export default Dashboard;