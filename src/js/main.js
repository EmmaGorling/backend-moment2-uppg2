"use strict"

const url = "https://backend-moment2-uppg1.onrender.com/api/workexperience";

document.addEventListener('DOMContentLoaded', () => {
    getData();
});

// Get data from API
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        writeData(data);
    } catch (error) {
        console.log('An error occured: ' + error);
    }
};

// Write out to index.html
function writeData(workexps) {
    const workexpDiv = document.getElementById('workexperiences');

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
            })
            
        });
    } else {
        // Answer if there is no worexperiences
        workexpDiv.innerHTML = 'Kunde inte hitta några tidigare arbeten.'
    }
};

// Change workexperience
function changeWorkExp(workexp) {

};

// Delete workexperience
async function deleteWorkExp(id) {
    const deleteUrl = url + '/' + id;
    fetch(deleteUrl, {
        method: "DELETE",
        headers: {
        "content-type": "Applicaton/json"
        }
    });

    writeData();
}