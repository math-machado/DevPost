import { Text, View } from 'react-native';

import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

import { useCallback, useLayoutEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore'

export default function PostsUser() {

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
          console.log(data);
          setLoading(false)
        }
        
      })


      return () => {
        isActive = false
      }

    }, [])
  )

  return (
   <View>
    <Text>{title}</Text>
   </View>
  );
};
