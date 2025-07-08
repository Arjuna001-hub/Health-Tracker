document.addEventListener('DOMContentLoaded', () => {
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    
    if (!currentUser) {
       
        window.location.href = '../login.html';
        return;
    }

   
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    }

    const pageTitle = document.title;

    if (pageTitle.includes('Nutrition Tracker')) {
        
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
        }
        
        const nutritionForm = document.getElementById('nutrition-form');
        nutritionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const getNutritionData = () => JSON.parse(localStorage.getItem('nutritionData')) || [];
            const saveNutritionData = (data) => localStorage.setItem('nutritionData', JSON.stringify(data));

            const newEntry = {
                userId: currentUser.id,
                date: new Date().toLocaleDateString(),
                foodItem: document.getElementById('food-item').value,
                calories: document.getElementById('calories').value,
                protein: document.getElementById('protein').value || 0,
                carbs: document.getElementById('carbs').value || 0,
                fats: document.getElementById('fats').value || 0,
            };

            const allData = getNutritionData();
            allData.push(newEntry);
            saveNutritionData(allData);
            alert('Entry added successfully!');
            nutritionForm.reset();
        });

    } else if (pageTitle.includes('Your Progress')) {
        
        const progressTbody = document.getElementById('progress-tbody');
        const allData = JSON.parse(localStorage.getItem('nutritionData')) || [];
        const userData = allData.filter(entry => entry.userId === currentUser.id);
        
        if (userData.length === 0) {
            progressTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No entries found. Start tracking!</td></tr>`;
        } else {
            userData.reverse().forEach(entry => { 
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.date}</td>
                    <td>${entry.foodItem}</td>
                    <td>${entry.calories}</td>
                    <td>${entry.protein}</td>
                    <td>${entry.carbs}</td>
                    <td>${entry.fats}</td>
                `;
                progressTbody.appendChild(row);
            });
        }

    } else if (pageTitle.includes('BMI Calculator')) {
       
        document.getElementById('bmi-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const resultEl = document.getElementById('bmi-result');

            if (height > 0 && weight > 0) {
                const heightInMeters = height / 100;
                const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
                let category = '';
                if (bmi < 18.5) category = 'Underweight';
                else if (bmi < 24.9) category = 'Normal weight';
                else if (bmi < 29.9) category = 'Overweight';
                else category = 'Obesity';
                
                resultEl.innerHTML = `Your BMI is: <strong>${bmi}</strong><br>Category: <strong>${category}</strong>`;
            } else {
                resultEl.textContent = 'Please enter valid height and weight.';
            }
        });
    }
});