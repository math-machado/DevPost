import { Text, TouchableOpacity, View, Modal, Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { useContext, useEffect, useState } from 'react';

import { Container, Name, Email, Button, ButtonText, UploadButton, UploadText, Avatar, ModalContainer, ButtonBack, Input } from './style'

import Header from '../../components/Header';

import Feather from 'react-native-vector-icons/Feather'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { launchImageLibrary } from 'react-native-image-picker';

export default function Profile() {
  const { signOut, user, setUser, storageUser } = useContext(AuthContext)

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);

  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function loadAvatar(){
      try {

        let response = await storage().ref('users').child(user.uid).getDownloadURL()

        setUrl(response)

      } catch (error) {
        console.log('NÂO ENCONTRAMOS NENHUMA FOTO');
      }
    };
    
    loadAvatar();

  }, [])

  async function handleSignOut(){
    await signOut();
  };

  async function updateProfile() {
    if(nome === ''){
      return;
    }

    await firestore().collection('users')
    .doc(user?.uid)
    .update({
      nome: nome
    })

    const postDocs = await firestore().collection('posts')
    .where('userid', '==', user?.uid).get();

    postDocs.forEach( async doc => {
      await firestore().collection('posts')
      .doc(doc.id).update({
        autor: nome
      })
    })

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email
    }

    setUser(data)
    storageUser(data)
    setOpen(false)
  };

  function uploadFile(){
    const options = {
      mediaType: 'photo'
    }

    launchImageLibrary(options, response => {
      if(response.didCancel){
        console.log('Usuario cancelou');
      }else if(response.errorCode){
        console.log('ERROR: ' + response.errorCode);
      }else{
        uploadFileFirebase(response)
        .then(() => {
          uploadAvatarPost()
        })
        console.log('URI DA FOTO: ' + response.assets[0].uri);
        setUrl(response.assets[0].uri)
      }
    })
  };

  async function uploadFileFirebase(response){
    const fileSource = response.assets[0].uri
    
    const storageRef = storage().ref('users').child(user?.uid);

    return await storageRef.putFile(fileSource);
    
  };

  async function uploadAvatarPost(){

    const storageRef = storage().ref('users').child(user.uid);

    await storageRef.getDownloadURL()
    .then( async image => {

      console.log('URL DA FOTO RECEBIDA: ', image);
      
      const userPosts = await firestore().collection('posts')
      .where('userid', '==', user.uid).get()
  
      userPosts.forEach( async doc => {
        await firestore().collection('posts')
        .doc(doc.id).update({
          avatarUrl: image
        })
      })
    })
    .catch((error) => {
      console.log('ERROR: ', error);
      
    })
  };

  return(
    <Container>
      <Header/>

      {url ? (
        <UploadButton onPress={ uploadFile }>
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url}}
          />
        </UploadButton>
      ) : (
        <UploadButton onPress={ uploadFile }>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      
      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg='#428cfd' onPress={() => setOpen(true)}>
        <ButtonText color='#FFF'>Atualizar Perfil</ButtonText>
      </Button>

      <Button bg='#ddd' onPress={ handleSignOut }>
        <ButtonText color='#353840'>Sair</ButtonText>
      </Button>
      
      <Modal visible={open} animationType='slide' transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name='arrow-left' size={22} color='#121212'/>
            <ButtonText color='#121212'>Voltar</ButtonText>
          </ButtonBack>

          <Input
          placeholder={user?.nome}
          value={nome}
          onChangeText={(text) => setNome(text)}
          />

        <Button bg='#428cfd' onPress={ updateProfile }>
          <ButtonText color='#FFF'>Salvar</ButtonText>
        </Button>

        </ModalContainer>

      </Modal>

    </Container>
  )
};
