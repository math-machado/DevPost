import { Text, View } from 'react-native';

import { Container, AreaInput, Input, List } from './style'

import Feather from 'react-native-vector-icons/Feather'

import { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore'

export default function Search() {

  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    if(input === '' || input === undefined){
      setUsers([])
      return;
    }

    firestore().collection('users')
    .where('nome', '>=', input)
    .where('nome', '<=', input + "\uf8ff")
    .onSnapshot((snapshot) => {
      const listUsers = []

      snapshot.forEach((doc) => {
        listUsers.push({
          ...doc.data(),
          id: doc.id
        })
      })

      setUsers(listUsers)
      
    })
  }, [input])
  
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