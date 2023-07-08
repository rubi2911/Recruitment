const candidates = [
    {
      id: 1,
      name: "Rubi Singh",
      location: "New York",
      jobRole: "Software Engineer",
    },
    {
      id: 2,
      name: "Alok Kumar Mishra",
      location: "San Francisco",
      jobRole: "UX Designer",
    },
    {
      id: 3,
      name: "Ashish Patel",
      location: "San Francisco",
      jobRole: "Backened Developer",
    },
    {
      id: 4,
      name: "Ankita Yadav",
      location: "San Francisco",
      jobRole: "Full Stack Developer",
    },
    {
      id: 5,
      name: "Arun",
      location: "San Francisco",
      jobRole: "Web Developer",
    },
    {
      id: 6,
      name: "Priyanshi Gupta",
      location: "San Francisco",
      jobRole: "Data Scientist",
    },
    {
      id: 7,
      name: "Priya",
      location: "San Francisco",
      jobRole: "Frontened Developer",
    },
    {
      id: 8,
      name: "Ayush Singh",
      location: "San Francisco",
      jobRole: "UX Designer",
    },
    {
      id: 9,
      name: "Janvi Yadav",
      location: "San Francisco",
      jobRole: "Backened Developer",
    },
    // Add more candidates as needed
  ];
  
  let recentSearches = [];
let showAllRecent = false;

function displayCandidates(candidateList) {
  const candidatesList = document.getElementById("candidates");
  candidatesList.innerHTML = "";

  if (candidateList.length === 0) {
    candidatesList.innerHTML = "<li>No candidates found</li>";
  } else {
    candidateList.forEach((candidate) => {
      const candidateItem = document.createElement("li");
      candidateItem.textContent = `${candidate.name} - ${candidate.location} - ${candidate.jobRole}`;
      candidatesList.appendChild(candidateItem);
    });
  }
}

function displayRecentSearches() {
  const recentCandidatesList = document.getElementById("recent-candidates");
  recentCandidatesList.innerHTML = "";

  const visibleRecentSearches = showAllRecent
    ? recentSearches
    : recentSearches.slice(0, 5);

  if (visibleRecentSearches.length === 0) {
    const noRecentSearchItem = document.createElement("li");
    noRecentSearchItem.textContent = "No recent searches";
    recentCandidatesList.appendChild(noRecentSearchItem);
  } else {
    visibleRecentSearches.forEach((recentCandidate) => {
      const candidateItem = document.createElement("li");
      candidateItem.textContent = `${recentCandidate.name} - ${recentCandidate.location} - ${recentCandidate.jobRole}`;
      recentCandidatesList.appendChild(candidateItem);
    });

    if (recentSearches.length > 5) {
      const showMoreLink = document.createElement("a");
      showMoreLink.textContent = showAllRecent ? "See Less" : "See More";
      showMoreLink.href = "#";
      showMoreLink.addEventListener("click", toggleRecentSearches);
      recentCandidatesList.appendChild(showMoreLink);
    }
  }
}

function toggleRecentSearches(event) {
  event.preventDefault();
  showAllRecent = !showAllRecent;
  displayRecentSearches();
}

function searchCandidates() {
  const locationInput = document.getElementById("location-input");
  const jobRoleSelect = document.getElementById("job-role-select");

  const location = locationInput.value.toLowerCase();
  const jobRole = jobRoleSelect.value.toLowerCase();

  if (location === "" && jobRole === "") {
    displayCandidates(candidates);
    return;
  }

  const matchingCandidates = candidates.filter((candidate) => {
    const candidateLocation = candidate.location.toLowerCase();
    const candidateJobRole = candidate.jobRole.toLowerCase();
    return (
      candidateLocation.includes(location) &&
      (jobRole === "" || candidateJobRole === jobRole)
    );
  });

  displayCandidates(matchingCandidates);

  if (matchingCandidates.length > 0) {
    matchingCandidates.forEach((candidate) => {
      const existingRecentSearch = recentSearches.find(
        (recentCandidate) => recentCandidate.name === candidate.name
      );
      if (!existingRecentSearch) {
        recentSearches.unshift({
          id: candidate.id,
          name: candidate.name,
          location: candidate.location,
          jobRole: candidate.jobRole,
        });
      }
    });
  }

  displayRecentSearches();
}

function handleInputChange() {
  const locationInput = document.getElementById("location-input");
  const jobRoleSelect = document.getElementById("job-role-select");
  const searchButton = document.getElementById("search-button");

  const location = locationInput.value.trim();
  const jobRole = jobRoleSelect.value.trim();

  if (location !== "" || jobRole !== "") {
    searchButton.disabled = false;
  } else {
    searchButton.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("location-input");
  const jobRoleSelect = document.getElementById("job-role-select");
  const searchButton = document.getElementById("search-button");

  locationInput.addEventListener("input", handleInputChange);
  jobRoleSelect.addEventListener("change", handleInputChange);

  displayCandidates(candidates);
  displayRecentSearches();

  searchButton.addEventListener("click", () => {
    if (!searchButton.disabled) {
      searchCandidates();
    }
  });
});