import React, { useRef, useEffect, useState, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import '../css/Streaming.css';
import axios from 'axios';
import MyPageContext from '../MyPageContext';

const WebCam = () => {
    const videoRef = useRef(null);
    const { loginMember } = useContext(MyPageContext);
    const [webCamView, setWebCamView] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);

    const getCamera = () => {

        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // 스트리밍 시작 버튼 활성화/비활성화 다른 사용자들에게 공유 시키기
    useEffect(() => {
        const socket = new SockJS('/ws'); // java 쪽의 서버포트 설정과 맞춰서 작성
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            debug: function (str) {
                console.log('STOMP Debug:', str);
            },
            onConnect: function (frame) {
                console.log('STOMP Connected:', frame);
                setConnected(true);
                client.subscribe('/topic/streaming', (response) => {
                    console.log(webCamView);
                    setWebCamView(JSON.parse(response.body));
                });

                //현재 스트리밍 상태를 서버에서 가져오기
                axios.get('/chat/streaming')
                    .then(res => {
                        const stream = res.data;
                        setWebCamView(stream);
                        if (stream) {
                            getCamera();
                        }
                    })
            },
            onStompError: function (frame) {
                console.error('STOMP Error:', frame);
            },
            onWebSocketError: function (error) {
                console.error('웹소켓 에러:', error);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [webCamView]);
    console.log(webCamView);

    //스트리밍이 활성화되면 카메라 시작, 비활성화 되면 카메라 끄기
    useEffect(() => {
        if (webCamView) {
            getCamera();
        }
    }, [webCamView]);

    //스트리밍 시작 버튼 모든 사용자들에게 뿌리기
    const handleBeginStreaming = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/chat.streaming'
            });
        }
    }

    //로그인 정보 null일때 ui 불러오기 막기
    if (!loginMember) {
        return;
    }

    return (
        <div className='webcam-container'>
            {webCamView ?
                <video className='webcam' ref={videoRef} controls />
                :
                <span className='blackScreen' style={{ display: 'flex' }}>
                    <p>준비 중 입니다.</p>
                </span>
            }
            {loginMember.memberType === 'A' &&
                <div className="streaming-start-btn">
                    <button onClick={handleBeginStreaming} className={`btn ${webCamView ? 'btn-outline-danger' : 'btn-outline-success'}`}>
                        {webCamView ? 'Quit Streaming' : 'Begin Streaming'}
                    </button>
                </div>
            }

            {!connected && <p>서버 연결중...</p>}
        </div>
    )
};

export default WebCam;