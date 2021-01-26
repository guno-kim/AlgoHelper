import React,{useState,useEffect} from 'react'
import Editor from "@monaco-editor/react";

function CodeBox(props) {
    const [Code, setCode] = useState(props.value)
    const handleCode=(code,e)=>{
        setCode({...Code,code:code})
    }
    const handelLanguage=(e)=>{
        setCode({...Code,language:e.target.value})
    }
    useEffect(() => {
        props.sendState(Code)
    }, [Code])
    return (
        <div>
            <select value = {Code.language} onChange={handelLanguage}>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="r">R</option>
            </select>
            <div   style={{border:'solid 1px', width:'500px',height:'600px'}}>
                <Editor
                        width='100%'
                        height='100%'
                        language={Code.language}
                        value={Code.code}
                        onChange={handleCode}
                />
            </div>
           <button onClick={()=>{console.log(Code)}}></button>
        </div>
    )
}

export default CodeBox
