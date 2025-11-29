import React from 'react';
import './About.css';
import { SEO } from '../../components/SEO';

const About = () => {
        return (
    <>
        <SEO
            title="About Codelix | AI-Powered Development Team"
            description="Learn about Codelix - your partner in building AI-powered web, app, and SaaS solutions with cutting-edge technology and exceptional design."
            keywords="about codelix, development team, company information, our story"
            canonical="https://codelix.com/about"
        />
        <div className="about">
            <h1>Hello About</h1>
        </div>
    </>
    )};

export default About;