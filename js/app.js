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

function toggleEvent(id) {
    const event = events.find(e => e.id === id);
    const eventElement = document.getElementById(`event-${id}`);

    if (!event || !eventElement) {
        console.error('Event element or event data not found');
        return;
    }

    if (eventElement.classList.contains('expanded')) {
        // Shrink the event details back to the truncated version
        let truncatedDesc = event.description.split(' ').slice(0, 10).join(' ') + '...';
        const eventItem = `
        <div class="event ${event.completed ? 'completed' : event.upcoming ? 'upcoming' : ''}" id="event-${event.id}">
            <h3>${event.name}</h3>
            <p>${truncatedDesc}</p>
            <label><input type="checkbox" ${event.upcoming ? 'checked' : ''} onclick="toggleUpcoming(${event.id}); event.stopPropagation();"> Upcoming</label>
            <label><input type="checkbox" ${event.completed ? 'checked' : ''} onclick="toggleCompleted(${event.id}); event.stopPropagation();"> Completed</label>
            <button class="btn" onclick="editEvent(${event.id}); event.stopPropagation();">Edit Event</button>
        </div>`;
        eventElement.innerHTML = eventItem;
        eventElement.classList.remove('expanded');
    } else {
        // Expand the event details
        const fullDetails = `
        <div class="event-details ${event.completed ? 'completed' : event.upcoming ? 'upcoming' : ''}">
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <p>Date: ${event.date}</p>
          <p>Location: ${event.location}</p>
          <p>Created On: ${event.createdAt}</p>
          <label><input type="checkbox" ${event.upcoming ? 'checked' : ''} onclick="toggleUpcoming(${event.id}); event.stopPropagation();"> Upcoming</label>
          <label><input type="checkbox" ${event.completed ? 'checked' : ''} onclick="toggleCompleted(${event.id}); event.stopPropagation();"> Completed</label>
          <button class="btn" onclick="editEvent(${event.id}); event.stopPropagation();">Edit Event</button>
        </div>`;
        eventElement.innerHTML = fullDetails;
        eventElement.classList.add('expanded');
    }
}

// This function allows the user to edit an event directly in expandible view.
function editEvent(id) {
    const event = events.find(e => e.id === id);
    const eventElement = document.getElementById(`event-${id}`);

    if (eventElement && event) {
        const editForm = `
        <div class="form" onclick="event.stopPropagation();">
          <input required type="text" id="edit-name-${id}" value="${event.name}" >
          <input required type="date" id="edit-date-${id}" value="${event.date}">
          <input required type="text" id="edit-location-${id}" value="${event.location}">
          <textarea id="edit-description-${id}">${event.description}</textarea>
          <button class="btn" onclick="saveEvent(${event.id}); event.stopPropagation();">Save</button>
        </div>`;
        eventElement.innerHTML = editForm;
    }
}
//save event after editing
function saveEvent(id) {
    const event = events.find(e => e.id === id);
    event.name = document.getElementById(`edit-name-${id}`).value;
    event.date = document.getElementById(`edit-date-${id}`).value;
    event.location = document.getElementById(`edit-location-${id}`).value;
    event.description = document.getElementById(`edit-description-${id}`).value;
    if (event.name === '' || event.date === '' || event.location === '') {
        alert('Please fill in name, date and location fields');
        return;
    }
    displayEvents(events); // Re-render the event list with updated data
}


//Add functionality to create new events by clicking the “Create Event” button:
document.getElementById('create-event').addEventListener('click', function () {
    const createButton = document.getElementById('create-event');
    if (document.querySelector('newEventForm')) {
        alert('Please finish creating the event before creating a new one');
        return;
    }
   createButton.disabled = true;
    
    const newEventForm = `
    <div class="form">
      <input type="text" id="new-name" placeholder="Event Name" required>
      <input type="date" id="new-date" required>
      <input type="text" id="new-location" placeholder="Location" required>
      <textarea id="new-description" placeholder="Description"></textarea>
      <button class="btn" onclick="addEvent()">Add Event</button>
    </div>`;
    document.getElementById('events-list').innerHTML += newEventForm;
});
//add event
function addEvent() {
    const name = document.getElementById('new-name').value;
    const date = document.getElementById('new-date').value;
    const location = document.getElementById('new-location').value;
    const description = document.getElementById('new-description').value;
    if (name === '' || date === '' || location === '') {
        alert('Please fill in name, date and location fields to create an event');
        return;
    }
    const newEvent = {
        id: Date.now(),
        name,
        date,
        location,
        description,
        createdAt: new Date().toISOString()
    };
    newEvent.upcoming = true;
    events.push(newEvent);
    displayEvents(events); // Refresh the event list
    document.getElementById('create-event').disabled = false; // Re-enable the "Create Event" button
}

//add checkboxes to mark events as upcoming or completed:
function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    events.forEach(event => {
        let truncatedDesc = event.description.split(' ').slice(0, 10).join(' ') + '...';
        const eventItem = `
      <div class="event ${event.completed ? 'completed' : event.upcoming ? 'upcoming' : ''}" 
           id="event-${event.id}" onclick="toggleEvent(${event.id});"> 
        <h3>${event.name}</h3>
        <p>${truncatedDesc}</p>
        <label><input type="checkbox" ${event.upcoming ? 'checked' : ''} onclick="toggleUpcoming(${event.id}); event.stopPropagation();"> Upcoming</label>
        <label><input type="checkbox" ${event.completed ? 'checked' : ''} onclick="toggleCompleted(${event.id}); event.stopPropagation();"> Completed</label>
         <button class="btn" onclick="editEvent(${event.id}); event.stopPropagation();">Edit Event</button>
      </div>`;
        eventsList.innerHTML += eventItem;
    });
}
//toggle upcoming and completed events
function toggleUpcoming(id) {
    const event = events.find(e => e.id === id);
    event.upcoming = true;
    event.completed = false;
    displayEvents(events);
}

function toggleCompleted(id) {
    const event = events.find(e => e.id === id);
    event.completed = true;
    event.upcoming = false;
    displayEvents(events);
}