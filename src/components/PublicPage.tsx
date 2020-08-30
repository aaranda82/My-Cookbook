import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import data from "../data.json";
import Lunch from "../assets/Lunch.jpg";
import { Link } from "react-router-dom";

const { gunmetal, timberwolf } = ColorScheme;

const PublicPageDiv = styled.div`
  width: 80%;
  margin: auto;
  & .title {
    font-family: "Quattrocento", serif;
    font-size: 3em;
    margin: 50px 0 15px 0;
    color: ${gunmetal};
  }
`;

const CategoryViewer = styled.div`
  background-color: ${timberwolf};
`;

const CategoriesContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 500px) {
    display: none;
  }
`;

const CatTitle = styled.div`
  width: 100%;
  @media (max-width: 500px) {
    display: none;
  }
`;

const Category = styled.a`
  width: 150px;
  margin: 0 20px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.5em;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
`;

const CategoryImage = styled.div`
  width: 100%;
  padding-bottom: 40%;
  background-color: ${timberwolf};
`;

const Recipes = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Recipestitle = styled.div`
  width: 100%;
`;

const Recipe = styled.div`
  cursor: pointer;
  text-align: center;
  width: 20%;
  margin: 10px;
  background-color: ${timberwolf};
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const RecipeImage = styled.img`
  height: auto;
  width: 100%;
  background-image: url(${Lunch});
  background-size: cover;
  background-position: center;
`;

const RecipeName = styled.div`
  font-weight: 600;
  margin: 5px 0;
`;

interface IState {
  categoryToShow: string;
}

class PublicPage extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      categoryToShow: "ALL",
    };
  }

  changeCategory(categoryToShow: string) {
    this.setState({ categoryToShow });
  }

  renderCategories() {
    const categories: string[] = ["ALL"];
    for (let x = 0; x < data.length; x++) {
      let cat = data[x].category.toUpperCase();
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }
    const catElements = categories.map((cat, index) => {
      return (
        <Category key={index} onClick={() => this.changeCategory(cat)}>
          <CategoryImage className="categoryImage"></CategoryImage>
          <div>{cat}</div>
        </Category>
      );
    });
    return catElements;
  }

  handleRecipe() {
    let recipesByCat: {
      recipeId: number;
      recipe: string;
      category: string;
      servings: number;
      ingredients: { name: string; quantity: number; unit: string }[];
      instructions: { number: number; instruction: string }[];
    }[] = [];
    if (this.state.categoryToShow === "ALL") {
      recipesByCat = data;
    } else {
      recipesByCat = data.filter(
        (r) => r.category === this.state.categoryToShow
      );
    }
    const allRecipes = recipesByCat.map((recipeData, index) => {
      const { recipeId, recipe } = recipeData;
      return (
        <Recipe key={index}>
          <Link
            to={`/recipedetail/:${recipeId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <RecipeImage src={Lunch} alt="Lunch" />
            <RecipeName>{recipe}</RecipeName>
          </Link>
        </Recipe>
      );
    });
    return allRecipes;
  }

  render() {
    return (
      <PublicPageDiv id="PublicPage">
        <CatTitle className="title">Categories</CatTitle>
        <CategoryViewer>
          <CategoriesContent id="Categories">
            {this.renderCategories()}
          </CategoriesContent>
        </CategoryViewer>
        <Recipestitle className="title">Recipes</Recipestitle>
        <Recipes id="Recipes">{this.handleRecipe()}</Recipes>
      </PublicPageDiv>
    );
  }
}

export default PublicPage;
