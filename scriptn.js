let currentTab = "all";


// Available job button toggoling variable
const tabActive = ["bg-blue-600", "text-white", "border-navy"];
const tabInactive = ["bg-gray-300", "text-slate-700", "border-navy"];

// interview, reject button variable
const allContainer = document.getElementById("jobs-container");
const interviewContainer = document.getElementById("interview-container");
const rejectContainer = document.getElementById("reject-container");

// Empty statas
const emptyStatas = document.getElementById("empty-state");


// Available job button toggoling function
function switchTab(tab) {
     const tabs = ["all", "interview", "rejected"];

     currentTab = tab;

     for (const t of tabs) {
          const tabName = document.getElementById("tab-" + t);

          if (t === tab) {
               tabName.classList.remove(...tabInactive);
               tabName.classList.add(...tabActive);
          }

          else {
               tabName.classList.remove(...tabActive);
               tabName.classList.add(...tabInactive);
          }
     }


     const pages = [allContainer, interviewContainer, rejectContainer];


     for (const section of pages) {
          section.classList.add("hidden");

     }

     emptyStatas.classList.add("hidden");

     currentTab = tab;

     if (currentTab === "all") {
          allContainer.classList.remove("hidden");
          if (allContainer.children.length < 1) {
               emptyStatas.classList.remove("hidden");
          }
          interviewContainer.classList.add("hidden");
     }
     else if (currentTab === "interview") {
          interviewContainer.classList.remove("hidden");
          if (interviewContainer.children.length < 1) {
               emptyStatas.classList.remove("hidden");
          }
          allContainer.classList.add("hidden");
          rejectContainer.classList.add("hidden");
     }
     else if (currentTab === "rejected") {
          rejectContainer.classList.remove("hidden");
          if (rejectContainer.children.length < 1) {
               emptyStatas.classList.remove("hidden");
          }
          allContainer.classList.add("hidden");
          interviewContainer.classList.add("hidden");
     }

     updateStats();

}


// update stats
const totalStat = document.getElementById("stat-total");
const interviewStat = document.getElementById("stat-interview");
const rejectStat = document.getElementById("stat-reject");

const availableStat = document.getElementById("available");

totalStat.innerHTML = allContainer.children.length;


switchTab(currentTab);


// Job status update

document.getElementById("jobs-container").addEventListener("click", function (event) {

     const clickedElement = event.target;
     const card = clickedElement.closest(".card");
     const paent = card.parentNode;
     const status = card.querySelector(".status");

     if (clickedElement.classList.contains("interview")) {
          status.innerText = "INTERVIEW";
          interviewContainer.appendChild(card);
     }
     if (clickedElement.classList.contains("rejected")) {
          status.innerText = "REJECTED";
          rejectContainer.appendChild(card);
     }
     if (clickedElement.classList.contains("delete")) {
          parent.removeChild(card);
     }
});

// update stats function

function updateStats() {
     const counts = {
          all: allContainer.children.length,
          interview: interviewContainer.children.length,
          rejected: rejectContainer.children.length
     }

     totalStat.innerText = counts.all;
     interviewStat.innerText = counts.interview;
     rejectStat.innerText = counts.rejected;

     availableStat.innerText = counts[currentTab] + " jobs";

     if (counts[currentTab] < 1) {
          emptyStatas.classList.remove("hidden");
     }
     else {
          emptyStatas.classList.add("hidden");
     }
}



updateStats();

document.addEventListener("click", function (event) {

     const card = event.target.closest(".card");
     if (!card) return;

     if (event.target.closest(".interview")) {
          interviewContainer.appendChild(card);
          updateCardStatus(card, "INTERVIEW", "bg-[#D1FAE5]");
          updateStats();
     }

     if (event.target.closest(".rejected")) {
          rejectContainer.appendChild(card);
          updateCardStatus(card, "REJECTED", "bg-[#fee2e2]");
          updateStats();
     }

     if (event.target.closest(".delete")) {
          card.remove();
          updateStats();
     }

});

function updateCardStatus(card, statusText, bgColor) {
     const statusElement = card.querySelector(".ApplyStatus");
     const interviewBtn = card.querySelector(".interview");
     const rejectedBtn = card.querySelector(".rejected");


     statusElement.textContent = statusText;
     statusElement.className =
          "ApplyStatus text-[#002C5C] font-medium inline-block px-5 py-3 mb-[8px] rounded-[4px] " + bgColor;


     if (statusText === "INTERVIEW") {
          interviewBtn.classList.add("hidden");
          rejectedBtn.classList.remove("hidden");
     }
     if (statusText === "REJECTED") {
          rejectedBtn.classList.add("hidden");
          interviewBtn.classList.remove("hidden");
     }
     else {
          interviewBtn.classList.d("hidden");
          rejectedBtn.classList.remove("hidden");
     }
}

