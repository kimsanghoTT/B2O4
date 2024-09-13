import React, { useContext, useEffect, useState } from "react";
import WebCam from "./WebCam";
import LiveChat from "./LiveChat";
import '../css/Streaming.css';
import MyPageContext from "../MyPageContext";
import axios from "axios";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const LiveStreamingPage = () => {
    const [searchWord, setSearchWord] = useState('');
    const [searchedChat, setSearchedChat] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [chatable, setChatable] = useState(true);
    const chatLogPerPage = 20; // 페이지당 항목 수
    const { loginMember } = useContext(MyPageContext);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // localStorage에서 chatable 상태를 가져옴
        const savedChatable = localStorage.getItem('chatable');
        if (savedChatable !== null) {
            setChatable(JSON.parse(savedChatable));
        } else {
            // 기본값을 true로 설정
            setChatable(true);
        }
    }, []);

    useEffect(() => {
        axios.get("/search/chat", {
            params: { memberId: searchWord }
        })
            .then(res => {
                setSearchedChat(res.data);
                setCurrentPage(1); // 검색할 때마다 첫 페이지로 이동
            });
    }, [searchWord]);

    useEffect(() => {
        const socket = new SockJS('/ws'); // WebSocket 엔드포인트
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            debug: function (str) {
                console.log('STOMP Debug:', str);
            },
            onConnect: function (frame) {
                console.log('STOMP Connected:', frame);
                setStompClient(client);

                // 채팅 권한 업데이트 구독
                client.subscribe('/topic/chatPermissionUpdate', (response) => {
                    const updatedMember = JSON.parse(response.body);
                    if (loginMember.memberId === updatedMember.memberId) {
                        const newChatable = updatedMember.chatable === 'Y';
                        setChatable(newChatable);
                        // 변경된 chatable 값을 로컬 스토리지에 저장
                        localStorage.setItem('chatable', JSON.stringify(newChatable));
                    }
                });
                
            },
            onStompError: function (frame) {
                console.error('STOMP Error:', frame);
            },
            onWebSocketError: function (error) {
                console.error('웹소켓 에러:', error);
            }
        });

        client.activate();

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [loginMember]);

    const handleSearchChatMessage = (e) => {
        setSearchWord(e.target.value);
    };

    const indexOfLastChat = currentPage * chatLogPerPage;
    const indexOfFirstChat = indexOfLastChat - chatLogPerPage;
    const currentChats = searchedChat.slice(indexOfFirstChat, indexOfLastChat);

    // 페이지 수 계산
    const totalPages = Math.ceil(searchedChat.length / chatLogPerPage);

    // 페이지 변경
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 채팅 금지 / 허용 전환
    const toggleChatable = (chatable) => {
        axios.put("/switch/chat", null, {
            params: {
                memberId: searchWord,
                chatable: chatable
            }
        })
            .then(res => {
                stompClient.publish({
                    destination: '/app/chat.PermissionUpdate',
                    body: JSON.stringify({
                        memberId: searchWord,
                        chatable
                    })
                });
                // chatable 값을 로컬 스토리지에 저장
                localStorage.setItem('chatable', JSON.stringify(chatable === "Y"));
            })
            .catch(error => {
                console.error('채팅 상태 업데이트 오류:', error);
            });
    };

    if (!loginMember) {
        return null;
    }

    return (
        <div className="livePage-container">
            <div className="livePage-wrapper">
                <WebCam />
                <LiveChat chatable={chatable} />
            </div>
            {loginMember.memberType === 'A' &&
                <div className="chat-search-container">
                    <h2>채팅 부검</h2>
                    <input
                        className="chat-search-bar"
                        type="text"
                        value={searchWord}
                        onChange={handleSearchChatMessage}
                        placeholder="아이디 입력"
                    />
                    <div className="search-memberinfo">
                        <h3>"{searchWord}"의 채팅 내역</h3>
                        <div className="auth-chat-btn">
                            <button className="btn btn-outline-success" onClick={() => toggleChatable("Y")}>
                                채팅 허용
                            </button>
                            &nbsp;
                            <button className='btn btn-outline-danger' onClick={() => toggleChatable("N")}>
                                채팅 금지
                            </button>
                        </div>
                    </div>
                    <table className="chat-search-result-table">
                        <thead>
                            <tr>
                                <th className="col-msgContent">내용</th>
                                <th className="col-memberId">작성자</th>
                                <th className="col-msgAt">작성시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentChats.map(chatlog => (
                                <tr key={chatlog.msgNo}>
                                    <td>{chatlog.msgContent}</td>
                                    <td>{chatlog.memberId}</td>
                                    <td>{chatlog.msgAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="chat-log-pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default LiveStreamingPage;