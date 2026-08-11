# 📊 Campus Pulse

**Campus Pulse** is a Flask-based campus management and analytics web application designed to bring important campus information into one simple dashboard.

The application allows students or administrators to view campus statistics, manage events and clubs, and share club-related announcements.

---

## ✨ Features

### 📊 Dashboard

The dashboard provides an overview of campus activity, including:

* Total number of events
* Total event participants
* Number of active clubs
* Total club members
* Event participation visualization
* Trending events
* Quick navigation to different sections

---

### 📅 Events

The Events section allows users to:

* View all campus events
* Add new events
* Categorize events
* Record the number of participants
* Sort events based on participation
* Display event information dynamically

Example categories:

* Technology
* Sports
* Cultural
* Arts

---

### 🏫 Clubs

The Clubs section allows users to:

* View campus clubs
* Add new clubs
* Categorize clubs
* Track club membership
* Rank clubs according to membership

Example categories:

* Technology
* Sports
* Cultural
* Arts

---

### 📢 Announcements

The Announcements section allows clubs to share news with the campus community.

Clubs can publish:

* Announcement title
* Club name
* Club news/message

Announcements can then be displayed on the announcements page and highlighted on the dashboard.

---

## 🛠️ Technologies Used

### Backend

* Python
* Flask
* SQLite
* REST API

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Python Virtual Environment

### Deployment

* Gunicorn
* Railway

---

## 📁 Project Structure

```text
collab/
│
├── app.py
├── requirements.txt
├── .gitignore
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── events.html
│   ├── clubs.html
│   └── announcements.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

---

## 🔄 How the Application Works

Campus Pulse uses Flask as the backend and HTML/CSS/JavaScript as the frontend.

The basic flow is:

```text
User
  ↓
Web Page
  ↓
JavaScript
  ↓
Flask REST API
  ↓
SQLite Database
  ↓
Flask API Response
  ↓
JavaScript
  ↓
Updated Web Page
```

For example, when a user adds an event:

```text
Add Event Form
      ↓
JavaScript fetch()
      ↓
POST /api/events
      ↓
Flask
      ↓
SQLite
      ↓
Event saved
      ↓
JSON response
      ↓
Events displayed on page
```

---

# 🚀 Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/YashIsLive/collab.git
```

Move into the project:

```bash
cd collab
```

---

## 2. Create a virtual environment

Windows:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

---

## 3. Install dependencies

```powershell
pip install -r requirements.txt
```

---

## 4. Run the Flask application

```powershell
python app.py
```

The application will normally be available at:

```text
http://127.0.0.1:5000
```

---

# 🔌 API Endpoints

Campus Pulse provides REST API endpoints for interacting with the database.

## Dashboard

```text
GET /api/dashboard
```

Returns overall campus statistics.

Example response:

```json
{
    "events": 5,
    "clubs": 5,
    "participants": 998,
    "members": 619
}
```

---

## Events

Get events:

```text
GET /api/events
```

Add an event:

```text
POST /api/events
```

Example request:

```json
{
    "name": "Hackathon 2026",
    "category": "Technology",
    "participants": 200
}
```

---

## Clubs

Get clubs:

```text
GET /api/clubs
```

Add a club:

```text
POST /api/clubs
```

Example request:

```json
{
    "name": "Coding Club",
    "category": "Technology",
    "members": 100
}
```

---

## Announcements

Get announcements:

```text
GET /api/announcements
```

Add an announcement:

```text
POST /api/announcements
```

Example request:

```json
{
    "club": "Coding Club",
    "title": "New Workshop",
    "message": "Our club is hosting a Python workshop this Friday."
}
```

---

# 🌿 Git & GitHub Workflow

This project was developed collaboratively using Git and GitHub.

The repository uses:

```text
main
│
└── updates.v1
```

### `main`

The `main` branch is the primary branch of the project.

### `updates.v1`

The `updates.v1` branch was created for the latest feature updates, including the announcements functionality, shared navigation, and JavaScript improvements.

The branch is currently available in the GitHub repository.

---

# 🧑‍💻 Git Commands Used

## Check repository status

```bash
git status
```

Used to see modified, staged, and untracked files.

---

## Initialize Git

```bash
git init
```

Used when creating a Git repository locally.

---

## Connect the local project to GitHub

```bash
git remote add origin https://github.com/YashIsLive/collab.git
```

---

## Check remote repository

```bash
git remote -v
```

---

## Create a new branch

```bash
git checkout -b updates.v1
```

This creates the `updates.v1` branch and switches to it.

---

## Add changes

```bash
git add .
```

This stages all modified and new files.

---

## Check staged changes

```bash
git status
```

---

## Create a commit

```bash
git commit -m "Add announcements page and shared navigation"
```

---

## Push the new branch

```bash
git push -u origin updates.v1
```

The `-u` option connects the local branch with the remote `updates.v1` branch.

After that, future pushes can simply use:

```bash
git push
```

---

## Switch between branches

Switch to `main`:

```bash
git checkout main
```

Switch to `updates.v1`:

```bash
git checkout updates.v1
```

---

## Get the latest changes

```bash
git pull
```

---

## View branches

```bash
git branch
```

To view local and remote branches:

```bash
git branch -a
```

---

# 🤝 Collaborative Development

The project is designed to demonstrate collaborative development using Git and GitHub.

A typical workflow is:

```text
Create Feature
      ↓
Create Branch
      ↓
Make Changes
      ↓
git add .
      ↓
git commit
      ↓
git push
      ↓
GitHub
      ↓
Pull Request
      ↓
Review
      ↓
Merge into main
```

This allows multiple developers to work on different features without directly modifying the main branch.

---

# 🧪 Example Development Workflow

For a new feature:

```bash
git checkout main
git pull
git checkout -b feature-name
```

After making changes:

```bash
git status
git add .
git commit -m "Add new feature"
git push -u origin feature-name
```

Then create a Pull Request on GitHub.

---

# 🔐 Files Not Tracked by Git

The project uses `.gitignore` to prevent unnecessary or local files from being committed.

Examples include:

```text
.venv/
venv/
__pycache__/
*.pyc
campus.db
```

The SQLite database can therefore remain local during development instead of being committed to the repository.

---

# 📌 Future Improvements

Possible future features include:

* 🔐 User authentication
* 👤 Student profiles
* ❤️ Event bookmarking
* 🔎 Event and club search
* 🗓️ Calendar integration
* 🔔 Notifications
* 📱 Improved mobile interface
* 📈 More advanced analytics
* 🖼️ Club profile pages
* ✏️ Edit and delete functionality
* ☁️ Production database
* 🔒 Role-based admin access

---

# 👥 Contributors

This project was developed collaboratively using Git and GitHub.

**Repository:**
https://github.com/YashIsLive/collab

---

# 📄 License

This project is currently intended as an educational/collaborative development project.

Additional licensing can be added in the future if the project is released publicly under a specific open-source license.

---

## ⭐ Project Summary

**Campus Pulse** brings campus events, clubs, participation statistics, and club announcements together in one centralized web application.

The project demonstrates:

* Flask backend development
* REST API development
* SQLite database integration
* HTML/CSS/JavaScript frontend development
* Dynamic data loading with Fetch API
* Git branching
* GitHub collaboration
* Feature-based development
* Basic deployment preparation
