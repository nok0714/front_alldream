const resultsContainer = document.getElementById("result-list");
const updateBtn = document.getElementById("update-btn");

function updateResults(results) {
    // 결과를 표시할 HTML 초기화
    resultsContainer.innerHTML = "";
  
    if (results && results.length > 0) {
      // 투표 수를 기준으로 내림차순 정렬
      results.sort((a, b) => b.votes - a.votes);
  
      // 정렬된 결과 표시
      results.forEach((result, index) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
  
        resultItem.innerHTML = `
          <h2 class="text-xl font-semibold">${index + 1}. ${result.name}</h2>
          <p class="text-lg">투표 수: ${result.votes}</p>
        `;
  
        resultsContainer.appendChild(resultItem);
      });
    } else {
      resultsContainer.innerHTML = "<p>투표 결과가 없습니다.</p>";
    }
}

axios.get('https://api.ysji.xyz/api/ranking').then((Response)=>{
    console.log(Response.data);
    updateResults(Response.data.result)
}).catch((Error)=>{
    console.log(Error);
})

updateBtn.addEventListener("click", () => {
    axios.get('https://api.ysji.xyz/api/ranking').then((Response)=>{
        console.log(Response.data);
        updateResults(Response.data.result)
    }).catch((Error)=>{
        console.log(Error);
    }) 
});