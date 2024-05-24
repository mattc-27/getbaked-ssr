import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { Parallax, ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { NoMatch } from "./no-match";
import { HomeLayout } from './home-layout';
import ReactGA from 'react-ga4';
import '../style.css';

export default function HomeApp() {



    function Home() {

        return (
            <div className='welcome-page' >
                <ParallaxBanner
                    className='welcome-section'
                    opacity={['2', '0']}
                >
                    <Parallax
                        className='welcome-content'
                    >
                        <h3>
                            Welcome to GetBakedWith.Me!
                        </h3>
                        <p><a href='/blog'>Explore delectable recipes</a>, baking tips, and sweet inspirations that will take your baking adventures to new highs.</p>
                        <p>Join me for delightful tales from my kitchen, where every recipe is crafted with love and shared with joy.
                        </p>
                    </Parallax>
                </ParallaxBanner>
                {/* 
        {defaultRecipes &&
          <>
            <Carousel recipes={defaultRecipes} />
            {/* <RecipeSection data={defaultRecipe} /> 
          </>
        }*/}

            </div>
        );

    }



    ReactGA.initialize([
        {
            trackingId: 'G-PFSPZEC7DM'
        }
    ]);


    return (
        <ParallaxProvider>
            <Routes>
                {/* Routes in this app don't need to worry about which URL prefix they are
      mounted at. They can just assume they are mounted at /. Then, if they
      are moved under a different basename later on, all routes and links will
      continue to work. */}
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </ParallaxProvider>
    );
}

