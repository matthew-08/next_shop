
const button: {
    name: string
    eventListener: null | (() => (arg: string) => string) 
} = {
    name: 'button',
    eventListener: null
}
const elems = [1,2,3]

const addEventListener = (i: string) => `i was clicked at ${i}`

for(let i = 0; i <= elems.length; i += 1) {
    button.eventListener = () => () => addEventListener(i.toString())
}




export default elems
