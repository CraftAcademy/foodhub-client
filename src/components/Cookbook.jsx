import React, { Component } from "react"
import { Header, List, Container, Image } from "semantic-ui-react"
import "../css/create-recipe.css"
import { fetchFavorites, fetchCookbookPdf } from '../modules/requestFavorites'
import { Link } from "react-router-dom"

class Cookbook extends Component {
  state = {
    favoriteRecipes: [],
    message: null
  }
  componentDidMount() {
    this.renderFavorites()
  }

  async renderFavorites() {
    const response = await fetchFavorites()
    this.setState({
      favoriteRecipes: response
    })
  }

  async submitPdfRequest() {
    const response = await fetchCookbookPdf()
    this.setState({
      message: response.message
    })
  }

  render() {
    let renderFavoriteRecipeList, message, image
    const favouritesData = this.state.favoriteRecipes

    if (favouritesData.length > 0) {
      renderFavoriteRecipeList = favouritesData.map(recipe => {
        image = recipe.image ? <Image avatar src={recipe.image} /> : ''
        return (
          <List.Item key={recipe.id}>
            {image}
            <List.Content style={{ fontSize: '1.2rem' }}>
              <List.Header name="recipe-title">Title: {recipe.title}</List.Header>
              <List.Description name="recipe-creator">Created by: {recipe.user_name}</List.Description>
              <Link id={`recipe-${recipe.id}`} to={`/recipe/${recipe.id}`}><List.Description className="profile-link">View recipe</List.Description></Link>
            </List.Content>
          </List.Item>
        )
      })
    }

    message = (
      <Header as="p" id="message" style={{ color: "#4C5966", textAlign: 'center', fontStyle: 'italic' }}>
        After you have added a recipe you can always access it in your Cookbook
      </Header>
    )

    if (message) {
      pdfMessage = (
        <Message style={{ color: "green" }}>
        <Header as="p" id="response-message" style={{ color: "#4C5966" }}>
          {message}
        </Header>
      </Message>
      )
    }

    createPDF = (
      <Button
      name="create-pdf"
      onClick={() => this.submitPdfRequest()}
    >
      Submit
      </Button>
    )

    return (
      <div className="profile-bg">
        <Container className="profile-container">
          <Header as="h1" style={{ color: "#4C5966", textAlign: 'center' }}>
            My Cookbook
          </Header>
          {message}
          {createPDF}
          {pdfMessage}
          <Container>
            <List divided relaxed>
              {renderFavoriteRecipeList}
            </List>
          </Container>
        </Container>
      </div>
    )
  }
}

export default Cookbook;