import * as React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const Route = createFileRoute('/about')({
    component: AboutComponent,
})

function AboutComponent() {
    return (
        <>
            <Navbar/>
            <div className="p-2">
                <h3>About</h3>
            </div>
            <Footer/>
        </>
    )
}
