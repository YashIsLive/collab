```javascript
// =====================================================
// CAMPUS PULSE - SCRIPT.JS
// =====================================================


// =====================================================
// HELPER
// =====================================================

function escapeHTML(value) {
    var div = document.createElement("div");
    div.textContent = value || "";
    return div.innerHTML;
}


// =====================================================
// DASHBOARD
// =====================================================

function loadDashboard() {

    fetch("/api/dashboard")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            var eventsCount =
                document.getElementById("eventsCount");

            var participantsCount =
                document.getElementById("participantsCount");

            var clubsCount =
                document.getElementById("clubsCount");

            var membersCount =
                document.getElementById("membersCount");


            if (eventsCount) {
                eventsCount.textContent = data.events;
            }

            if (participantsCount) {
                participantsCount.textContent =
                    data.participants;
            }

            if (clubsCount) {
                clubsCount.textContent = data.clubs;
            }

            if (membersCount) {
                membersCount.textContent = data.members;
            }

        })
        .catch(function(error) {
            console.error(
                "Dashboard error:",
                error
            );
        });
}


// =====================================================
// EVENTS
// =====================================================

function loadEvents() {

    var container =
        document.getElementById("eventsList");

    if (!container) {
        return;
    }


    fetch("/api/events")
        .then(function(response) {
            return response.json();
        })
        .then(function(events) {

            container.innerHTML = "";


            if (events.length === 0) {

                var emptyMessage =
                    document.createElement("div");

                emptyMessage.className =
                    "event-item";

                var emptyContent =
                    document.createElement("div");

                var emptyTitle =
                    document.createElement("strong");

                emptyTitle.textContent =
                    "No events yet";

                var emptyText =
                    document.createElement("span");

                emptyText.textContent =
                    "Add the first campus event above.";

                emptyContent.appendChild(emptyTitle);
                emptyContent.appendChild(emptyText);

                emptyMessage.appendChild(emptyContent);

                container.appendChild(emptyMessage);

                return;
            }


            events.forEach(function(event) {

                var item =
                    document.createElement("div");

                item.className =
                    "event-item";


                var content =
                    document.createElement("div");


                var name =
                    document.createElement("strong");

                name.textContent =
                    event.name;


                var category =
                    document.createElement("span");

                category.textContent =
                    event.category;


                var participants =
                    document.createElement("strong");

                participants.textContent =
                    event.participants +
                    " participants";


                content.appendChild(name);
                content.appendChild(category);

                item.appendChild(content);
                item.appendChild(participants);

                container.appendChild(item);
            });

        })
        .catch(function(error) {

            console.error(
                "Events error:",
                error
            );

        });
}


// =====================================================
// ADD EVENT
// =====================================================

var eventForm =
    document.getElementById("eventForm");


if (eventForm) {

    eventForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            var name =
                document.getElementById("eventName")
                    .value
                    .trim();


            var category =
                document.getElementById(
                    "eventCategory"
                ).value;


            var participants =
                Number(
                    document.getElementById(
                        "eventParticipants"
                    ).value
                );


            if (!name) {

                alert(
                    "Please enter an event name."
                );

                return;
            }


            if (participants < 0) {

                alert(
                    "Participants cannot be negative."
                );

                return;
            }


            fetch("/api/events", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    category: category,

                    participants: participants

                })

            })
            .then(function(response) {

                return response.json()
                    .then(function(data) {

                        return {
                            ok: response.ok,
                            data: data
                        };

                    });

            })
            .then(function(result) {

                if (!result.ok) {

                    alert(
                        result.data.error ||
                        "Could not add event."
                    );

                    return;
                }


                alert(
                    "Event added successfully!"
                );


                eventForm.reset();


                loadEvents();
                loadTrendingEvents();
                loadDashboard();

            })
            .catch(function(error) {

                console.error(
                    "Add event error:",
                    error
                );

                alert(
                    "Something went wrong while adding the event."
                );

            });

        }
    );
}


// =====================================================
// TRENDING EVENTS
// =====================================================

function loadTrendingEvents() {

    var container =
        document.getElementById(
            "trendingEvents"
        );


    if (!container) {
        return;
    }


    fetch("/api/events")
        .then(function(response) {
            return response.json();
        })
        .then(function(events) {

            container.innerHTML = "";


            if (events.length === 0) {

                var empty =
                    document.createElement("div");

                empty.className =
                    "event-item";


                var content =
                    document.createElement("div");


                var title =
                    document.createElement("strong");

                title.textContent =
                    "No events yet";


                var text =
                    document.createElement("span");

                text.textContent =
                    "Add events to see them here.";


                content.appendChild(title);
                content.appendChild(text);

                empty.appendChild(content);

                container.appendChild(empty);

                return;
            }


            events.slice(0, 5).forEach(
                function(event) {

                    var item =
                        document.createElement("div");

                    item.className =
                        "event-item";


                    var content =
                        document.createElement("div");


                    var name =
                        document.createElement(
                            "strong"
                        );

                    name.textContent =
                        event.name;


                    var category =
                        document.createElement(
                            "span"
                        );

                    category.textContent =
                        event.category;


                    var participants =
                        document.createElement(
                            "strong"
                        );

                    participants.textContent =
                        event.participants +
                        " participants";


                    content.appendChild(name);
                    content.appendChild(category);

                    item.appendChild(content);
                    item.appendChild(participants);

                    container.appendChild(item);

                }
            );


            createChart(events);

        })
        .catch(function(error) {

            console.error(
                "Trending events error:",
                error
            );

        });
}


// =====================================================
// EVENT CHART
// =====================================================

function createChart(events) {

    var chart =
        document.getElementById(
            "eventChart"
        );


    if (!chart) {
        return;
    }


    chart.innerHTML = "";


    if (events.length === 0) {
        return;
    }


    var topEvents =
        events.slice(0, 5);


    var maxParticipants = 0;


    topEvents.forEach(function(event) {

        var number =
            Number(event.participants);


        if (number > maxParticipants) {
            maxParticipants = number;
        }

    });


    topEvents.forEach(function(event) {

        var participants =
            Number(event.participants);


        var percentage = 0;


        if (maxParticipants > 0) {

            percentage =
                (participants /
                maxParticipants) *
                100;

        }


        var row =
            document.createElement("div");

        row.className =
            "bar-row";


        var label =
            document.createElement("div");

        label.className =
            "bar-label";

        label.textContent =
            event.name;


        var barContainer =
            document.createElement("div");

        barContainer.className =
            "bar-container";


        var bar =
            document.createElement("div");

        bar.className =
            "bar";


        bar.style.width =
            percentage + "%";


        var number =
            document.createElement("strong");

        number.textContent =
            participants;


        barContainer.appendChild(bar);

        row.appendChild(label);
        row.appendChild(barContainer);
        row.appendChild(number);

        chart.appendChild(row);

    });
}


// =====================================================
// CLUBS
// =====================================================

function loadClubs() {

    var container =
        document.getElementById(
            "clubsList"
        );


    if (!container) {
        return;
    }


    fetch("/api/clubs")
        .then(function(response) {
            return response.json();
        })
        .then(function(clubs) {

            container.innerHTML = "";


            if (clubs.length === 0) {

                var empty =
                    document.createElement("div");

                empty.className =
                    "event-item";


                var content =
                    document.createElement("div");


                var title =
                    document.createElement(
                        "strong"
                    );

                title.textContent =
                    "No clubs yet";


                var text =
                    document.createElement(
                        "span"
                    );

                text.textContent =
                    "Add the first campus club above.";


                content.appendChild(title);
                content.appendChild(text);

                empty.appendChild(content);

                container.appendChild(empty);

                return;
            }


            clubs.forEach(function(club) {

                var item =
                    document.createElement("div");

                item.className =
                    "event-item";


                var content =
                    document.createElement("div");


                var name =
                    document.createElement(
                        "strong"
                    );

                name.textContent =
                    club.name;


                var category =
                    document.createElement(
                        "span"
                    );

                category.textContent =
                    club.category;


                var members =
                    document.createElement(
                        "strong"
                    );

                members.textContent =
                    club.members +
                    " members";


                content.appendChild(name);
                content.appendChild(category);

                item.appendChild(content);
                item.appendChild(members);

                container.appendChild(item);

            });

        })
        .catch(function(error) {

            console.error(
                "Clubs error:",
                error
            );

        });
}


// =====================================================
// ADD CLUB
// =====================================================

var clubForm =
    document.getElementById(
        "clubForm"
    );


if (clubForm) {

    clubForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            var name =
                document.getElementById(
                    "clubName"
                ).value.trim();


            var category =
                document.getElementById(
                    "clubCategory"
                ).value;


            var members =
                Number(
                    document.getElementById(
                        "clubMembers"
                    ).value
                );


            if (!name) {

                alert(
                    "Please enter a club name."
                );

                return;
            }


            if (members < 0) {

                alert(
                    "Members cannot be negative."
                );

                return;
            }


            fetch("/api/clubs", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    category: category,

                    members: members

                })

            })
            .then(function(response) {

                return response.json()
                    .then(function(data) {

                        return {
                            ok: response.ok,
                            data: data
                        };

                    });

            })
            .then(function(result) {

                if (!result.ok) {

                    alert(
                        result.data.error ||
                        "Could not add club."
                    );

                    return;
                }


                alert(
                    "Club added successfully!"
                );


                clubForm.reset();


                loadClubs();
                loadDashboard();

            })
            .catch(function(error) {

                console.error(
                    "Add club error:",
                    error
                );

                alert(
                    "Something went wrong while adding the club."
                );

            });

        }
    );
}


// =====================================================
// ANNOUNCEMENTS
// =====================================================

function loadAnnouncements() {

    var container =
        document.getElementById(
            "announcementsList"
        );


    if (!container) {
        return;
    }


    fetch("/api/announcements")
        .then(function(response) {
            return response.json();
        })
        .then(function(announcements) {

            container.innerHTML = "";


            if (announcements.length === 0) {

                var empty =
                    document.createElement("div");

                empty.className =
                    "event-item";


                var content =
                    document.createElement("div");


                var title =
                    document.createElement(
                        "strong"
                    );

                title.textContent =
                    "No announcements yet";


                var text =
                    document.createElement(
                        "span"
                    );

                text.textContent =
                    "Share the first piece of club news above.";


                content.appendChild(title);
                content.appendChild(text);

                empty.appendChild(content);

                container.appendChild(empty);

                return;
            }


            announcements.forEach(
                function(announcement) {

                    var item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "event-item";


                    var content =
                        document.createElement(
                            "div"
                        );


                    var title =
                        document.createElement(
                            "strong"
                        );

                    title.textContent =
                        announcement.title;


                    var club =
                        document.createElement(
                            "span"
                        );

                    club.textContent =
                        "📢 " +
                        announcement.club;


                    var message =
                        document.createElement(
                            "span"
                        );

                    message.textContent =
                        announcement.message;


                    content.appendChild(title);
                    content.appendChild(club);
                    content.appendChild(message);

                    item.appendChild(content);

                    container.appendChild(item);

                }
            );

        })
        .catch(function(error) {

            console.error(
                "Announcements error:",
                error
            );

        });
}


// =====================================================
// ADD ANNOUNCEMENT
// =====================================================

var announcementForm =
    document.getElementById(
        "announcementForm"
    );


if (announcementForm) {

    announcementForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            var club =
                document.getElementById(
                    "announcementClub"
                ).value.trim();


            var title =
                document.getElementById(
                    "announcementTitle"
                ).value.trim();


            var message =
                document.getElementById(
                    "announcementMessage"
                ).value.trim();


            if (!club) {

                alert(
                    "Please enter the club name."
                );

                return;
            }


            if (!title) {

                alert(
                    "Please enter an announcement title."
                );

                return;
            }


            if (!message) {

                alert(
                    "Please write the club news."
                );

                return;
            }


            fetch("/api/announcements", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    club: club,

                    title: title,

                    message: message

                })

            })
            .then(function(response) {

                return response.json()
                    .then(function(data) {

                        return {
                            ok: response.ok,
                            data: data
                        };

                    });

            })
            .then(function(result) {

                if (!result.ok) {

                    alert(
                        result.data.error ||
                        "Could not publish announcement."
                    );

                    return;
                }


                alert(
                    "Club news published successfully!"
                );


                announcementForm.reset();


                loadAnnouncements();
                loadDashboardAnnouncements();

            })
            .catch(function(error) {

                console.error(
                    "Announcement error:",
                    error
                );

                alert(
                    "Something went wrong while publishing the announcement."
                );

            });

        }
    );
}


// =====================================================
// DASHBOARD ANNOUNCEMENTS
// =====================================================

function loadDashboardAnnouncements() {

    var container =
        document.getElementById(
            "dashboardAnnouncements"
        );


    if (!container) {
        return;
    }


    fetch("/api/announcements")
        .then(function(response) {
            return response.json();
        })
        .then(function(announcements) {

            container.innerHTML = "";


            if (announcements.length === 0) {

                var empty =
                    document.createElement("div");

                empty.className =
                    "event-item";


                var content =
                    document.createElement("div");


                var title =
                    document.createElement(
                        "strong"
                    );

                title.textContent =
                    "No club news yet";


                var text =
                    document.createElement(
                        "span"
                    );

                text.textContent =
                    "Announcements will appear here.";


                content.appendChild(title);
                content.appendChild(text);

                empty.appendChild(content);

                container.appendChild(empty);

                return;
            }


            announcements
                .slice(0, 3)
                .forEach(function(announcement) {

                    var item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "event-item";


                    var content =
                        document.createElement(
                            "div"
                        );


                    var title =
                        document.createElement(
                            "strong"
                        );

                    title.textContent =
                        announcement.title;


                    var club =
                        document.createElement(
                            "span"
                        );

                    club.textContent =
                        "📢 " +
                        announcement.club;


                    var message =
                        document.createElement(
                            "span"
                        );

                    message.textContent =
                        announcement.message;


                    content.appendChild(title);
                    content.appendChild(club);
                    content.appendChild(message);

                    item.appendChild(content);

                    container.appendChild(item);

                });

        })
        .catch(function(error) {

            console.error(
                "Dashboard announcement error:",
                error
            );

        });
}


// =====================================================
// RUN FUNCTIONS
// =====================================================

loadDashboard();

loadEvents();

loadClubs();

loadAnnouncements();

loadDashboardAnnouncements();

loadTrendingEvents();
```
