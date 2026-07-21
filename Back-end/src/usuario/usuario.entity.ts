import { regraUsuario } from "../../generated/prisma/enums.js"
import AppError from "../shared/errors/app.error.js"

export type UsuarioDTO = {
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
        throw new AppError("Nome e obrigatorio!", 400)
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!data.email || !emailValido.test(data.email)){
        throw new AppError("Email vazio ou formato invalido!", 400)
    }
    

    this.id = data.id
    this.nome = data.nome
    this.email = data.email
    this.regra = "USUARIO"
  }
}


