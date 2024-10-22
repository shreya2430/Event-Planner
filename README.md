# Event Planner Application

## Project Description

The **Event Planner Application** allows users to create, view, and manage events with various details such as:

- Event Name
- Date of the Event
- Description
- Location
- Event Creation Date (automatically generated)

The application provides a simple interface for users to mark events as "Upcoming" or "Completed", and supports event editing, creation, and management. Events are dynamically fetched from a local `events.json` file and displayed in a visually engaging way.

## Features

### 1. View All Events

- Events are displayed with truncated descriptions (maximum 10 words) in a list format.
- The status of each event is visually represented as either "Upcoming" (yellow) or "Completed" (green).

### 2. Expand and View Full Event Details

- Users can click on any event to expand and view the full details, including the description, event date, location, and creation date.
- Users can click again on any event to make it shrink and show truncated descriptions

### 3. Mark Events as Upcoming or Completed

- Events can be marked as "Upcoming" or "Completed" using checkboxes.
- The visual appearance of the event card changes based on its status.

### 4. Edit Events

- Users can click the "Edit Event" button to modify the event name, date, description, and location.
- Changes can be saved, and the list is updated accordingly.

### 5. Create New Events

- The "New Event" button allows users to add a new event by entering its name, date, description, and location.
- A new event is marked as "Upcoming" by default and is added to the list with the current date and time as its creation date.

### 6. Responsive and Simple Design

- The layout is responsive and adapts to various screen sizes.
- Events are displayed in a clean grid layout.

## Technical Details

### 1. JavaScript Functionality

- The application uses `XMLHttpRequest` to load events from a `JSON` file and display them on the page.
- Events are dynamically rendered in the DOM using JavaScript.
- The code allows toggling between truncated and expanded views for each event, editing events, marking their status, and creating new events.

### 2. CSS/SCSS Styles

- The app is styled using SCSS, and the compiled CSS (`main.css`) is included in the `dist` folder.
- The `event-list` and form elements are styled for a clean, user-friendly experience.
- Visual indicators for "Upcoming" and "Completed" states are managed through color-coded styles.

### 3. Git and Version Control

- A `.gitignore` file is included, which excludes unnecessary files such as `node_modules`, logs, and the `dist` directory.
- Proper version control is followed with multiple commits.

## Project Structure

```bash
Event-Planner/
│
├── dist/
│   └── main.css          # Compiled CSS from SCSS
├── data/
│   └── events.json       # JSON file containing event data
├── js/
│   └── app.js            # Main JavaScript file for dynamic functionality
├── scss/
│   └── _button.scss   
    └── _create-event_.scss 
    └── _event.scss   
    └── _form.scss   
    └── _header.scss   
    └── _mixins.scss   
    └── _status-legend.scss   
    └── main.scss           # SCSS file for styles
├── index.html            # Main HTML file
├── README.md             # Project documentation
└── .gitignore            # Git ignore file for ignoring unnecessary files
```

## Instructions to Run the Project

- First, clone the repository to your local machine: ```git clone https://github.com/info-6150-fall-2024/assignment-6-shreyawanisha.git```
- Navigate into the Project Directory ```cd event-planner-app```
- To view the application, open the `index.html` file in your preferred web browser: `open index.html`
- Manage Events
  - The application will load all events from the events.json file automatically.
  - You can now create, edit, or mark events as “Upcoming” or “Completed”.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/6QNISKGY)
