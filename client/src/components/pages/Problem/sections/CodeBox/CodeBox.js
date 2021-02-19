import React,{useState,useEffect} from 'react'
import Editor from "@monaco-editor/react";

function CodeBox(props) {
    const [Code, setCode] = useState({code:'asd'})
    useEffect(() => {
        console.log('!!')
        setCode(props.value)
    }, [props.value])
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{display:'flex',justifyContent:'center',margin:'10px 0'}}>
                <div style={{marginRight:'10px'}}>언어 : </div>
                <div>{Code&&Code.language}</div>
            </div>
            
            <div   style={{border:'solid 1px', width:'500px',height:'600px'}}>
                <Editor
                        width='100%'
                        height='100%'
                        language={Code&&Code.language}
                        value={Code&&Code.code}
                        path={"answer"}
                />
            </div>
            <button onClick={()=>{console.log(Code)}}>asd</button>
        </div>
    )
}

export default CodeBox
