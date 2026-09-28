document.addEventListener("DOMContentLoaded", () => {
    const editIndex = localStorage.getItem("editMeetingIndex");
    const submitBtn = document.querySelector("form button[type='submit']");
    const pageTitle = document.querySelector("h1");
    const form = document.getElementById("addMeetingForm") || document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const currentEditIndex = localStorage.getItem("editMeetingIndex");
            let meetings = JSON.parse(localStorage.getItem("meetings")) || [];

            const meetingData = {
                name: document.getElementById("meeting-name").value.trim(),
                date: document.getElementById("meeting-date").value,
                owner: document.getElementById("meeting-owner").value.trim(),
                notes: document.getElementById("meeting-notes").value.trim(),
                actionItems: document.getElementById("Actionitems").value.trim(),
                status: document.getElementById("status").value
            };

            if (currentEditIndex !== null) {
                meetings[currentEditIndex] = meetingData;
                localStorage.removeItem("editMeetingIndex");
                alert("Meeting updated successfully!");
            } else {
                meetings.push(meetingData);
                alert("Meeting added successfully!");
            }

            localStorage.setItem("meetings", JSON.stringify(meetings));
            window.location.href = "show-meetings.html";
        });
    }
    if (editIndex !== null) {
        const meetings = JSON.parse(localStorage.getItem("meetings")) || [];
        const meetingToEdit = meetings[editIndex];

        if (meetingToEdit) {
            document.getElementById("meeting-name").value = meetingToEdit.name || "";
            document.getElementById("meeting-date").value = meetingToEdit.date || "";
            document.getElementById("meeting-owner").value = meetingToEdit.owner || "";
            document.getElementById("meeting-notes").value = meetingToEdit.notes || "";
            document.getElementById("Actionitems").value = meetingToEdit.actionItems || meetingToEdit.actionItem || "";
            document.getElementById("status").value = meetingToEdit.status || "not-started";

            if (pageTitle) pageTitle.textContent = "Edit Meeting";
            if (submitBtn) submitBtn.textContent = "Update Meeting";
        }
    }
    
});