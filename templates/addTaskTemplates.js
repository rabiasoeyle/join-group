function generateContactItemHTML(index, contact, isChecked) {
    return /*html*/`
        <div class="one-person-div" onclick="addAssignedPersons(${index})" id="onePersonDiv-${index}">
            <div class="one-person-div-left">
                <div class="assigned-person-initials" style="background-color:${contact.color}; color:white">
                    ${profileInitials(index)}
                </div>
                <div>${contact.name}</div>
            </div>
            <input id="inputCheckbox-${index}" class="assign-checkbox" type="checkbox" ${isChecked}>
            <label for="inputCheckbox-${index}"></label>
        </div>`;
}
