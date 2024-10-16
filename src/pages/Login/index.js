import { ActivityIndicator, Text, View } from 'react-native';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles'
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable'

const TitleAnimatable = Animatable.createAnimatableComponent(Title)

export default function Login() {
  
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  const [login, setLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin(){
    setLogin(!login)
    setEmail('')
    setPassword('')
    setName('')
  }

  async function handleSignIn(){
    if(email === '' || password === ''){
      console.log('Preencha todos os campos');
      return;
    }

    await signIn(email, password)
  }

  async function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      console.log('Preencha todos os campos');
      return;
    }

    await signUp(email, password, name)


  }

  if(login){
    return (
      <Container>
        <TitleAnimatable animation='flipInY'>
          Dev<Text style={{color:'#E52246'}}>Post</Text>
        </TitleAnimatable>
  
        <Input
        placeholder='Digite seu email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
  
        <Input
        placeholder='Digite sua senha'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        />
  
        <Button onPress={handleSignIn}>
          {loadingAuth ? (
              <ActivityIndicator size={20} color='#FFF'/>
          ) : (
              <ButtonText>Acessar</ButtonText>
          )
            }
        </Button>
  
        <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tem uma conta? Cadastre-se</SignUpText>
      </SignUpButton>
  
  
      </Container>
  
    );
  };
  
  return (
    <Container>
      <TitleAnimatable animation='flipInX'>
        Dev<Text style={{color:'#E52246'}}>Post</Text>
      </TitleAnimatable>

      <Input
      placeholder='Digite seu nome'
      value={name}
      onChangeText={(text) => setName(text)}
      />

      <Input
      placeholder='Digite seu email'
      value={email}
      onChangeText={(text) => setEmail(text)}
      />

      <Input
      placeholder='Digite sua senha'
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={true}
      />

        <Button onPress={handleSignIn}>
          {loadingAuth ? (
              <ActivityIndicator size={20} color='#FFF'/>
          ) : (
              <ButtonText>Cadastrar</ButtonText>
          )
            }
        </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tem uma conta? Cadastre-se</SignUpText>
      </SignUpButton>


    </Container>

  );
};
