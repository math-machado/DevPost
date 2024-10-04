
import { Text } from 'react-native';

import { Container, Name, Header, Avatar, ContentView, Content, Actions, LikeButton, Like, TimePost } from './style'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PostsList() {
 return (
   <Container>
    <Header>
        <Avatar source={require('../../assests/avatar.png')}/>

        <Name numberOfLines={1}>
        Matheus Machado
        </Name>
    </Header>

    <ContentView>
        <Content>Todo o conteudo do post</Content>
    </ContentView>

    <Actions>
        <LikeButton>
            <Like>12</Like>

            <MaterialCommunityIcons name='heart-plus-outline' size={20} color='#E52246'/>

        </LikeButton>

        <TimePost>
            Ha um minuto
        </TimePost>
    </Actions>
    
   </Container>
  );
}