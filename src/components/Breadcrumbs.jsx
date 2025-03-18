import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumbs.css';
const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Prevent rendering breadcrumbs on the home page
    if (pathnames.length === 0) {
        return null; // No breadcrumbs on home page
    }

    return (
        <nav>
            <ul className="breadcrumbs">
                <li>
                    <Link to="/">Главная</Link>
                </li>
                {pathnames.map((value, index) => {
                    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <li key={path}>
                            <Link to={path}>
                                {value === 'female' ? 'женское' : 
                                 value === 'male' ? 'мужское' : 
                                 value === 'kids' ? 'детское' : 
                                 value === 'sale' ? 'распродажа' : value}
                            </Link>
                            {index < pathnames.length - 1 && " > "} 
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
