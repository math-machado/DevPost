import { Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { useContext, useEffect, useState } from 'react';

import { Container, Name, Email, Button, ButtonText, UploadButton, UploadText, Avatar } from './style'

import Header from '../../components/Header';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext)

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState('https://sujeitoprogramador.com/steve.png');

  async function handleSignOut(){
    await signOut();
  };

  return(
    <Container>
      <Header/>

      {url ? (
        <UploadButton onPress={}>
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url}}
          />
        </UploadButton>
      ) : (
        <UploadButton>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      
      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg='#428cfd'>
        <ButtonText color='#FFF'>Atualizar Perfil</ButtonText>
      </Button>

      <Button bg='#ddd' onPress={ handleSignOut }>
        <ButtonText color='#353840'>Sair</ButtonText>
      </Button>

    </Container>
  )
};
