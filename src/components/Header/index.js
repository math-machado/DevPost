
import { Text, View } from 'react-native';

import { Container, Title} from './styles'

export default function Header() {
 return (
   <Container>
    <Title>Dev<Text style={{color: '#e52246', fontStyle: 'italic'}}>Post</Text></Title>
   </Container>
  );
}