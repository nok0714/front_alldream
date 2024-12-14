const socket = new WebSocket("wss://api.ysji.xyz");
const teamContainer = document.getElementById("voted-team");
const numContainer = document.getElementById("voted-number");
const codeInput = document.getElementById("code-input");
const optionButtons = document.querySelectorAll(".option-btn");

socket.onopen = function () {
    console.log("WebSocket 연결됨.");
};

socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
  
    if (data.type === "VotingResult") {
        updateResults(data.results);
    }
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

optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const code = codeInput.value.trim();
  
      if (!code) {
        alert("Please enter your vote code.");
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
            alert("Vote recorded successfully!");
          } else {
            alert("Invalid or already used code.");
          }
        });
    });
});
  
