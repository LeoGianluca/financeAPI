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
 * Função Middleware de validação da existência de um  cadastrado.
 * Obs: Middleware são funções que tem acesso ao objeto de
 * solicitação (req), o objeto de resposta (res).
 *
 * @param {string} cpf - Número do Cadastro de Pessoas Física
 * @returns {[]}
 */
verifyExistsAccount = (request, response, next) => {
  const { cpf } = request.headers
  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" })
  }
  request.customer = customer

  next()
}

/**
 * Função Middleware responsável pela verificação de saldo existente.
 *
 * @param {string} statement - Extrato do cliente
 * @returns {}
 */
getBalance = (statement) => {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)

  return balance
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

app.use(verifyExistsAccount)
/**
 * Função responsável pela consulta do extrato do cliente.
 *
 * @param {string} cpf - Número do Cadastro de Pessoas Física
 * @returns {[]}
 */
app.get("/statement", (request, response) => {
  const { customer } = request

  return response.json(customer.statement)
})

/**
 * Função responsável pela criação de novo registro de depósito.
 *
 * @typedef Customers
 * @property {string} description - Descrição do depósito
 * @property {double} amount - Quantia do depósito
 */
app.post("/deposit", (request, response) => {
  const { customer } = request
  const { description, amount } = request.body

  const statementOperation = { description, amount, created_at: new Date(), type: "credit" }
  customer.statement.push(statementOperation)

  return response.status(201).send()
})

/**
 * Função responsável pela criação de novo registro de saque.
 *
 * @typedef Customers
 * @property {string} amount - Quantia do saque
 */
app.post("/withdraw", (request, response) => {
  const { customer } = request
  const { amount } = request.body

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds!" })
  }

  const statementOperation = { amount, created_at: new Date(), type: "debit" }
  customer.statement.push(statementOperation)

  return response.status(201).send()
})

/**
 * Função responsável pelo consulta do balanço do cliente.
 *
 * @typedef Customers
 * @property {object} customer - Objeto contendo informações da conta do cliente
 * @property {double} balance - Objeto contendo informação da quantia do cliente
 */
 app.get("/balance", (request, response) => {
  const { customer } = request
  const balance = getBalance(customer.statement)

  return response.json(balance)
})

/**
 * Função responsável pela consulta de extrato com filtro de data.
 *
 * @typedef Customers
 * @property {date} date - Data para consulta
 */
app.get("/statement/date", (request, response) => {
  const { customer } = request
  const { date } = request.query

  const statement = customer.statement.filter(
    (statement) => statement.created_at.toISOString().includes(date)
  )

  return response.json(statement)
})

/**
 * Função responsável pela atualização dos dados bancários.
 *
 * @typedef Customers
 * @property {string} name - Nome do cliente
 */
app.put("/account", (request, response) => {
  const { customer } = request
  const { name } = request.body

  customer.name = name

  return response.status(201).send()
})

/**
 * Função responsável pelo consulta dos dados da conta do cliente.
 *
 * @typedef Customers
 * @property {object} customer - Objeto contendo informações da conta do cliente
 */
app.get("/account", (request, response) => {
  const { customer } = request

  return response.json(customer)
})

/**
 * Função responsável pela remoção de uma conta de cliente.
 *
 * @typedef Customers
 * @property {object} customer - Objeto contendo informações da conta do cliente
 */
app.delete("/account", (request, response) => {
  const { customer } = request

  const indexCustomer = customers.indexOf(customer)
  customers.splice(indexCustomer, 1)

  return response.status(200).json(customers)
})

module.exports = app
