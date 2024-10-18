// this function makes an asynchronous HTTP request to fetch data from the events.json file, 
// parses the data into a usable format(JavaScript objects), 
// and calls the displayEvents function to show the events on the webpage.

let events = []; 
window.onload = function () {
    const request = new XMLHttpRequest();
    request.open('GET', 'data/events.json', true);
    request.onload = function () {
        if (this.status === 200) {
            events = JSON.parse(this.responseText);
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
    const eventElement = document.getElementById(`event-${id}`);

    if (eventElement && event) { // Check if both exist
        const fullDetails = `
        <div class="event-details">
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <p>Date: ${event.date}</p>
          <p>Location: ${event.location}</p>
          <p>Created On: ${event.createdAt}</p>
          <button onclick="editEvent(${event.id}); event.stopPropagation();">Edit Event</button>
        </div>`;
        eventElement.innerHTML = fullDetails;
    } else {
        console.error('Event element or event data not found');
    }
}

// This function allows the user to edit an event directly in expandible view.
function editEvent(id) {
    const event = events.find(e => e.id === id);
    const eventElement = document.getElementById(`event-${id}`);

    if (eventElement && event) {
        const editForm = `
        <div class="edit-form" onclick="event.stopPropagation();">
          <input type="text" id="edit-name-${id}" value="${event.name}">
          <input type="date" id="edit-date-${id}" value="${event.date}">
          <input type="text" id="edit-location-${id}" value="${event.location}">
          <textarea id="edit-description-${id}">${event.description}</textarea>
          <button onclick="saveEvent(${event.id}); event.stopPropagation();">Save</button>
        </div>`;
        eventElement.innerHTML = editForm;
    }
}

function saveEvent(id) {
    const event = events.find(e => e.id === id);
    event.name = document.getElementById(`edit-name-${id}`).value;
    event.date = document.getElementById(`edit-date-${id}`).value;
    event.location = document.getElementById(`edit-location-${id}`).value;
    event.description = document.getElementById(`edit-description-${id}`).value;

    displayEvents(events); // Re-render the event list with updated data
}


//Add functionality to create new events by clicking the “Create Event” button:
document.getElementById('create-event').addEventListener('click', function () {
    const newEventForm = `
    <div class="new-event-form">
      <input type="text" id="new-name" placeholder="Event Name">
      <input type="date" id="new-date">
      <input type="text" id="new-location" placeholder="Location">
      <textarea id="new-description" placeholder="Description"></textarea>
      <button onclick="addEvent()">Add Event</button>
    </div>`;
    document.getElementById('events-list').innerHTML += newEventForm;
});

function addEvent() {
    const name = document.getElementById('new-name').value;
    const date = document.getElementById('new-date').value;
    const location = document.getElementById('new-location').value;
    const description = document.getElementById('new-description').value;
    const newEvent = {
        id: Date.now(),
        name,
        date,
        location,
        description,
        createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    displayEvents(events); // Refresh the event list
}

//add checkboxes to mark events as upcoming or completed:
function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    events.forEach(event => {
        let truncatedDesc = event.description.split(' ').slice(0, 10).join(' ') + '...';
        const eventItem = `
      <div class="event ${event.completed ? 'completed' : event.upcoming ? 'upcoming' : ''}" 
           id="event-${event.id}" onclick="expandEvent(${event.id})"> 
        <h3>${event.name}</h3>
        <p>${truncatedDesc}</p>
        <label><input type="checkbox" ${event.upcoming ? 'checked' : ''} onclick="toggleUpcoming(${event.id}); event.stopPropagation();"> Upcoming</label>
        <label><input type="checkbox" ${event.completed ? 'checked' : ''} onclick="toggleCompleted(${event.id}); event.stopPropagation();"> Completed</label>
         <button onclick="editEvent(${event.id}); event.stopPropagation();">Edit Event</button>
      </div>`;
        eventsList.innerHTML += eventItem;
    });
}

function toggleUpcoming(id) {
    const event = events.find(e => e.id === id);
    event.upcoming = true;
    event.completed = false; 
    // event.upcoming = !event.upcoming;
    displayEvents(events);
}

function toggleCompleted(id) {
    const event = events.find(e => e.id === id);
    event.completed = true;
    event.upcoming = false;
    displayEvents(events);
}