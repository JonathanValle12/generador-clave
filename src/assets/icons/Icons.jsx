const Icons = {
    copy: ({ onClick}) => (
        <svg 
        className="cursor-pointer"
        onClick={onClick} 
        height="21" 
        viewBox="0 0 21 21" 
        width="21" 
        xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path d="m11.5 9.5v-7c0-1.1045695-.8954305-2-2-2h-7c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2z" /><path d="m3.5 11.5v1c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-1" /></g></svg>
    ),
    generatePassword: ({onClick, iconRotation}) => (
        <svg 
        style={{ 
            transform: `rotate(${iconRotation}deg)`,
            transition: 'transform 0.3s ease',
        }}
            className="cursor-pointer" 
            onClick={onClick} 
            height="21" 
            viewBox="0 0 21 21" 
            width="21" 
            xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 1)"><path d="m1.5 5.5c1.37786776-2.41169541 4.02354835-4 7-4 4.418278 0 8 3.581722 8 8m-1 4c-1.4081018 2.2866288-4.1175492 4-7 4-4.418278 0-8-3.581722-8-8" /><path d="m6.5 5.5h-5v-5" /><path d="m10.5 13.5h5v5" /></g></svg>
    )
}

export default Icons;