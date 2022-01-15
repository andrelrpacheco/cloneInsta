import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class Entrar extends Component {

    render() {
        return (
            <View style={{ backgroundColor: '#88e', width: '100%', height: 300, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                <Text style={{ color: '#fff', fontSize: 28, textAlign: 'center', marginTop: 100  }}>Seja bem vindo!</Text>

                <Button title='Fechar' onPress={this.props.fechar} />
            </View>
            
        )
    }
}

export default Entrar 