import VotoEntity from './voto.entity.js'

describe("VotoEntity", ()=>{

    it("Deve lancar erro para idUsuario vazio", ()=>{
        expect(()=> new VotoEntity({idUsuario: "", idIdeia: "ideia123"})).toThrow("idUsuario vazio")
    })

    it("Deve lancar erro para idIdeia vazio", ()=>{
        expect(()=> new VotoEntity({idUsuario:"usuario1", idIdeia:""})).toThrow("idIdeia vazio")
    })

    it("Deve criar objeto com sucesso", ()=>{

        const novoVoto = new VotoEntity({ idUsuario:"usuario1", idIdeia:"ideia123"})

        expect(novoVoto).toMatchObject({ idUsuario:"usuario1", idIdeia:"ideia123"})
    })
})