import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import logo1 from '../assets/logo1.png';
import GithubLogo from '../assets/GithubLogo.png';
import { FaInstagram } from "react-icons/fa";

function BlogLayout() {

    const location = useLocation();

    const [isSolidBackground, setIsSolidBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Adjust the scroll threshold based on your design
            const scrollThreshold = 100;
            // Check if the user has scrolled beyond the threshold
            setIsSolidBackground(window.scrollY > scrollThreshold);
        };
        // Add a scroll event listener
        window.addEventListener('scroll', handleScroll);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (


        <div>
            <header>
                <div className={isSolidBackground ? 'header-content solid-background' : 'header-content transparent-background'}>
                    <div className='header-title header-img'>
                        <a href='/'>

                            <img
                                className='headerLogoImg'
                                src={logo1} /* style={{ maxHeight: '100%', width: 'auto' }} */ />
                            {/*       <h1>GetBakedWithMe</h1>
                            <img
                    className='headerLogoImg'
                    src={logo1} /* style={{ maxHeight: '100%', width: 'auto' }}  />*/}
                        </a>
                    </div>
                    <div className='header-nav'>
                        <Link to={"/"}
                            className={isSolidBackground ? 'nav-link light-text' : 'nav-link dark-text'}
                        >Recipes</Link>
                    </div>
                </div>
            </header>
            <>
                <Outlet />
            </>
            <footer>
                <div className='footer-container'>
                    <div className='footer-content' >
                        <div className='footer-icons'>
                            <Link to={'https://github.com/mattc-27/baking-site-v1'} >
                                <img src={GithubLogo} style={{ height: '40px', width: '40px', margin: '0.5%' }} />
                            </Link>
                            <Link 
                                to={'https://instagram.com/getbakedwith.me'} >
                             <FaInstagram color={'#fafafa'} style={{ height: '45px', width: '45px', margin: '0.5%' }}/>
                            </Link>
                        </div>
                        <div className='footer-text'>
                            <p>Website by Matt Copeland</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export { BlogLayout };