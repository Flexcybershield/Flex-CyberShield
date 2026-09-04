/* =========================================
   CYBERSHIELD - SCRIPT.JS
   PART 1: ACCOUNT SYSTEM
========================================= */

let accounts = [];
let currentUser = null;

const ACCOUNT_KEY = "cybershieldAccounts";
const CURRENT_USER_KEY = "cybershieldCurrentUser";


function createDefaultPlayerData() {
    return {
        xp: 0,
        level: 1,
        totalScore: 0,
        missionsCompleted: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        streak: 0,
        bestStreak: 0,
        badges: [],
        dailyCompleted: 0,
        lastDailyDate: "",

        categoryStats: {
            "Phishing": 0,
            "SMS Scam": 0,
            "Password Security": 0,
            "Social Engineering": 0,
            "Web Safety": 0
        }
    };
}


function loadAccounts() {
    const saved =
        localStorage.getItem(ACCOUNT_KEY);

    if (saved) {
        accounts = JSON.parse(saved);
    }
}


function saveAccounts() {
    localStorage.setItem(
        ACCOUNT_KEY,
        JSON.stringify(accounts)
    );
}


function saveCurrentUser() {

    if (!currentUser) {
        return;
    }

    const index = accounts.findIndex(
        account =>
            account.username ===
            currentUser.username
    );

    if (index !== -1) {

        accounts[index] = currentUser;

        saveAccounts();

        localStorage.setItem(
            CURRENT_USER_KEY,
            currentUser.username
        );
    }
}


function handleSignup(event) {

    event.preventDefault();

    const displayName =
        document.getElementById(
            "signupDisplayName"
        ).value.trim();

    const username =
        document.getElementById(
            "signupUsername"
        ).value.trim().toLowerCase();

    const password =
        document.getElementById(
            "signupPassword"
        ).value;

    const confirmPassword =
        document.getElementById(
            "signupConfirmPassword"
        ).value;

    const message =
        document.getElementById(
            "signupMessage"
        );


    if (
        !displayName ||
        !username ||
        !password ||
        !confirmPassword
    ) {

        message.textContent =
            "Please complete all fields.";

        return;
    }


    if (username.length < 3) {

        message.textContent =
            "Username must be at least 3 characters.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    const existingUser =
        accounts.find(
            account =>
                account.username === username
        );


    if (existingUser) {

        message.textContent =
            "Username already exists.";

        return;
    }


    const newAccount = {

        displayName: displayName,

        username: username,

        password: password,

        avatar: "🛡️",

        playerData:
            createDefaultPlayerData()
    };


    accounts.push(newAccount);

    saveAccounts();


    message.style.color =
        "#2ee66b";

    message.textContent =
        "Account created successfully!";


    setTimeout(() => {

        document.getElementById(
            "loginUsername"
        ).value = username;

        showLogin();

    }, 800);
}


function handleLogin(event) {

    event.preventDefault();

    const username =
        document.getElementById(
            "loginUsername"
        ).value.trim().toLowerCase();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const message =
        document.getElementById(
            "loginMessage"
        );


    const account =
        accounts.find(
            user =>
                user.username === username &&
                user.password === password
        );


    if (!account) {

        message.textContent =
            "Invalid username or password.";

        return;
    }


    currentUser = account;

    localStorage.setItem(
        CURRENT_USER_KEY,
        username
    );


    message.style.color =
        "#2ee66b";

    message.textContent =
        "Login successful!";


    setTimeout(() => {

        showApp();

    }, 500);
}


function logout() {

    saveCurrentUser();

    currentUser = null;

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    showLogin();
}


function showLogin() {

    document.getElementById(
        "loginScreen"
    ).style.display = "flex";

    document.getElementById(
        "signupScreen"
    ).style.display = "none";

    document.getElementById(
        "appContainer"
    ).style.display = "none";
}


function showSignup() {

    document.getElementById(
        "loginScreen"
    ).style.display = "none";

    document.getElementById(
        "signupScreen"
    ).style.display = "flex";

    document.getElementById(
        "appContainer"
    ).style.display = "none";
}


function showApp() {

    document.getElementById(
        "loginScreen"
    ).style.display = "none";

    document.getElementById(
        "signupScreen"
    ).style.display = "none";

    document.getElementById(
        "appContainer"
    ).style.display = "block";

    updateAllUI();

    goHome();
}
/* =========================================
   CYBERSHIELD - PART 2
   MISSIONS + NAVIGATION
========================================= */

const missions = [

    {
        id: 1,
        category: "Phishing",
        difficulty: "Beginner",
        title: "The Suspicious Account Email",
        scenario:
            "You receive an email claiming that your account needs to be verified immediately. It contains a link and says your account may be restricted.",
        question:
            "What is the safest action?",
        options: [
            "Click the link immediately",
            "Reply with your password",
            "Verify the message through the official website or app",
            "Forward the email to your friends"
        ],
        answer: 2,
        explanation:
            "Avoid suspicious links and independently visit the official website or app."
    },

    {
        id: 2,
        category: "Phishing",
        difficulty: "Intermediate",
        title: "The Unexpected Attachment",
        scenario:
            "An unexpected email arrives with an attachment. The sender looks familiar, but you were not expecting any document.",
        question:
            "What should you do first?",
        options: [
            "Open the attachment",
            "Verify the sender and reason for the attachment",
            "Download it and send it to someone",
            "Disable your security software"
        ],
        answer: 1,
        explanation:
            "Unexpected attachments should be verified before opening."
    },

    {
        id: 3,
        category: "SMS Scam",
        difficulty: "Beginner",
        title: "You Won a Prize!",
        scenario:
            "You receive a message saying you have won a large prize and must provide personal information to claim it.",
        question:
            "Which response is safest?",
        options: [
            "Send your information",
            "Click the link",
            "Ignore it and verify independently",
            "Forward it to everyone"
        ],
        answer: 2,
        explanation:
            "Unexpected prize messages can be scams. Do not provide personal information."
    },

    {
        id: 4,
        category: "SMS Scam",
        difficulty: "Intermediate",
        title: "The Fake Delivery Message",
        scenario:
            "A message says your package cannot be delivered and asks you to follow a link.",
        question:
            "What is the safest choice?",
        options: [
            "Click the link",
            "Check the delivery company through its official website or app",
            "Enter your information",
            "Reply to the message"
        ],
        answer: 1,
        explanation:
            "Use the company's official channels instead of links in unexpected messages."
    },

    {
        id: 5,
        category: "Password Security",
        difficulty: "Beginner",
        title: "The Password Challenge",
        scenario:
            "You are creating a password for an important account.",
        question:
            "Which is the strongest approach?",
        options: [
            "Use your name and birthday",
            "Use the same password everywhere",
            "Use a long, unique password or passphrase",
            "Use 12345678"
        ],
        answer: 2,
        explanation:
            "Long, unique passwords are safer than short, predictable passwords."
    },

    {
        id: 6,
        category: "Password Security",
        difficulty: "Advanced",
        title: "One Password Everywhere",
        scenario:
            "You use the same password for several different accounts.",
        question:
            "What is the biggest problem?",
        options: [
            "It makes passwords easier to type",
            "One compromised password could affect multiple accounts",
            "It makes accounts load slowly",
            "There is no problem"
        ],
        answer: 1,
        explanation:
            "Password reuse means one compromised password could put multiple accounts at risk."
    },

    {
        id: 7,
        category: "Social Engineering",
        difficulty: "Intermediate",
        title: "The Urgent IT Call",
        scenario:
            "Someone calls claiming to be technical support and asks for account information because of an urgent security issue.",
        question:
            "What should you do?",
        options: [
            "Give them the information",
            "Follow their instructions immediately",
            "Verify their identity through an official channel",
            "Give them your password"
        ],
        answer: 2,
        explanation:
            "Urgency can be used to pressure people. Verify requests independently."
    },

    {
        id: 8,
        category: "Social Engineering",
        difficulty: "Advanced",
        title: "The Pressure Tactic",
        scenario:
            "Someone tells you that you must make an immediate decision and refuses to let you verify the request.",
        question:
            "What warning sign is most obvious?",
        options: [
            "The request is urgent and discourages verification",
            "The person is polite",
            "The message is short",
            "It happens during the day"
        ],
        answer: 0,
        explanation:
            "Pressure and preventing verification are common social-engineering warning signs."
    },

    {
        id: 9,
        category: "Web Safety",
        difficulty: "Intermediate",
        title: "The Suspicious Website",
        scenario:
            "You find a website that looks almost identical to a popular service.",
        question:
            "What should you check?",
        options: [
            "Only the colors",
            "The address, spelling, and how you reached the site",
            "How many pictures it has",
            "Whether the page looks exciting"
        ],
        answer: 1,
        explanation:
            "Check the web address carefully and use trusted ways to reach important services."
    },

    {
        id: 10,
        category: "Web Safety",
        difficulty: "Advanced",
        title: "The Fake Login Page",
        scenario:
            "A login page looks professional, but its web address is slightly different from the official service.",
        question:
            "What should you do?",
        options: [
            "Enter your password",
            "Save the page",
            "Leave and access the service through the official website or app",
            "Share the page"
        ],
        answer: 2,
        explanation:
            "A suspicious web address is a warning sign. Use the official website or app."
    }

];


/* =========================================
   GAME VARIABLES
========================================= */

let currentMissionList = [];
let currentMissionIndex = 0;

let selectedDifficulty = "All";
let currentCategory = null;

let score = 0;
let correctCount = 0;
let wrongCount = 0;
let missionXP = 0;

let answered = false;


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const screen =
        document.getElementById(screenId);


    if (screen) {

        screen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}


function goHome() {

    showScreen("homeScreen");

    updateDashboard();

}


function showMissionSelection() {

    showScreen(
        "missionSelectionScreen"
    );

    updateMissionSelection();

}


function showAchievements() {

    showScreen(
        "achievementsScreen"
    );

    checkBadges();

    updateAchievements();

}


function showLeaderboard() {

    showScreen(
        "leaderboardScreen"
    );

    updateLeaderboard();

}


function showStatistics() {

    showScreen(
        "statisticsScreen"
    );

    updateStatistics();

}


function showProfile() {

    showScreen(
        "profileScreen"
    );

    updateProfile();

}


function showSettings() {

    showScreen(
        "settingsScreen"
    );

    if (!currentUser) {
        return;
    }


    const input =
        document.getElementById(
            "settingsDisplayName"
        );


    if (input) {

        input.value =
            currentUser.displayName;

    }

}


function showSecurityCenter() {

    showScreen(
        "securityCenterScreen"
    );

    updateSecurityScore();

}


function showDailyChallenge() {

    showScreen(
        "dailyChallengeScreen"
    );

    loadDailyChallenge();

}


/* =========================================
   DIFFICULTY FILTER
========================================= */

function filterDifficulty(
    difficulty
) {

    selectedDifficulty =
        difficulty;


    document
        .querySelectorAll(
            ".difficulty-btn"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.difficulty ===
                difficulty
            ) {

                button.classList.add(
                    "active"
                );

            }

        });


    updateMissionSelection();

}


/* =========================================
   START CATEGORY MISSION
========================================= */

function startCategoryMission(
    category
) {

    currentCategory =
        category;


    currentMissionList =
        missions.filter(
            mission =>
                mission.category ===
                category
        );


    if (
        selectedDifficulty !==
        "All"
    ) {

        const filtered =
            currentMissionList.filter(
                mission =>
                    mission.difficulty ===
                    selectedDifficulty
            );


        if (filtered.length > 0) {

            currentMissionList =
                filtered;

        }

    }


    currentMissionIndex = 0;

    score = 0;
    correctCount = 0;
    wrongCount = 0;
    missionXP = 0;

    answered = false;


    showScreen(
        "missionScreen"
    );


    loadMission();

}


/* =========================================
   LOAD MISSION
========================================= */

function loadMission() {

    const mission =
        currentMissionList[
            currentMissionIndex
        ];


    if (!mission) {

        finishMission();

        return;
    }


    answered = false;


    setText(
        "scenarioTitle",
        mission.title
    );


    setText(
        "category",
        mission.category
    );


    setText(
        "difficulty",
        mission.difficulty
    );


    setText(
        "scenarioNumber",
        `Mission ${currentMissionIndex + 1}`
    );


    setText(
        "missionProgressText",
        `${currentMissionIndex + 1} / ${currentMissionList.length}`
    );


    const progress =
        document.getElementById(
            "progressBar"
        );


    if (progress) {

        progress.style.width =
            (
                ((currentMissionIndex + 1) /
                    currentMissionList.length) *
                100
            ) + "%";

    }


    setText(
        "scenarioContent",
        mission.scenario
    );


    setText(
        "question",
        mission.question
    );


    const options =
        document.getElementById(
            "options"
        );


    if (options) {

        options.innerHTML = "";


        mission.options.forEach(
            (option, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "option-btn";


                button.textContent =
                    option;


                button.onclick =
                    function () {

                        checkAnswer(index);

                    };


                options.appendChild(
                    button
                );

            }
        );

    }


    const feedback =
        document.getElementById(
            "feedback"
        );


    if (feedback) {

        feedback.style.display =
            "none";

    }


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (nextButton) {

        nextButton.style.display =
            "none";

    }

}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(
    selectedIndex
) {

    if (answered) {
        return;
    }


    answered = true;


    const mission =
        currentMissionList[
            currentMissionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".option-btn"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index ===
                mission.answer
            ) {

                button.classList.add(
                    "correct-option"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "feedback"
        );

    const feedbackTitle =
        document.getElementById(
            "feedbackTitle"
        );

    const feedbackText =
        document.getElementById(
            "feedbackText"
        );


    if (
        selectedIndex ===
        mission.answer
    ) {

        score += 20;

        missionXP += 25;

        correctCount++;

        currentUser.playerData.correctAnswers++;

        currentUser.playerData.streak++;

        if (
            currentUser.playerData.streak >
            currentUser.playerData.bestStreak
        ) {

            currentUser.playerData.bestStreak =
                currentUser.playerData.streak;

        }


        addXP(25);


        if (feedback) {

            feedback.style.display =
                "block";

            feedback.className =
                "feedback correct";

        }


        if (feedbackTitle) {

            feedbackTitle.textContent =
                "✓ Correct!";

        }


    } else {

        wrongCount++;

        missionXP += 5;

        currentUser.playerData.wrongAnswers++;

        currentUser.playerData.streak = 0;

        addXP(5);


        if (
            buttons[selectedIndex]
        ) {

            buttons[selectedIndex]
                .classList.add(
                    "wrong-option"
                );

        }


        if (feedback) {

            feedback.style.display =
                "block";

            feedback.className =
                "feedback incorrect";

        }


        if (feedbackTitle) {

            feedbackTitle.textContent =
                "✕ Not quite.";

        }

    }


    if (feedbackText) {

        feedbackText.textContent =
            mission.explanation;

    }


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (nextButton) {

        nextButton.style.display =
            "inline-block";


        if (
            currentMissionIndex <
            currentMissionList.length - 1
        ) {

            nextButton.textContent =
                "Next Mission →";

        } else {

            nextButton.textContent =
                "Finish Missions";

        }

    }


    saveCurrentUser();

    updateAllUI();

}


/* =========================================
   NEXT MISSION
========================================= */

function nextMission() {

    currentMissionIndex++;


    if (
        currentMissionIndex >=
        currentMissionList.length
    ) {

        finishMission();

        return;
    }


    loadMission();

}


/* =========================================
   FINISH MISSION
========================================= */

function finishMission() {

    currentUser.playerData.missionsCompleted++;

    currentUser.playerData.totalScore +=
        score;


    if (
        currentUser.playerData.categoryStats[
            currentCategory
        ] !== undefined
    ) {

        currentUser.playerData.categoryStats[
            currentCategory
        ] += currentMissionList.length;

    }


    checkBadges();

    saveCurrentUser();

    showResults();

}
/* =========================================
    CYBERSHIELD - PART 3
    XP + DASHBOARD + PROFILE + LEADERBOARD
 ========================================= */

function addXP(amount) {

    if (!currentUser) {
        return;
    }

    currentUser.playerData.xp += amount;

    currentUser.playerData.level =
        Math.floor(
            currentUser.playerData.xp / 100
        ) + 1;
}


/* =========================================
   RESULTS
========================================= */

function showResults() {

    showScreen("resultScreen");

    setText(
        "finalScore",
        score
    );


    const total =
        correctCount + wrongCount;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (correctCount / total) * 100
            );


    const performanceBar =
        document.getElementById(
            "performanceBar"
        );


    if (performanceBar) {

        performanceBar.style.width =
            percentage + "%";

    }


    let performanceMessage =
        "";


    if (percentage >= 80) {

        performanceMessage =
            "Excellent! You're becoming a strong cyber defender.";

    } else if (percentage >= 60) {

        performanceMessage =
            "Good work! Keep improving your cybersecurity awareness.";

    } else {

        performanceMessage =
            "Keep learning. Every mission helps you become safer online.";

    }


    setText(
        "performanceText",
        performanceMessage
    );


    setText(
        "correctAnswers",
        correctCount
    );


    setText(
        "wrongAnswers",
        wrongCount
    );


    setText(
        "earnedXP",
        missionXP
    );


    updateAllUI();
}


/* =========================================
   RETRY MISSION
========================================= */

function retryMission() {

    if (!currentCategory) {

        showMissionSelection();

        return;
    }


    startCategoryMission(
        currentCategory
    );
}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    if (!currentUser) {
        return;
    }


    const data =
        currentUser.playerData;


    setText(
        "dashboardXP",
        data.xp
    );


    setText(
        "dashboardLevel",
        data.level
    );


    setText(
        "completedMissions",
        data.missionsCompleted
    );


    setText(
        "bestStreak",
        data.bestStreak
    );


    const levelXP =
        data.xp % 100;


    setText(
        "xpProgressText",
        `${levelXP}/100 XP`
    );


    setText(
        "progressLevel",
        `Level ${data.level}`
    );


    const dashboardProgress =
        document.getElementById(
            "dashboardProgress"
        );


    if (dashboardProgress) {

        dashboardProgress.style.width =
            levelXP + "%";

    }
}


/* =========================================
   NAVBAR
========================================= */

function updateNavbar() {

    if (!currentUser) {
        return;
    }


    setText(
        "navXP",
        `XP: ${currentUser.playerData.xp}`
    );


    setText(
        "navLevel",
        `Level ${currentUser.playerData.level}`
    );


    const profileButton =
        document.querySelector(
            ".profile-nav-btn"
        );


    if (profileButton) {

        profileButton.textContent =
            currentUser.avatar || "🛡️";

    }
}


/* =========================================
   PROFILE
========================================= */

function updateProfile() {

    if (!currentUser) {
        return;
    }


    const data =
        currentUser.playerData;


    setText(
        "profileDisplayName",
        currentUser.displayName
    );


    setText(
        "profileUsername",
        "@" + currentUser.username
    );


    setText(
        "profileAvatar",
        currentUser.avatar || "🛡️"
    );


    setText(
        "profileLevel",
        data.level
    );


    setText(
        "profileXP",
        data.xp
    );


    setText(
        "profileMissions",
        data.missionsCompleted
    );


    setText(
        "profileBestStreak",
        data.bestStreak
    );


    const total =
        data.correctAnswers +
        data.wrongAnswers;


    const accuracy =
        total === 0
            ? 0
            : Math.round(
                (data.correctAnswers / total) * 100
            );


    setText(
        "profileAccuracy",
        accuracy + "%"
    );


    updateProfileBadges();
}


function updateProfileBadges() {

    const container =
        document.getElementById(
            "profileBadges"
        );


    if (!container || !currentUser) {
        return;
    }


    if (
        currentUser.playerData.badges.length === 0
    ) {

        container.textContent =
            "No badges unlocked yet.";

        return;
    }


    container.innerHTML =
        currentUser.playerData.badges
            .map(
                badge =>
                    `<span class="mission-badge">${badge}</span>`
            )
            .join(" ");
}


/* =========================================
   SETTINGS
========================================= */

function saveSettings() {

    if (!currentUser) {
        return;
    }


    const input =
        document.getElementById(
            "settingsDisplayName"
        );


    const message =
        document.getElementById(
            "settingsMessage"
        );


    if (
        input &&
        input.value.trim()
    ) {

        currentUser.displayName =
            input.value.trim();

    }


    saveCurrentUser();

    updateAllUI();


    if (message) {

        message.textContent =
            "Settings saved successfully.";

        message.style.color =
            "#2ee66b";

    }
}


/* =========================================
   AVATAR SELECTION
========================================= */

function chooseAvatar(avatar) {

    if (!currentUser) {
        return;
    }


    currentUser.avatar =
        avatar;


    saveCurrentUser();

    updateAllUI();
}


/* =========================================
   LEADERBOARD
========================================= */

function updateLeaderboard() {

    const list =
        document.getElementById(
            "leaderboardList"
        );


    if (!list) {
        return;
    }


    const sortedAccounts =
        [...accounts].sort(
            (a, b) =>
                b.playerData.xp -
                a.playerData.xp
        );


    setText(
        "firstPlayer",
        sortedAccounts[0]
            ? `${sortedAccounts[0].avatar || "🛡️"} ${sortedAccounts[0].displayName}`
            : "—"
    );


    setText(
        "secondPlayer",
        sortedAccounts[1]
            ? `${sortedAccounts[1].avatar || "🛡️"} ${sortedAccounts[1].displayName}`
            : "—"
    );


    setText(
        "thirdPlayer",
        sortedAccounts[2]
            ? `${sortedAccounts[2].avatar || "🛡️"} ${sortedAccounts[2].displayName}`
            : "—"
    );


    list.innerHTML = "";


    sortedAccounts.forEach(
        (account, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            if (
                currentUser &&
                account.username ===
                currentUser.username
            ) {

                row.classList.add(
                    "current-player"
                );

            }


            const rank =
                document.createElement(
                    "span"
                );


            rank.className =
                "rank";


            rank.textContent =
                "#" + (index + 1);


            const name =
                document.createElement(
                    "span"
                );


            name.className =
                "leader-name";


            name.textContent =
                `${account.avatar || "🛡️"} ${account.displayName}`;


            const xp =
                document.createElement(
                    "span"
                );


            xp.className =
                "leader-xp";


            xp.textContent =
                `${account.playerData.xp} XP`;


            row.appendChild(rank);

            row.appendChild(name);

            row.appendChild(xp);


            list.appendChild(row);

        }
    );
}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    if (!currentUser) {
        return;
    }


    const data =
        currentUser.playerData;


    setText(
        "statisticsCorrect",
        data.correctAnswers
    );


    setText(
        "statisticsWrong",
        data.wrongAnswers
    );


    setText(
        "statisticsXP",
        data.xp
    );


    const total =
        data.correctAnswers +
        data.wrongAnswers;


    const accuracy =
        total === 0
            ? 0
            : Math.round(
                (data.correctAnswers / total) * 100
            );


    setText(
        "statisticsAccuracy",
        accuracy + "%"
    );


    const container =
        document.getElementById(
            "categoryStatistics"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    Object.entries(
        data.categoryStats
    ).forEach(
        ([category, value]) => {

            const max =
                missions.filter(
                    mission =>
                        mission.category ===
                        category
                ).length;


            const percentage =
                max === 0
                    ? 0
                    : Math.min(
                        100,
                        (value / max) * 100
                    );


            const item =
                document.createElement(
                    "div"
                );


            item.innerHTML = `

                <div class="stat-category-header">

                    <span>
                        ${category}
                    </span>

                    <strong>
                        ${value}/${max}
                    </strong>

                </div>

                <div class="stat-bar">

                    <div
                        class="stat-bar-fill"
                        style="width:${percentage}%"
                    ></div>

                </div>

            `;


            container.appendChild(item);

        }
    );
}


/* =========================================
   RESET PROGRESS
========================================= */

function resetProgress() {

    if (!currentUser) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to reset your CyberShield progress?"
        );


    if (!confirmed) {
        return;
    }


    const name =
        currentUser.displayName;

    const username =
        currentUser.username;

    const password =
        currentUser.password;

    const avatar =
        currentUser.avatar;


    currentUser.playerData =
        createDefaultPlayerData();


    currentUser.displayName =
        name;

    currentUser.username =
        username;

    currentUser.password =
        password;

    currentUser.avatar =
        avatar;


    saveCurrentUser();

    updateAllUI();

    goHome();
}


/* =========================================
   GENERAL HELPER
========================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }
}


/* =========================================
   UPDATE EVERYTHING
========================================= */

function updateAllUI() {

    if (!currentUser) {
        return;
    }


    updateNavbar();

    updateDashboard();

    updateProfile();

    updateMissionSelection();

    updateAchievements();

    updateStatistics();

    updateSecurityScore();

}
/* =========================================
   CYBERSHIELD - PART 4
   PROGRESS + ACHIEVEMENTS + DAILY CHALLENGE
   + SECURITY CENTER + INITIALIZATION
========================================= */


/* =========================================
   MISSION SELECTION
========================================= */

function updateMissionSelection() {

    const categories = [
        "Phishing",
        "SMS Scam",
        "Password Security",
        "Social Engineering",
        "Web Safety"
    ];


    categories.forEach(category => {

        const categoryMissions =
            missions.filter(
                mission =>
                    mission.category ===
                    category
            );


        let filteredMissions =
            categoryMissions;


        if (
            selectedDifficulty !==
            "All"
        ) {

            const filtered =
                categoryMissions.filter(
                    mission =>
                        mission.difficulty ===
                        selectedDifficulty
                );


            if (filtered.length > 0) {

                filteredMissions =
                    filtered;

            }

        }


        const completed =
            getCategoryProgress(
                category
            );


        const max =
            categoryMissions.length;


        const percentage =
            max === 0
                ? 0
                : Math.min(
                    100,
                    (completed / max) * 100
                );


        const textId =
            getProgressTextId(
                category
            );


        const barId =
            getProgressBarId(
                category
            );


        setText(
            textId,
            `${completed}/${max} completed`
        );


        const bar =
            document.getElementById(
                barId
            );


        if (bar) {

            bar.style.width =
                percentage + "%";

        }

    });


    setText(
        "selectionStreak",
        currentUser
            ? currentUser.playerData.streak
            : 0
    );
}


/* =========================================
   CATEGORY PROGRESS
========================================= */

function getCategoryProgress(
    category
) {

    if (!currentUser) {
        return 0;
    }


    const data =
        currentUser.playerData;


    if (
        !data.categoryStats ||
        data.categoryStats[category] === undefined
    ) {

        return 0;

    }


    return Math.min(
        data.categoryStats[category],
        missions.filter(
            mission =>
                mission.category ===
                category
        ).length
    );
}


/* =========================================
   CATEGORY PROGRESS IDS
========================================= */

function getProgressTextId(
    category
) {

    const ids = {

        "Phishing":
            "phishingProgress",

        "SMS Scam":
            "smsProgress",

        "Password Security":
            "passwordProgress",

        "Social Engineering":
            "socialProgress",

        "Web Safety":
            "webProgress"

    };


    return ids[category];
}


function getProgressBarId(
    category
) {

    const ids = {

        "Phishing":
            "phishingProgressBar",

        "SMS Scam":
            "smsProgressBar",

        "Password Security":
            "passwordProgressBar",

        "Social Engineering":
            "socialProgressBar",

        "Web Safety":
            "webProgressBar"

    };


    return ids[category];
}


/* =========================================
   ACHIEVEMENTS
========================================= */

const achievementDefinitions = [

    {
        id: "phishing",
        badge: "badge-phishing",
        name: "Phishing Defender",
        icon: "🎣",
        description:
            "Complete the Phishing missions.",
        requirement: 2
    },

    {
        id: "scam",
        badge: "badge-scam",
        name: "Scam Spotter",
        icon: "📱",
        description:
            "Complete the SMS Scam missions.",
        requirement: 2
    },

    {
        id: "password",
        badge: "badge-password",
        name: "Password Guardian",
        icon: "🔐",
        description:
            "Complete the Password Security missions.",
        requirement: 2
    },

    {
        id: "web",
        badge: "badge-web",
        name: "Web Watcher",
        icon: "🌐",
        description:
            "Complete the Web Safety missions.",
        requirement: 2
    },

    {
        id: "defender",
        badge: "badge-defender",
        name: "Cyber Defender",
        icon: "🛡️",
        description:
            "Complete missions across all categories.",
        requirement: 10
    },

    {
        id: "expert",
        badge: "badge-expert",
        name: "CyberShield Expert",
        icon: "🏆",
        description:
            "Reach Level 5.",
        requirement: 5
    },

    {
        id: "streak",
        badge: "badge-streak",
        name: "Streak Master",
        icon: "🔥",
        description:
            "Reach a 5-answer streak.",
        requirement: 5
    },

    {
        id: "daily",
        badge: "badge-daily",
        name: "Daily Defender",
        icon: "📅",
        description:
            "Complete a Daily Challenge.",
        requirement: 1
    }

];


/* =========================================
   CHECK BADGES
========================================= */

function checkBadges() {

    if (!currentUser) {
        return;
    }


    const data =
        currentUser.playerData;


    if (!Array.isArray(data.badges)) {

        data.badges = [];

    }


    const unlockBadge =
        badgeId => {

            if (
                !data.badges.includes(
                    badgeId
                )
            ) {

                data.badges.push(
                    badgeId
                );

            }

        };


    /* Phishing */

    if (
        getCategoryProgress(
            "Phishing"
        ) >= 2
    ) {

        unlockBadge("phishing");

    }


    /* SMS Scam */

    if (
        getCategoryProgress(
            "SMS Scam"
        ) >= 2
    ) {

        unlockBadge("scam");

    }


    /* Password Security */

    if (
        getCategoryProgress(
            "Password Security"
        ) >= 2
    ) {

        unlockBadge("password");

    }


    /* Web Safety */

    if (
        getCategoryProgress(
            "Web Safety"
        ) >= 2
    ) {

        unlockBadge("web");

    }


    /* All missions */

    if (
        data.missionsCompleted >= 5
    ) {

        unlockBadge("defender");

    }


    /* Expert */

    if (
        data.level >= 5
    ) {

        unlockBadge("expert");

    }


    /* Streak */

    if (
        data.bestStreak >= 5
    ) {

        unlockBadge("streak");

    }


    /* Daily */

    if (
        data.dailyCompleted >= 1
    ) {

        unlockBadge("daily");

    }


    saveCurrentUser();

}


/* =========================================
   UPDATE ACHIEVEMENTS
========================================= */

function updateAchievements() {

    const data =
        currentUser
            ? currentUser.playerData
            : null;


    achievementDefinitions.forEach(
        achievement => {

            const badge =
                document.getElementById(
                    achievement.badge
                );


            if (!badge) {
                return;
            }


            const unlocked =
                data &&
                data.badges.includes(
                    achievement.id
                );


            if (unlocked) {

                badge.classList.add(
                    "unlocked"
                );


                badge.classList.remove(
                    "locked"
                );

            } else {

                badge.classList.add(
                    "locked"
                );


                badge.classList.remove(
                    "unlocked"
                );

            }

        }
    );
}


/* =========================================
   SECURITY SCORE
========================================= */

function updateSecurityScore() {

    if (!currentUser) {
        return;
    }


    const data =
        currentUser.playerData;


    const total =
        data.correctAnswers +
        data.wrongAnswers;


    const accuracy =
        total === 0
            ? 0
            : Math.round(
                (data.correctAnswers / total) *
                100
            );


    const missionProgress =
        Math.min(
            100,
            (data.missionsCompleted /
                missions.length) *
                100
        );


    const badgeProgress =
        Math.min(
            100,
            (data.badges.length /
                achievementDefinitions.length) *
                100
        );


    const streakProgress =
        Math.min(
            100,
            (data.bestStreak / 10) *
                100
        );


    const securityScore =
        Math.round(
            (
                accuracy +
                missionProgress +
                badgeProgress +
                streakProgress
            ) / 4
        );


    setText(
        "securityScore",
        securityScore
    );


    const securityBar =
        document.getElementById(
            "securityScoreBar"
        );


    if (securityBar) {

        securityBar.style.width =
            securityScore + "%";

    }


    let rating =
        "Beginner";


    if (securityScore >= 90) {

        rating =
            "Elite Defender";

    } else if (securityScore >= 75) {

        rating =
            "Advanced Defender";

    } else if (securityScore >= 50) {

        rating =
            "Developing Defender";

    }


    setText(
        "securityRating",
        rating
    );


    setText(
        "securityAccuracy",
        accuracy + "%"
    );


    setText(
        "securityMissions",
        data.missionsCompleted
    );


    setText(
        "securityBadges",
        data.badges.length
    );


    setText(
        "securityStreak",
        data.bestStreak
    );
}


/* =========================================
   DAILY CHALLENGE DATA
========================================= */

const dailyChallenges = [

    {
        category: "Phishing",
        title: "Daily Phishing Check",
        text:
            "You receive an unexpected message asking you to verify your account using a link. What is the safest response?",
        options: [
            "Click the link immediately",
            "Verify through the official website or app",
            "Reply with your password",
            "Forward the message"
        ],
        answer: 1,
        explanation:
            "Use the official website or app rather than an unexpected link."
    },

    {
        category: "SMS Scam",
        title: "Daily Scam Check",
        text:
            "A message says you have won a prize and asks for personal information. What should you do?",
        options: [
            "Send the information",
            "Click the link",
            "Ignore it and verify independently",
            "Share it with friends"
        ],
        answer: 2,
        explanation:
            "Unexpected prize messages should be treated cautiously and verified independently."
    },

    {
        category: "Password Security",
        title: "Daily Password Check",
        text:
            "Which password practice is safest?",
        options: [
            "Reuse one password everywhere",
            "Use your birthday",
            "Use a long, unique password",
            "Use a simple word"
        ],
        answer: 2,
        explanation:
            "Long, unique passwords reduce the risk of one compromised account affecting others."
    },

    {
        category: "Social Engineering",
        title: "Daily Social Engineering Check",
        text:
            "Someone pressures you to act immediately and says you cannot verify their request. What should you do?",
        options: [
            "Follow the instructions",
            "Give them your account information",
            "Stop and verify the request independently",
            "Ignore all security warnings"
        ],
        answer: 2,
        explanation:
            "Urgency combined with discouraging verification is a major warning sign."
    },

    {
        category: "Web Safety",
        title: "Daily Website Check",
        text:
            "A website looks professional but its address is slightly different from the official service. What should you do?",
        options: [
            "Enter your password",
            "Use the official website or app instead",
            "Save the page",
            "Share the page"
        ],
        answer: 1,
        explanation:
            "A slightly different web address can be a warning sign. Use the official service directly."
    }

];


/* =========================================
   GET TODAY'S CHALLENGE
========================================= */

function getTodayString() {

    const date =
        new Date();


    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0")
    );
}


function getDailyChallenge() {

    const date =
        new Date();


    const index =
        (
            date.getFullYear() +
            date.getMonth() +
            date.getDate()
        ) %
        dailyChallenges.length;


    return dailyChallenges[index];
}


/* =========================================
   LOAD DAILY CHALLENGE
========================================= */

function loadDailyChallenge() {

    if (!currentUser) {
        return;
    }


    const challenge =
        getDailyChallenge();


    setText(
        "dailyChallengeCategory",
        challenge.category
    );


    setText(
        "dailyChallengeTitle",
        challenge.title
    );


    setText(
        "dailyChallengeText",
        challenge.text
    );


    const options =
        document.getElementById(
            "dailyChallengeOptions"
        );


    const feedback =
        document.getElementById(
            "dailyChallengeFeedback"
        );


    const button =
        document.getElementById(
            "dailyChallengeButton"
        );


    if (!options) {
        return;
    }


    options.innerHTML = "";


    challenge.options.forEach(
        (option, index) => {

            const choice =
                document.createElement(
                    "button"
                );


            choice.className =
                "option-btn";


            choice.textContent =
                option;


            choice.onclick =
                function () {

                    answerDailyChallenge(
                        index
                    );

                };


            options.appendChild(
                choice
            );

        }
    );


    if (feedback) {

        feedback.style.display =
            "none";

    }


    if (button) {

        button.style.display =
            "none";

    }


    if (
        currentUser.playerData.lastDailyDate ===
        getTodayString()
    ) {

        setText(
            "dailyChallengeText",
            "You have already completed today's challenge. Come back tomorrow for a new challenge."
        );


        document
            .querySelectorAll(
                "#dailyChallengeOptions .option-btn"
            )
            .forEach(
                option => {

                    option.disabled =
                        true;

                }
            );

    }

}


/* =========================================
   ANSWER DAILY CHALLENGE
========================================= */

function answerDailyChallenge(
    selectedIndex
) {

    if (!currentUser) {
        return;
    }


    const today =
        getTodayString();


    if (
        currentUser.playerData.lastDailyDate ===
        today
    ) {

        return;

    }


    const challenge =
        getDailyChallenge();


    const buttons =
        document.querySelectorAll(
            "#dailyChallengeOptions .option-btn"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled =
                true;


            if (
                index ===
                challenge.answer
            ) {

                button.classList.add(
                    "correct-option"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "dailyChallengeFeedback"
        );


    const feedbackTitle =
        document.getElementById(
            "dailyFeedbackTitle"
        );


    const feedbackText =
        document.getElementById(
            "dailyFeedbackText"
        );


    const button =
        document.getElementById(
            "dailyChallengeButton"
        );


    if (
        selectedIndex ===
        challenge.answer
    ) {

        addXP(50);


        currentUser.playerData.correctAnswers++;


        currentUser.playerData.dailyCompleted++;


        if (feedback) {

            feedback.style.display =
                "block";

            feedback.className =
                "feedback correct";

        }


        if (feedbackTitle) {

            feedbackTitle.textContent =
                "✓ Correct! +50 XP";

        }

    } else {

        currentUser.playerData.wrongAnswers++;


        if (feedback) {

            feedback.style.display =
                "block";

            feedback.className =
                "feedback incorrect";

        }


        if (feedbackTitle) {

            feedbackTitle.textContent =
                "✕ Not quite.";

        }


        if (
            buttons[selectedIndex]
        ) {

            buttons[selectedIndex]
                .classList.add(
                    "wrong-option"
                );

        }

    }


    if (feedbackText) {

        feedbackText.textContent =
            challenge.explanation;

    }


    if (button) {

        button.style.display =
            "none";

    }


    currentUser.playerData.lastDailyDate =
        today;


    checkBadges();

    saveCurrentUser();

    updateAllUI();

}


/* =========================================
   PROFILE AVATAR BUTTONS
========================================= */

function setupAvatarButtons() {

    const avatars = [
        "🛡️",
        "👨‍💻",
        "🧑‍💻",
        "🔐",
        "💻",
        "🦾",
        "⚡",
        "🌐"
    ];


    const container =
        document.getElementById(
            "avatarOptions"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    avatars.forEach(
        avatar => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "avatar-choice";


            button.type =
                "button";


            button.textContent =
                avatar;


            button.onclick =
                function () {

                    chooseAvatar(
                        avatar
                    );

                };


            container.appendChild(
                button
            );

        }
    );
}


/* =========================================
   INITIALIZE CYBERSHIELD
========================================= */

function initializeCyberShield() {

    loadAccounts();


    const savedUsername =
        localStorage.getItem(
            CURRENT_USER_KEY
        );


    if (savedUsername) {

        const account =
            accounts.find(
                user =>
                    user.username ===
                    savedUsername
            );


        if (account) {

            currentUser =
                account;

            setupAvatarButtons();

            showApp();

            return;

        }

    }


    setupAvatarButtons();

    showLogin();

}


/* =========================================
   START APPLICATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCyberShield();

    }
);
