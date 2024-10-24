// Array to store donations
let donations = [];

// Function to make a new donation
function makeDonation() {
    const cause = document.getElementById('cause').value;
    const amount = parseFloat(document.getElementById('donationAmount').value);

    if (!amount || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    // Simulate a blockchain transaction ID (random)
    const transactionId = '0x' + Math.random().toString(16).substr(2, 10);

    // Create a donation object
    const donation = {
        cause: cause,
        amount: amount,
        transactionId: transactionId,
        timestamp: new Date().toLocaleString()
    };

    // Add to the donations array
    donations.push(donation);

    // Update the UI
    updateDonationsList();
    updateTotalDonations();

    // Reset the input field
    document.getElementById('donationAmount').value = '';
}

// Function to update the list of donations
function updateDonationsList() {
    const donationsList = document.getElementById('donationsList');
    donationsList.innerHTML = '';  // Clear the list first

    donations.forEach((donation, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Cause:</strong> ${donation.cause} <br>
            <strong>Amount:</strong> ${donation.amount} ETH <br>
            <strong>Transaction ID:</strong> ${donation.transactionId} <br>
            <strong>Time:</strong> ${donation.timestamp}
        `;
        donationsList.appendChild(listItem);
    });
}

// Function to update the total donations
function updateTotalDonations() {
    const totalDonationsElement = document.getElementById('totalDonations');
    const totalDonations = donations.reduce((total, donation) => total + donation.amount, 0);
    totalDonationsElement.textContent = totalDonations.toFixed(2);
}
