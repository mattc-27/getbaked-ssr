// Dependencies  
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';

// Components 
import { RecipeListCard } from './RecipeListCard';


export function RecipeList({ data, query }) {

    const [filteredItems, setFilteredItems] = useState(data);

    useEffect(() => {
        console.log(query);
        const filter = query;
        const filteredRecipes = data.filter((recipe) =>
          filter ? recipe.category === filter : true
        )
        setFilteredItems(filteredRecipes)
        console.log(filteredRecipes)
      }, [query, data])

    return (
        <div className='recipe-page-main'>
   
        <ParallaxBanner className="recipe-collection" >
          {filteredItems &&
            filteredItems.map((recipe) => (
              <Parallax
                className='recipe-card-main'
                translateY={[0, 0]}
                scale={[0.5, 1]}
                opacity={[1,0.9]}
                >
  
                <RecipeListCard item={recipe} recipe_name={recipe.recipe_name} />
              </Parallax>))
  
          }
        </ParallaxBanner>
      </div>
    );
}
