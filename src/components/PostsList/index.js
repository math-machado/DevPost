
import { Text } from 'react-native';

import { Container, Name, Header, Avatar, ContentView, Content, Actions, LikeButton, Like, TimePost } from './style'

import { formatDistance } from 'date-fns'
import { id, ptBR } from 'date-fns/locale'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useState } from 'react';

import firestore from '@react-native-firebase/firestore'

import { useNavigation } from '@react-navigation/native';

export default function PostsList({data, userId}) { 

    const navigation = useNavigation();

    const [likePost, setLikePost] = useState(data?.likes)
    const [myLike, setMyLike] = useState(false)

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

    async function handleLikePost(id, likes){
        const docId = `${userId}_${id}`

        const doc = await firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists){
            await firestore().collection('posts')
            .doc(id).update({
                likes: likes - 1
            })

            await firestore().collection('likes').doc(docId)
            .delete()
            .then(() => {
                setLikePost(likes - 1)
                setMyLike(false)
            })

            return;
        }

        await firestore().collection('likes')
        .doc(docId).set({
            postId: id,
            userId: userId
        })

        await firestore().collection('posts')
        .doc(id).update({
            likes: likes + 1
        })
        .then(() => {
            setLikePost(likes + 1)
            setMyLike(true)
        })

    }
    
    return (
    <Container>
        <Header onPress={() => navigation.navigate('PostsUser', { title: data.autor, userId: data.userid})}>
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
            <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
                <Like>
                    {likePost === 0 ? '' : likePost}
                </Like>

                <MaterialCommunityIcons 
                name={myLike ? 'cards-heart' : 'heart-plus-outline'} 
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