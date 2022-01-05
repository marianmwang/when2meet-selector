const panel = document.getElementById("NewEventNameDiv");
const menu = document.createElement("div");
const menuStyle = `
    border-radius: 0.5em;
    border-width: 0.15em;
    padding: 0.5em;
    border: solid 1px #339900;
    margin-right: 20px;
    font-family: Verdana;
`;
menu.style = menuStyle;

const title = document.createElement("h1");
const titleText = "When2meet Selector";
const titleStyle = `
    font-size: 25px;
    margin: 0px;
    color: #339900;
`;
title.innerText = titleText;
title.style = titleStyle;
menu.appendChild(title);

const instructions = document.createElement("p");
const instructionsText =
  "Select one or more names below to display individual schedules or combinations of individual schedules.";
const instructionsStyle = `
    font-size: 15px;
    margin-bottom: 0px;
`;
instructions.style = instructionsStyle;
instructions.innerText = instructionsText;

menu.appendChild(instructions);

var pressedButtons = Array();

const buttonStyle = (clicked) => `
    font-size: 0.5em;
    border-radius: 0.5em;
    border-width: 0.15em;
    cursor: pointer;
    outline: none;
    margin-right: 0.5em;
    display: inline-block;
    font-family: Verdana;
    background-color: ${clicked ? "#339900" : "white"};
    border-color: #339900;
    border-style: solid;
`;

const selectAll = document.createElement("button");
selectAll.style.cssText = buttonStyle(false);
selectAll.innerText = "Select All";
selectAll.style.borderColor = "#57A6EC";
selectAll.onclick = () => {
    PeopleNames.map((name) => {
      if (!document.getElementById(name).isHighlighted) {
        document.getElementById(name).click();
      }
    });
};
menu.appendChild(selectAll);

const deselectAll = document.createElement("button");
deselectAll.style.cssText = buttonStyle(false);
deselectAll.innerText = "Deselect All";
deselectAll.style.borderColor = "#C13F51";
deselectAll.onclick = () => {
    PeopleNames.map((name) => {
      if (document.getElementById(name).isHighlighted) {
        document.getElementById(name).click();
      }
    });
};
menu.appendChild(deselectAll);

const getGroupTimeByIndex = (slotIndex) => {
  return document.getElementById(`GroupTime${TimeOfSlot[slotIndex]}`);
};

const originalColors = TimeOfSlot.map((timeID, slotIndex) => {
  return getGroupTimeByIndex(slotIndex).style.backgroundColor;
});

const press = (pressedButtons) => {
  if (pressedButtons.length == 0) {
    resetColors();
  } else {
    // array of currently pressed user's IDs
    const userIDs = pressedButtons.map(
      (name) => PeopleIDs[PeopleNames.indexOf(name)]
    );
    const userAvailabilities = AvailableAtSlot.map((slotIDs, slotIndex) => {
      if (allUsersPresent(slotIDs, userIDs)) {
        getGroupTimeByIndex(slotIndex).style.backgroundColor = "#339900";
      } else {
        getGroupTimeByIndex(slotIndex).style.backgroundColor = "white";
      }
    });
  }
};

const allUsersPresent = (slotIDs, userIDs) => {
  for (const userID of userIDs) {
    if (slotIDs.indexOf(userID) == -1) {
      return false;
    }
  }
  return true;
};

const resetColors = () => {
  AvailableAtSlot.forEach((slot, slotIndex) => {
    getGroupTimeByIndex(slotIndex).style.backgroundColor =
      originalColors[slotIndex];
  });
};

const buttons = PeopleNames.map((name) => {
  const button = document.createElement("button");
  button.id = name;
  button.style = buttonStyle(false);
  button.innerText = name;
  button.isHighlighted = false;
  button.onclick = () => {
    if (button.isHighlighted) {
      pressedButtons.splice(pressedButtons.indexOf(name), 1);
      button.style.cssText = buttonStyle(false);
      button.isHighlighted = false;
    } else {
      pressedButtons.push(name);
      button.style.cssText = buttonStyle(true);
      button.isHighlighted = true;
    }
    press(pressedButtons);
  };
  return button;
});

buttons.forEach((button) => menu.appendChild(button));

panel.append(menu);