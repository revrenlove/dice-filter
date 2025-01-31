if (!allHiddenArticles) {
    var allHiddenArticles = [];
}

{
    const companiesToIgnore = [
        'Targeted Talent',
        'Jobot',
        'Robert Half',
        'Motion Recruitment',
        'Providence Health & Services',
    ];

    const keywordsToIgnore = ['ui path', 'uipath', 'embedded', 'clearance'];

    console.info('The Dice Filter Extension has been activated...');

    /**
     *
     * @param {Element} searchCard
     */
    const hideListing = (searchCard) => searchCard.classList.add('hidden');

    /**
     *
     * @param {Element} searchCard
     */
    const getKey = (searchCard) =>
        searchCard.querySelector('div.card-header a.card-title-link').id;

    /**
     *
     * @param {Element} searchCard
     */
    const addHideButton = (searchCard) => {
        const p = document.createElement('p');

        p.innerHTML = 'Hide Listing';
        p.classList.add('z-10');
        p.classList.add('hide-listing');

        p.addEventListener('click', () => {
            const key = getKey(searchCard);

            localStorage.setItem(key, 'RevrenLove');
            hideListing(searchCard);
            allHiddenArticles.push(key);
        });

        searchCard.appendChild(p);
    };

    /**
     *
     * @param {string} text
     */
    const textContainsIgnoredKeyword = (text) => {
        text = text.toLowerCase();

        for (const keyword of keywordsToIgnore) {
            if (text.indexOf(keyword) != -1) {
                return true;
            }
        }

        return false;
    };

    document.querySelectorAll('dhi-search-card').forEach((searchCard) => {
        const key = getKey(searchCard);

        if (localStorage.getItem(key) || allHiddenArticles.includes(key)) {
            hideListing(searchCard);

            return;
        }

        // TODO: JE - Separate these into their own functions...
        const companyName = searchCard
            .querySelector('.card-company a')
            .innerHTML.trim();

        if (companiesToIgnore.includes(companyName)) {
            hideListing(searchCard);

            return;
        }

        const jobTitle = searchCard
            .querySelector('.card-title-link')
            .innerHTML.trim();

        const jobDescription = searchCard
            .querySelector('.card-description')
            .innerHTML.trim();

        if (
            textContainsIgnoredKeyword(jobTitle) ||
            textContainsIgnoredKeyword(jobDescription)
        ) {
            hideListing(searchCard);

            return;
        }

        addHideButton(searchCard);
    });
}
