import styled, { css } from 'styled-components/native';

interface CategoryItemProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #4a70c4;
`;

export const Header = styled.View`
  padding: 50px 20px 20px;
  background: #84a1df;
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: space-between;
`;

export const CityText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 22px;
  color: #FFFFFF;
  text-align: left;
  min-width: 80%;
`;

export const TempContainer = styled.View`
  flex-direction: row;
  background: #84a1df;
  justify-content: center;
  padding: 25px 0px 40px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  background: #5b83da;
  justify-content: center;
  padding: 10px 0px 10px;
  border-radius: 5px;
`;

export const TitleText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #13151a;
  margin-top: 10px;
`;


export const TempText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 65px;
  color: #FFFFFF;
  text-align: center;
  margin-top: 0;
  line-height: 80px;
`;

export const TempMinMaxContainer = styled.View`
  flex-direction: column;
  background: #84a1df;
  margin-left: 10px;
`;

export const TempMinText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 10px;
`;

export const TempMaxText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 10px;
`;


export const ContainerRefreshButton = styled.View`
  display: flex;
  background: #FFFFFF;
  border-radius: 100px;
  height: auto;
  width: auto;
  min-height: 50px;
  min-width: 50px; 
  margin: auto;
  border: solid #416cc9 2px;
`;

export const WeathersList = styled.ScrollView`
  background: #FFFFFF;
  padding: 0 10px 0 10px;
`;

export const TempMinDayText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #13151a;
  margin-top: 10px;
`;

export const TempMaxDayText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #13151a;
  margin-top: 10px;
`;

export const TempDayContent = styled.View`
  flex: 1;
  padding: 16px;
  flex-direction: row;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #cfd2d4;
`;


