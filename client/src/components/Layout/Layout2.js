import React from 'react'
import './style2.scss'
function Layout(props) {
    const {children}=props;
    return (
        <div id='layout1'>
            <div id="layout2">
                {children}
            </div>
        </div>
    )
}

export default Layout
