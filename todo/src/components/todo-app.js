import React from 'react'
import TodoItem from './todo-item'

export default React.createClass({
  displayName: 'TodoApp',

  getInitialState: function() {
    return {
      items: JSON.parse(localStorage.getItem('items')) || [],
      value: ''
    }
  },

  handleChange: function(e) {
    this.setState({ value: e.target.value })
  },

  handleDelete: function(item) {
    let items = this.state.items
    this.updateItems(items.filter(function(x) {
      return x.name !== item.name
    }))
  },

  addItem: function() {
    let items = this.state.items
    let value = this.state.value
    if(value.length) {
      items.push({ name: value })
    }
    this.setState({
      value: ''
    })
    this.updateItems(items)
  },

  updateItems: function(items) {
    this.setState({ items: items })
    localStorage.setItem('items', JSON.stringify(items))
  },

  handleKeyUp: function(e) {
    if(e.which === 13) {
      this.addItem()
    }
  },

  render: function() {
    let items = this.state.items
    let value = this.state.value
    let handleDelete = this.handleDelete
    return (
      <div className="ui container">
        <div className="ui fluid action input">
          <input onChange={this.handleChange} onKeyUp={this.handleKeyUp} className="ui input" type="text" placeholder="What do you need to do?" value={value} />
          <button onClick={this.addItem} className="ui button" type="button">Add</button>
        </div>
        <ul className="ui divided selection list large">
          {items.map((item, index) => {
            return <TodoItem key={`${item.name}-${index}`} name={item.name} onDelete={handleDelete.bind(this, item)} />
          })}
        </ul>
      </div>
    )
  }

})
