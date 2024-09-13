import React, { useEffect, useState } from "react";
import "../css/KakaoMap.css"; // CSS 파일을 임포트합니다.
// API 키를 비동기적으로 가져오는 함수
const fetchKakaoMapKey = async () => {
  try {
    const response = await fetch("/api/kakao-map-key");
    if (!response.ok) {
      throw new Error("API 요청 실패");
    }
    const data = await response.text();
    return data; // 가져온 키를 반환
  } catch (error) {
    console.error("API 키 가져오기 실패:", error);
    return null;
  }
};
const KakaoMap = () => {
  const [apiKey, setApiKey] = useState(null); // 상태로 API 키를 관리합니다.
  const [mapLoaded, setMapLoaded] = useState(false); // 지도 로드 여부를 관리합니다.
  useEffect(() => {
    const initializeMap = async () => {
      const key = await fetchKakaoMapKey();
      if (!key) return; // API 키가 없으면 함수를 종료합니다.
      setApiKey(key);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트를 정리하여 메모리 누수 방지
      };
    };
    initializeMap();
  }, []);
  useEffect(() => {
    if (!mapLoaded || !window.kakao) return; // 지도 로드 전이면 함수를 종료합니다.
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5165, 127.0194),
        level: 10,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const locations = [
        { name: "누리풋볼클럽", lat: 37.50985, lng: 127.033196 },
        { name: "피엘풋볼아카데미", lat: 37.517362, lng: 127.029288 },
        {
          name: "스포츠몬스터 아카데미풋살장",
          lat: 37.527087,
          lng: 127.029718,
        },
        {
          name: "로꼬풋살스타디움 도곡점",
          lat: 37.490768,
          lng: 127.058016,
        },
        { name: "압구정풋살 스튜디오", lat: 37.52514, lng: 127.028702 },
        { name: "워드풋살", lat: 37.484583, lng: 127.066226 },
        { name: "플레이존 풋살장", lat: 37.527455, lng: 127.035286 },
        { name: "일월에코파크풋살장", lat: 37.492895, lng: 127.081242 },
        { name: "청담자이아파트풋살장", lat: 37.522953, lng: 127.049424 },
        {
          name: "로꼬풋살스타디움잠실 제타플렉스점",
          lat: 37.513272,
          lng: 127.100168,
        },
        { name: "강동 송파 풋살장", lat: 37.5025, lng: 127.1258 },
        { name: "스타풋살장", lat: 37.4678, lng: 127.0389 },
        { name: "더베이스캠프", lat: 37.5442, lng: 127.0924 },
        { name: "잠심종합운동장제3풋살장", lat: 37.5151, lng: 127.0732 },
        { name: "반세르풋볼아카데미", lat: 37.4673, lng: 127.1276 },
        { name: "이촌한강공원풋살장", lat: 37.5196, lng: 126.9945 },
        { name: "잠실종합운동장제2풋살장", lat: 37.5151, lng: 127.0732 },
        { name: "주사랑FC풋살장 삼전점", lat: 37.5011, lng: 127.0915 },
        { name: "어반그라운드풋살", lat: 37.4944, lng: 127.1182 },
        { name: "성수풋살장", lat: 37.5444, lng: 127.0565 },
        { name: "수원월드컵경기장풋살장", lat: 37.2843, lng: 127.0194 },
        { name: "용인FC풋살파크", lat: 37.2418, lng: 127.1772 },
        { name: "안양축구센터풋살장", lat: 37.3948, lng: 126.9261 },
        { name: "고양국민체육센터풋살장", lat: 37.6563, lng: 126.8326 },
        { name: "성남종합운동장풋살장", lat: 37.4125, lng: 127.1262 },
        { name: "남양주시체육문화센터풋살장", lat: 37.6345, lng: 127.2166 },
        { name: "의정부시민풋살파크", lat: 37.7385, lng: 127.0457 },
        { name: "광명스피돔풋살장", lat: 37.4743, lng: 126.8667 },
        { name: "김포풋살클럽", lat: 37.6174, lng: 126.7159 },
        { name: "하남풋살클럽", lat: 37.5507, lng: 127.1943 },
        // 서울, 경기 제외 전국 풋살장 목록
        // 부산
        { name: "부산 남구 풋살장", lat: 35.1264, lng: 129.0845 },
        { name: "센텀풋살파크", lat: 35.1686, lng: 129.131 },
        // 대구
        {
          name: "대구 북구 시민운동장 풋살장",
          lat: 35.8866,
          lng: 128.6123,
        },
        { name: "신암풋살파크", lat: 35.8833, lng: 128.6267 },
        // 광주
        { name: "광주 서구 풋살장", lat: 35.1532, lng: 126.8913 },
        { name: "유스퀘어풋살파크", lat: 35.1599, lng: 126.9076 },
        // 대전
        { name: "대전 유성구 풋살장", lat: 36.3504, lng: 127.3845 },
        { name: "월평풋살파크", lat: 36.3574, lng: 127.3601 },
        // 울산
        { name: "울산 남구 풋살장", lat: 35.5413, lng: 129.264 },
        { name: "문수풋살파크", lat: 35.5466, lng: 129.3077 },
        // 인천
        { name: "인천 남동구 풋살장", lat: 37.4484, lng: 126.7317 },
        { name: "송도풋살파크", lat: 37.39, lng: 126.6358 },
        // 강원
        { name: "강릉 종합경기장 풋살장", lat: 37.7556, lng: 128.8761 },
        { name: "속초풋살파크", lat: 38.2063, lng: 128.5919 },
        // 충북
        { name: "청주 풋살장", lat: 36.6424, lng: 127.4887 },
        { name: "충주 종합운동장 풋살장", lat: 36.9719, lng: 127.9314 },
        // 충남
        { name: "천안 종합운동장 풋살장", lat: 36.8152, lng: 127.1139 },
        { name: "아산 풋살파크", lat: 36.7848, lng: 127.0001 },
        // 전북
        { name: "전주 월드컵경기장 풋살장", lat: 35.8685, lng: 127.064 },
        { name: "군산 풋살파크", lat: 35.9676, lng: 126.7371 },
        // 전남
        { name: "목포 풋살파크", lat: 34.8118, lng: 126.3925 },
        { name: "순천 풋살장", lat: 34.9487, lng: 127.4885 },
        // 경북
        { name: "포항 남구 풋살장", lat: 36.019, lng: 129.3435 },
        { name: "경주 월드컵경기장 풋살장", lat: 35.8562, lng: 129.2248 },
        // 경남
        { name: "창원 마산종합운동장 풋살장", lat: 35.207, lng: 128.5837 },
        { name: "김해 풋살파크", lat: 35.2338, lng: 128.889 },
        // 제주
        { name: "제주 서귀포 풋살장", lat: 33.2539, lng: 126.5618 },
        { name: "한림풋살파크", lat: 33.41, lng: 126.3183 },
      ];
      locations.forEach((location) => {
        const markerPosition = new window.kakao.maps.LatLng(
          location.lat,
          location.lng
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: location.name,
        });
        marker.setMap(map);
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${location.name}</div>`,
        });
        window.kakao.maps.event.addListener(marker, "mouseover", () =>
          infowindow.open(map, marker)
        );
        window.kakao.maps.event.addListener(marker, "mouseout", () =>
          infowindow.close()
        );
      });
      const moveToCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const currentPos = new window.kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              );
              const currentMarker = new window.kakao.maps.Marker({
                position: currentPos,
                title: "현재 위치",
                map: map,
                zIndex: 10,
              });
              map.setCenter(currentPos);
            },
            (error) => {
              console.error("Geolocation Error: ", error);
              alert("위치를 받아올 수 없습니다. 잠시만 기다려주세요.");
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          alert("Geolocation을 지원하지 않는 브라우저입니다.");
        }
      };
      const locateButton = document.getElementById("locate-button");
      if (locateButton) {
        locateButton.addEventListener("click", moveToCurrentLocation);
      }
    });
  }, [mapLoaded]);
  return (
    <div className="map-container">
      <div id="map"></div>
      <div className="map-control">
        <button id="locate-button">위치</button>
      </div>
    </div>
  );
};
export default KakaoMap;