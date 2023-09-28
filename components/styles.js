import styled from "styled-components";
import {View, Text, Image} from 'react-native';
import Constant from 'expo-constants';

const StatusBarHeight = Constant.statusBarHeight;

//colors
export const Colors = {
    white: "#FFFFFF",
    primary: "#0D409E",
    secondary: "#FFBF46",
    green: "#1CA33A",
    red: "#D14B57",
    heading: "#3C3C3C",
    body: "#3C3C3C"
};

const {white, primary, secondary, green, red, heading, body} = Colors;

export const StyledContainer = styled.View`
    flex 1;
    padding: 20px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex 1;
    padding: 100%;
    align-items: center;
    background-color: ${primary};
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight:bold;
    color: ${heading};
    padding: 10px;
`;