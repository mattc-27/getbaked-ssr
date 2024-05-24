import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxBanner } from "react-scroll-parallax";

export function RecipeCard({ item, recipe_name }) {

   
    return (

        <Parallax
          speed={25}

            className='recipe-card'
        >
            <div className='recipe-card-content'

            >
                <Parallax
                    className='recipe-card-img'
                //speed={5}
                >
                    <img src={item.image} />
                </Parallax>
                <div
                    className='recipe-card-top'
                //speed={15}
                >
                    <div
                        className='recipe-card-title'
                    >
                        <h1>{item.title}</h1>
                        <a className='recipe-card-link'
                             href={`/blog/view_recipe/${recipe_name}`}
                             //to={`/recipes/view/${item.name}`} state={{ recipe: item }}
                            //to={`/recipes/view/${item.name}`} state={{ recipe: item }}
                        >View recipe
                        </a>
                    </div>
                </div>
            </div>
        </Parallax>

    );
}