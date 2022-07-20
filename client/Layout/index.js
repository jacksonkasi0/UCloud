import React from 'react'
import Footer  from '../components/Footer';
import Navbar from "../components/Navbar"

export default class MyComponent extends React.Component {
    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.WOW = require('wowjs');
        }
        new WOW.WOW().init();
    }
    render() {
        return (
            <div className="flex flex-col h-screen">
                <Navbar />
                {this.props.children}
                <Footer />
            </div>

        )
    }
}