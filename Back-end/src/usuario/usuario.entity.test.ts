import UsuarioEntity from './usuario.entity.js'

describe("UsuarioEntity", ()=>{
    it("deve lancar erro para nome vazio", ()=>{
        expect(()=> new UsuarioEntity({id: "123", nome: "", email: "matheus@gmail.com"})).toThrow("Nome e obrigatorio!")
    })

    it("deve lancar erro para email vazio", ()=>{
        expect(()=> new UsuarioEntity({id: "123", nome: "matheus", email: ""})).toThrow("Email vazio ou formato invalido!")
    })
    it("deve lancar erro para email em formato invalido", ()=>{
        expect(()=> new UsuarioEntity({id: "123", nome: "matheus", email: "matheus"})).toThrow("Email vazio ou formato invalido!")
    })

    it("deve criar objeto caso sucesso", ()=>{

        const usuario = new UsuarioEntity({id:"123", nome:"matheus", email:"matheus@gmail.com"})

        expect(usuario).toMatchObject({id:"123", nome:"matheus", email:"matheus@gmail.com", regra:"USUARIO"})
    })
    it("deve criar usuario com regra USUARIO por padrao", ()=>{
        const usuario = new UsuarioEntity({id:"123", nome:"matheus", email:"matheus@gmail.com"})

        expect(usuario.regra).toBe("USUARIO")
    })
})