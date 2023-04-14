/* eslint-disable testing-library/no-render-in-setup */
import SidebarButtonGroup from "@/components/Sidebar/SidebarButtonGroup";
import { screen, render } from "@testing-library/dom";
import { ReactNode } from "react";


describe('Sidebar Buttons', () => {
    const onClose = jest.fn()
    const button:ReactNode = <button></button>
    describe('user is not logged in', () => {
        beforeEach(() => {
            render(
                <SidebarButtonGroup
                onClose={onClose}
                user={{
                    email: null 
                    id: null
                }}
                mainButton={button}
                />
            )
        })
        
    })
})