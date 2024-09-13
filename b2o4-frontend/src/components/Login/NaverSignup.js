import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import '../css/NaverSignup.css'

function NaverSignup() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [member, setMember] = useState({
        memberId: '',
        memberPw: '',
        memberPhone: '',
        memberAddress: '',
        memberbirth: ''
    });
    const [errors, setErrors] = useState({
        memberId: '',
        memberPw: '',
        memberName: '',
        memberPhone: '',
    });
    const [emailCheck, setEmailCheck] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('access_token');
        console.log("토큰 확인 : " + accessToken);

        if (accessToken) {
            axios.get(`/signup/naver?access_token=${accessToken}`)
                .then(response => {
                    setUserInfo(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log("userInfo : ", userInfo)
                    alert("정보를 가져오지 못했습니다.");
                });
        }
    }, [location.search]);

    useEffect(() => {
        if (userInfo && userInfo.response) {
            const email = userInfo.response.email;
            axios.post("/emailCheck", null, {
                params: { email }
            })
                .then(response => {
                    if (Number(response.data) !== 0) {
                        setEmailCheck(false);
                        navigate("/login");
                        alert("이미 회원가입된 메일입니다.");
                        return null;
                    } else {
                        setEmailCheck(true);
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                    alert("이메일 중복 확인 중 오류가 발생했습니다.");
                });
        }
    }, [userInfo, navigate]);

    if (loading) {
        return <div>데이터 정보 가져오는 중...</div>
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 실시간으로 유효성 검사
        if (value) {
            validateField(name, value);
        } else {
            setErrors({
                ...errors,
                [name]: '' // 값이 없을 때는 오류 메시지를 초기화합니다.
            });
        }

        setMember({
            ...member,
            [name]: value
        });
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        if (name === 'memberId') {
            if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) {
                errorMsg = '아이디는 4-12자의 영문, 숫자 조합이어야 합니다.';
            }
        } else if (name === 'memberPw') {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                errorMsg = '비밀번호는 최소 8자, 하나 이상의 문자 및 숫자를 포함해야 합니다.';
            }
        } else if (name === 'memberName') {
            if (!/^[가-힣a-zA-Z\s]{2,30}$/.test(value)) {
                errorMsg = '이름은 2-30자의 한글 또는 영문이어야 합니다.';
            }
        } else if (name === 'memberPhone') {
            if (!/^\d{10,11}$/.test(value)) {
                errorMsg = '핸드폰번호는 10-11자리의 숫자이어야 합니다.';
            }
        }

        setErrors({
            ...errors,
            [name]: errorMsg
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 모든 필드에 대한 유효성 검사 수행
        Object.keys(member).forEach((name) => validateField(name, member[name]));

        // 오류가 있는 경우 제출 중지
        if (Object.values(errors).some((error) => error !== '')) {
            console.log('유효성 검사 오류:', errors);
            return;
        }

        const memberData = {
            memberId: member.memberId,
            memberPw: member.memberPw,
            memberName: userInfo?.response?.name || '', // Safe access
            memberPhone: member.memberPhone,
            memberEmail: userInfo?.response?.email || '', // Safe access
            memberAddress: member.memberAddress,
            memberBirth: member.memberbirth
        };

        axios.post('/naverAPI/register', memberData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        })
        .catch(e => {
            console.error("개발자가 에러 확인하는 공간 : ", e);
            alert("회원가입에 실패하였습니다.");
        })
    };

    return (
        <div className="signup-container">
            {emailCheck && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            아이디
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="memberId"
                                    value={member.memberId}
                                    onChange={handleChange}
                                />
                                <button type="button">중복확인</button>
                            </div>
                            {errors.memberId && errors.memberId !== '' && (
                                <div style={{ color: 'red' }}>{errors.memberId}</div>
                            )}
                        </label>
                    </div>
                    <div>
                        <label>
                            비밀번호
                            <input
                                type="password"
                                name="memberPw"
                                value={member.memberPw}
                                onChange={handleChange}
                            />
                            {errors.memberPw && errors.memberPw !== '' && (
                                <div style={{ color: 'red' }}>{errors.memberPw}</div>
                            )}
                        </label>
                    </div>
                    <div>
                        <label>
                            핸드폰번호
                            <input
                                type="text"
                                name="memberPhone"
                                value={member.memberPhone}
                                onChange={handleChange}
                            />
                            {errors.memberPhone && errors.memberPhone !== '' && (
                                <div style={{ color: 'red' }}>{errors.memberPhone}</div>
                            )}
                        </label>
                    </div>
                    <div>
                        <label>
                            주소
                            <input
                                type="text"
                                name="memberAddress"
                                value={member.memberAddress}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            생년월일
                            <input
                                type="date"
                                name="memberbirth"
                                value={member.memberbirth}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">가입하기</button>
                </form>
            )}
        </div>
    );
}

export default NaverSignup;