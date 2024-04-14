"use strict"

const url = "https://backend-moment2-uppg1.onrender.com/api/workexperience";

document.addEventListener('DOMContentLoaded', () => {
    getData();
});

// Get data from API
async function getData() {
    const workexpDiv = document.getElementById('workexperiences');
    workexpDiv.innerHTML = '';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        writeData(data, workexpDiv);
    } catch (error) {
        console.log('An error occured: ' + error);
    }
};

// Write out to index.html
function writeData(workexps, workexpDiv) {

    if(workexps.length > 0) {
        // Loop trough and create articles
        workexps.forEach(workexp => {
            // Get the date and make them look better
            const startdate = new Date(workexp.startdate)
            const startYear = startdate.getFullYear();
            let startMonth = startdate.getMonth() + 1;
            let startDay = startdate.getDate();
            if(startDay < 10) {
                startDay = '0' + startDay;
            }
            if(startMonth < 10) {
                startMonth = '0' + startMonth;
            }
            const enddate = new Date(workexp.enddate)
            const endYear = enddate.getFullYear();
            let endMonth = enddate.getMonth() + 1;
            let endDay = enddate.getDate();
            if(endDay < 10) {
                endDay = '0' + endDay;
            }
            if(endMonth < 10) {
                endMonth = '0' + endMonth;
            }
            // Create article-element
            const article = document.createElement('article');
            article.innerHTML = `
                <h3>${workexp.companyname}, ${workexp.location}</h3>
                <h4>${workexp.jobtitle}</h4>
                <p>Arbetsbeskrivning: ${workexp.description}</p>
                <p>Arbetsperiod mellan ${startYear}-${startMonth}-${startDay} & ${endYear}-${endMonth}-${endDay}
            `;
            workexpDiv.appendChild(article);
            // Change-button
            const changeBtn = document.createElement('button');
            changeBtn.textContent = 'Ändra';
            changeBtn.classList = 'change';
            article.appendChild(changeBtn);
            changeBtn.addEventListener('click', () => {
                changeWorkExp(workexp);
            })
            // Delete-button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Ta bort';
            deleteBtn.classList = 'delete';
            article.appendChild(deleteBtn);
            deleteBtn.addEventListener('click', () => {
                deleteWorkExp(workexp.id);
            });
            
        });
    } else {
        // Answer if there is no worexperiences
        workexpDiv.innerHTML = 'Kunde inte hitta några tidigare arbeten.'
    }
};

// Change workexperience
function changeWorkExp(workexp) {
    // Set the values of inputs to existing object
    let companynameInput = document.getElementById('changeCompanyname');
    let jobtitleInput = document.getElementById('changeJobtitle');
    let locationInput = document.getElementById('changeLocation');
    let descriptionInput = document.getElementById('changeDescription');

    companynameInput.value = workexp.companyname;
    jobtitleInput.value = workexp.jobtitle;
    locationInput.value = workexp.location;
    descriptionInput.value = workexp.description;

    // Form eventlistener
    const changeForm = document.getElementById('changeForm');
    changeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateWorkExp(workexp.id);
    });
};

// Save changes
async function updateWorkExp(id) {
    // Get the new values from inputs
    let workexperience = {
        companyname: document.getElementById('changeCompanyname').value,
        jobtitle: document.getElementById('changeJobtitle').value,
        location: document.getElementById('changeLocation').value,
        startdate: document.getElementById('changeStartdate').value,
        enddate: document.getElementById('changeEnddate').value,
        description: document.getElementById('changeDescription').value
    }
    
    // Fetch with put method
    try {
        const response = await fetch(url + '/' + id, {
            method: "PUT",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(workexperience)
        });
        const data = await response.json();
        // Get data agin and write it out
        getData();
    } catch (error) {
        console.log(error);
    }

    
}

// Delete workexperience
async function deleteWorkExp(id) {
    // Fetch with delete-method
    try {
        const response = await fetch(url + '/' + id, {
            method: "DELETE",
            headers: {
            "content-type": "Applicaton/json"
            }
        });
        const data = await response.json();
        // Get data again and write it out
        getData();
    } catch (error) {
        console.log(error);
    }
    
}