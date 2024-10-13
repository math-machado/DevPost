import { Text, View } from 'react-native';

import { Container, AreaInput, Input, List } from './style'

import Feather from 'react-native-vector-icons/Feather'
import { useState } from 'react';

export default function Search() {

  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  
  return (
   <Container>
    <AreaInput>
      <Feather
        name='search'
        size={20}
        color='#e52246'
      />

      <Input
      placeholder='Procurando alguém?'
      value={input}
      onChangeText={(text) => setInput(text)}
      placeholderTextColor='#353840'
      />

    </AreaInput>
   </Container>
  );
}