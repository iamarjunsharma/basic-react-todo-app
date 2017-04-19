import React from 'react'
import PropTypes from 'prop-types'

function Nav(props) {
  var nav = ['Completed', 'Pending']

  return (
    <ul className='nav'>
      { nav.map( (item, i) =>
        <li
          className={ item === props.activeNav ? 'active' : ''}
          key={ i }
          onClick={ props.handleClick.bind(null, item) }>
            { item }
        </li>
      ) }
    </ul>
  )
}

Nav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  activeNav: PropTypes.string.isRequired
}

function TodoItem(props) {
  return (
    <ul>
      { props.todosToShow.map( (todo, i) => {
        return (
          <li key={ i } onClick={ props.activeNav !== 'Completed' ? props.handleDelete.bind(null, todo) : null }>
            { todo }
          </li>
        )
      }) }
    </ul>
  )
}

TodoItem.propTypes = {
  todosToShow: PropTypes.array.isRequired,
  activeNav: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      completedTodos: [],
      pendingTodos: [],
      value: '',
      activeNav: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    var newTodo = this.refs.todo.value
    var updatedTodos = this.state.pendingTodos.concat(newTodo)

    this.setState( () => {
      return {
        pendingTodos: updatedTodos,
        value: '',
        activeNav: ''
      }
    } )
  }

  handleChange(e) {
    var inputVal = e.target.value

    this.setState( () => {
      return {
        value: inputVal
      }
    } )
  }

  handleDelete(todo) {
    var pendingTodos = this.state.pendingTodos.filter( (value) => {
      return (value !== todo)
    } )

    var completedTodos = this.state.completedTodos.concat(todo)

    this.setState( () => {
      return {
        pendingTodos,
        completedTodos
      }
    } )
  }

  handleClick(item) {
    this.setState( () => {
      return {
        activeNav: item
      }
    } )
  }

  render () {

    switch (this.state.activeNav) {
      case('Completed'):
        var todosToShow = this.state.completedTodos
        break
      case('Pending'):
        var todosToShow = this.state.pendingTodos
        break
      default:
        var todosToShow = this.state.pendingTodos
    }

    return (
      <div>
        <h1>Todo App</h1>
        <Nav handleClick={ this.handleClick } activeNav={ this.state.activeNav } />
        <form onSubmit={ this.handleSubmit }>
          <input
            type='text'
            placeholder='Add Todo'
            value={ this.state.value }
            onChange={ this.handleChange }
            ref='todo'
          />
          <button>Add</button>
        </form>
        { todosToShow.length ?
          <h2>{ this.state.activeNav }</h2> :
          null
        }
        <TodoItem todosToShow={ todosToShow } activeNav={ this.state.activeNav } handleDelete={ this.handleDelete } />
        { this.state.activeNav === 'Completed' && this.state.completedTodos.length === 0 &&
          <p>No Completed Todos yet...</p>
        }
        { this.state.activeNav === 'Pending' && this.state.pendingTodos.length === 0 &&
          <p>Hurray !!! No Pending Todos left now...</p>
        }
        { todosToShow.length === 0 && this.state.activeNav === '' &&
          <p>Please enter a Todo to show here.</p>
        }
      </div>
    )
  }
}