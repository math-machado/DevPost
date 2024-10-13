import { ActivityIndicator, Text, View } from 'react-native';

import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

import { useCallback, useContext, useLayoutEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore'

import PostsList from '../../components/PostsList';

import { Container, ListPost } from './style'

import { AuthContext } from '../../contexts/auth';

export default function PostsUser() {

  const { user } = useContext(AuthContext)

  const route = useRoute();
  const navigation = useNavigation();

  const [title, setTitle] = useState(route.params?.title)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    })
  }, [navigation, title]);


  useFocusEffect(
    useCallback(() => {

      isActive = true

      firestore().collection('posts')
      .where('userid', '==', route.params?.userId)
      .orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
        let data = []
        snapshot.docs.map( u => {
          data.push({
            ...u.data(),
            id: u.id
          })
        })

        if(isActive){
          setPosts(data)
          setLoading(false)
        }
        
      })


      return () => {
        isActive = false
      }

    }, [])
  )

  return (
   <Container>
    {loading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={50} color='e52246'/>
      </View>
    ) : (
      <ListPost
      data={posts}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <PostsList data={item} userId={user?.uid}/>}
      />
    )}

   </Container>
  );
};
