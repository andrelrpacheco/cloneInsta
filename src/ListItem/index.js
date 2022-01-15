import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Entrar from './entrar'

let noLike = require('../img/like.png')
let like = require('../img/likeada.png')

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feed: this.props.data,
            input: '',
            nome: '',
            modalVisible: false
        }

        this.mostrarLikes = this.mostrarLikes.bind(this)
        this.like = this.like.bind(this)
        this.carregaIcone = this.carregaIcone.bind(this)
        this.gravaNome = this.gravaNome.bind(this)
        this.abrir = this.abrir.bind(this)
        this.fechar = this.fechar.bind(this)
    }

    /**
     * executado toda vez que o componente é montado em tela
     */
    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('nome')

            if(value !== null && value !== '') {
                this.setState({nome: value})
            } else {
                console.warn('Não existe nome salvo!')
            }
        } catch (e) {
            console.warn('Não foi possível obter o nome!')
        }
    }

    /**
     * executado toda vez o componente é atualizado
     */
    async componentDidUpdate(_, prevState) {
        try {
            const nome = this.state.nome

            if(prevState !== nome) {
                await AsyncStorage.setItem('nome', nome)
            }
          } catch (e) {
            console.warn('Não foi possivel salvar o nome')
          }
    }

    gravaNome() {
        this.setState({
            nome: this.state.input
        })
        alert('Salvo com sucesso!')
    }

    mostrarLikes(likers) {
        const feed = this.state.feed

        if(feed.likers <= 0) return;

        return (
            <Text style={styles.likers}>
                {feed.likers} {feed.likers > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    like() {
        const feed = this.state.feed

        if(feed.likeada === true) {
            this.setState({
                feed: {
                    ...feed,
                    likeada: false,
                    likers: feed.likers - 1
                }
            })
        } else {
            this.setState({
                feed: {
                    ...feed,
                    likeada: true,
                    likers: feed.likers + 1
                }
            })
        }
    }

    carregaIcone(likeada) {
        return likeada ? like : noLike
    }

    abrir() {
        this.setState({ modalVisible: true })
    }

    fechar(isVisible) {
        this.setState({modalVisible: isVisible})
    }

    render() {
        return (
            <View style={styles.areaFeed}>

                <View style={styles.viewPerfil}>
                    <Image 
                        source={{ uri: this.state.feed.imgperfil }}
                        style={styles.fotoPerfil}
                    />

                    <Text style={styles.nomeUsuario}>{this.state.feed.nome}</Text>
                </View>

                <Image
                    resizeMode='cover'
                    source={{ uri: this.state.feed.imgPublicacao }}
                    style={styles.fotoPublicacao}
                />

                <View style={styles.viewButtonIcons}>
                    <TouchableOpacity onPress={this.like}>
                        <Image 
                            source={this.carregaIcone(this.state.feed.likeada)}
                            style={styles.iconeLike}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSend}>
                        <Image 
                            source={require('../img/send.png')}
                            style={styles.iconeLike}
                        />
                    </TouchableOpacity>

                </View>

                {this.mostrarLikes(this.state.feed.likers)}

                <View style={styles.areaRodape}>

                    <Text style={styles.tituloName}>
                        {this.state.feed.nome}
                    </Text>

                    <Text style={styles.descricao}>
                        {this.state.feed.descricao}
                    </Text>

                </View>

                <View style={styles.viewTextInput}>
                    <TextInput 
                        style={styles.input}
                        value={this.state.input}
                        onChangeText={(text) => this.setState({input: text})}
                        underlineColorAndroid='transparent'
                    />

                    <TouchableOpacity onPress={this.gravaNome}>
                        <Text style={styles.btnAdicionar}>
                            +
                        </Text>
                    </TouchableOpacity>

                </View>

                <View>
                    <Button title='Abrir' onPress={this.abrir} />

                    <Modal transparent={true} animationType='slide' visible={this.state.modalVisible}>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Entrar fechar={() => this.fechar(false)} />
                        </View>
                    </Modal>
                </View>

                <Text style={styles.nome}>{this.state.nome}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    areaFeed: {

    },
    nomeUsuario: {
        fontSize: 22,
        textAlign: 'left',
        color: '#000000'
    },
    fotoPerfil: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15
    },
    fotoPublicacao: {
        flex: 1,
        height: 400
    },
    viewPerfil: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    iconeLike: {
        width: 28,
        height: 28
    },
    viewButtonIcons: {
        flexDirection: 'row',
        padding: 10
    },
    btnSend: {
        paddingLeft: 10
    },
    areaRodape: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tituloName: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#000'
    },
    descricao: {
        fontSize: 15,
        color: '#000',
        paddingLeft: 10
    },
    likers: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10
    },
    viewTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    input: {
        width: 350,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        padding: 10
    },
    btnAdicionar: {
        backgroundColor: '#333',
        color: '#fff',
        height: 40,
        padding: 10,
        marginLeft: 3
    },
    nome: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 15
    }
})

export default ListItem 