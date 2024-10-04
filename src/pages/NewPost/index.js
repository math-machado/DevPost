import { Text, View } from 'react-native';

import { Container, Input, Button, ButtonText } from './styles';

import { useContext, useLayoutEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { AuthContext } from '../../contexts/auth';

export default function NewPost(){

  const { user } = useContext(AuthContext)

  const navigation = useNavigation();

  const [post, setPost] = useState('');

  useLayoutEffect(() => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={handlePost}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post]);

  async function handlePost(){
    if(post === ''){
      console.log('Post vazio');
      return;
    }

    let avatarUrl = null

    try {
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;

    } catch (error) {
      avatarUrl = null
    };

    await firestore().collection('posts')
    .add({
      created: new Date(),
      content : post,
      autor: user.nome,
      userid: user.uid,
      likes: 0,
      avatarUrl
    })
    .then(() => {
      setPost('')
      console.log('Post criado com sucesoo');
      
    })
    .catch((error) => {
      console.log('Erro ao criar o post' + error);
    })

    navigation.goBack();
  }

  return (
    <Container>
      <Input
      placeholder='O que está acontecendo'
      value={post}
      onChangeText={ (text) => setPost(text) }
      autoCorrect={false}
      multilsadine={true}
      placeholderTextColor='#DDD'
      maxLength={300}
      />

    </Container>
    );
};
