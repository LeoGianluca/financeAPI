const express = require("express")
const { v4: uuid } = require("uuid")

const app = express()
app.use(express.json())

/**
 * @constant
 * @type {Customers}
 */
const customers = []

/**
 * Função Middleware de validação da existência de um CPF cadastrado. 
 * OBs: Middleware são funções que tem acesso ao objeto de
 * solicitação (req), o objeto de resposta (res).
 * 
 * @param {string} cpf - Número do Cadastro de Pessoas Física
 * @returns {[]}
 */
verifyExistsAccount = (request, response, next) => {
  const { cpf } = request.headers
  const customer = customers.find(customer => customer.cpf === cpf)

  if(!customer) {
    return response.status(400).json({error: "Customer not found"})
  }
  request.customer = customer

  next()
}

/**
 * Função responsável pela criação de novo cliente.
 *
 * @typedef Customers
 * @property {string} name - Nome do cliente
 * @property {string} cpf - Número do Cadastro de Pessoas Física
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body
  customerExists = customers.some((customer) => customer.cpf === cpf)

  if (customerExists) {
    return response.status(400).json({ error: "Customer already exists" })
  }

  customers.push({ cpf, name, id: uuid(), statement: [] })

  return response.status(201).send()
})

/**
 * Observação:
 * Caso todas as funções utilizem o mesmo escopo de verificação, utilizar: app.use(verifyExistsAccount). 
*/

/**
 * Função responsável pela listagem do extrado do cliente.
 *
 * @param {string} cpf
 * @returns {[]}
 */
app.get('/statement', verifyExistsAccount, (request, response) => {   
  const { customer } = request

  return response.json(customer.statement)
})

module.exports = app
