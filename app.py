from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = "campus.db"


# =========================================================
# DATABASE
# =========================================================

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_db()

    # ---------------- EVENTS TABLE ----------------

    conn.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            participants INTEGER DEFAULT 0
        )
    """)


    # ---------------- CLUBS TABLE ----------------

    conn.execute("""
        CREATE TABLE IF NOT EXISTS clubs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            members INTEGER DEFAULT 0
        )
    """)


    # ---------------- ANNOUNCEMENTS TABLE ----------------

    conn.execute("""
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            club TEXT NOT NULL,
            title TEXT NOT NULL,
            message TEXT NOT NULL
        )
    """)


    # =====================================================
    # SAMPLE EVENTS
    # =====================================================

    event_count = conn.execute(
        "SELECT COUNT(*) FROM events"
    ).fetchone()[0]


    if event_count == 0:

        events = [

            ("Hackathon 2026", "Technology", 342),

            ("Sports Fest", "Sports", 218),

            ("Cultural Night", "Cultural", 185),

            ("AI Workshop", "Technology", 156),

            ("Photography Contest", "Arts", 97)

        ]


        conn.executemany(
            """
            INSERT INTO events
            (name, category, participants)
            VALUES (?, ?, ?)
            """,
            events
        )


    # =====================================================
    # SAMPLE CLUBS
    # =====================================================

    club_count = conn.execute(
        "SELECT COUNT(*) FROM clubs"
    ).fetchone()[0]


    if club_count == 0:

        clubs = [

            ("Coding Club", "Technology", 156),

            ("Robotics Club", "Technology", 98),

            ("Sports Club", "Sports", 214),

            ("Music Club", "Cultural", 87),

            ("Photography Club", "Arts", 64)

        ]


        conn.executemany(
            """
            INSERT INTO clubs
            (name, category, members)
            VALUES (?, ?, ?)
            """,
            clubs
        )


    # =====================================================
    # SAMPLE ANNOUNCEMENTS
    # =====================================================

    announcement_count = conn.execute(
        "SELECT COUNT(*) FROM announcements"
    ).fetchone()[0]


    if announcement_count == 0:

        announcements = [

            (
                "Coding Club",
                "Hackathon Registration Open",
                "Registration for the Campus Hackathon 2026 is now open!"
            ),

            (
                "Sports Club",
                "Sports Fest Practice",
                "Sports Fest practice sessions begin this week."
            ),

            (
                "Photography Club",
                "Photography Walk",
                "Join us for a campus photography walk this Saturday."
            )

        ]


        conn.executemany(
            """
            INSERT INTO announcements
            (club, title, message)
            VALUES (?, ?, ?)
            """,
            announcements
        )


    conn.commit()
    conn.close()


# =========================================================
# PAGE ROUTES
# =========================================================

@app.route("/")
def dashboard():

    return render_template("index.html")


@app.route("/events")
def events_page():

    return render_template("events.html")


@app.route("/clubs")
def clubs_page():

    return render_template("clubs.html")


@app.route("/announcements")
def announcements_page():

    return render_template("announcements.html")


# =========================================================
# DASHBOARD API
# =========================================================

@app.route("/api/dashboard")
def dashboard_api():

    conn = get_db()


    # Total events

    total_events = conn.execute(
        "SELECT COUNT(*) FROM events"
    ).fetchone()[0]


    # Total clubs

    total_clubs = conn.execute(
        "SELECT COUNT(*) FROM clubs"
    ).fetchone()[0]


    # Total event participants

    total_participants = conn.execute(
        "SELECT SUM(participants) FROM events"
    ).fetchone()[0] or 0


    # Total club members

    total_members = conn.execute(
        "SELECT SUM(members) FROM clubs"
    ).fetchone()[0] or 0


    conn.close()


    return jsonify({

        "events": total_events,

        "clubs": total_clubs,

        "participants": total_participants,

        "members": total_members

    })


# =========================================================
# EVENTS API
# =========================================================

@app.route("/api/events", methods=["GET"])
def get_events():

    conn = get_db()


    events = conn.execute(
        """
        SELECT *
        FROM events
        ORDER BY participants DESC
        """
    ).fetchall()


    conn.close()


    return jsonify([
        dict(event)
        for event in events
    ])


@app.route("/api/events", methods=["POST"])
def add_event():

    data = request.json


    name = data.get("name")

    category = data.get("category")

    participants = data.get("participants", 0)


    # Validation

    if not name or not category:

        return jsonify({

            "error":
            "Name and category are required"

        }), 400


    conn = get_db()


    cursor = conn.execute(
        """
        INSERT INTO events
        (name, category, participants)
        VALUES (?, ?, ?)
        """,
        (
            name,
            category,
            participants
        )
    )


    conn.commit()


    new_id = cursor.lastrowid


    conn.close()


    return jsonify({

        "message":
        "Event added successfully",

        "id":
        new_id

    }), 201


# =========================================================
# CLUBS API
# =========================================================

@app.route("/api/clubs", methods=["GET"])
def get_clubs():

    conn = get_db()


    clubs = conn.execute(
        """
        SELECT *
        FROM clubs
        ORDER BY members DESC
        """
    ).fetchall()


    conn.close()


    return jsonify([
        dict(club)
        for club in clubs
    ])


@app.route("/api/clubs", methods=["POST"])
def add_club():

    data = request.json


    name = data.get("name")

    category = data.get("category")

    members = data.get("members", 0)


    # Validation

    if not name or not category:

        return jsonify({

            "error":
            "Name and category are required"

        }), 400


    conn = get_db()


    cursor = conn.execute(
        """
        INSERT INTO clubs
        (name, category, members)
        VALUES (?, ?, ?)
        """,
        (
            name,
            category,
            members
        )
    )


    conn.commit()


    new_id = cursor.lastrowid


    conn.close()


    return jsonify({

        "message":
        "Club added successfully",

        "id":
        new_id

    }), 201


# =========================================================
# ANNOUNCEMENTS API
# =========================================================

@app.route("/api/announcements", methods=["GET"])
def get_announcements():

    conn = get_db()


    announcements = conn.execute(
        """
        SELECT *
        FROM announcements
        ORDER BY id DESC
        """
    ).fetchall()


    conn.close()


    return jsonify([
        dict(announcement)
        for announcement in announcements
    ])


@app.route("/api/announcements", methods=["POST"])
def add_announcement():

    data = request.json


    club = data.get("club")

    title = data.get("title")

    message = data.get("message")


    # Validation

    if not club or not title or not message:

        return jsonify({

            "error":
            "Club, title and message are required"

        }), 400


    conn = get_db()


    cursor = conn.execute(
        """
        INSERT INTO announcements
        (club, title, message)
        VALUES (?, ?, ?)
        """,
        (
            club,
            title,
            message
        )
    )


    conn.commit()


    new_id = cursor.lastrowid


    conn.close()


    return jsonify({

        "message":
        "Announcement published successfully",

        "id":
        new_id

    }), 201


# =========================================================
# START APPLICATION
# =========================================================

# Initialize database when the application starts.

init_db()


if __name__ == "__main__":

    app.run(
        debug=True
    )
