const SAVE_KEY = "quizRoyaleSave";


const effects = [

    {
        name: "Hint Effect",
        icon: "💡",
        price: 500,
        description: "Allows you to use hint items."
    },

    {
        name: "50/50 Effect",
        icon: "✂️",
        price: 700,
        description: "Allows you to remove two wrong answers."
    },

    {
        name: "Skip Effect",
        icon: "⏭️",
        price: 800,
        description: "Allows you to skip questions."
    },

    {
        name: "Extra Time Effect",
        icon: "⏱️",
        price: 600,
        description: "Allows you to add extra time."
    },

    {
        name: "Reveal Answer Effect",
        icon: "👁️",
        price: 1000,
        description: "Allows you to reveal the correct answer."
    },

    {
        name: "Remove Answer Effect",
        icon: "❌",
        price: 750,
        description: "Allows you to remove one wrong answer."
    },

    {
        name: "Second Chance Effect",
        icon: "🔄",
        price: 1200,
        description: "Gives you another chance."
    },

    {
        name: "Shield Effect",
        icon: "🛡️",
        price: 1500,
        description: "Protects you from a wrong answer."
    },

    {
        name: "Freeze Timer Effect",
        icon: "🧊",
        price: 1300,
        description: "Allows you to freeze the timer."
    },

    {
        name: "Question Swap Effect",
        icon: "🔀",
        price: 1100,
        description: "Allows you to change the current question."
    },

    {
        name: "Coin Effect",
        icon: "🪙",
        price: 1000,
        description: "Allows coin items to work."
    },

    {
        name: "XP Effect",
        icon: "⭐",
        price: 1000,
        description: "Allows XP items to work."
    },

    {
        name: "Lucky Effect",
        icon: "🍀",
        price: 1400,
        description: "Allows Lucky items to work."
    },

    {
        name: "Mystery Box Effect",
        icon: "🎁",
        price: 1600,
        description: "Allows Mystery Boxes to work."
    },

    {
        name: "Chest Effect",
        icon: "💎",
        price: 1800,
        description: "Allows chests and crates to work."
    },

    {
        name: "Pet Effect",
        icon: "🐉",
        price: 2000,
        description: "Allows pets to work."
    },

    {
        name: "Background Effect",
        icon: "🌌",
        price: 900,
        description: "Allows background changes."
    },

    {
        name: "Pattern Effect",
        icon: "🎨",
        price: 900,
        description: "Allows pattern changes."
    },

    {
        name: "Theme Effect",
        icon: "✨",
        price: 1200,
        description: "Allows theme changes."
    }

];


function loadGame() {

    const saved =
        localStorage.getItem(SAVE_KEY);

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
        effects: {}
    };
}


let state = loadGame();


if (!state.effects) {
    state.effects = {};
}

if (!state.inventory) {
    state.inventory = [];
}

if (!state.owned) {
    state.owned = {};
}


function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(state)
    );

}


function showMessage(text) {

    const message =
        document.getElementById("message");

    message.textContent = text;

    message.style.display = "block";

    setTimeout(function () {

        message.style.display = "none";

    }, 1800);
}


function updateCoins() {

    document.getElementById("coins")
        .textContent = state.coins;

}


function buyOrToggle(index) {

    const effect =
        effects[index];

    const name =
        effect.name;


    /*
       EFFECT ALREADY PURCHASED
       Just turn ON/OFF.
    */

    if (state.effects[name] !== undefined) {

        state.effects[name] =
            !state.effects[name];

        saveGame();

        render();

        showMessage(
            name +
            (
                state.effects[name]
                    ? " ON"
                    : " OFF"
            )
        );

        return;
    }


    /*
       BUY EFFECT
    */

    if (state.coins < effect.price) {

        showMessage("Not enough coins!");

        return;
    }


    state.coins -= effect.price;


    /*
       Purchased effect starts ON.
    */

    state.effects[name] = true;


    saveGame();

    render();

    showMessage(
        name + " unlocked!"
    );
}


function render() {

    const box =
        document.getElementById("effects");

    box.innerHTML = "";


    effects.forEach(function (effect, index) {

        const unlocked =
            state.effects[effect.name]
            !== undefined;


        const enabled =
            state.effects[effect.name]
            === true;


        const card =
            document.createElement("div");

        card.className = "effect";


        if (unlocked) {

            card.innerHTML = `

                <div class="icon">
                    ${effect.icon}
                </div>

                <h2>
                    ${effect.name}
                </h2>

                <p class="description">
                    ${effect.description}
                </p>

                <div class="status">
                    ${enabled ? "● ON" : "● OFF"}
                </div>

                <button
                    class="${enabled ? "on" : "off"}"
                    onclick="buyOrToggle(${index})"
                >
                    ${enabled ? "TURN OFF" : "TURN ON"}
                </button>

            `;

        } else {

            card.innerHTML = `

                <div class="icon">
                    ${effect.icon}
                </div>

                <h2>
                    ${effect.name}
                </h2>

                <p class="description">
                    ${effect.description}
                </p>

                <div class="price">
                    ${effect.price} Coins
                </div>

                <button
                    class="buy"
                    onclick="buyOrToggle(${index})"
                >
                    BUY ONCE
                </button>

            `;

        }


        box.appendChild(card);

    });


    updateCoins();

}


render();