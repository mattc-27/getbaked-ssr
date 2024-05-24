import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

export function RecipeListCard({ item, recipe_name }) {

    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Image loading</i></p>;
            </div>
        )
    }


    return (
        <>
            <div className='recipe-card-img-main'>

                <Suspense fallback={<Loading />}>
                    <img src={item.image} />
                </Suspense>

            </div>
            <div className='recipe-card-info-main'>
                <div className='recipe-card-title-main'>
                    <h1>{item.title}</h1>
                    <a
                        className='recipe-card-link-main'
                        href={`/blog/view_recipe/${recipe_name}`}
                    //state={{ recipe: item }}
                    >View recipe
                    </a>
                </div>
            </div>
        </>
    );
}