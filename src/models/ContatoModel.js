const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    createdDate: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = () => {
    this.userDataCheck();
}

Contato.prototype.userDataCheck = () => {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    
}

Contato.prototype.cleanUp = () => {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        password: this.body.password
    }
}

module.exports = Contato;