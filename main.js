if (!allHiddenArticles) {
    var allHiddenArticles = [];
}

{
    console.info("The Dice Filter Extension has been activated...");

    const hideListing = (searchCard) => searchCard.classList.add("hidden");

    const getKey = (searchCard) =>
        searchCard.querySelector("div.card-header a.card-title-link").id;

    const addHideButton = (searchCard) => {
        const p = document.createElement("p");

        p.innerHTML = "Hide Listing";
        p.classList.add("z-10");
        p.classList.add("hide-listing");

        p.addEventListener("click", () => {
            const key = getKey(searchCard);

            localStorage.setItem(key, "RevrenLove");
            hideListing(searchCard);
            allHiddenArticles.push(key);
        });

        searchCard.appendChild(p);
    };

    // TODO: JE - This is where the shit actually starts... move it to the top
    document.querySelectorAll("dhi-search-card").forEach((searchCard) => {
        const key = getKey(searchCard);

        if (localStorage.getItem(key) || allHiddenArticles.includes(key)) {
            hideListing(searchCard);

            return;
        }

        addHideButton(searchCard);
    });
}
