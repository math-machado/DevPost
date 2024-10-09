
import { Text } from 'react-native';

import { Container, Name, Header, Avatar, ContentView, Content, Actions, LikeButton, Like, TimePost } from './style'

import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useState } from 'react';

export default function PostsList({data, userId}) { 

    const [likePost, setLikePost] = useState(data?.likes)

    function formatTimePost(){
        //console.log(new Date(data.created.seconds * 1000));

        const timePost = new Date(data.created.seconds * 1000)

        return formatDistance(
            new Date(),
            timePost,
            {
                locale: ptBR
            }
        )
    };
    
    return (
    <Container>
        <Header>
            {data.avatarUrl ? (
                 <Avatar source={{ uri: data.avatarUrl }}/>
            ) : (
                <Avatar source={require('../../assests/avatar.png')}/>
            )}
            

            <Name numberOfLines={1}>
                {data?.autor}
            </Name>
        </Header>

        <ContentView>
            <Content>{data?.content}</Content>
        </ContentView>

        <Actions>
            <LikeButton>
                <Like>
                    {likePost === 0 ? '' : likePost}
                </Like>

                <MaterialCommunityIcons 
                name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'} 
                size={20} 
                color='#E52246'/>

            </LikeButton>

            <TimePost>
                {formatTimePost()}
            </TimePost>
        </Actions>
        
    </Container>
  );
}