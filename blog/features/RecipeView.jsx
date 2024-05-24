import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { IngredientsMiniTable } from '../components/IngredientsMiniTable';
import { IngredientsTable } from '../components/IngredientsTable';


export function RecipeView() {

    const { recipe_name } = useParams()

    const [currentRecipe, setCurrentRecipe] = useState(
        ''
    );
    const [ingredients, setIngredients] = useState(
        ''
    );
    const [instructions, setInstructions] = useState(
        ''
    );
    const [images, setImages] = useState('');
    const [recipeMini, setRecipeMini] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const recipe = await fetch(`/api/backend_test_two/${recipe_name}`);
                const data = await recipe.json();
                console.log(data);
                if (data.success) {
                    setCurrentRecipe(data.mainRecipe)
                    if (data.images === undefined) {
                        setImages(data.image)
                    }
                    setIngredients(data.ingredients)
                    setInstructions(data.instructions)
                    if (data.options.length > 0) {
                        setRecipeMini(data.options)

                    }
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);



    function Breadcrumbs() {
        const location = useLocation();

        return (
            <nav className='breadcrumbs-nav'>
                <div className='breadcrumb'>
                    <a
                        href='/blog'
                        className={location.pathname === `/blog` ? "breadcrumb-active" : "breadcrumb-not-active"}
                    >Recipes</a>
                    <span className="breadcrumb-arrow">&#x2215;</span>
                    <a
                        href={`/blog/view_recipe/${currentRecipe.recipe_name}`}
                        className={location.pathname === `/blog/view_recipe/${currentRecipe.recipe_name}` ? "breadcrumb-active" : "breadcrumb-not-active"}
                    >{currentRecipe.title}</a>
                    <span className="breadcrumb-arrow">&#x2215;</span>
                </div>
            </nav>
        )
    }



    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Image loading</i></p>;
            </div>
        )
    }

    return (
        <div className='recipe-view-container'>
            {currentRecipe &&
                <div className='recipe-container'>

                    <div className='recipe-content-top'>

                        <div className='recipe-page-title'>
                            <h1>{currentRecipe.title}</h1>
                        </div>

                        <Breadcrumbs />

                    </div>

                    <div className='recipe-content'>
                        <>
                            <div className='ing-section'>
                                <IngredientsTable ingredients={ingredients} />
                                <div className='image-side'>
                                    <Suspense fallback={<Loading />}>
                                        <img src={images.length <= 1 ?
                                            currentRecipe.image
                                            : images[1].image} />
                                    </Suspense>
                                </div>
                            </div>
                            {recipeMini ?
                                <div className='sub-recipe-row'>
                                    {recipeMini.map((item) => (
                                        <IngredientsMiniTable data={item} />
                                    ))}

                                </div>
                                : null}
                            <div className='instructions-section'>

                                <div className='instructions-section-title'>
                                    <h2>Instructions</h2>
                                </div>
                                <div className='instructions-section-content'>
                                    <div className='recipe-instructions'>
                                        {instructions ?
                                            <ol style={{ width: '100%' }}>

                                                {instructions.map(item => (
                                                    <li key={item.step}>{item.instruction}</li>
                                                ))}
                                            </ol>
                                            : null}
                                    </div>
                                    <div className='image-side-b'>
                                        <Suspense fallback={<Loading />}>
                                            <img src={images.length <= 1 ?
                                                currentRecipe.image
                                                : images[1].image} />
                                        </Suspense>
                                    </div>
                                </div>
                            </div>

                        </>

                        {/* Tags, categories *       <p></p> */}
                        {/*    <div className='recipe-images'>
        <>
            <div className='images-container'>
                <img src={currentRecipe.image} />
            </div>
        </>
    </div>
  <div className='recipe-page-title-img' >
        <img src={currentRecipe.image} />
    </div>
  */}
                    </div>
                </div>
            }
        </div>
    );
}