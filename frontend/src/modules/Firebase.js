import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdIC0kho0PQUIrS6QHAEIJ4bYuJELJlj0",
    authDomain: "chelin-e8ee3.firebaseapp.com",
    projectId: "chelin-e8ee3",
    storageBucket: "chelin-e8ee3.appspot.com",
    messagingSenderId: "45691459916",
    appId: "1:45691459916:web:bb4a483ab566aacfa157e9",
    measurementId: "G-HJWTE6REBM"
}

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
