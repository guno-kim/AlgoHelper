import React,{useState,useEffect} from 'react'
import {Input} from 'antd'
import '../../../../css/common.css'

function InputBox(props) {
    const [Data, setData] = useState(props.data)
    const [ReRender, setReRender] = useState(0)
    const reRender=()=>{
        setReRender(ReRender+1)
    }
    useEffect(() => {
        props.sendState(Data)
    }, [])
    useEffect(() => {
        props.sendState(Data)
    }, [Data])
    const handleWidth=(e)=>{
        setData({...Data,width:e.target.value})
    }
    const handleHeight=(e)=>{
        setData({...Data,height:e.target.value})
    }
    const handleHorizonRep=(e)=>{
        setData({...Data,horizonRep:e.target.value})
    }
    const handelVerticalRep=(e)=>{
        setData({...Data,verticalRep:e.target.value})
    }
    const handleInputs=(y,x,e)=>{
        let temp=Data.inputs
        temp[y][x]=e.target.value
        setData({...Data,inputs:temp})
        reRender()
    }


    const makeBox=(width,height)=>{
        
        let box=[]
        for(let y=0;y<height;y++){
            let row=[]
            for(let x=0;x<width;x++){
                row.push(<Input key={x} value={Data.inputs[y][x]} onChange={(e)=>handleInputs(y,x,e)} style={{width:'50px',height:'30px',margin:'5px'}}/>)
            }
            box.push(row)
        }
        return(
            <div id="box" className='flex-column' style={{width:'400px'}}>
                {
                    box.map((item,index)=>{
                        return(
                            <div key={index} style={{display:'flex'}}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    
    return (
        <div key={Data.index} className='flex-row' style={{backgroundColor:'RGB(220, 220, 220)'}}>
            {Data.inputs[0]&& makeBox(Data.width,Data.height)}
            <div className='flex-column' style={{marginLeft:'20px'}}>
                <div className='flex-row'><div style={{marginRight:'20px'}}>가로 : </div><Input value={Data.width} onChange={handleWidth} style={{width:'50px'}}/></div>
                <div className='flex-row'><div style={{marginRight:'20px'}}>세로 : </div><Input value={Data.height} onChange={handleHeight} style={{width:'50px'}}/></div>
            </div>
            <div className='flex-column' style={{marginLeft:'20px'}}>
                <div className='flex-row'><div style={{marginRight:'20px'}}> 가로 반복 : </div><Input value={Data.horizonRep} onChange={handleHorizonRep} style={{width:'50px'}}/></div>
                <div className='flex-row'><div style={{marginRight:'20px'}}> 세로 반복 : </div><Input value={Data.verticalRep} onChange={handelVerticalRep} style={{width:'50px'}}/></div>
            </div>
        </div>
    )
}

export default InputBox
