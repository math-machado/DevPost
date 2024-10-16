import styled from "styled-components/native";

export const Container = styled.View`
    margin-top: 8px;
    margin: 8px 2%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
    padding: 11px;
    elevation: 3;
    
`;
export const Header = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px
`;

export const Name = styled.Text`
    color: #353840;
    font-size: 18px;
    font-weight: bold;

`;

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 6px
`;

export const ContentView = styled.View``;

export const Content = styled.Text`
    color: #353840;
    margin: 8px 0px;
`;

export const Actions = styled.View`
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
    width: 45px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start
`;

export const Like = styled.Text`
    color: #e52246;
    margin-right: 6px 
`;

export const TimePost = styled.Text`
    color: #000
`;
