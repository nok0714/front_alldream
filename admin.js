const countInput = document.getElementById("count-input");
const generateBtn = document.getElementById("generate-btn");
const changeBtn = document.getElementById("change-btn");
const codesList = document.getElementById("codes-list");
const deleteBtn = document.getElementById("delete-btn");

// 코드 목록 업데이트
function updateCodeList() {
  fetch("https://api.ysji.xyz/api/codes")
    .then((response) => response.json())
    .then((data) => {
      codesList.innerHTML = "";
      data.codes.forEach((code) => {
        const li = document.createElement("li");
        li.className = "flex items-center space-x-2";
        li.innerHTML = `
          <input type="checkbox" value="${code}" class="form-checkbox">
          <span>${code}</span>
        `;
        codesList.appendChild(li);
      });
    });
}

// 코드 생성 요청
generateBtn.addEventListener("click", () => {
  const count = parseInt(countInput.value, 10);
  if (isNaN(count) || count <= 0) {
    alert("Please enter a valid number of codes to generate.");
    return;
  }

  fetch("hhttps://api.ysji.xyz/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  })
    .then((response) => response.json())
    .then(() => {
      updateCodeList();
      countInput.value = "";
    });
});

changeBtn.addEventListener("click", () => {
    const selectedTeam = document.querySelector('input[name="team"]:checked')?.value;
    console.log(selectedTeam)
    fetch("https://api.ysji.xyz/api/change", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedTeam }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Success");
      });
});

// 선택된 코드 삭제 요청
deleteBtn.addEventListener("click", () => {
  const selectedCodes = Array.from(
    document.querySelectorAll("#codes-list input:checked")
  ).map((checkbox) => checkbox.value);

  if (selectedCodes.length === 0) {
    alert("Please select at least one code to delete.");
    return;
  }

  fetch("https://api.ysji.xyz/api/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codesToDelete: selectedCodes }),
  })
    .then((response) => response.json())
    .then(() => updateCodeList());
});


function updateTeamList() {
    fetch("https://api.ysji.xyz/api/teams")
      .then((response) => response.json())
      .then((data) => {
        if (data.teams && Array.isArray(data.teams)) {
            const container = document.getElementById('teamsContainer');
            container.innerHTML = ''; // 기존 내용 초기화
        
            data.teams.forEach((team, index) => {
                const label = document.createElement('label'); // 라벨 생성
                const radio = document.createElement('input'); // 라디오 버튼 생성
                
                radio.type = 'radio';  // 타입 설정
                radio.name = 'team';   // 같은 그룹으로 묶기 위해 name 설정
                radio.value = team;    // 선택된 값
                radio.id = `team-${index}`; // 고유 ID
                
                label.htmlFor = radio.id;  // 라벨과 라디오 버튼 연결
                label.textContent = team; // 라벨에 팀 이름 표시
                
                container.appendChild(radio); // 라디오 버튼 추가
                container.appendChild(label); // 라벨 추가
                container.appendChild(document.createElement('br')); // 줄바꿈
            });
        }
      });
}
  

updateTeamList();
updateCodeList();