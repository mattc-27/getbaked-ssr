import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { Parallax, ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { NoMatch } from "./no-match";
import { BlogLayout } from './blog-layout';
import { RecipeList } from './features/RecipeList';
import { RecipeView } from './features/RecipeView';
import { SelectCategory } from './features/filter-search/CategorySelect';
import ReactGA from 'react-ga4';
import '../style.css';

export default function BlogApp() {
    const location = useLocation();

    const [defaultRecipes, setDefaultRecipes] = useState('')
    const [query, setQuery] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/backend_test`);
                const data = await response.json();
                console.log(data);
                setDefaultRecipes(data.recipes)
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData();
    }, [])



    useEffect(() => {
        console.log(defaultRecipes)
    }, [setDefaultRecipes, defaultRecipes])


    ReactGA.initialize([
        {
            trackingId: 'G-WQWNRBBCSL'
        }
    ]);


    function Blog() {


        useEffect(() => {
            console.log({
                page_path: location.pathname,
                page_search: location.search,
                page_hash: location.hash,
            })
        }, [])


        return (
            <div className='recipe-page'  >
                <div className='recipe-page-top'>
                    <SelectCategory setQuery={setQuery} />
                </div>
                {defaultRecipes &&
                    <RecipeList data={defaultRecipes} query={query} />
                }
            </div >
        );
    }

    return (
        <ParallaxProvider>
            <Routes>
                {/* Routes in this app don't need to worry about which URL prefix they are
          mounted at. They can just assume they are mounted at /. Then, if they
          are moved under a different basename later on, all routes and links will
          continue to work. */}
                <Route path="/" element={<BlogLayout />}>
                    <Route index element={<Blog />} />
                    <Route path="/view_recipe/:recipe_name" element={<RecipeView />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </ParallaxProvider>
    );
}
