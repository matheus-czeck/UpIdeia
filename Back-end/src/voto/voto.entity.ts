type VotoDTO = {
    id: string,
    idUsuario: string,
    idIdeia: string
}

export default class VotoEntity{
    id: string
    idUsuario: string
    idIdeia: string

    constructor(data: VotoDTO){
        if(!data.idIdeia){
            throw new Error("idIdeia vazio")
        }
        if(!data.idUsuario){
            throw new Error("idUsuario vazio")
        }
        this.id = data.id
        this.idUsuario = data.idUsuario
        this.idIdeia = data.idIdeia
    }
}