// this function makes an asynchronous HTTP request to fetch data from the events.json file, 
// parses the data into a usable format(JavaScript objects), 
// and calls the displayEvents function to show the events on the webpage.
window.onload = function () {
    const request = new XMLHttpRequest();
    request.open('GET', 'events.json', true);
    request.onload = function () {
        if (this.status === 200) {
            const events = JSON.parse(this.responseText);
            displayEvents(events);
        }
    };
    request.send();
};

// This dynamically adds the events 
// to the page and truncates the description:

function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    events.forEach(event => {
        let truncatedDesc = event.description.split(' ').slice(0, 10).join(' ') + '...';
        const eventItem = `
      <div class="event" id="event-${event.id}">
        <h3>${event.name}</h3>
        <p>${truncatedDesc}</p>
        <button onclick="expandEvent(${event.id})">View Details</button>
      </div>`;
        eventsList.innerHTML += eventItem;
    });
}

// This function expands the event details when the user clicks the View Details button.
function expandEvent(id) {
    const event = events.find(e => e.id === id);
    const fullDetails = `
    <div class="event-details">
      <h3>${event.name}</h3>
      <p>${event.description}</p>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
      <p>Created On: ${event.createdAt}</p>
      <button onclick="editEvent(${event.id})">Edit Event</button>
    </div>`;
    document.getElementById(`event-${id}`).innerHTML = fullDetails;
}

// This function allows the user to edit an event directly in expandible view.
function editEvent(id) {
    const event = events.find(e => e.id === id);
    const editForm = `
    <div class="edit-form">
      <input type="text" id="edit-name" value="${event.name}">
      <input type="date" id="edit-date" value="${event.date}">
      <input type="text" id="edit-location" value="${event.location}">
      <textarea id="edit-description">${event.description}</textarea>
      <button onclick="saveEvent(${event.id})">Save</button>
    </div>`;
    document.getElementById(`event-${id}`).innerHTML = editForm;
}