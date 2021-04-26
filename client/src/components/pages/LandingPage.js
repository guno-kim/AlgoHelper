import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import styled from 'styled-components'

function LandingPage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state)
    return (
        <Layout>
            
            <Wrapper >
                <div className='title'>무슨 페이지인가요?</div>
                <div className='text'>
                    왜 틀렸는지 모르는 알고리즘 문제를 위한 반례를 찾아주는 사이트입니다.<br></br>
                    반례가 필요한 문제를 리스트에서 찾아보시거나 직접 만들어 테스트 해보세요
                </div>
                <div class="title">문제 생성 방법 </div>
                <div class="text">
                    직접 몇번 테스트 해보면 더 빠르게 이해 가능합니다! <br/>
                    자세한 사항은 <a href="https://www.notion.so/80510b599c844d58a54910c20f3b23e3" target="_blank">문제 생성 가이드라인</a>을 참조해주세요
                </div>
                <div class="title">기타 사항</div>
                <ul>
                    <li><div class="text">크롬 사용을 권장합니다</div></li>
                    <li><div class="text">모든 문제에서 반례를 찾을 수는 없습니다.<br/>
                        예를 들어 입력 조건이 많은 문제는 반례생성이 어렵습니다.</div></li>
                    <li><div class="text">현재 백준 같은 콘솔 입출력 문제만 이용가능합니다. </div></li>
                    <li><div class="text">초보라 부족한 부분이 많습니다. <br/> 오류나 질문은 <a href="https://www.notion.so/584b84f4999448189085ff9416bb75c6" target="_blank">이곳</a> 댓글이나 guno98@naver.com 으로 주시면 감사하겠습니다!</div></li>
                </ul>
            </Wrapper>
        </Layout>
        
    )
}
const Wrapper=styled.div`
    width:900px;
    height:850px;
    background-color:#FFFFF3;
    border:0.1px solid lightgray;
    border-radius:10px;
    margin-top:10px;
    padding: 0 50px;

    .title{
        font-size:28px;
        margin-top: 20px;
        padding:20px 0;
        font-weight:bold;
    }
    .text{
        font-size:18px;
    }
    li{
        padding: 10px 0;
    }
`

export default LandingPage
