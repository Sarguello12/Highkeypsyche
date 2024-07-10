import { POOL } from './src/poolConfig'

function getUsers (request, response) {
  POOL.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

function getUserById (request, response) {
  const id = parseInt(request.params.id)

  POOL.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

function createUser (request, response) {
  const { name, email } = request.body

  POOL.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added`)
  })
}

function updateUser (request, response) {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  POOL.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

function deleteUser (request, response) {
  const id = parseInt(request.params.id)

  POOL.query('DELETE FROM users WHERE id = $1', [id], (error) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}