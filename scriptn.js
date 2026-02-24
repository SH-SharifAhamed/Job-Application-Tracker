let filter = "ALL";
let jobs = [
  {
    id: 1,
    company: "REVE Systems",
    role: "React Native Developer",
    location: "Remote",
    salary: "$130k - $175k",
    status: "NOT APPLIED",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    id: 2,
    company: "Enosis Solutions",
    role: "Web Designer",
    location: "Remote • Full-time",
    salary: "$80k - $120k",
    status: "NOT APPLIED",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
  },
  {
    id: 3,
    company: "DataViz Solutions",
    role: "Data Specialist",
    location: "Full-time",
    salary: "$125k - $165k",
    status: "NOT APPLIED",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    role: "Backend Developer",
    location: "Remote",
    salary: "$140k - $190k",
    status: "NOT APPLIED",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
  },
  {
    id: 5,
    company: "Innovation Labs",
    role: "UI/UX Engineer",
    location: "Remote • Full-time",
    salary: "$100k - $150k",
    status: "NOT APPLIED",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
  },
  {
    id: 6,
    company: "MegaCorp Solutions",
    role: "JS Developer",
    location: "Full-time",
    salary: "$130k - $170k",
    status: "NOT APPLIED",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
  },
  {
    id: 7,
    company: "StartupXYZ",
    role: "Full Stack Developer",
    location: "Remote",
    salary: "$120k - $160k",
    status: "NOT APPLIED",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
  },
  {
    id: 8,
    company: "TechCorp Industries",
    role: "Senior Frontend Developer",
    location: "Full-time",
    salary: "$130k - $175k",
    status: "NOT APPLIED",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
  },
];

const container = document.getElementById("jobContainer");

function renderJobs() {
  container.innerHTML = "";
  let filteredJobs = jobs;

  if (filter !== "ALL") {
    filteredJobs = jobs.filter((j) => j.status === filter);
  }

  if (filteredJobs.length === 0) {
    container.innerHTML = `
      <div class="bg-white p-16 rounded-lg shadow text-center">
        <div class="text-blue-400 text-6xl mb-6">
          <i class="fa-regular fa-file-lines"></i>
        </div>
        <h3 class="text-xl font-semibold text-[#1e3a8a] mb-2">
          No jobs available
        </h3>
        <p class="text-gray-500">
          Check back soon for new job opportunities
        </p>
      </div>
    `;
    updateCounts();
    return;
  }

  filteredJobs.forEach((job) => {
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded-lg shadow";

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold text-[#1e3a8a]">${job.company}</h3>
          <p class="text-gray-500">${job.role}</p>
        </div>

        <button onclick="deleteJob(${job.id})"
          class="w-8 h-8 flex items-center justify-center rounded-full border text-gray-500 hover:text-red-500">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>

      <p class="text-sm text-gray-400 mt-3">
        ${job.location} • ${job.salary}
      </p>

      <span class="inline-block mt-3 px-3 py-1 text-sm rounded
        ${
          job.status === "INTERVIEW"
            ? "bg-green-100 text-green-600"
            : job.status === "REJECTED"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
        }">
        ${job.status}
      </span>

      <p class="text-gray-600 mt-3 text-sm">
        ${job.description}
      </p>

      <div class="mt-4 space-x-3">
        <button onclick="updateStatus(${job.id}, 'INTERVIEW')"
          class="px-4 py-2 border border-green-500 text-green-500 rounded">
          Interview
        </button>

        <button onclick="updateStatus(${job.id}, 'REJECTED')"
          class="px-4 py-2 border border-red-500 text-red-500 rounded">
          Rejected
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  updateCounts();
}

function updateStatus(id, status) {
  const job = jobs.find((j) => j.id === id);
  job.status = status;
  renderJobs();
}

function deleteJob(id) {
  jobs = jobs.filter((j) => j.id !== id);
  renderJobs();
}

function setFilter(value) {
  filter = value;

  document.getElementById("allBtn").className = "px-4 py-2 rounded";
  document.getElementById("intBtn").className = "px-4 py-2 rounded";
  document.getElementById("rejBtn").className = "px-4 py-2 rounded";

  if (value === "ALL") {
    document
      .getElementById("allBtn")
      .classList.add("bg-blue-600", "text-white");
  }
  if (value === "INTERVIEW") {
    document
      .getElementById("intBtn")
      .classList.add("bg-blue-600", "text-white");
  }
  if (value === "REJECTED") {
    document
      .getElementById("rejBtn")
      .classList.add("bg-blue-600", "text-white");
  }

  renderJobs();
}

function updateCounts() {
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText = jobs.filter(
    (j) => j.status === "INTERVIEW",
  ).length;
  document.getElementById("rejectedCount").innerText = jobs.filter(
    (j) => j.status === "REJECTED",
  ).length;
  document.getElementById("jobCount").innerText = jobs.length + " jobs";
}

renderJobs();
