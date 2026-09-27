document.getElementById("addMeetingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const newMeeting = {
        name: document.getElementById("meeting-name").value,
        date: document.getElementById("meeting-date").value,
        owner: document.getElementById("meeting-owner").value,
        notes: document.getElementById("meeting-notes").value,
        actionItems: document.getElementById("Actionitems").value,
        status: document.getElementById("status").value
    };
    const meetings = JSON.parse(localStorage.getItem("meetings")) || [];
    meetings.push(newMeeting);
    localStorage.setItem("meetings", JSON.stringify(meetings));
    alert("Meeting added successfully!");
    window.location.href = "show-meetings.html";
});