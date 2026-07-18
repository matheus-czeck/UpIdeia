import { regraUsuario } from "../../generated/prisma/enums.js"

type UsuarioDTO = {
    id: string,
    nome: string,
    email: string
}

export default class UsuarioEntity {
    id: string
    nome: string
    email: string
    regra: regraUsuario

  constructor(data: UsuarioDTO) {
    if(!data.nome){
        throw new Error("Nome e obrigatorio!")
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!data.email || !emailValido.test(data.email)){
        throw new Error("Email vazio ou formato invalido!")
    }
    

    this.id = data.id
    this.nome = data.nome
    this.email = data.email
    this.regra = "USUARIO"
  }
}


