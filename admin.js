/* =========================================================
   CYBERSHIELD ADMIN DASHBOARD
   ADMIN.JS - PART 1
   Admin Login + Initialization + Navigation
========================================================= */


/* =========================================================
   1. ADMIN SETTINGS
========================================================= */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Elizabeth7994";

const ADMIN_LOGIN_KEY =
    "cybershieldAdminLoggedIn";

const ADMIN_SETTINGS_KEY =
    "cybershieldAdminSettings";

const ADMIN_ACTIVITY_KEY =
    "cybershieldAdminActivity";


let adminLoggedIn = false;

let adminSettings = {
    name: "CyberShield Administrator",
    username: ADMIN_USERNAME,

    liveActivity: true,

    securityNotifications: true,

    analytics: true
};

let adminActivityLogs = [];


/* =========================================================
   2. LOAD ADMIN DATA
========================================================= */

function loadAdminData() {

    const savedSettings =
        localStorage.getItem(
            ADMIN_SETTINGS_KEY
        );

    if (savedSettings) {

        try {

            adminSettings =
                JSON.parse(savedSettings);

        } catch (error) {

            console.log(
                "Could not load admin settings."
            );

        }

    }


    const savedLogs =
        localStorage.getItem(
            ADMIN_ACTIVITY_KEY
        );

    if (savedLogs) {

        try {

            adminActivityLogs =
                JSON.parse(savedLogs);

        } catch (error) {

            console.log(
                "Could not load activity logs."
            );

        }

    }


    const savedLogin =
        localStorage.getItem(
            ADMIN_LOGIN_KEY
        );

    adminLoggedIn =
        savedLogin === "true";
}


/* =========================================================
   3. SAVE ADMIN SETTINGS
========================================================= */

function saveAdminData() {

    localStorage.setItem(
        ADMIN_SETTINGS_KEY,
        JSON.stringify(adminSettings)
    );

    localStorage.setItem(
        ADMIN_ACTIVITY_KEY,
        JSON.stringify(adminActivityLogs)
    );

}


/* =========================================================
   4. ADMIN LOGIN
========================================================= */

function handleAdminLogin(event) {

    event.preventDefault();


    const usernameInput =
        document.getElementById(
            "adminUsername"
        );

    const passwordInput =
        document.getElementById(
            "adminPassword"
        );

    const message =
        document.getElementById(
            "adminLoginMessage"
        );


    if (!usernameInput || !passwordInput) {

        return;
    }


    const username =
        usernameInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;


    if (!username || !password) {

        if (message) {

            message.textContent =
                "Please enter your username and password.";

        }

        return;
    }


    if (
        username !==
        ADMIN_USERNAME ||
        password !==
        ADMIN_PASSWORD
    ) {

        if (message) {

            message.style.color =
                "var(--admin-danger)";

            message.textContent =
                "Invalid administrator credentials.";

        }

        addAdminActivity(
            "login",
            "Failed administrator login attempt."
        );

        return;
    }


    adminLoggedIn = true;


    localStorage.setItem(
        ADMIN_LOGIN_KEY,
        "true"
    );


    if (message) {

        message.style.color =
            "var(--admin-success)";

        message.textContent =
            "Administrator login successful.";

    }


    addAdminActivity(
        "login",
        "Administrator logged into CyberShield."
    );


    setTimeout(() => {

        showAdminDashboard();

    }, 400);

}


/* =========================================================
   5. ADMIN LOGOUT
========================================================= */

function adminLogout() {

    addAdminActivity(
        "login",
        "Administrator logged out of CyberShield."
    );


    adminLoggedIn = false;


    localStorage.removeItem(
        ADMIN_LOGIN_KEY
    );


    const password =
        document.getElementById(
            "adminPassword"
        );

    if (password) {

        password.value = "";

    }


    showAdminLogin();

}


/* =========================================================
   6. SHOW ADMIN LOGIN
========================================================= */

function showAdminLogin() {

    const loginScreen =
        document.getElementById(
            "adminLoginScreen"
        );

    const adminApp =
        document.getElementById(
            "adminApp"
        );


    if (loginScreen) {

        loginScreen.style.display =
            "flex";

    }


    if (adminApp) {

        adminApp.style.display =
            "none";

    }

}


/* =========================================================
   7. SHOW ADMIN DASHBOARD
========================================================= */

function showAdminDashboard() {

    const loginScreen =
        document.getElementById(
            "adminLoginScreen"
        );

    const adminApp =
        document.getElementById(
            "adminApp"
        );


    if (loginScreen) {

        loginScreen.style.display =
            "none";

    }


    if (adminApp) {

        adminApp.style.display =
            "block";

    }


    updateAdminProfile();

    showAdminScreen(
        "adminOverviewScreen"
    );

    updateAdminOverview();

}


/* =========================================================
   8. SHOW ADMIN SCREEN
========================================================= */

function showAdminScreen(screenId) {

    const screens =
        document.querySelectorAll(
            ".admin-screen"
        );


    screens.forEach(screen => {

        screen.classList.remove(
            "active"
        );

    });


    const selectedScreen =
        document.getElementById(
            screenId
        );


    if (selectedScreen) {

        selectedScreen.classList.add(
            "active"
        );

    }


    updateAdminNavigation(
        screenId
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    refreshCurrentAdminScreen(
        screenId
    );

}


/* =========================================================
   9. UPDATE SIDEBAR NAVIGATION
========================================================= */

function updateAdminNavigation(
    screenId
) {

    const navItems =
        document.querySelectorAll(
            ".admin-nav-item"
        );


    navItems.forEach(item => {

        item.classList.remove(
            "active"
        );


        const target =
            item.getAttribute(
                "data-screen"
            );


        if (
            target === screenId
        ) {

            item.classList.add(
                "active"
            );

        }

    });

}


/* =========================================================
   10. REFRESH CURRENT SCREEN
========================================================= */

function refreshCurrentAdminScreen(
    screenId
) {

    switch (screenId) {

        case "adminOverviewScreen":

            updateAdminOverview();

            break;


        case "adminUsersScreen":

            updateAdminUsers();

            break;


        case "adminMissionsScreen":

            updateAdminMissionStats();

            break;


        case "adminAchievementsScreen":

            updateAdminAchievements();

            break;


        case "adminAnalyticsScreen":

            updateAdminAnalytics();

            break;


        case "adminSecurityScreen":

            updateAdminSecurity();

            break;


        case "adminActivityScreen":

            updateAdminActivityLogs();

            break;


        case "adminSettingsScreen":

            loadAdminSettings();

            break;

    }

}


/* =========================================================
   11. UPDATE ADMIN PROFILE
========================================================= */

function updateAdminProfile() {

    const nameElements =
        document.querySelectorAll(
            "#adminSidebarName, #adminTopbarName"
        );


    nameElements.forEach(element => {

        element.textContent =
            adminSettings.name;

    });


    const sidebarUsername =
        document.getElementById(
            "adminSidebarUsername"
        );


    if (sidebarUsername) {

        sidebarUsername.textContent =
            "@" +
            adminSettings.username;

    }

}


/* =========================================================
   12. ADD ACTIVITY LOG
========================================================= */

function addAdminActivity(
    type,
    message
) {

    const activity = {

        id:
            Date.now(),

        type:
            type,

        message:
            message,

        timestamp:
            new Date().toISOString()

    };


    adminActivityLogs.unshift(
        activity
    );


    if (
        adminActivityLogs.length >
        100
    ) {

        adminActivityLogs =
            adminActivityLogs.slice(
                0,
                100
            );

    }


    saveAdminData();

}


/* =========================================================
   13. FORMAT ACTIVITY TIME
========================================================= */

function formatAdminTime(
    timestamp
) {

    const date =
        new Date(timestamp);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown time";

    }


    return date.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/* =========================================================
   14. MOBILE SIDEBAR
========================================================= */

function toggleAdminSidebar() {

    const sidebar =
        document.getElementById(
            "adminSidebar"
        );


    if (!sidebar) {

        return;

    }


    sidebar.classList.toggle(
        "open"
    );

}


/* =========================================================
   15. CLOSE MOBILE SIDEBAR
========================================================= */

function closeAdminSidebar() {

    const sidebar =
        document.getElementById(
            "adminSidebar"
        );


    if (!sidebar) {

        return;

    }


    sidebar.classList.remove(
        "open"
    );

}


/* =========================================================
   16. INITIALIZE ADMIN DASHBOARD
========================================================= */

function initializeAdminDashboard() {

    loadAdminData();


    const loginForm =
        document.getElementById(
            "adminLoginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleAdminLogin
        );

    }


    const navItems =
        document.querySelectorAll(
            ".admin-nav-item"
        );


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            function () {

                const screen =
                    this.getAttribute(
                        "data-screen"
                    );


                if (screen) {

                    showAdminScreen(
                        screen
                    );

                }


                closeAdminSidebar();

            }
        );

    });


    const menuButton =
        document.getElementById(
            "adminMenuButton"
        );


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            toggleAdminSidebar
        );

    }


    if (adminLoggedIn) {

        showAdminDashboard();

    } else {

        showAdminLogin();

    }

}


/* =========================================================
   17. DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdminDashboard();

    }
);


/* =========================================================
   END OF ADMIN.JS PART 1
========================================================= */
/* =========================================================
   CYBERSHIELD ADMIN DASHBOARD
   ADMIN.JS - PART 2
   User Management + Dashboard Statistics
========================================================= */


/* =========================================================
   18. ACCOUNT STORAGE KEY
========================================================= */

const ADMIN_ACCOUNT_KEY =
    "cybershieldAccounts";


/* =========================================================
   19. GET ALL USER ACCOUNTS
========================================================= */

function getAdminAccounts() {

    const savedAccounts =
        localStorage.getItem(
            ADMIN_ACCOUNT_KEY
        );


    if (!savedAccounts) {

        return [];

    }


    try {

        const parsedAccounts =
            JSON.parse(savedAccounts);


        if (
            Array.isArray(
                parsedAccounts
            )
        ) {

            return parsedAccounts;

        }


        return [];

    } catch (error) {

        console.log(
            "Could not load CyberShield user accounts."
        );

        return [];

    }

}


/* =========================================================
   20. SAVE USER ACCOUNTS
========================================================= */

function saveAdminAccounts(
    accountsList
) {

    localStorage.setItem(
        ADMIN_ACCOUNT_KEY,
        JSON.stringify(accountsList)
    );

}


/* =========================================================
   21. CALCULATE USER ACCURACY
========================================================= */

function getAdminUserAccuracy(
    user
) {

    if (
        !user ||
        !user.playerData
    ) {

        return 0;

    }


    const correct =
        Number(
            user.playerData.correctAnswers
        ) || 0;


    const wrong =
        Number(
            user.playerData.wrongAnswers
        ) || 0;


    const total =
        correct + wrong;


    if (total === 0) {

        return 0;

    }


    return Math.round(
        (correct / total) * 100
    );

}


/* =========================================================
   22. GET USER LEVEL
========================================================= */

function getAdminUserLevel(
    user
) {

    if (
        !user ||
        !user.playerData
    ) {

        return 1;

    }


    return Number(
        user.playerData.level
    ) || 1;

}


/* =========================================================
   23. GET USER XP
========================================================= */

function getAdminUserXP(
    user
) {

    if (
        !user ||
        !user.playerData
    ) {

        return 0;

    }


    return Number(
        user.playerData.xp
    ) || 0;

}


/* =========================================================
   24. GET USER MISSIONS
========================================================= */

function getAdminUserMissions(
    user
) {

    if (
        !user ||
        !user.playerData
    ) {

        return 0;

    }


    return Number(
        user.playerData.missionsCompleted
    ) || 0;

}


/* =========================================================
   25. UPDATE ADMIN OVERVIEW
========================================================= */

function updateAdminOverview() {

    const accounts =
        getAdminAccounts();


    const totalUsers =
        accounts.length;


    let totalXP = 0;

    let totalMissions = 0;

    let totalCorrect = 0;

    let totalWrong = 0;

    let bestStreak = 0;


    accounts.forEach(user => {

        if (!user.playerData) {

            return;

        }


        totalXP +=
            Number(
                user.playerData.xp
            ) || 0;


        totalMissions +=
            Number(
                user.playerData.missionsCompleted
            ) || 0;


        totalCorrect +=
            Number(
                user.playerData.correctAnswers
            ) || 0;


        totalWrong +=
            Number(
                user.playerData.wrongAnswers
            ) || 0;


        const userBestStreak =
            Number(
                user.playerData.bestStreak
            ) || 0;


        if (
            userBestStreak >
            bestStreak
        ) {

            bestStreak =
                userBestStreak;

        }

    });


    const totalAnswers =
        totalCorrect +
        totalWrong;


    const averageAccuracy =
        totalAnswers > 0
            ? Math.round(
                (
                    totalCorrect /
                    totalAnswers
                ) * 100
            )
            : 0;


    setAdminText(
        "adminTotalUsers",
        totalUsers
    );


    setAdminText(
        "adminTotalXP",
        totalXP
    );


    setAdminText(
        "adminTotalMissions",
        totalMissions
    );


    setAdminText(
        "adminAverageAccuracy",
        averageAccuracy + "%"
    );


    setAdminText(
        "adminBestStreak",
        bestStreak
    );


    updateAdminUserMiniStats(
        accounts
    );


    updateAdminRecentActivity();


    updateAdminMissionPerformance(
        accounts
    );

}


/* =========================================================
   26. SAFE TEXT HELPER
========================================================= */

function setAdminText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   27. UPDATE USER MINI STATS
========================================================= */

function updateAdminUserMiniStats(
    accounts
) {

    if (!accounts) {

        accounts =
            getAdminAccounts();

    }


    let activeUsers = 0;

    let topUserXP = 0;

    let totalMissions = 0;


    accounts.forEach(user => {

        const xp =
            getAdminUserXP(user);


        const missions =
            getAdminUserMissions(user);


        totalMissions +=
            missions;


        if (
            xp >
            topUserXP
        ) {

            topUserXP =
                xp;

        }


        if (
            missions > 0
        ) {

            activeUsers++;

        }

    });


    setAdminText(
        "userTotalCount",
        accounts.length
    );


    setAdminText(
        "activeUserCount",
        activeUsers
    );


    setAdminText(
        "topUserXP",
        topUserXP
    );


    setAdminText(
        "userMissionCount",
        totalMissions
    );

}


/* =========================================================
   28. UPDATE ADMIN USERS SCREEN
========================================================= */

function updateAdminUsers() {

    const accounts =
        getAdminAccounts();


    updateAdminUserMiniStats(
        accounts
    );


    renderAdminUsers(
        accounts
    );

}


/* =========================================================
   29. RENDER USER TABLE
========================================================= */

function renderAdminUsers(
    accounts
) {

    const tableBody =
        document.getElementById(
            "adminUserTableBody"
        );


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    if (
        !accounts ||
        accounts.length === 0
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `
            <td colspan="9"
                style="text-align:center;padding:30px;">
                No CyberShield users found.
            </td>
        `;


        tableBody.appendChild(
            row
        );


        return;

    }


    accounts.forEach(
        (user, index) => {

            const row =
                document.createElement(
                    "tr"
                );


            const displayName =
                user.displayName ||
                "CyberShield User";


            const username =
                user.username ||
                "unknown";


            const avatar =
                user.avatar ||
                "🛡️";


            const level =
                getAdminUserLevel(
                    user
                );


            const xp =
                getAdminUserXP(
                    user
                );


            const missions =
                getAdminUserMissions(
                    user
                );


            const accuracy =
                getAdminUserAccuracy(
                    user
                );


            const status =
                missions > 0
                    ? "Active"
                    : "New";


            row.innerHTML = `
                <td>${index + 1}</td>

                <td>
                    <div class="admin-user-cell">

                        <div class="admin-table-avatar">
                            ${escapeAdminHTML(avatar)}
                        </div>

                        <div>
                            <strong>
                                ${escapeAdminHTML(displayName)}
                            </strong>

                            <small>
                                CyberShield Player
                            </small>
                        </div>

                    </div>
                </td>

                <td>
                    @${escapeAdminHTML(username)}
                </td>

                <td>
                    <span class="admin-level-badge">
                        ${level}
                    </span>
                </td>

                <td>
                    ${xp}
                </td>

                <td>
                    ${missions}
                </td>

                <td>
                    ${accuracy}%
                </td>

                <td>
                    <span class="admin-status ${getStatusClass(status)}">
                        ${status}
                    </span>
                </td>

                <td>
                    <button
                        class="admin-table-action"
                        type="button"
                        onclick="viewUserDetails('${escapeAdminAttribute(username)}')"
                    >
                        View
                    </button>
                </td>
            `;


            tableBody.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   30. ESCAPE HTML
========================================================= */

function escapeAdminHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


/* =========================================================
   31. ESCAPE HTML ATTRIBUTE
========================================================= */

function escapeAdminAttribute(
    value
) {

    return String(value)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        )
        .replace(
            /"/g,
            "&quot;"
        );

}


/* =========================================================
   32. GET STATUS CLASS
========================================================= */

function getStatusClass(
    status
) {

    if (
        status ===
        "Active"
    ) {

        return "active";

    }


    if (
        status ===
        "New"
    ) {

        return "new";

    }


    return "";

}


/* =========================================================
   33. SEARCH USERS
========================================================= */

function filterUsers() {

    const searchInput =
        document.getElementById(
            "userSearch"
        );


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const accounts =
        getAdminAccounts();


    if (!searchTerm) {

        renderAdminUsers(
            accounts
        );

        return;

    }


    const filteredUsers =
        accounts.filter(
            user => {

                const name =
                    String(
                        user.displayName ||
                        ""
                    ).toLowerCase();


                const username =
                    String(
                        user.username ||
                        ""
                    ).toLowerCase();


                return (
                    name.includes(
                        searchTerm
                    ) ||
                    username.includes(
                        searchTerm
                    )
                );

            }
        );


    renderAdminUsers(
        filteredUsers
    );

}


/* =========================================================
   34. SORT USERS
========================================================= */

function sortUsers() {

    const sortSelect =
        document.getElementById(
            "userSort"
        );


    const sortValue =
        sortSelect
            ? sortSelect.value
            : "newest";


    const accounts =
        getAdminAccounts();


    const sortedUsers =
        [...accounts];


    switch (sortValue) {

        case "xp":

            sortedUsers.sort(
                (
                    a,
                    b
                ) =>
                    getAdminUserXP(b) -
                    getAdminUserXP(a)
            );

            break;


        case "level":

            sortedUsers.sort(
                (
                    a,
                    b
                ) =>
                    getAdminUserLevel(b) -
                    getAdminUserLevel(a)
            );

            break;


        case "missions":

            sortedUsers.sort(
                (
                    a,
                    b
                ) =>
                    getAdminUserMissions(b) -
                    getAdminUserMissions(a)
            );

            break;


        case "accuracy":

            sortedUsers.sort(
                (
                    a,
                    b
                ) =>
                    getAdminUserAccuracy(b) -
                    getAdminUserAccuracy(a)
            );

            break;


        case "name":

            sortedUsers.sort(
                (
                    a,
                    b
                ) =>
                    String(
                        a.displayName ||
                        ""
                    ).localeCompare(
                        String(
                            b.displayName ||
                            ""
                        )
                    )
            );

            break;


        case "newest":

        default:

            sortedUsers.reverse();

            break;

    }


    renderAdminUsers(
        sortedUsers
    );

}


/* =========================================================
   35. VIEW USER DETAILS
========================================================= */

function viewUserDetails(
    username
) {

    const accounts =
        getAdminAccounts();


    const user =
        accounts.find(
            account =>
                account.username ===
                username
        );


    if (!user) {

        alert(
            "User account could not be found."
        );

        return;

    }


    const modal =
        document.getElementById(
            "userDetailsModal"
        );


    if (!modal) {

        return;

    }


    const playerData =
        user.playerData ||
        {};


    setAdminText(
        "modalUserAvatar",
        user.avatar || "🛡️"
    );


    setAdminText(
        "modalUserName",
        user.displayName ||
        "CyberShield User"
    );


    setAdminText(
        "modalUsername",
        "@" +
        (
            user.username ||
            "unknown"
        )
    );


    setAdminText(
        "modalUserLevel",
        getAdminUserLevel(user)
    );


    setAdminText(
        "modalUserXP",
        getAdminUserXP(user)
    );


    setAdminText(
        "modalUserMissions",
        getAdminUserMissions(user)
    );


    setAdminText(
        "modalUserAccuracy",
        getAdminUserAccuracy(user) +
        "%"
    );


    updateModalCategoryStats(
        playerData.categoryStats
    );


    updateModalUserBadges(
        playerData.badges
    );


    modal.classList.add(
        "active"
    );


    modal.style.display =
        "flex";


    addAdminActivity(
        "user",
        "Administrator viewed the profile of @" +
        (
            user.username ||
            "unknown"
        ) +
        "."
    );

}


/* =========================================================
   36. UPDATE MODAL CATEGORY STATS
========================================================= */

function updateModalCategoryStats(
    stats
) {

    const container =
        document.getElementById(
            "modalCategoryStats"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const categoryStats =
        stats || {};


    const categories = [
        "Phishing",
        "SMS Scam",
        "Password Security",
        "Social Engineering",
        "Web Safety"
    ];


    categories.forEach(
        category => {

            const value =
                Number(
                    categoryStats[
                        category
                    ]
                ) || 0;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "modal-category-item";


            item.innerHTML = `
                <span>
                    ${escapeAdminHTML(category)}
                </span>

                <strong>
                    ${value}
                </strong>
            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   37. UPDATE MODAL BADGES
========================================================= */

function updateModalUserBadges(
    badges
) {

    const container =
        document.getElementById(
            "modalUserBadges"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (
        !Array.isArray(
            badges
        ) ||
        badges.length === 0
    ) {

        container.innerHTML = `
            <div class="modal-no-badges">
                No badges earned yet.
            </div>
        `;

        return;

    }


    badges.forEach(
        badge => {

            const badgeElement =
                document.createElement(
                    "span"
                );


            badgeElement.className =
                "modal-earned-badge";


            badgeElement.textContent =
                badge;


            container.appendChild(
                badgeElement
            );

        }
    );

}


/* =========================================================
   38. UPDATE RECENT ACTIVITY
========================================================= */

function updateAdminRecentActivity() {

    const container =
        document.getElementById(
            "adminRecentActivity"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const logs =
        adminActivityLogs.slice(
            0,
            6
        );


    if (
        logs.length === 0
    ) {

        container.innerHTML = `
            <div class="admin-empty-state">
                <span>🛡️</span>
                <p>No recent activity.</p>
            </div>
        `;

        return;

    }


    logs.forEach(
        log => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-activity-item";


            item.innerHTML = `
                <div class="activity-icon">
                    ${getActivityIcon(log.type)}
                </div>

                <div class="activity-content">

                    <strong>
                        ${escapeAdminHTML(log.message)}
                    </strong>

                    <span>
                        ${escapeAdminHTML(
                            formatAdminTime(
                                log.timestamp
                            )
                        )}
                    </span>

                </div>
            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   39. ACTIVITY ICONS
========================================================= */

function getActivityIcon(
    type
) {

    const icons = {

        login: "🔐",

        user: "👤",

        mission: "🎯",

        achievement: "🏆",

        security: "🛡️",

        settings: "⚙️",

        analytics: "📊",

        system: "💻"

    };


    return (
        icons[type] ||
        "🔔"
    );

}


/* =========================================================
   40. UPDATE MISSION PERFORMANCE
========================================================= */

function updateAdminMissionPerformance(
    accounts
) {

    const container =
        document.getElementById(
            "adminMissionPerformance"
        );


    if (!container) {

        return;

    }


    const categoryTotals = {

        "Phishing": 0,

        "SMS Scam": 0,

        "Password Security": 0,

        "Social Engineering": 0,

        "Web Safety": 0

    };


    accounts.forEach(
        user => {

            if (
                !user.playerData ||
                !user.playerData.categoryStats
            ) {

                return;

            }


            const stats =
                user.playerData.categoryStats;


            Object.keys(
                categoryTotals
            ).forEach(
                category => {

                    categoryTotals[
                        category
                    ] +=
                        Number(
                            stats[category]
                        ) || 0;

                }
            );

        }
    );


    const maxValue =
        Math.max(
            ...Object.values(
                categoryTotals
            ),
            1
        );


    container.innerHTML = "";


    Object.entries(
        categoryTotals
    ).forEach(
        (
            [
                category,
                value
            ]
        ) => {

            const percentage =
                Math.round(
                    (
                        value /
                        maxValue
                    ) * 100
                );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "admin-performance-row";


            row.innerHTML = `
                <div class="performance-label">
                    <span>
                        ${escapeAdminHTML(category)}
                    </span>

                    <strong>
                        ${value}
                    </strong>
                </div>

                <div class="performance-bar">
                    <span
                        style="width:${percentage}%"
                    ></span>
                </div>
            `;


            container.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   41. END OF ADMIN.JS PART 2
========================================================= */
/* =========================================================
    CYBERSHIELD ADMIN DASHBOARD
    ADMIN.JS - PART 3
    Mission Management System
 ========================================================= */


/* =========================================================
   42. MISSION STORAGE KEY
========================================================= */

const ADMIN_MISSION_KEY =
    "cybershieldAdminMissions";


/* =========================================================
   43. DEFAULT ADMIN MISSIONS
========================================================= */

const defaultAdminMissions = [

    {
        id: 1,
        title: "The Suspicious Account Email",
        category: "Phishing",
        difficulty: "Beginner",
        xp: 25,
        active: true,
        scenario:
            "You receive an unexpected email claiming that your account needs immediate verification.",
        question:
            "What is the safest action?",
        options: [
            "Click the link immediately",
            "Verify the message through an official channel",
            "Reply with your password",
            "Forward it to everyone"
        ],
        correctAnswer: 1
    },


    {
        id: 2,
        title: "The Unexpected Attachment",
        category: "Phishing",
        difficulty: "Intermediate",
        xp: 35,
        active: true,
        scenario:
            "An unfamiliar sender sends you an attachment and asks you to open it urgently.",
        question:
            "What should you do first?",
        options: [
            "Open the attachment",
            "Download it to your phone",
            "Verify the sender and message independently",
            "Send it to a friend"
        ],
        correctAnswer: 2
    },


    {
        id: 3,
        title: "You Won a Prize!",
        category: "SMS Scam",
        difficulty: "Beginner",
        xp: 25,
        active: true,
        scenario:
            "A text message says you have won a prize and asks you to provide personal information.",
        question:
            "What should you do?",
        options: [
            "Send the requested information",
            "Verify the promotion using an official source",
            "Share the message online",
            "Give the sender your account details"
        ],
        correctAnswer: 1
    },


    {
        id: 4,
        title: "The Fake Delivery Message",
        category: "SMS Scam",
        difficulty: "Intermediate",
        xp: 35,
        active: true,
        scenario:
            "A message claims that a delivery cannot be completed unless you follow an unfamiliar link.",
        question:
            "What is the safest response?",
        options: [
            "Open the link",
            "Enter your information",
            "Check the delivery through the official service",
            "Reply asking for more information"
        ],
        correctAnswer: 2
    },


    {
        id: 5,
        title: "The Password Challenge",
        category: "Password Security",
        difficulty: "Beginner",
        xp: 25,
        active: true,
        scenario:
            "You are creating an account and need to choose a strong password.",
        question:
            "Which approach is safest?",
        options: [
            "Use the same password everywhere",
            "Use a short common password",
            "Use a strong unique password",
            "Use your name and birthday"
        ],
        correctAnswer: 2
    },


    {
        id: 6,
        title: "One Password Everywhere",
        category: "Password Security",
        difficulty: "Advanced",
        xp: 50,
        active: true,
        scenario:
            "A user has reused the same password across several accounts.",
        question:
            "What is the biggest security concern?",
        options: [
            "It is easier to remember",
            "A compromised password could affect multiple accounts",
            "The password is too long",
            "The account will automatically delete"
        ],
        correctAnswer: 1
    },


    {
        id: 7,
        title: "The Urgent IT Call",
        category: "Social Engineering",
        difficulty: "Intermediate",
        xp: 35,
        active: true,
        scenario:
            "Someone claiming to be from IT asks you to reveal confidential account information urgently.",
        question:
            "What should you do?",
        options: [
            "Provide the information",
            "Follow their instructions immediately",
            "Verify their identity through an official channel",
            "Give them your password"
        ],
        correctAnswer: 2
    },


    {
        id: 8,
        title: "The Pressure Tactic",
        category: "Social Engineering",
        difficulty: "Advanced",
        xp: 50,
        active: true,
        scenario:
            "A person pressures you to make a quick security decision without giving you time to verify the request.",
        question:
            "What is the safest response?",
        options: [
            "Act immediately",
            "Pause and verify the request",
            "Share private information",
            "Ignore all security warnings"
        ],
        correctAnswer: 1
    },


    {
        id: 9,
        title: "The Suspicious Website",
        category: "Web Safety",
        difficulty: "Intermediate",
        xp: 35,
        active: true,
        scenario:
            "You find a website that looks similar to a familiar service but the address appears unusual.",
        question:
            "What should you do?",
        options: [
            "Enter your login details",
            "Check the website address and use an official source",
            "Download files from it",
            "Share your password"
        ],
        correctAnswer: 1
    },


    {
        id: 10,
        title: "The Fake Login Page",
        category: "Web Safety",
        difficulty: "Advanced",
        xp: 50,
        active: true,
        scenario:
            "A login page looks familiar but contains unusual spelling and an unfamiliar website address.",
        question:
            "What is the safest action?",
        options: [
            "Enter your password",
            "Try several passwords",
            "Leave the page and access the service through its official website",
            "Share the page with friends"
        ],
        correctAnswer: 2
    }

];


/* =========================================================
   44. LOAD ADMIN MISSIONS
========================================================= */

function loadAdminMissions() {

    const saved =
        localStorage.getItem(
            ADMIN_MISSION_KEY
        );


    if (!saved) {

        localStorage.setItem(
            ADMIN_MISSION_KEY,
            JSON.stringify(
                defaultAdminMissions
            )
        );

        return [
            ...defaultAdminMissions
        ];

    }


    try {

        const missions =
            JSON.parse(saved);


        if (
            Array.isArray(
                missions
            )
        ) {

            return missions;

        }

    } catch (error) {

        console.log(
            "Could not load admin missions."
        );

    }


    return [
        ...defaultAdminMissions
    ];

}


/* =========================================================
   45. SAVE ADMIN MISSIONS
========================================================= */

function saveAdminMissions(
    missions
) {

    localStorage.setItem(
        ADMIN_MISSION_KEY,
        JSON.stringify(
            missions
        )
    );

}


/* =========================================================
   46. UPDATE MISSION STATISTICS
========================================================= */

function updateAdminMissionStats() {

    const missions =
        loadAdminMissions();


    const total =
        missions.length;


    const active =
        missions.filter(
            mission =>
                mission.active !== false
        ).length;


    const intermediate =
        missions.filter(
            mission =>
                mission.difficulty ===
                "Intermediate"
        ).length;


    const advanced =
        missions.filter(
            mission =>
                mission.difficulty ===
                "Advanced"
        ).length;


    setAdminText(
        "adminMissionCount",
        total
    );


    setAdminText(
        "activeMissionCount",
        active
    );


    setAdminText(
        "intermediateMissionCount",
        intermediate
    );


    setAdminText(
        "advancedMissionCount",
        advanced
    );


    renderAdminMissionList();

}


/* =========================================================
   47. RENDER MISSION LIST
========================================================= */

function renderAdminMissionList() {

    const container =
        document.getElementById(
            "adminMissionList"
        );


    if (!container) {

        return;

    }


    const missions =
        loadAdminMissions();


    const searchInput =
        document.getElementById(
            "missionSearch"
        );


    const categoryFilter =
        document.getElementById(
            "missionCategoryFilter"
        );


    const difficultyFilter =
        document.getElementById(
            "missionDifficultyFilter"
        );


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const difficulty =
        difficultyFilter
            ? difficultyFilter.value
            : "all";


    const filtered =
        missions.filter(
            mission => {

                const title =
                    String(
                        mission.title ||
                        ""
                    ).toLowerCase();


                const missionCategory =
                    String(
                        mission.category ||
                        ""
                    );


                const missionDifficulty =
                    String(
                        mission.difficulty ||
                        ""
                    );


                const matchesSearch =
                    !searchTerm ||
                    title.includes(
                        searchTerm
                    );


                const matchesCategory =
                    category === "all" ||
                    missionCategory ===
                    category;


                const matchesDifficulty =
                    difficulty === "all" ||
                    missionDifficulty ===
                    difficulty;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesDifficulty
                );

            }
        );


    container.innerHTML = "";


    if (
        filtered.length === 0
    ) {

        container.innerHTML = `
            <div class="admin-empty-state">
                <span>🎯</span>
                <p>No missions match your filters.</p>
            </div>
        `;

        return;

    }


    filtered.forEach(
        mission => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "admin-mission-card";


            if (
                mission.active === false
            ) {

                card.classList.add(
                    "inactive"
                );

            }


            const options =
                Array.isArray(
                    mission.options
                )
                    ? mission.options
                    : [];


            card.innerHTML = `

                <div class="mission-card-header">

                    <div>

                        <span class="mission-id">
                            Mission #${mission.id}
                        </span>

                        <h3>
                            ${escapeAdminHTML(
                                mission.title
                            )}
                        </h3>

                    </div>

                    <span class="mission-status ${
                        mission.active === false
                            ? "inactive"
                            : "active"
                    }">

                        ${
                            mission.active === false
                                ? "Inactive"
                                : "Active"
                        }

                    </span>

                </div>


                <div class="mission-card-tags">

                    <span>
                        ${escapeAdminHTML(
                            mission.category
                        )}
                    </span>

                    <span>
                        ${escapeAdminHTML(
                            mission.difficulty
                        )}
                    </span>

                    <span>
                        ${Number(
                            mission.xp
                        ) || 0} XP
                    </span>

                </div>


                <p class="mission-description">
                    ${escapeAdminHTML(
                        mission.scenario ||
                        "No scenario available."
                    )}
                </p>


                <div class="mission-question">

                    <strong>
                        Question
                    </strong>

                    <p>
                        ${escapeAdminHTML(
                            mission.question ||
                            "No question available."
                        )}
                    </p>

                </div>


                <div class="mission-options">

                    ${
                        options
                            .map(
                                (
                                    option,
                                    optionIndex
                                ) => `

                                <div
                                    class="${
                                        optionIndex ===
                                        Number(
                                            mission.correctAnswer
                                        )
                                            ? "correct"
                                            : ""
                                    }"
                                >

                                    <span>
                                        ${
                                            optionIndex + 1
                                        }
                                    </span>

                                    ${escapeAdminHTML(
                                        option
                                    )}

                                </div>

                            `
                            )
                            .join("")
                    }

                </div>


                <div class="mission-card-actions">

                    <button
                        type="button"
                        class="admin-secondary-btn"
                        onclick="editMission(${mission.id})"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        type="button"
                        class="admin-secondary-btn"
                        onclick="toggleMissionStatus(${mission.id})"
                    >

                        ${
                            mission.active === false
                                ? "▶️ Activate"
                                : "⏸️ Disable"
                        }

                    </button>


                    <button
                        type="button"
                        class="admin-danger-btn"
                        onclick="deleteMission(${mission.id})"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   48. SEARCH / FILTER MISSIONS
========================================================= */

function filterMissions() {

    renderAdminMissionList();

}


/* =========================================================
   49. EDIT MISSION
========================================================= */

function editMission(
    missionId
) {

    const missions =
        loadAdminMissions();


    const mission =
        missions.find(
            item =>
                Number(item.id) ===
                Number(missionId)
        );


    if (!mission) {

        alert(
            "Mission could not be found."
        );

        return;

    }


    const title =
        prompt(
            "Mission title:",
            mission.title
        );


    if (
        title === null
    ) {

        return;

    }


    const scenario =
        prompt(
            "Mission scenario:",
            mission.scenario
        );


    if (
        scenario === null
    ) {

        return;

    }


    const question =
        prompt(
            "Mission question:",
            mission.question
        );


    if (
        question === null
    ) {

        return;

    }


    mission.title =
        title.trim() ||
        mission.title;


    mission.scenario =
        scenario.trim() ||
        mission.scenario;


    mission.question =
        question.trim() ||
        mission.question;


    saveAdminMissions(
        missions
    );


    addAdminActivity(
        "mission",
        "Administrator edited mission #" +
        mission.id +
        "."
    );


    updateAdminMissionStats();

}


/* =========================================================
   50. TOGGLE MISSION STATUS
========================================================= */

function toggleMissionStatus(
    missionId
) {

    const missions =
        loadAdminMissions();


    const mission =
        missions.find(
            item =>
                Number(item.id) ===
                Number(missionId)
        );


    if (!mission) {

        return;

    }


    mission.active =
        mission.active === false;


    saveAdminMissions(
        missions
    );


    addAdminActivity(
        "mission",
        "Mission #" +
        mission.id +
        " was " +
        (
            mission.active
                ? "activated"
                : "disabled"
        ) +
        "."
    );


    updateAdminMissionStats();

}


/* =========================================================
   51. DELETE MISSION
========================================================= */

function deleteMission(
    missionId
) {

    const missions =
        loadAdminMissions();


    const mission =
        missions.find(
            item =>
                Number(item.id) ===
                Number(missionId)
        );


    if (!mission) {

        return;

    }


    const confirmed =
        confirm(
            "Delete mission #" +
            mission.id +
            "?\n\n" +
            "This action cannot be undone."
        );


    if (!confirmed) {

        return;

    }


    const updatedMissions =
        missions.filter(
            item =>
                Number(item.id) !==
                Number(missionId)
        );


    saveAdminMissions(
        updatedMissions
    );


    addAdminActivity(
        "mission",
        "Administrator deleted mission #" +
        mission.id +
        "."
    );


    updateAdminMissionStats();

}


/* =========================================================
   52. RESET DEFAULT MISSIONS
========================================================= */

function resetAdminMissions() {

    const confirmed =
        confirm(
            "Reset all missions to the original CyberShield missions?"
        );


    if (!confirmed) {

        return;

    }


    saveAdminMissions(
        defaultAdminMissions
    );


    addAdminActivity(
        "mission",
        "Administrator restored the default CyberShield missions."
    );


    updateAdminMissionStats();

}


/* =========================================================
   53. GET ACTIVE MISSIONS
========================================================= */

function getActiveAdminMissions() {

    return loadAdminMissions()
        .filter(
            mission =>
                mission.active !== false
        );

}


/* =========================================================
   54. MISSION CATEGORY COUNTS
========================================================= */

function getAdminMissionCategoryCounts() {

    const missions =
        loadAdminMissions();


    const counts = {

        "Phishing": 0,

        "SMS Scam": 0,

        "Password Security": 0,

        "Social Engineering": 0,

        "Web Safety": 0

    };


    missions.forEach(
        mission => {

            if (
                Object.prototype.hasOwnProperty.call(
                    counts,
                    mission.category
                )
            ) {

                counts[
                    mission.category
                ]++;

            }

        }
    );


    return counts;

}


/* =========================================================
   55. INITIALIZE MISSION MANAGEMENT
========================================================= */

function initializeAdminMissionManagement() {

    loadAdminMissions();


    const searchInput =
        document.getElementById(
            "missionSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterMissions
        );

    }


    const categoryFilter =
        document.getElementById(
            "missionCategoryFilter"
        );


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterMissions
        );

    }


    const difficultyFilter =
        document.getElementById(
            "missionDifficultyFilter"
        );


    if (difficultyFilter) {

        difficultyFilter.addEventListener(
            "change",
            filterMissions
        );

    }

}


/* =========================================================
   56. EXTEND ADMIN INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdminMissionManagement();

    }
);


/* =========================================================
   END OF ADMIN.JS PART 3
========================================================= */
/* =========================================================
   CYBERSHIELD ADMIN DASHBOARD
   ADMIN.JS - PART 4
   Achievements + Analytics
========================================================= */


/* =========================================================
   57. ACHIEVEMENT STORAGE KEY
========================================================= */

const ADMIN_ACHIEVEMENT_KEY =
    "cybershieldAdminAchievements";


/* =========================================================
   58. DEFAULT ACHIEVEMENTS
========================================================= */

const defaultAdminAchievements = [

    {
        id: 1,
        name: "Phishing Hunter",
        icon: "🎣",
        description:
            "Complete your first phishing mission.",
        requirement:
            "Complete 1 phishing mission.",
        active: true
    },


    {
        id: 2,
        name: "Scam Spotter",
        icon: "📱",
        description:
            "Complete your first SMS scam mission.",
        requirement:
            "Complete 1 SMS scam mission.",
        active: true
    },


    {
        id: 3,
        name: "Password Guardian",
        icon: "🔐",
        description:
            "Complete password security missions.",
        requirement:
            "Complete 2 password security missions.",
        active: true
    },


    {
        id: 4,
        name: "Web Defender",
        icon: "🌐",
        description:
            "Complete web safety missions.",
        requirement:
            "Complete 2 web safety missions.",
        active: true
    },


    {
        id: 5,
        name: "Cyber Defender",
        icon: "🛡️",
        description:
            "Build your cybersecurity experience.",
        requirement:
            "Complete 5 missions.",
        active: true
    },


    {
        id: 6,
        name: "Cyber Expert",
        icon: "🏆",
        description:
            "Become an experienced CyberShield player.",
        requirement:
            "Reach Level 5.",
        active: true
    }

];


/* =========================================================
   59. LOAD ACHIEVEMENTS
========================================================= */

function loadAdminAchievements() {

    const saved =
        localStorage.getItem(
            ADMIN_ACHIEVEMENT_KEY
        );


    if (!saved) {

        localStorage.setItem(
            ADMIN_ACHIEVEMENT_KEY,
            JSON.stringify(
                defaultAdminAchievements
            )
        );


        return [
            ...defaultAdminAchievements
        ];

    }


    try {

        const achievements =
            JSON.parse(saved);


        if (
            Array.isArray(
                achievements
            )
        ) {

            return achievements;

        }

    } catch (error) {

        console.log(
            "Could not load achievements."
        );

    }


    return [
        ...defaultAdminAchievements
    ];

}


/* =========================================================
   60. SAVE ACHIEVEMENTS
========================================================= */

function saveAdminAchievements(
    achievements
) {

    localStorage.setItem(
        ADMIN_ACHIEVEMENT_KEY,
        JSON.stringify(
            achievements
        )
    );

}


/* =========================================================
   61. UPDATE ACHIEVEMENTS SCREEN
========================================================= */

function updateAdminAchievements() {

    const achievements =
        loadAdminAchievements();


    renderAdminAchievements(
        achievements
    );

}


/* =========================================================
   62. RENDER ACHIEVEMENT CARDS
========================================================= */

function renderAdminAchievements(
    achievements
) {

    const container =
        document.getElementById(
            "adminAchievementList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (
        !achievements ||
        achievements.length === 0
    ) {

        container.innerHTML = `
            <div class="admin-empty-state">

                <span>🏆</span>

                <p>
                    No achievements available.
                </p>

            </div>
        `;

        return;

    }


    achievements.forEach(
        achievement => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "admin-achievement-card";


            if (
                achievement.active === false
            ) {

                card.classList.add(
                    "inactive"
                );

            }


            card.innerHTML = `

                <div class="achievement-card-icon">

                    ${escapeAdminHTML(
                        achievement.icon ||
                        "🏆"
                    )}

                </div>


                <div class="achievement-card-content">

                    <div class="achievement-card-header">

                        <div>

                            <span class="achievement-id">
                                Achievement #${achievement.id}
                            </span>

                            <h3>
                                ${escapeAdminHTML(
                                    achievement.name
                                )}
                            </h3>

                        </div>


                        <span class="achievement-status ${
                            achievement.active === false
                                ? "inactive"
                                : "active"
                        }">

                            ${
                                achievement.active === false
                                    ? "Inactive"
                                    : "Active"
                            }

                        </span>

                    </div>


                    <p>
                        ${escapeAdminHTML(
                            achievement.description ||
                            "No description available."
                        )}
                    </p>


                    <div class="achievement-requirement">

                        <strong>
                            Requirement
                        </strong>

                        <span>
                            ${escapeAdminHTML(
                                achievement.requirement ||
                                "No requirement specified."
                            )}
                        </span>

                    </div>


                    <div class="achievement-card-actions">

                        <button
                            type="button"
                            class="admin-secondary-btn"
                            onclick="editAchievement(${achievement.id})"
                        >
                            ✏️ Edit
                        </button>


                        <button
                            type="button"
                            class="admin-secondary-btn"
                            onclick="toggleAchievementStatus(${achievement.id})"
                        >

                            ${
                                achievement.active === false
                                    ? "▶️ Activate"
                                    : "⏸️ Disable"
                            }

                        </button>


                        <button
                            type="button"
                            class="admin-danger-btn"
                            onclick="deleteAchievement(${achievement.id})"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   63. EDIT ACHIEVEMENT
========================================================= */

function editAchievement(
    achievementId
) {

    const achievements =
        loadAdminAchievements();


    const achievement =
        achievements.find(
            item =>
                Number(item.id) ===
                Number(achievementId)
        );


    if (!achievement) {

        alert(
            "Achievement could not be found."
        );

        return;

    }


    const name =
        prompt(
            "Achievement name:",
            achievement.name
        );


    if (
        name === null
    ) {

        return;

    }


    const description =
        prompt(
            "Achievement description:",
            achievement.description
        );


    if (
        description === null
    ) {

        return;

    }


    const requirement =
        prompt(
            "Achievement requirement:",
            achievement.requirement
        );


    if (
        requirement === null
    ) {

        return;

    }


    achievement.name =
        name.trim() ||
        achievement.name;


    achievement.description =
        description.trim() ||
        achievement.description;


    achievement.requirement =
        requirement.trim() ||
        achievement.requirement;


    saveAdminAchievements(
        achievements
    );


    addAdminActivity(
        "achievement",
        "Administrator edited achievement #" +
        achievement.id +
        "."
    );


    updateAdminAchievements();

}


/* =========================================================
   64. TOGGLE ACHIEVEMENT STATUS
========================================================= */

function toggleAchievementStatus(
    achievementId
) {

    const achievements =
        loadAdminAchievements();


    const achievement =
        achievements.find(
            item =>
                Number(item.id) ===
                Number(achievementId)
        );


    if (!achievement) {

        return;

    }


    achievement.active =
        achievement.active === false;


    saveAdminAchievements(
        achievements
    );


    addAdminActivity(
        "achievement",
        "Achievement #" +
        achievement.id +
        " was " +
        (
            achievement.active
                ? "activated"
                : "disabled"
        ) +
        "."
    );


    updateAdminAchievements();

}


/* =========================================================
   65. DELETE ACHIEVEMENT
========================================================= */

function deleteAchievement(
    achievementId
) {

    const achievements =
        loadAdminAchievements();


    const achievement =
        achievements.find(
            item =>
                Number(item.id) ===
                Number(achievementId)
        );


    if (!achievement) {

        return;

    }


    const confirmed =
        confirm(
            "Delete achievement #" +
            achievement.id +
            "?\n\n" +
            "This action cannot be undone."
        );


    if (!confirmed) {

        return;

    }


    const updatedAchievements =
        achievements.filter(
            item =>
                Number(item.id) !==
                Number(achievementId)
        );


    saveAdminAchievements(
        updatedAchievements
    );


    addAdminActivity(
        "achievement",
        "Administrator deleted achievement #" +
        achievement.id +
        "."
    );


    updateAdminAchievements();

}


/* =========================================================
   66. RESET ACHIEVEMENTS
========================================================= */

function resetAdminAchievements() {

    const confirmed =
        confirm(
            "Restore the original CyberShield achievements?"
        );


    if (!confirmed) {

        return;

    }


    saveAdminAchievements(
        defaultAdminAchievements
    );


    addAdminActivity(
        "achievement",
        "Administrator restored the default achievements."
    );


    updateAdminAchievements();

}


/* =========================================================
   67. UPDATE ANALYTICS
========================================================= */

function updateAdminAnalytics() {

    const accounts =
        getAdminAccounts();


    let totalMissions = 0;

    let totalCorrect = 0;

    let totalWrong = 0;

    let bestStreak = 0;


    accounts.forEach(
        user => {

            if (
                !user.playerData
            ) {

                return;

            }


            totalMissions +=
                Number(
                    user.playerData.missionsCompleted
                ) || 0;


            totalCorrect +=
                Number(
                    user.playerData.correctAnswers
                ) || 0;


            totalWrong +=
                Number(
                    user.playerData.wrongAnswers
                ) || 0;


            const streak =
                Number(
                    user.playerData.bestStreak
                ) || 0;


            if (
                streak >
                bestStreak
            ) {

                bestStreak =
                    streak;

            }

        }
    );


    const totalAnswers =
        totalCorrect +
        totalWrong;


    const completionRate =
        accounts.length > 0
            ? Math.round(
                (
                    accounts.filter(
                        user =>
                            getAdminUserMissions(
                                user
                            ) > 0
                    ).length /
                    accounts.length
                ) * 100
            )
            : 0;


    setAdminText(
        "analyticsCompletionRate",
        completionRate + "%"
    );


    setAdminText(
        "analyticsCorrectAnswers",
        totalCorrect
    );


    setAdminText(
        "analyticsWrongAnswers",
        totalWrong
    );


    setAdminText(
        "analyticsBestStreak",
        bestStreak
    );


    updateAnalyticsCategoryPerformance(
        accounts
    );


    updateLevelDistribution(
        accounts
    );

}


/* =========================================================
   68. CATEGORY ANALYTICS
========================================================= */

function updateAnalyticsCategoryPerformance(
    accounts
) {

    const container =
        document.getElementById(
            "analyticsCategoryPerformance"
        );


    if (!container) {

        return;

    }


    const categories = [

        "Phishing",

        "SMS Scam",

        "Password Security",

        "Social Engineering",

        "Web Safety"

    ];


    const categoryData = {};


    categories.forEach(
        category => {

            categoryData[
                category
            ] = {

                completed: 0,

                users: 0

            };

        }
    );


    accounts.forEach(
        user => {

            if (
                !user.playerData ||
                !user.playerData.categoryStats
            ) {

                return;

            }


            const stats =
                user.playerData.categoryStats;


            categories.forEach(
                category => {

                    const value =
                        Number(
                            stats[category]
                        ) || 0;


                    categoryData[
                        category
                    ].completed +=
                        value;


                    if (
                        value > 0
                    ) {

                        categoryData[
                            category
                        ].users++;

                    }

                }
            );

        }
    );


    const maxCompleted =
        Math.max(
            ...categories.map(
                category =>
                    categoryData[
                        category
                    ].completed
            ),
            1
        );


    container.innerHTML = "";


    categories.forEach(
        category => {

            const data =
                categoryData[
                    category
                ];


            const percentage =
                Math.round(
                    (
                        data.completed /
                        maxCompleted
                    ) * 100
                );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "analytics-category-row";


            row.innerHTML = `

                <div class="analytics-category-header">

                    <span>
                        ${escapeAdminHTML(
                            category
                        )}
                    </span>

                    <strong>
                        ${data.completed}
                    </strong>

                </div>


                <div class="analytics-category-bar">

                    <span
                        style="width:${percentage}%"
                    ></span>

                </div>


                <small>
                    ${data.users}
                    user${data.users === 1 ? "" : "s"}
                    participated
                </small>

            `;


            container.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   69. LEVEL DISTRIBUTION
========================================================= */

function updateLevelDistribution(
    accounts
) {

    const container =
        document.getElementById(
            "levelDistribution"
        );


    if (!container) {

        return;

    }


    const levels = {};


    accounts.forEach(
        user => {

            const level =
                getAdminUserLevel(
                    user
                );


            if (
                !levels[level]
            ) {

                levels[level] =
                    0;

            }


            levels[level]++;

        }
    );


    const sortedLevels =
        Object.keys(
            levels
        ).sort(
            (
                a,
                b
            ) =>
                Number(a) -
                Number(b)
        );


    container.innerHTML = "";


    if (
        sortedLevels.length === 0
    ) {

        container.innerHTML = `
            <div class="admin-empty-state">

                <span>📊</span>

                <p>
                    No level data available.
                </p>

            </div>
        `;

        return;

    }


    const highestCount =
        Math.max(
            ...sortedLevels.map(
                level =>
                    levels[level]
            ),
            1
        );


    sortedLevels.forEach(
        level => {

            const count =
                levels[level];


            const percentage =
                Math.round(
                    (
                        count /
                        highestCount
                    ) * 100
                );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "level-distribution-row";


            row.innerHTML = `

                <div class="level-distribution-label">

                    <span>
                        Level ${escapeAdminHTML(level)}
                    </span>

                    <strong>
                        ${count}
                    </strong>

                </div>


                <div class="level-distribution-bar">

                    <span
                        style="width:${percentage}%"
                    ></span>

                </div>

            `;


            container.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   70. REFRESH ANALYTICS BUTTON
========================================================= */

function refreshAnalytics() {

    updateAdminAnalytics();


    addAdminActivity(
        "analytics",
        "Administrator refreshed CyberShield analytics."
    );

}


/* =========================================================
   71. INITIALIZE ACHIEVEMENTS
========================================================= */

function initializeAdminAchievements() {

    loadAdminAchievements();

}


/* =========================================================
   72. EXTEND ADMIN INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdminAchievements();

    }
);


/* =========================================================
   END OF ADMIN.JS PART 4
========================================================= */
/* =========================================================
   CYBERSHIELD ADMIN DASHBOARD
   ADMIN.JS - PART 5
   Security Center + Activity Logs
========================================================= */


/* =========================================================
   73. UPDATE ADMIN SECURITY CENTER
========================================================= */

function updateAdminSecurity() {

    const accounts =
        getAdminAccounts();


    let totalCorrect = 0;

    let totalWrong = 0;

    let totalMissions = 0;

    let bestStreak = 0;


    const categoryTotals = {

        "Phishing": {
            completed: 0
        },

        "SMS Scam": {
            completed: 0
        },

        "Password Security": {
            completed: 0
        },

        "Social Engineering": {
            completed: 0
        },

        "Web Safety": {
            completed: 0
        }

    };


    accounts.forEach(
        user => {

            if (
                !user.playerData
            ) {

                return;

            }


            const data =
                user.playerData;


            totalCorrect +=
                Number(
                    data.correctAnswers
                ) || 0;


            totalWrong +=
                Number(
                    data.wrongAnswers
                ) || 0;


            totalMissions +=
                Number(
                    data.missionsCompleted
                ) || 0;


            const streak =
                Number(
                    data.bestStreak
                ) || 0;


            if (
                streak >
                bestStreak
            ) {

                bestStreak =
                    streak;

            }


            if (
                data.categoryStats
            ) {

                Object.keys(
                    categoryTotals
                ).forEach(
                    category => {

                        categoryTotals[
                            category
                        ].completed +=
                            Number(
                                data.categoryStats[
                                    category
                                ]
                            ) || 0;

                    }
                );

            }

        }
    );


    const totalAnswers =
        totalCorrect +
        totalWrong;


    const accuracy =
        totalAnswers > 0
            ? Math.round(
                (
                    totalCorrect /
                    totalAnswers
                ) * 100
            )
            : 0;


    /*
       Security score is based on:
       - Overall accuracy
       - Mission participation
       - Streak
    */

    let securityScore = 0;


    securityScore +=
        accuracy * 0.60;


    if (
        accounts.length > 0
    ) {

        const activeUsers =
            accounts.filter(
                user =>
                    getAdminUserMissions(
                        user
                    ) > 0
            ).length;


        const participation =
            (
                activeUsers /
                accounts.length
            ) * 100;


        securityScore +=
            participation * 0.25;

    }


    const streakScore =
        Math.min(
            bestStreak * 5,
            100
        );


    securityScore +=
        streakScore * 0.15;


    securityScore =
        Math.round(
            Math.min(
                securityScore,
                100
            )
        );


    setAdminText(
        "adminSecurityScoreLarge",
        securityScore
    );


    const scoreFill =
        document.getElementById(
            "adminSecurityScoreFill"
        );


    if (scoreFill) {

        scoreFill.style.width =
            securityScore + "%";

    }


    const rating =
        getSecurityRating(
            securityScore
        );


    setAdminText(
        "adminSecurityRating",
        rating
    );


    updateSecurityIndicators(
        categoryTotals,
        accounts
    );


    updateSecurityAlerts(
        accounts,
        totalCorrect,
        totalWrong
    );

}


/* =========================================================
   74. SECURITY RATING
========================================================= */

function getSecurityRating(
    score
) {

    if (
        score >= 90
    ) {

        return "Excellent";

    }


    if (
        score >= 75
    ) {

        return "Strong";

    }


    if (
        score >= 60
    ) {

        return "Good";

    }


    if (
        score >= 40
    ) {

        return "Needs Improvement";

    }


    return "At Risk";

}


/* =========================================================
   75. SECURITY CATEGORY INDICATORS
========================================================= */

function updateSecurityIndicators(
    categoryTotals,
    accounts
) {

    const categories = [

        {
            name: "Phishing",
            element: "adminPhishingScore"
        },

        {
            name: "SMS Scam",
            element: "adminScamScore"
        },

        {
            name: "Password Security",
            element: "adminPasswordScore"
        },

        {
            name: "Web Safety",
            element: "adminWebScore"
        }

    ];


    categories.forEach(
        category => {

            const completed =
                categoryTotals[
                    category.name
                ]
                    ? categoryTotals[
                        category.name
                    ].completed
                    : 0;


            let score = 0;


            if (
                accounts.length > 0
            ) {

                const participation =
                    accounts.filter(
                        user => {

                            if (
                                !user.playerData ||
                                !user.playerData.categoryStats
                            ) {

                                return false;

                            }


                            return (
                                Number(
                                    user.playerData
                                        .categoryStats[
                                            category.name
                                        ]
                                ) > 0
                            );

                        }
                    ).length;


                score =
                    Math.round(
                        (
                            participation /
                            accounts.length
                        ) * 100
                    );

            }


            /*
               Add mission activity as a small
               supporting factor.
            */

            if (
                completed > 0
            ) {

                score =
                    Math.min(
                        100,
                        score + 10
                    );

            }


            setAdminText(
                category.element,
                score + "%"
            );

        }
    );

}


/* =========================================================
   76. SECURITY ALERTS
========================================================= */

function updateSecurityAlerts(
    accounts,
    totalCorrect,
    totalWrong
) {

    const container =
        document.getElementById(
            "securityAlerts"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const alerts = [];


    /*
       Alert 1:
       Users who have started but
       have no correct answers.
    */

    accounts.forEach(
        user => {

            if (
                !user.playerData
            ) {

                return;

            }


            const correct =
                Number(
                    user.playerData.correctAnswers
                ) || 0;


            const wrong =
                Number(
                    user.playerData.wrongAnswers
                ) || 0;


            if (
                wrong >= 3 &&
                correct === 0
            ) {

                alerts.push({

                    type: "warning",

                    icon: "⚠️",

                    message:
                        "@" +
                        (
                            user.username ||
                            "unknown"
                        ) +
                        " may need additional cybersecurity practice."

                });

            }

        }
    );


    /*
       Alert 2:
       Overall accuracy is low.
    */

    const totalAnswers =
        totalCorrect +
        totalWrong;


    const overallAccuracy =
        totalAnswers > 0
            ? Math.round(
                (
                    totalCorrect /
                    totalAnswers
                ) * 100
            )
            : 0;


    if (
        totalAnswers > 0 &&
        overallAccuracy < 50
    ) {

        alerts.push({

            type: "danger",

            icon: "🚨",

            message:
                "Overall learner accuracy is below 50%. Consider reviewing beginner security lessons."

        });

    }


    /*
       Alert 3:
       No users.
    */

    if (
        accounts.length === 0
    ) {

        alerts.push({

            type: "info",

            icon: "ℹ️",

            message:
                "No CyberShield user accounts have been created yet."

        });

    }


    /*
       If there are no alerts.
    */

    if (
        alerts.length === 0
    ) {

        container.innerHTML = `

            <div class="security-alert success">

                <div class="security-alert-icon">
                    🛡️
                </div>

                <div>
                    <strong>
                        No major security concerns
                    </strong>

                    <p>
                        CyberShield currently has no major learner-performance alerts.
                    </p>
                </div>

            </div>

        `;

        return;

    }


    alerts.slice(
        0,
        8
    ).forEach(
        alert => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "security-alert " +
                alert.type;


            element.innerHTML = `

                <div class="security-alert-icon">
                    ${alert.icon}
                </div>

                <div>

                    <strong>
                        Security Notice
                    </strong>

                    <p>
                        ${escapeAdminHTML(
                            alert.message
                        )}
                    </p>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   77. UPDATE ACTIVITY LOGS
========================================================= */

function updateAdminActivityLogs() {

    const container =
        document.getElementById(
            "adminActivityLogList"
        );


    if (!container) {

        return;

    }


    renderAdminActivityLogs(
        adminActivityLogs
    );

}


/* =========================================================
   78. RENDER ACTIVITY LOGS
========================================================= */

function renderAdminActivityLogs(
    logs
) {

    const container =
        document.getElementById(
            "adminActivityLogList"
        );


    if (!container) {

        return;

    }


    const searchInput =
        document.getElementById(
            "activitySearch"
        );


    const filterSelect =
        document.getElementById(
            "activityFilter"
        );


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const filter =
        filterSelect
            ? filterSelect.value
            : "all";


    const filteredLogs =
        logs.filter(
            log => {

                const message =
                    String(
                        log.message ||
                        ""
                    ).toLowerCase();


                const type =
                    String(
                        log.type ||
                        ""
                    );


                const matchesSearch =
                    !searchTerm ||
                    message.includes(
                        searchTerm
                    );


                const matchesFilter =
                    filter === "all" ||
                    type === filter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    container.innerHTML = "";


    if (
        filteredLogs.length === 0
    ) {

        container.innerHTML = `

            <div class="admin-empty-state">

                <span>📋</span>

                <p>
                    No activity logs found.
                </p>

            </div>

        `;

        return;

    }


    filteredLogs.forEach(
        log => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-log-item";


            item.innerHTML = `

                <div class="admin-log-icon">

                    ${getActivityIcon(
                        log.type
                    )}

                </div>


                <div class="admin-log-content">

                    <strong>
                        ${escapeAdminHTML(
                            log.message
                        )}
                    </strong>


                    <span>
                        ${escapeAdminHTML(
                            formatAdminTime(
                                log.timestamp
                            )
                        )}
                    </span>

                </div>


                <div class="admin-log-type">

                    ${escapeAdminHTML(
                        log.type ||
                        "system"
                    )}

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   79. FILTER ACTIVITY LOGS
========================================================= */

function filterActivityLogs() {

    renderAdminActivityLogs(
        adminActivityLogs
    );

}


/* =========================================================
   80. REFRESH ACTIVITY LOGS
========================================================= */

function refreshActivityLogs() {

    renderAdminActivityLogs(
        adminActivityLogs
    );


    addAdminActivity(
        "system",
        "Administrator refreshed the activity logs."
    );

}


/* =========================================================
   81. CLEAR ACTIVITY LOGS
========================================================= */

function clearAdminActivityLogs() {

    const confirmed =
        confirm(
            "Clear all administrator activity logs?\n\n" +
            "This action cannot be undone."
        );


    if (!confirmed) {

        return;

    }


    adminActivityLogs = [];


    saveAdminData();


    updateAdminActivityLogs();


    /*
       Do not add another log here because
       the log has just been cleared.
    */

}


/* =========================================================
   82. INITIALIZE SECURITY CENTER
========================================================= */

function initializeAdminSecurity() {

    const activitySearch =
        document.getElementById(
            "activitySearch"
        );


    if (activitySearch) {

        activitySearch.addEventListener(
            "input",
            filterActivityLogs
        );

    }


    const activityFilter =
        document.getElementById(
            "activityFilter"
        );


    if (activityFilter) {

        activityFilter.addEventListener(
            "change",
            filterActivityLogs
        );

    }

}


/* =========================================================
   83. EXTEND ADMIN INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdminSecurity();

    }
);


/* =========================================================
   END OF ADMIN.JS PART 5
========================================================= */
/* =========================================================
   CYBERSHIELD ADMIN DASHBOARD
   ADMIN.JS - PART 6
   Admin Settings + Preferences + Data Management
========================================================= */


/* =========================================================
   84. LOAD ADMIN SETTINGS INTO FORM
========================================================= */

function loadAdminSettings() {

    const nameInput =
        document.getElementById(
            "adminSettingsName"
        );


    const usernameInput =
        document.getElementById(
            "adminSettingsUsername"
        );


    const liveActivityToggle =
        document.getElementById(
            "liveActivityToggle"
        );


    const securityToggle =
        document.getElementById(
            "securityNotificationToggle"
        );


    const analyticsToggle =
        document.getElementById(
            "analyticsToggle"
        );


    if (nameInput) {

        nameInput.value =
            adminSettings.name ||
            "";

    }


    if (usernameInput) {

        usernameInput.value =
            adminSettings.username ||
            "";

    }


    if (liveActivityToggle) {

        liveActivityToggle.checked =
            adminSettings.liveActivity !== false;

    }


    if (securityToggle) {

        securityToggle.checked =
            adminSettings.securityNotifications !== false;

    }


    if (analyticsToggle) {

        analyticsToggle.checked =
            adminSettings.analytics !== false;

    }

}


/* =========================================================
   85. SAVE ADMIN SETTINGS
========================================================= */

function saveAdminSettings() {

    const nameInput =
        document.getElementById(
            "adminSettingsName"
        );


    const usernameInput =
        document.getElementById(
            "adminSettingsUsername"
        );


    const liveActivityToggle =
        document.getElementById(
            "liveActivityToggle"
        );


    const securityToggle =
        document.getElementById(
            "securityNotificationToggle"
        );


    const analyticsToggle =
        document.getElementById(
            "analyticsToggle"
        );


    const message =
        document.getElementById(
            "adminSettingsMessage"
        );


    const newName =
        nameInput
            ? nameInput.value.trim()
            : adminSettings.name;


    const newUsername =
        usernameInput
            ? usernameInput.value
                .trim()
                .toLowerCase()
            : adminSettings.username;


    if (!newName) {

        if (message) {

            message.textContent =
                "Administrator name cannot be empty.";

            message.className =
                "admin-settings-message error";

        }

        return;

    }


    if (
        newUsername.length < 3
    ) {

        if (message) {

            message.textContent =
                "Username must be at least 3 characters.";

            message.className =
                "admin-settings-message error";

        }

        return;

    }


    adminSettings.name =
        newName;


    adminSettings.username =
        newUsername;


    adminSettings.liveActivity =
        liveActivityToggle
            ? liveActivityToggle.checked
            : true;


    adminSettings.securityNotifications =
        securityToggle
            ? securityToggle.checked
            : true;


    adminSettings.analytics =
        analyticsToggle
            ? analyticsToggle.checked
            : true;


    saveAdminData();


    updateAdminProfile();


    if (message) {

        message.textContent =
            "Admin settings saved successfully.";

        message.className =
            "admin-settings-message success";

    }


    addAdminActivity(
        "settings",
        "Administrator updated dashboard settings."
    );

}


/* =========================================================
   86. RESET ADMIN SETTINGS
========================================================= */

function resetAdminSettings() {

    const confirmed =
        confirm(
            "Reset administrator settings to their defaults?"
        );


    if (!confirmed) {

        return;

    }


    adminSettings = {

        name:
            "CyberShield Administrator",

        username:
            ADMIN_USERNAME,

        liveActivity:
            true,

        securityNotifications:
            true,

        analytics:
            true

    };


    saveAdminData();


    loadAdminSettings();


    updateAdminProfile();


    addAdminActivity(
        "settings",
        "Administrator restored default dashboard settings."
    );


    const message =
        document.getElementById(
            "adminSettingsMessage"
        );


    if (message) {

        message.textContent =
            "Default settings restored.";

        message.className =
            "admin-settings-message success";

    }

}


/* =========================================================
   87. EXPORT ADMIN DATA
========================================================= */

function exportAdminData() {

    const accounts =
        getAdminAccounts();


    const missions =
        loadAdminMissions();


    const achievements =
        loadAdminAchievements();


    const exportData = {

        exportedAt:
            new Date().toISOString(),


        application:
            "CyberShield",


        version:
            "1.0",


        administrator: {

            name:
                adminSettings.name,

            username:
                adminSettings.username

        },


        statistics: {

            totalUsers:
                accounts.length,

            totalMissions:
                missions.length,

            activeMissions:
                missions.filter(
                    mission =>
                        mission.active !== false
                ).length,

            totalAchievements:
                achievements.length

        },


        users:
            accounts.map(
                user => ({

                    displayName:
                        user.displayName ||
                        "",

                    username:
                        user.username ||
                        "",

                    avatar:
                        user.avatar ||
                        "🛡️",

                    playerData:
                        user.playerData ||
                        {}

                })
            ),


        missions:
            missions,


        achievements:
            achievements,


        activityLogs:
            adminActivityLogs

    };


    const json =
        JSON.stringify(
            exportData,
            null,
            4
        );


    const blob =
        new Blob(
            [
                json
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "cybershield-admin-data.json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


    addAdminActivity(
        "system",
        "Administrator exported CyberShield dashboard data."
    );

}


/* =========================================================
   88. EXPORT USERS ONLY
========================================================= */

function exportAdminUsers() {

    const accounts =
        getAdminAccounts();


    const users =
        accounts.map(
            user => ({

                displayName:
                    user.displayName ||
                    "",

                username:
                    user.username ||
                    "",

                avatar:
                    user.avatar ||
                    "🛡️",

                level:
                    getAdminUserLevel(
                        user
                    ),

                xp:
                    getAdminUserXP(
                        user
                    ),

                missions:
                    getAdminUserMissions(
                        user
                    ),

                accuracy:
                    getAdminUserAccuracy(
                        user
                    )

            })
        );


    const blob =
        new Blob(
            [
                JSON.stringify(
                    users,
                    null,
                    4
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "cybershield-users.json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


    addAdminActivity(
        "user",
        "Administrator exported CyberShield user data."
    );

}


/* =========================================================
   89. EXPORT MISSIONS ONLY
========================================================= */

function exportAdminMissions() {

    const missions =
        loadAdminMissions();


    const blob =
        new Blob(
            [
                JSON.stringify(
                    missions,
                    null,
                    4
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "cybershield-missions.json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


    addAdminActivity(
        "mission",
        "Administrator exported CyberShield mission data."
    );

}


/* =========================================================
   90. EXPORT ACHIEVEMENTS ONLY
========================================================= */

function exportAdminAchievements() {

    const achievements =
        loadAdminAchievements();


    const blob =
        new Blob(
            [
                JSON.stringify(
                    achievements,
                    null,
                    4
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "cybershield-achievements.json";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


    addAdminActivity(
        "achievement",
        "Administrator exported CyberShield achievement data."
    );

}


/* =========================================================
   91. CLEAR ALL CYBERSHIELD DATA
========================================================= */

function clearAllCyberShieldData() {

    const firstConfirm =
        confirm(
            "WARNING:\n\n" +
            "This will permanently remove CyberShield users, " +
            "missions, achievements, and administrator activity data " +
            "stored in this browser.\n\n" +
            "Continue?"
        );


    if (!firstConfirm) {

        return;

    }


    const secondConfirm =
        confirm(
            "Are you absolutely sure?\n\n" +
            "This action cannot be undone."
        );


    if (!secondConfirm) {

        return;

    }


    localStorage.removeItem(
        ADMIN_ACCOUNT_KEY
    );


    localStorage.removeItem(
        ADMIN_MISSION_KEY
    );


    localStorage.removeItem(
        ADMIN_ACHIEVEMENT_KEY
    );


    localStorage.removeItem(
        ADMIN_ACTIVITY_KEY
    );


    /*
       Keep administrator settings and
       login state intact.
    */


    adminActivityLogs = [];


    addAdminActivity(
        "system",
        "CyberShield user, mission, and achievement data was cleared."
    );


    alert(
        "CyberShield application data has been cleared."
    );


    updateAdminOverview();

    updateAdminUsers();

    updateAdminMissionStats();

    updateAdminAchievements();

    updateAdminAnalytics();

    updateAdminSecurity();

}


/* =========================================================
   92. CONFIRM DATA RESET
========================================================= */

function resetCyberShieldData() {

    const confirmed =
        confirm(
            "Reset CyberShield to its original demo state?\n\n" +
            "This will remove current users and restore the " +
            "default missions and achievements."
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        ADMIN_ACCOUNT_KEY
    );


    saveAdminMissions(
        defaultAdminMissions
    );


    saveAdminAchievements(
        defaultAdminAchievements
    );


    adminActivityLogs = [];


    saveAdminData();


    addAdminActivity(
        "system",
        "Administrator reset CyberShield to the default demo state."
    );


    alert(
        "CyberShield has been restored to the default demo state."
    );


    updateAdminOverview();

    updateAdminUsers();

    updateAdminMissionStats();

    updateAdminAchievements();

    updateAdminAnalytics();

    updateAdminSecurity();

}


/* =========================================================
   93. CHECK PREFERENCE STATUS
========================================================= */

function isAdminPreferenceEnabled(
    preference
) {

    switch (preference) {

        case "liveActivity":

            return (
                adminSettings.liveActivity !==
                false
            );


        case "securityNotifications":

            return (
                adminSettings.securityNotifications !==
                false
            );


        case "analytics":

            return (
                adminSettings.analytics !==
                false
            );


        default:

            return false;

    }

}


/* =========================================================
   94. SETTINGS MESSAGE HELPER
========================================================= */

function showAdminSettingsMessage(
    text,
    type = "success"
) {

    const message =
        document.getElementById(
            "adminSettingsMessage"
        );


    if (!message) {

        return;

    }


    message.textContent =
        text;


    message.className =
        "admin-settings-message " +
        type;


    setTimeout(
        () => {

            message.textContent =
                "";

        },
        3500
    );

}


/* =========================================================
   95. INITIALIZE ADMIN SETTINGS
========================================================= */

function initializeAdminSettings() {

    loadAdminSettings();

}


/* =========================================================
   96. EXTEND ADMIN INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdminSettings();

    }
);


/* =========================================================
   END OF ADMIN.JS PART 6
========================================================= */
/* =========================================================
   CYBERSHIELD ADMIN DASHBOARD
   ADMIN.JS - PART 7
   Mission Creator + Achievement Creator + Final Setup
========================================================= */


/* =========================================================
   97. OPEN MISSION CREATOR
========================================================= */

function openMissionCreator() {

    const modal =
        document.getElementById(
            "missionCreatorModal"
        );


    const form =
        document.getElementById(
            "missionCreatorForm"
        );


    if (!modal) {

        return;

    }


    if (form) {

        form.reset();

    }


    modal.classList.add(
        "active"
    );


    modal.style.display =
        "flex";


    const titleInput =
        document.getElementById(
            "newMissionTitle"
        );


    if (titleInput) {

        setTimeout(
            () => {

                titleInput.focus();

            },
            100
        );

    }

}


/* =========================================================
   98. CLOSE MISSION CREATOR
========================================================= */

function closeMissionCreator() {

    const modal =
        document.getElementById(
            "missionCreatorModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    modal.style.display =
        "none";

}


/* =========================================================
   99. CREATE UNIQUE MISSION ID
========================================================= */

function generateMissionId(
    missions
) {

    if (
        !missions ||
        missions.length === 0
    ) {

        return 1;

    }


    const ids =
        missions.map(
            mission =>
                Number(
                    mission.id
                ) || 0
        );


    return (
        Math.max(
            ...ids
        ) + 1
    );

}


/* =========================================================
   100. CREATE NEW MISSION
========================================================= */

function createMission(
    event
) {

    event.preventDefault();


    const titleInput =
        document.getElementById(
            "newMissionTitle"
        );


    const categoryInput =
        document.getElementById(
            "newMissionCategory"
        );


    const difficultyInput =
        document.getElementById(
            "newMissionDifficulty"
        );


    const xpInput =
        document.getElementById(
            "newMissionXP"
        );


    const scenarioInput =
        document.getElementById(
            "newMissionScenario"
        );


    const questionInput =
        document.getElementById(
            "newMissionQuestion"
        );


    const option1Input =
        document.getElementById(
            "missionOption1"
        );


    const option2Input =
        document.getElementById(
            "missionOption2"
        );


    const option3Input =
        document.getElementById(
            "missionOption3"
        );


    const option4Input =
        document.getElementById(
            "missionOption4"
        );


    const correctInput =
        document.getElementById(
            "correctMissionOption"
        );


    const title =
        titleInput
            ? titleInput.value.trim()
            : "";


    const category =
        categoryInput
            ? categoryInput.value
            : "";


    const difficulty =
        difficultyInput
            ? difficultyInput.value
            : "";


    const xp =
        xpInput
            ? Number(
                xpInput.value
            )
            : 0;


    const scenario =
        scenarioInput
            ? scenarioInput.value.trim()
            : "";


    const question =
        questionInput
            ? questionInput.value.trim()
            : "";


    const options = [

        option1Input
            ? option1Input.value.trim()
            : "",

        option2Input
            ? option2Input.value.trim()
            : "",

        option3Input
            ? option3Input.value.trim()
            : "",

        option4Input
            ? option4Input.value.trim()
            : ""

    ];


    const correctAnswer =
        correctInput
            ? Number(
                correctInput.value
            )
            : -1;


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (!title) {

        alert(
            "Please enter a mission title."
        );

        return;

    }


    if (!category) {

        alert(
            "Please select a mission category."
        );

        return;

    }


    if (!difficulty) {

        alert(
            "Please select a mission difficulty."
        );

        return;

    }


    if (
        !Number.isFinite(xp) ||
        xp < 1
    ) {

        alert(
            "XP must be a number greater than 0."
        );

        return;

    }


    if (!scenario) {

        alert(
            "Please enter the mission scenario."
        );

        return;

    }


    if (!question) {

        alert(
            "Please enter the mission question."
        );

        return;

    }


    if (
        options.some(
            option =>
                !option
        )
    ) {

        alert(
            "Please complete all four answer options."
        );

        return;

    }


    if (
        correctAnswer < 0 ||
        correctAnswer > 3
    ) {

        alert(
            "Please select the correct answer."
        );

        return;

    }


    /* -----------------------------------------
       CREATE MISSION
    ----------------------------------------- */

    const missions =
        loadAdminMissions();


    const newMission = {

        id:
            generateMissionId(
                missions
            ),

        title:
            title,

        category:
            category,

        difficulty:
            difficulty,

        xp:
            xp,

        active:
            true,

        scenario:
            scenario,

        question:
            question,

        options:
            options,

        correctAnswer:
            correctAnswer

    };


    missions.push(
        newMission
    );


    saveAdminMissions(
        missions
    );


    addAdminActivity(
        "mission",
        "Administrator created mission #" +
        newMission.id +
        " — " +
        newMission.title +
        "."
    );


    closeMissionCreator();


    updateAdminMissionStats();


    alert(
        "Mission created successfully!"
    );

}


/* =========================================================
   101. OPEN ACHIEVEMENT CREATOR
========================================================= */

function openAchievementCreator() {

    const modal =
        document.getElementById(
            "achievementCreatorModal"
        );


    const form =
        document.getElementById(
            "achievementCreatorForm"
        );


    if (!modal) {

        return;

    }


    if (form) {

        form.reset();

    }


    modal.classList.add(
        "active"
    );


    modal.style.display =
        "flex";


    const nameInput =
        document.getElementById(
            "newAchievementName"
        );


    if (nameInput) {

        setTimeout(
            () => {

                nameInput.focus();

            },
            100
        );

    }

}


/* =========================================================
   102. CLOSE ACHIEVEMENT CREATOR
========================================================= */

function closeAchievementCreator() {

    const modal =
        document.getElementById(
            "achievementCreatorModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    modal.style.display =
        "none";

}


/* =========================================================
   103. CREATE UNIQUE ACHIEVEMENT ID
========================================================= */

function generateAchievementId(
    achievements
) {

    if (
        !achievements ||
        achievements.length === 0
    ) {

        return 1;

    }


    const ids =
        achievements.map(
            achievement =>
                Number(
                    achievement.id
                ) || 0
        );


    return (
        Math.max(
            ...ids
        ) + 1
    );

}


/* =========================================================
   104. CREATE NEW ACHIEVEMENT
========================================================= */

function createAchievement(
    event
) {

    event.preventDefault();


    const nameInput =
        document.getElementById(
            "newAchievementName"
        );


    const iconInput =
        document.getElementById(
            "newAchievementIcon"
        );


    const descriptionInput =
        document.getElementById(
            "newAchievementDescription"
        );


    const requirementInput =
        document.getElementById(
            "newAchievementRequirement"
        );


    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    const icon =
        iconInput
            ? iconInput.value.trim()
            : "🏆";


    const description =
        descriptionInput
            ? descriptionInput.value.trim()
            : "";


    const requirement =
        requirementInput
            ? requirementInput.value.trim()
            : "";


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (!name) {

        alert(
            "Please enter an achievement name."
        );

        return;

    }


    if (!description) {

        alert(
            "Please enter an achievement description."
        );

        return;

    }


    if (!requirement) {

        alert(
            "Please enter an achievement requirement."
        );

        return;

    }


    /* -----------------------------------------
       CREATE ACHIEVEMENT
    ----------------------------------------- */

    const achievements =
        loadAdminAchievements();


    const newAchievement = {

        id:
            generateAchievementId(
                achievements
            ),

        name:
            name,

        icon:
            icon || "🏆",

        description:
            description,

        requirement:
            requirement,

        active:
            true

    };


    achievements.push(
        newAchievement
    );


    saveAdminAchievements(
        achievements
    );


    addAdminActivity(
        "achievement",
        "Administrator created achievement #" +
        newAchievement.id +
        " — " +
        newAchievement.name +
        "."
    );


    closeAchievementCreator();


    updateAdminAchievements();


    alert(
        "Achievement created successfully!"
    );

}


/* =========================================================
   105. CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

function setupAdminModalClosing() {

    const missionModal =
        document.getElementById(
            "missionCreatorModal"
        );


    const achievementModal =
        document.getElementById(
            "achievementCreatorModal"
        );


    const userModal =
        document.getElementById(
            "userDetailsModal"
        );


    if (missionModal) {

        missionModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    missionModal
                ) {

                    closeMissionCreator();

                }

            }
        );

    }


    if (achievementModal) {

        achievementModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    achievementModal
                ) {

                    closeAchievementCreator();

                }

            }
        );

    }


    if (userModal) {

        userModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    userModal
                ) {

                    closeUserDetails();

                }

            }
        );

    }

}


/* =========================================================
   106. CLOSE USER DETAILS
========================================================= */

function closeUserDetails() {

    const modal =
        document.getElementById(
            "userDetailsModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    modal.style.display =
        "none";

}


/* =========================================================
   107. ESC KEY MODAL SUPPORT
========================================================= */

function setupAdminEscapeKey() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            closeMissionCreator();

            closeAchievementCreator();

            closeUserDetails();

        }
    );

}


/* =========================================================
   108. UPDATE ADMIN DASHBOARD
========================================================= */

function refreshEntireAdminDashboard() {

    updateAdminOverview();

    updateAdminUsers();

    updateAdminMissionStats();

    updateAdminAchievements();

    updateAdminAnalytics();

    updateAdminSecurity();

    updateAdminActivityLogs();

    updateAdminProfile();

}


/* =========================================================
   109. INITIALIZE ALL ADMIN FEATURES
========================================================= */

function initializeAllAdminFeatures() {

    setupAdminModalClosing();

    setupAdminEscapeKey();

    initializeAdminMissionManagement();

    initializeAdminAchievements();

    initializeAdminSecurity();

    initializeAdminSettings();


    /*
       Prepare stored data.
    */

    loadAdminMissions();

    loadAdminAchievements();

    getAdminAccounts();


    /*
       Render the dashboard if the
       administrator is already logged in.
    */

    if (
        adminLoggedIn
    ) {

        refreshEntireAdminDashboard();

    }

}


/* =========================================================
   110. FINAL ADMIN INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAllAdminFeatures();

    }
);


/* =========================================================
   111. PREVENT ENTER KEY ISSUES IN MODALS
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Enter"
        ) {

            return;

        }


        const activeElement =
            document.activeElement;


        if (
            !activeElement
        ) {

            return;

        }


        /*
           Do not interfere with textarea
           fields.
        */

        if (
            activeElement.tagName ===
            "TEXTAREA"
        ) {

            return;

        }

    }
);


/* =========================================================
   112. ADMIN.JS COMPLETE
========================================================= */

console.log(
    "CyberShield Admin Dashboard loaded successfully."
);


/* =========================================================
   END OF ADMIN.JS PART 7
========================================================= */