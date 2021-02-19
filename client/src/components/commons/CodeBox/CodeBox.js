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
        <div style={{textAlign:'center'}}>
            <div style={{display:'flex',justifyContent:'center',margin:'10px 0'}}>
                <div style={{marginRight:'10px'}}>언어 : </div>
                <select value = {Code.language} onChange={handelLanguage}>
                    <option value="python">Python</option>
                </select>
            </div>
            
            <div   style={{border:'solid 1px', width:'500px',height:'600px'}}>
                <Editor
                        width='100%'
                        height='100%'
                        language={Code.language}
                        value={Code.code}
                        onChange={handleCode}
                />
            </div>
        </div>
    )
}

export default CodeBox
