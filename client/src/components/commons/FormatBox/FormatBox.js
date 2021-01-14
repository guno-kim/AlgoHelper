import React from 'react'
import styled from 'styled-components'

function FormatBox(props) {
    const makeFormatBox=(format)=>{
        let box=[]
        format.forEach((row)=>{
            let boxRow=""
            row.forEach((ele)=>{    
                boxRow+=ele+" "
            })
            boxRow+='\n'
            box.push(boxRow)
        })
        return box
    }
    return (
        <Wrapper id="format">
            {makeFormatBox(props.format)}
        </Wrapper>
    )
}
const Wrapper=styled.pre`
    border: 1px solid black;
    width: 400px;
    height: 400px;
    font-size: 20px;
    overflow-y: scroll auto;
    overflow-x: scroll auto;
    border-radius: 10px;
    margin: 0;
    padding: 0;
`
export default FormatBox
