import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import CreateRecipeForm from './CreateRecipeForm'
import axios from 'axios'

class CreateRecipe extends Component {
  state = {
    title: '',
    ingredients: '',
    description: '',
    responseMessage: false,
    message: '',
    error: false
  }

  submitRecipeHandler = (e) => {
    e.preventDefault();
    const path = 'http://localhost:3000/v1/recipes'
    const { title, ingredients, description } = this.state
    axios.post(path, { title, ingredients, description })
      .then(response => {
        console.log(response)
        this.setState({
          message: response.data.message,
          responseMessage: true,
          error: false
        })
      })
      .catch(error => {
        this.setState({
          message: error.response.data.error_message,
          responseMessage: true,
          error: true
        })
      })
  }


  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let createRecipeForm, messages
    let { message, responseMessage, error } = this.state

    if (responseMessage) {
      messages = (
        <>
          <br />
          <Message style={{ color: error ? 'red' : 'green' }}>
          <p id="create-response">{message}</p>
          </Message>
        </>
      )
    }

    createRecipeForm = (
      <CreateRecipeForm
        inputHandler={this.inputHandler}
        submitRecipeHandler={this.submitRecipeHandler}
      />
    )

    return (
      <div>
        {createRecipeForm}
        {messages}
      </div>
    )
  }
}

export default CreateRecipe
