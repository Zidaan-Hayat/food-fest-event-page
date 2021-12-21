function createCountdown() {
	document.getElementById("days").innerText = 0;
	document.getElementById("hours").innerText = 0;
	document.getElementById("minutes").innerText = 0;
	document.getElementById("seconds").innerText = 0;
}

createCountdown()

function replace(s, findChar, newChar) {
	for(let i = 0; i < s.length; i++) {
		s = s.replace(findChar, newChar);
	}
	
	return s;
}

function constructCountryCard(
	countryName,
	population, capital, language,
	national_dish, national_fruit,
	national_bird, national_dress,
	description
) {
	function makeDiv(className, idName) {
		const div = document.createElement("div");
		div.className = className;
		div.id = idName ? idName : undefined;
		return div;
	}

	// The card itself
	const card = makeDiv("card", `${replace(countryName.toLowerCase(), ' ', '-')}-card`);

	// Card title (Country name)
	const cardTitle = makeDiv("card-title")
	cardTitle.innerText = countryName;
	card.appendChild(cardTitle);

	// Card flag (Country flag)
	const cardFlag = makeDiv("card-flag");
	const cardFlagImg = document.createElement("img");
	cardFlagImg.src = `/cdn/${replace(countryName.toLowerCase(), ' ', '_')}`;
	cardFlagImg.alt = `${countryName} Flag`
	cardFlag.appendChild(cardFlagImg);
	card.appendChild(cardFlag);

	// Country misc. stats

	const statsData = {
		Population: population,
		Capital: capital,
		Language: language,
		"National Dish": national_dish,
		"National Fruit": national_fruit,
		"National Bird": national_bird,
		"National Dress": national_dress
	};

	const cardStats = makeDiv("card-stats");
	const cardStatsList = document.createElement("ul");

	for (const key in statsData) {
		const val = statsData[key];
		
		const li = document.createElement("li");

		if (typeof val !== "string") {
			li.innerHTML = `<span>${key}</span>: <a href=${val.link} target="_blank">${val.name}</a>`;
		} else {
			// This breaks all the cards for some reason
			// if (!val || val.toLowerCase() == "none" || val.toLowerCase() == "null") val = "None";
			li.innerHTML = `<span>${key}</span>: ${val}`;
		}

		cardStatsList.appendChild(li);
	}

	cardStats.appendChild(cardStatsList);
	card.appendChild(cardStats);

	// Country description
	const cardDesc = makeDiv("card-description");
	cardDesc.innerText = description ? description : "Pending description...";
	// cardDesc.innerText = description ? description : "Suspendisse sit amet rutrum libero. Phasellus congue tellus nec enim consectetur pharetra. Morbi eu nulla non neque placerat varius eget eget nisl. Nulla facilisi. Etiam semper suscipit sagittis. Etiam nec fringilla nisl. Curabitur dictum, eros rhoncus commodo dignissim, purus risus pellentesque nisi, vitae ultricies leo sem ut est. Aliquam sodales. ";

	card.appendChild(cardDesc);

	return card;
}

const data = fetch("/data")
	.then(r => r.json())
	.then(r => {
		
		// let counter = 1;
		// let rowCounter = 1;
		// let lastRow = document.getElementById("cards-table-row-1")

		for (const countryData of r.data) {
			const countryCard = constructCountryCard(
				countryData.countryName,
				countryData.population, countryData.capital,
				countryData.language, countryData.natDish,
				countryData.natFruit, countryData.natBird,
				countryData.natDress, countryData.desc);

			const cardsTable = document.getElementById("cards-table");
			cardsTable.appendChild(countryCard);

			// if (counter === 5) {
			// 	counter = 0;
			// 	rowCounter++;

			// 	const mainTable = document.getElementById("cards-table");
			// 	lastRow = document.createElement("tr");
			// 	lastRow.id = `cards-table-row-${rowCounter}`;
			// 	mainTable.appendChild(lastRow);
			// } else {
			// 	counter++;
			// }

			// lastRow.appendChild(countryCard);
		}

	});

// const cardsTable = document.getElementById("cards-table");
// cardsTable.appendChild(maly);