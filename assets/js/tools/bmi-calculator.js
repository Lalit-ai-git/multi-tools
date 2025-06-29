document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const resultsSection = document.getElementById('resultsSection');
    const bmiValue = document.getElementById('bmiValue');
    const bmiBar = document.getElementById('bmiBar');
    const interpretation = document.getElementById('interpretation');
    
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMI();
    });
    
    function calculateBMI() {
        // Get input values
        const height = parseFloat(document.getElementById('height').value);
        const heightUnit = document.getElementById('heightUnit').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const weightUnit = document.getElementById('weightUnit').value;
        
        if (!height || !weight) return;
        
        // Convert to metric units
        const heightInMeters = convertHeightToMeters(height, heightUnit);
        const weightInKg = convertWeightToKg(weight, weightUnit);
        
        // Calculate BMI
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        const roundedBMI = Math.round(bmi * 10) / 10;
        
        // Display results
        displayResults(roundedBMI);
    }
    
    function convertHeightToMeters(value, unit) {
        switch(unit) {
            case 'cm': return value / 100;
            case 'in': return value * 0.0254;
            case 'ft': return value * 0.3048;
            default: return value;
        }
    }
    
    function convertWeightToKg(value, unit) {
        switch(unit) {
            case 'lb': return value * 0.453592;
            case 'st': return value * 6.35029;
            default: return value;
        }
    }
    
    function displayResults(bmi) {
        bmiValue.textContent = bmi;
        resultsSection.classList.remove('d-none');
        
        // Determine category and set progress bar
        let category = '';
        let barWidth = 0;
        let barColor = '';
        
        if (bmi < 18.5) {
            category = 'Underweight';
            barWidth = (bmi / 18.5) * 25;
            barColor = '#17a2b8'; // Teal
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            barWidth = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
            barColor = '#28a745'; // Green
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            barWidth = 50 + ((bmi - 25) / (30 - 25)) * 25;
            barColor = '#ffc107'; // Yellow
        } else {
            category = 'Obese';
            barWidth = 75 + (Math.min(bmi - 30, 20) / 20) * 25;
            barColor = '#dc3545'; // Red
        }
        
        bmiBar.style.width = `${Math.min(barWidth, 100)}%`;
        bmiBar.style.backgroundColor = barColor;
        
        // Set interpretation
        let interpretationText = '';
        if (bmi < 16) {
            interpretationText = 'Severe thinness - Consult with a healthcare provider';
        } else if (bmi >= 16 && bmi < 17) {
            interpretationText = 'Moderate thinness - May need nutritional support';
        } else if (bmi >= 17 && bmi < 18.5) {
            interpretationText = 'Mild thinness - Consider dietary improvements';
        } else if (bmi >= 18.5 && bmi < 25) {
            interpretationText = 'Healthy weight - Maintain your current lifestyle';
        } else if (bmi >= 25 && bmi < 30) {
            interpretationText = 'Overweight - Consider more exercise and dietary changes';
        } else if (bmi >= 30 && bmi < 35) {
            interpretationText = 'Obese class I - Health risk is moderate, consider lifestyle changes';
        } else if (bmi >= 35 && bmi < 40) {
            interpretationText = 'Obese class II - High health risk, seek medical advice';
        } else {
            interpretationText = 'Obese class III - Very high health risk, consult a doctor';
        }
        
        interpretation.innerHTML = `
            <p class="fw-bold">${category}</p>
            <p>${interpretationText}</p>
            <p class="text-muted small">Note: BMI is a screening tool but not a diagnostic of body fatness or health.</p>
        `;
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
