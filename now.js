const socket = new WebSocket("wss://api.ysji.xyz");
const teamContainer = document.getElementById("voted-team");
const numContainer = document.getElementById("voted-number");

socket.onopen = function () {
    console.log("WebSocket 연결됨.");
};

socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
  
    if (data.type === "VotingResult") {
        updateResults(data.results);
    }
};

socket.onclose = (event) => {
    console.log("연결 끊어짐");
    teamContainer.innerHTML = "서버와의 연결이 끊어졌습니다"
    numContainer.innerHTML = "새로고침 해주세요!"
};


function updateResults(results) {
    // 결과를 표시할 HTML 초기화
    if (results[0] == "대기 중"){
        teamContainer.innerHTML = "현재 투표 대기 중입니다"
        numContainer.innerHTML = "공연을 기다리는 중 ^_^"
    }
    else {
        teamContainer.innerHTML = "현재 투표중 : " + results[0];
        numContainer.innerHTML = results[1] + "표";
    }
}
