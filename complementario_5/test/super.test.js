import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing a nivel servidor',() =>{
    
    before(async function(){
        //borro el usuario de prueba
        await requester.get('/api/sessions/test/drop');
    })

    beforeEach(async function(){
        
    })
    let cookie;
    describe('Test de usuarios',()=>{
        it("El endpoint POST /api/sessions/register debe crear un nuevo usuario en la base de datos",async () =>{
            const userMock = {
                first_name:'Hernan',
                last_name:'Roig',
                email:'micorreo@correo.com',
                password:'123'
            }
            const response = await requester.post('/api/sessions/register').send(userMock);
            //console.log(response._body)
            expect(response.status).to.be.equal(200);
            expect(response._body.status).to.equal('success');
        })
        it("El endpoint /api/sessions/login Debe loguear correctamente al usuario y debe insertar una cookie con el token",async () =>{
            const userMock = {
                email:'micorreo@correo.com',
                password:'123'
            }
            const response = await requester.post('/api/sessions/login').send(userMock);
            //console.log(response._body)
            //console.log(response.headers)
            const cookieHeader = response.headers['set-cookie'][0];
            expect(response.status).to.be.equal(200);
            expect(response._body.status).to.equal('success');
            expect(cookieHeader).to.be.ok;
            expect (response.status).to.be.eql(200);
            cookie = {
                name: cookieHeader.split('=')[0],
                value: cookieHeader.split('=')[1]
            }
            //console.log(cookie);
            expect(cookie.name).to.be.ok.and.eql('authToken')
        })
    })
    describe('Test de Productos',()=>{
        it("El endpoint /api/products devuelve un array de productos si esta logeado",async() =>{
            const response = await requester
            .get('/api/products').send()
            .set('Cookie', `authToken=${cookie.value}`);
            //console.log(response._body)
            expect(response.status).to.be.equal(200);
            expect(response._body.products.docs).to.be.an('array');
        })
    })
    describe('Test de Cart',()=>{
        it("Agregar un producto al carrito del usuario",async() =>{
            let idProd = '646e69147880ccd722004f80';
            const response = await requester
            .get(`/api/carts/add/${idProd}`).send()
            .set('Cookie', `authToken=${cookie.value}`);
            console.log(response._body)
            //tiene que devolver 302 porque si esta ok redirecciona a productos
            expect(response.status).to.be.equal(302);
        })
        it("Traer los productos agregados recientemente al carrito",async() =>{
            const response = await requester
            .get('/api/carts/view/my').send()
            .set('Cookie', `authToken=${cookie.value}`);
            //console.log(response)
            expect(response.status).to.be.equal(200);
            expect(response._body.status).to.equal('success');
        })
    })
})