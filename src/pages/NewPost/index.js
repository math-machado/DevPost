import { Text, View } from 'react-native';

import { Container, Input, Button, ButtonText } from './styles';

import { useLayoutEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

export default function NewPost(){

  const navigation = useNavigation();

  const [post, setPost] = useState('');

  useLayoutEffect(() => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])

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
