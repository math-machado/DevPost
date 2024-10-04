import { Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { useContext } from 'react';

export default function Profile() {
  const { signOut } = useContext(AuthContext)

  async function handleSignOut(){
    await signOut();
  };

  return(
    <View>
      <Text>Tela Profile</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
};
