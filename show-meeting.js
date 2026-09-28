document.addEventListener("DOMContentLoaded", () => {
    displayMeetings();
    
    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");

    if (searchInput) searchInput.addEventListener("input", displayMeetings);
    if (filterStatus) filterStatus.addEventListener("change", displayMeetings);
});

function displayMeetings() {
    const meetingsGrid = document.getElementById("meetingsGrid");
    if (!meetingsGrid) return;

    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedStatus = filterStatus ? filterStatus.value : "all";

    const meetings = JSON.parse(localStorage.getItem("meetings")) || [];

    const filteredMeetings = meetings.filter((meeting, index) => {
        const name = (meeting.name || "").toLowerCase();
        const notes = (meeting.notes || "").toLowerCase();
        const owner = (meeting.owner || "").toLowerCase();
        const actionItems = (meeting.actionItems || meeting.actionItem || "").toLowerCase();

        const matchesSearch = 
            name.includes(searchTerm) ||
            notes.includes(searchTerm) ||
            owner.includes(searchTerm) ||
            actionItems.includes(searchTerm);

        const matchesStatus = selectedStatus === "all" || meeting.status === selectedStatus;
        
        meeting.originalIndex = index;

        return matchesSearch && matchesStatus;
    });

    meetingsGrid.innerHTML = "";

    if (filteredMeetings.length === 0) {
        meetingsGrid.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; color: #64748b; font-size: 1.1rem; padding: 20px;">
                No matching meetings found.
            </p>
        `;
        return;
    }

    filteredMeetings.forEach((meeting) => {
        const card = document.createElement("article");
        card.className = "meeting-card";

        const statusClass = meeting.status || "not-started";
        const statusText = statusClass.replace("-", " ");

        card.innerHTML = `
            <span class="badge ${statusClass}">${statusText}</span>
            <h3>${escapeHTML(meeting.name || "Untitled Meeting")}</h3>
            
            <div class="meta-info">
                <p><strong>Date:</strong> ${meeting.date || "N/A"}</p>
                <p><strong>Owner:</strong> ${escapeHTML(meeting.owner || "Unassigned")}</p>
            </div>

            <div>
                <p class="section-label">Notes</p>
                <div class="notes-content">${escapeHTML(meeting.notes || "No notes provided.")}</div>
            </div>

            <div>
                <p class="section-label">Action Items</p>
                <div class="action-content">${escapeHTML(meeting.actionItems || meeting.actionItem || "None")}</div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button onclick="editMeeting(${meeting.originalIndex})" style="padding: 6px 14px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">Edit</button>
                <button onclick="deleteMeeting(${meeting.originalIndex})" style="padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
            </div>
        `;

        meetingsGrid.appendChild(card);
    });
}

function editMeeting(index) {
    localStorage.setItem("editMeetingIndex", index);
    window.location.href = "Add-Meeting.html";
}

function deleteMeeting(index) {
    if (confirm("Are you sure you want to delete this meeting note?")) {
        let meetings = JSON.parse(localStorage.getItem("meetings")) || [];
        meetings.splice(index, 1);
        localStorage.setItem("meetings", JSON.stringify(meetings));
        displayMeetings();
    }
}

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}