import { ActivityIndicator, Text, View } from 'react-native';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles'
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth';

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
        <Title>Dev <Text style={{color:'#E52246'}}>Post</Text></Title>
  
        <Input
        placeholder='Digite seu email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
  
        <Input
        placeholder='Digite sua senha'
        value={password}
        onChangeText={(text) => setPassword(text)}
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
      <Title>Dev <Text style={{color:'#E52246'}}>Post</Text></Title>

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
