import { useEffect, useState } from 'react'

import ServerController from "./models/server.controller";


function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [editingId, setEditingId] = useState(null)

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await ServerController.getUsers()
      const list = Array.isArray(data) ? data : (data || [])
      setUsers(list)
    } catch (err) {
      console.error(err)
      setError('Error cargando usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const resetForm = () => {
    setName('')
    setEmail('')
    setTelephone('')
    setEditingId(null)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const payload = { name, email, telephone }
      await ServerController.createUser(payload)
      await loadUsers()
      resetForm()
    } catch (err) {
      console.error(err)
      setError('Error al crear usuario')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editingId) return
    try {
      const payload = { name, email, telephone }
      await ServerController.updateUser(editingId, payload)
      await loadUsers()
      resetForm()
    } catch (err) {
      console.error(err)
      setError('Error al actualizar usuario')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar usuario?')) return
    try {
      await ServerController.deleteUser(id)
      await loadUsers()
    } catch (err) {
      console.error(err)
      setError('Error al eliminar usuario')
    }
  }

  const startEdit = (user) => {
    setEditingId(user.id)
    setName(user.name || '')
    setEmail(user.email || '')
    setTelephone(user.telephone || '')
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a href='' className='navbar-brand'>
            {" "}ECG-10C Frontend
          </a>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Usuarios</h2>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={editingId ? handleUpdate : handleCreate}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input value={name} onChange={e => setName(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input value={telephone} onChange={e => setTelephone(e.target.value)} className="form-control" />
              </div>
              <div>
                <button type="submit" className="btn btn-primary me-2">{editingId ? 'Actualizar' : 'Crear'}</button>
                {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancelar</button>}
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <div className="mb-2 d-flex justify-content-between align-items-center">
              <h5>Lista</h5>
              <div>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={loadUsers}>Refrescar</button>
                <button className="btn btn-sm btn-primary" onClick={() => { resetForm(); window.scrollTo(0,0) }}>Nuevo</button>
              </div>
            </div>

            {loading && <div>Cargando...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? users.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.telephone}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => startEdit(u)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5}>No hay usuarios</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
