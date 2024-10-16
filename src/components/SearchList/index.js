import { View } from 'react-native';

import { Container, Name} from './style'

import { useNavigation } from '@react-navigation/native';

export default function SearchList({ data }) {


  const navigation = useNavigation();

  return (
   <Container onPress={() => navigation.navigate('PostsUser', {title: data.nome, userId: data.id})}>
    <Name>{data.nome}</Name>
   </Container>
  );
}