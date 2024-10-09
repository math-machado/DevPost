import { ActivityIndicator, Text, View } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

import { Container, ButtonPost, ListPost} from './styles';
import Header from '../../components/Header';

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useCallback, useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore'

import PostsList from '../../components/PostsList';

export default function Home() {

  const navigation = useNavigation();

  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      function fetchPosts(){
        firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get()
        .then((snapshot) => {

          if(isActive){
            setPosts([]);
            let postList = [];

            snapshot.docs.map( u => {
              postList.push({
                ...u,
                id: u.id
              })
            })

            setPosts(postList)
            setLoading(false)

          }

        })
      };

      fetchPosts();

      return () => {
        isActive = false
      }

    }, [])
  )

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color='#E52246'/>
        </View>
      ) : (
        <ListPost
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => (
            <PostsList 
            data={item} userId={user?.id}/>
          )}
        />
      )}

      

      <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate('NewPost')}>
        <Feather name='edit-2' color='#FFF' size={25}/>
      </ButtonPost>
    </Container>
    );
  };
