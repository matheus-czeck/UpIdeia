import VotoEntity from './voto.entity.js'

describe("VotoEntity", ()=>{

    it("Deve lancar erro para idUsuario vazio", ()=>{
        expect(()=> new VotoEntity({id: "123", idUsuario: "", idIdeia: "ideia123"})).toThrow("idUsuario vazio")
    })

    it("Deve lancar erro para idIdeia vazio", ()=>{
        expect(()=> new VotoEntity({id: "123", idUsuario:"usuario1", idIdeia:""})).toThrow("idIdeia vazio")
    })

    it("Deve lancar criar objeto para sucesso", ()=>{

        const novoVoto = new VotoEntity({id: "123", idUsuario:"usuario1", idIdeia:"ideia123"})

        expect(novoVoto).toMatchObject({id: "123", idUsuario:"usuario1", idIdeia:"ideia123"})
    })
})