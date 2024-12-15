const socket = new WebSocket("wss://api.ysji.xyz");
const teamContainer = document.getElementById("voted-team");
const numContainer = document.getElementById("voted-number");
const codeInput = document.getElementById("code-input");
const optionButton = document.querySelector(".option-btn");

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
    optionButton.innerHTML = "서버와의 연결이 끊어졌습니다"
    optionButton.disabled = true
};


function updateResults(results) {
    // 결과를 표시할 HTML 초기화
    if (results[0] == "대기 중"){
        teamContainer.innerHTML = "현재 투표 대기 중입니다"
        numContainer.innerHTML = "공연을 기다리는 중 ^_^"
        optionButton.innerHTML = "투표 대기중"
        optionButton.disabled = true
    }
    else {
        teamContainer.innerHTML = "현재 투표중 : " + results[0];
        numContainer.innerHTML = results[1] + "표";
        optionButton.disabled = false
        optionButton.innerHTML = "투표하기"
    }
}

optionButton.addEventListener("click", () => {
    const code = codeInput.value.trim();
  
    if (!code) {
        alert("투표 코드를 먼저 입력해주세요");
        return;
    }
  
    fetch("https://api.ysji.xyz/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Vote successful") {
                alert("투표 완료되었습니다");
            } else {
                alert("잘못되었거나 사용된 코드입니다");
            }
        });
});

  
