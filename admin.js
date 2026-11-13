// ==========================================
// QUIZ ROYALE ADMIN
// ==========================================

// SENING ASOSIY SAYTINGDAGI SAVE NOMI
const SAVE_KEY = "quizRoyaleSave";


// ==========================================
// RANKLAR
// ==========================================

const ranks = [

    ["Bronze I", 0],
    ["Bronze II", 150],
    ["Bronze III", 300],

    ["Silver I", 500],
    ["Silver II", 700],
    ["Silver III", 900],

    ["Gold I", 1150],
    ["Gold II", 1400],
    ["Gold III", 1700],

    ["Platinum I", 2050],
    ["Platinum II", 2400],
    ["Platinum III", 2800],

    ["Diamond I", 3250],
    ["Diamond II", 3700],
    ["Diamond III", 4200],

    ["Master I", 4800],
    ["Master II", 5500],
    ["Master III", 6300],

    ["Grandmaster", 7200],
    ["Legend", 8500]
   ["Durbek King" , 9999999999999999999999999999999999999999999999999999 ]
];


// ==========================================
// SHOP ITEMLAR
// SENING ASOSIY SAYTINGDAGI 120 ITEM
// ==========================================

const itemNames = [

    "Galaxy Background",
    "Space Background",
    "Neon Background",
    "Fire Background",
    "Ice Background",
    "Ocean Background",
    "Forest Background",
    "Sunset Background",
    "Night Background",
    "Stars Background",
    "Cyber Background",
    "Royal Background",
    "Diamond Background",
    "Gold Background",
    "Purple Pattern",
    "Blue Pattern",
    "Red Pattern",
    "Green Pattern",
    "Rainbow Pattern",
    "Dark Pattern",

    "Hint Card",
    "50/50 Card",
    "Skip Question",
    "Extra Time",
    "Reveal Answer",
    "Remove One Answer",
    "Second Chance",
    "Freeze Timer",
    "Double Answer",
    "Smart Hint",
    "Question Swap",
    "Answer Scanner",
    "Safe Answer",
    "Rescue Card",
    "Brain Boost",
    "Master Hint",
    "Expert Help",
    "Perfect Chance",
    "Last Chance",
    "Answer Shield",

    "Starter Badge",
    "Bronze Badge",
    "Silver Badge",
    "Gold Badge",
    "Diamond Badge",
    "Ruby Badge",
    "Emerald Badge",
    "Sapphire Badge",
    "Crown Badge",
    "Legend Badge",

    "Energy Drink",
    "XP Boost",
    "Coin Boost",
    "Shield",
    "Lucky Token",
    "Mystery Box",
    "Treasure Chest",
    "Golden Key",
    "Magic Key",
    "Battle Ticket",

    "Fire Emblem",
    "Ice Emblem",
    "Thunder Emblem",
    "Earth Emblem",
    "Wind Emblem",
    "Water Emblem",
    "Star Emblem",
    "Moon Emblem",
    "Sun Emblem",
    "Galaxy Emblem",

    "Wooden Frame",
    "Steel Frame",
    "Golden Frame",
    "Neon Frame",
    "Shadow Frame",
    "Royal Frame",
    "Dragon Frame",
    "Phoenix Frame",
    "Titan Frame",
    "Galaxy Frame",

    "Basic Avatar",
    "Cool Avatar",
    "Pro Avatar",
    "Elite Avatar",
    "Master Avatar",
    "Champion Avatar",
    "Legend Avatar",
    "Cyber Avatar",
    "Ninja Avatar",
    "Knight Avatar",

    "Red Banner",
    "Blue Banner",
    "Green Banner",
    "Purple Banner",
    "Gold Banner",
    "Black Banner",
    "White Banner",
    "Fire Banner",
    "Ice Banner",
    "Galaxy Banner",

    "Small Chest",
    "Medium Chest",
    "Large Chest",
    "Royal Chest",
    "Epic Chest",
    "Legend Chest",
    "Mini Crate",
    "Mega Crate",
    "Ultra Crate",
    "Diamond Crate",

    "Speed Card",
    "Power Card",
    "Defense Card",
    "Focus Card",
    "Wisdom Card",
    "Lucky Card",
    "Double XP Card",
    "Double Coin Card",
    "Triple Coin Card",
    "Skip Card",

    "Bronze Crown",
    "Silver Crown",
    "Gold Crown",
    "Crystal Crown",
    "Fire Crown",
    "Ice Crown",
    "Thunder Crown",
    "Dragon Crown",
    "Phoenix Crown",
    "Galaxy Crown",

    "Starter Title",
    "Rookie Title",
    "Fighter Title",
    "Hunter Title",
    "Warrior Title",
    "Elite Title",
    "Master Title",
    "Champion Title",
    "Legend Title",
    "King Title",

    "Common Pet",
    "Fox Pet",
    "Wolf Pet",
    "Eagle Pet",
    "Dragon Pet",
    "Robot Pet",
    "Ninja Pet",
    "Phoenix Pet",
    "Crystal Pet",
    "Galaxy Pet",

    "Small Medal",
    "Victory Medal",
    "Win Medal",
    "Top Medal",
    "Pro Medal",
    "Elite Medal",
    "Master Medal",
    "Legend Medal",
    "Royal Medal",
    "Ultimate Medal"

];


// ==========================================
// GAME DATA
// ==========================================

let state = {

    level: 1,

    xp: 0,

    coins: 100,

    completed: 0,

    inventory: [],

    owned: {}

};


// ==========================================
// LOAD
// ==========================================

function loadGame() {

    const saved = localStorage.getItem(SAVE_KEY);

    if (saved) {

        try {

            const data = JSON.parse(saved);

            state = {

                ...state,
                ...data

            };

            if (!Array.isArray(state.inventory)) {

                state.inventory = [];

            }

            if (!state.owned) {

                state.owned = {};

            }

        } catch (error) {

            console.log("Save error:", error);

        }

    }

    updatePage();

}


// ==========================================
// SAVE
// ==========================================

function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(state)
    );

    updatePage();

    showMessage("Saved successfully");

}


// ==========================================
// COINS
// ==========================================

function addCoins(amount) {

    state.coins += amount;

    saveGame();

}


function addCustomCoins() {

    const input =
        document.getElementById("customCoins");

    const amount =
        Number(input.value);

    if (amount <= 0) {

        showMessage("Enter a valid amount");

        return;

    }

    state.coins += amount;

    input.value = "";

    saveGame();

}


// ==========================================
// XP
// ==========================================

function addXP(amount) {

    state.xp += amount;

    saveGame();

}


function addCustomXP() {

    const input =
        document.getElementById("customXP");

    const amount =
        Number(input.value);

    if (amount <= 0) {

        showMessage("Enter a valid XP");

        return;

    }

    state.xp += amount;

    input.value = "";

    saveGame();

}


// ==========================================
// LEVEL
// ==========================================

function changeLevel() {

    const input =
        document.getElementById("levelInput");

    const level =
        Number(input.value);

    if (level < 1 || level > 100) {

        showMessage("Level must be 1 - 100");

        return;

    }

    state.level = level;

    // Main saytdagi level unlock
    if (state.completed < level - 1) {

        state.completed = level - 1;

    }

    input.value = "";

    saveGame();

}


// ==========================================
// RANK
// ==========================================

function changeRank() {

    const select =
        document.getElementById("rankSelect");

    const selectedRank =
        select.value;

    let rankData = null;

    for (let i = 0; i < ranks.length; i++) {

        if (ranks[i][0] === selectedRank) {

            rankData = ranks[i];

            break;

        }

    }

    if (!rankData) {

        return;

    }

    /*
        MUHIM:

        Asosiy sayting rankni state.rank dan emas,
        XP orqali hisoblaydi:

        getRank()

        Shuning uchun admin rankni o'zgartirganda
        kerakli XP beramiz.
    */

    state.xp = rankData[1];

    saveGame();

    showMessage(
        selectedRank + " unlocked!"
    );

}


// ==========================================
// ITEM SELECTNI YARATISH
// ==========================================

function createItemList() {

    const select =
        document.getElementById("itemSelect");

    select.innerHTML = "";

    for (let i = 0; i < itemNames.length; i++) {

        const option =
            document.createElement("option");

        option.value = itemNames[i];

        option.textContent =
            itemNames[i];

        select.appendChild(option);

    }

}


// ==========================================
// FREE ITEM
// ==========================================

function giveItem() {

    const select =
        document.getElementById("itemSelect");

    const item =
        select.value;

    const amountInput =
        document.getElementById("itemAmount");

    const amount =
        Number(amountInput.value);

    if (amount < 1) {

        showMessage("Invalid item amount");

        return;

    }


    // OWNED
    if (!state.owned[item]) {

        state.owned[item] = 0;

    }

    state.owned[item] += amount;


    // INVENTORY
    for (let i = 0; i < amount; i++) {

        state.inventory.push(item);

    }


    saveGame();

    showMessage(
        amount + "x " + item + " added"
    );

}


// ==========================================
// UPDATE PAGE
// ==========================================

function updatePage() {

    document.getElementById("level").textContent =
        state.level;

    document.getElementById("xp").textContent =
        state.xp;

    document.getElementById("coins").textContent =
        state.coins;

    document.getElementById("completed").textContent =
        state.completed;


    const rank =
        getRank();

    document.getElementById("rank").textContent =
        rank;


    document.getElementById("rankSelect").value =
        rank;


    showInventory();

}


// ==========================================
// GET RANK
// ==========================================

function getRank() {

    let currentRank =
        ranks[0][0];

    for (let i = 0; i < ranks.length; i++) {

        if (state.xp >= ranks[i][1]) {

            currentRank =
                ranks[i][0];

        }

    }

    return currentRank;

}


// ==========================================
// INVENTORY
// ==========================================

function showInventory() {

    const box =
        document.getElementById("inventory");

    box.innerHTML = "";


    if (state.inventory.length === 0) {

        box.innerHTML =
            "<p>No items</p>";

        return;

    }


    const counts = {};


    for (let i = 0; i < state.inventory.length; i++) {

        const item =
            state.inventory[i];

        if (!counts[item]) {

            counts[item] = 0;

        }

        counts[item]++;

    }


    const items =
        Object.keys(counts);


    for (let i = 0; i < items.length; i++) {

        const item =
            items[i];

        const div =
            document.createElement("div");

        div.className =
            "item";

        div.textContent =
            item + " × " + counts[item];

        box.appendChild(div);

    }

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(text) {

    const message =
        document.getElementById("message");

    message.textContent =
        text;


    setTimeout(function () {

        message.textContent = "";

    }, 2000);

}


// ==========================================
// RESET
// ==========================================

function resetGame() {

    const answer =
        confirm(
            "Are you sure you want to reset the player?"
        );


    if (!answer) {

        return;

    }


    state = {

        level: 1,

        xp: 0,

        coins: 100,

        completed: 0,

        inventory: [],

        owned: {}

    };


    saveGame();

    showMessage(
        "Progress reset!"
    );

}


// ==========================================
// START
// ==========================================

createItemList();

loadGame();

function openAdmin() {
    window.location.href = "admin/admin.html";
}

const SAVE_KEY = "quizRoyaleSave";


const ranks = [
    ["Bronze I", 0],
    ["Bronze II", 150],
    ["Bronze III", 300],

    ["Silver I", 500],
    ["Silver II", 700],
    ["Silver III", 900],

    ["Gold I", 1150],
    ["Gold II", 1400],
    ["Gold III", 1700],

    ["Platinum I", 2050],
    ["Platinum II", 2400],
    ["Platinum III", 2800],

    ["Diamond I", 3250],
    ["Diamond II", 3700],
    ["Diamond III", 4200],

    ["Master I", 4800],
    ["Master II", 5500],
    ["Master III", 6300],

    ["Grandmaster", 7200],
    ["Legend", 8500]
];


const items = [
    "Starter Badge",
    "Bronze Badge",
    "Silver Badge",
    "Gold Badge",
    "Diamond Badge",
    "Ruby Badge",
    "Emerald Badge",
    "Sapphire Badge",
    "Crown Badge",
    "Legend Badge",

    "Energy Drink",
    "XP Boost",
    "Coin Boost",
    "Shield",
    "Lucky Token",
    "Mystery Box",
    "Treasure Chest",
    "Golden Key",
    "Magic Key",
    "Battle Ticket",

    "Fire Emblem",
    "Ice Emblem",
    "Thunder Emblem",
    "Earth Emblem",
    "Wind Emblem",
    "Water Emblem",
    "Star Emblem",
    "Moon Emblem",
    "Sun Emblem",
    "Galaxy Emblem",

    "Wooden Frame",
    "Steel Frame",
    "Golden Frame",
    "Neon Frame",
    "Shadow Frame",
    "Royal Frame",
    "Dragon Frame",
    "Phoenix Frame",
    "Titan Frame",
    "Galaxy Frame",

    "Basic Avatar",
    "Cool Avatar",
    "Pro Avatar",
    "Elite Avatar",
    "Master Avatar",
    "Champion Avatar",
    "Legend Avatar",
    "Cyber Avatar",
    "Ninja Avatar",
    "Knight Avatar",

    "Red Banner",
    "Blue Banner",
    "Green Banner",
    "Purple Banner",
    "Gold Banner",
    "Black Banner",
    "White Banner",
    "Fire Banner",
    "Ice Banner",
    "Galaxy Banner",

    "Small Chest",
    "Medium Chest",
    "Large Chest",
    "Royal Chest",
    "Epic Chest",
    "Legend Chest",
    "Mini Crate",
    "Mega Crate",
    "Ultra Crate",
    "Diamond Crate",

    "Speed Card",
    "Power Card",
    "Defense Card",
    "Focus Card",
    "Wisdom Card",
    "Lucky Card",
    "Double XP Card",
    "Double Coin Card",
    "Triple Coin Card",
    "Skip Card",

    "Bronze Crown",
    "Silver Crown",
    "Gold Crown",
    "Crystal Crown",
    "Fire Crown",
    "Ice Crown",
    "Thunder Crown",
    "Dragon Crown",
    "Phoenix Crown",
    "Galaxy Crown",

    "Starter Title",
    "Rookie Title",
    "Fighter Title",
    "Hunter Title",
    "Warrior Title",
    "Elite Title",
    "Master Title",
    "Champion Title",
    "Legend Title",
    "King Title",

    "Common Pet",
    "Fox Pet",
    "Wolf Pet",
    "Eagle Pet",
    "Dragon Pet",
    "Robot Pet",
    "Ninja Pet",
    "Phoenix Pet",
    "Crystal Pet",
    "Galaxy Pet",

    "Small Medal",
    "Victory Medal",
    "Win Medal",
    "Top Medal",
    "Pro Medal",
    "Elite Medal",
    "Master Medal",
    "Legend Medal",
    "Royal Medal",
    "Ultimate Medal",

    "Hint Card",
    "50/50 Card",
    "Skip Question",
    "Extra Time",
    "Reveal Answer",
    "Remove One Answer",
    "Second Chance",
    "Freeze Timer",
    "Question Swap",
    "Smart Hint",
    "Expert Help",
    "Brain Boost",
    "Answer Shield",
    "Rescue Card",
    "Master Hint",
    "Perfect Chance",
    "Last Chance",

    "Galaxy Background",
    "Space Background",
    "Neon Background",
    "Fire Background",
    "Ice Background",
    "Ocean Background",
    "Forest Background",
    "Sunset Background",
    "Night Background",
    "Stars Background",
    "Cyber Background",
    "Royal Background",
    "Diamond Background",

    "Purple Pattern",
    "Blue Pattern",
    "Red Pattern",
    "Green Pattern",
    "Rainbow Pattern",
    "Dark Pattern",

    "Golden Theme",
    "Legend Theme",
    "Royal Theme",
    "Dragon Theme",
    "Phoenix Theme",
    "Lightning Theme",
    "Shadow Theme",
    "Crystal Theme",
    "Cyber Theme",
    "Ultimate Theme"
];


let game = loadFromStorage();


function loadFromStorage() {

    const saved = localStorage.getItem(SAVE_KEY);

    if (saved) {
        return JSON.parse(saved);
    }

    return {
        level: 1,
        xp: 0,
        coins: 100,
        completed: 0,

        inventory: [],
        owned: {},

        avatar: "Basic Avatar",
        frame: "Wooden Frame",
        title: "Starter Title",
        crown: "",
        emblem: "",
        banner: "",
        background: "",

        secondChance: false,
        shield: false,

        pets: [],
        badges: [],
        medals: [],

        effects: {}
    };
}


function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(game)
    );

    showMessage("Game saved!");

    updateUI();
}


function updateUI() {

    document.getElementById("level").textContent =
        game.level;

    document.getElementById("xp").textContent =
        game.xp;

    document.getElementById("coins").textContent =
        game.coins;

    document.getElementById("completed").textContent =
        game.completed;


    document.getElementById("rank").textContent =
        getRank();


    renderInventory();
}


function getRank() {

    let currentRank = "Bronze I";

    for (let i = 0; i < ranks.length; i++) {

        if (game.xp >= ranks[i][1]) {
            currentRank = ranks[i][0];
        }

    }

    return currentRank;
}


function addCoins(amount) {

    game.coins += amount;

    saveGame();

    showMessage("+" + amount + " coins");
}


function addCustomCoins() {

    const input =
        document.getElementById("customCoins");

    const amount =
        Number(input.value);

    if (amount <= 0) {
        showMessage("Enter a valid amount!");
        return;
    }

    addCoins(amount);

    input.value = "";
}


function addXP(amount) {

    game.xp += amount;

    saveGame();

    showMessage("+" + amount + " XP");
}


function addCustomXP() {

    const input =
        document.getElementById("customXP");

    const amount =
        Number(input.value);

    if (amount <= 0) {
        showMessage("Enter a valid amount!");
        return;
    }

    addXP(amount);

    input.value = "";
}


function changeLevel() {

    const input =
        document.getElementById("levelInput");

    const level =
        Number(input.value);

    if (level < 1 || level > 100) {

        showMessage("Level must be between 1 and 100!");

        return;
    }

    game.level = level;

    saveGame();

    showMessage("Level changed to " + level);

    input.value = "";
}


function changeRank() {

    const select =
        document.getElementById("rankSelect");

    const selectedRank =
        select.value;


    for (let i = 0; i < ranks.length; i++) {

        if (ranks[i][0] === selectedRank) {

            game.xp = ranks[i][1];

            saveGame();

            showMessage(
                "Rank changed to " + selectedRank
            );

            return;
        }
    }
}


function giveItem() {

    const select =
        document.getElementById("itemSelect");

    const amountInput =
        document.getElementById("itemAmount");


    const item =
        select.value;

    const amount =
        Number(amountInput.value);


    if (!item) {
        showMessage("Select an item!");
        return;
    }


    if (amount < 1) {
        showMessage("Invalid amount!");
        return;
    }


    if (!game.owned) {
        game.owned = {};
    }


    if (!game.inventory) {
        game.inventory = [];
    }


    game.owned[item] =
        (game.owned[item] || 0) + amount;


    for (let i = 0; i < amount; i++) {
        game.inventory.push(item);
    }


    saveGame();

    showMessage(
        amount + "x " + item + " added!"
    );
}


function renderInventory() {

    const box =
        document.getElementById("inventory");

    box.innerHTML = "";


    if (!game.inventory || game.inventory.length === 0) {

        box.innerHTML =
            "<p>No items in inventory.</p>";

        return;
    }


    const counts = {};


    game.inventory.forEach(function (item) {

        counts[item] =
            (counts[item] || 0) + 1;

    });


    Object.keys(counts).forEach(function (item) {

        const div =
            document.createElement("div");

        div.className = "inventory-item";

        div.innerHTML =
            "<strong>" +
            item +
            "</strong> × " +
            counts[item];

        box.appendChild(div);

    });
}


function resetGame() {

    const answer =
        confirm(
            "Are you sure you want to reset ALL progress?"
        );

    if (!answer) {
        return;
    }


    game = {

        level: 1,

        xp: 0,

        coins: 100,

        completed: 0,

        inventory: [],

        owned: {},

        avatar: "Basic Avatar",

        frame: "Wooden Frame",

        title: "Starter Title",

        crown: "",

        emblem: "",

        banner: "",

        background: "",

        secondChance: false,

        shield: false,

        pets: [],

        badges: [],

        medals: [],

        effects: {}

    };


    saveGame();

    showMessage("Progress reset!");
}


function loadGame() {

    game = loadFromStorage();

    updateUI();

    showMessage("Game reloaded!");
}


function showMessage(text) {

    const message =
        document.getElementById("message");

    message.textContent = text;

    setTimeout(function () {

        message.textContent = "";

    }, 2000);
}


function fillItems() {

    const select =
        document.getElementById("itemSelect");

    select.innerHTML = "";


    items.forEach(function (item) {

        const option =
            document.createElement("option");

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });
}


fillItems();

updateUI();