var axios = require('axios');

//
let thershold = 4;

function setThreshold(newThreshold) {
    thershold = newThreshold;
}

function getThreshold() {
    return thershold;
}

function bookCab(userLocation) {
    //get all the list of drivers with their locations
    let driverLocations = driverLocations.find({});// it will return the driverlocation with the driverId
    if (driverLocations.length == 0) {
        return -1;
    }
    let assignedDriver;
    let minDistance = 0.0;
    let someOneAvailable = false;
    driverLocations.map((driver) => {

        if (driver.isAvailable) {
            someOneAvailable = true;
            let distance = Math.sqrt(Math.pow((driver.location.x - userLocation.x), 2) +
                Math.pow((driver.location.y - userLocation.y), 2));
            if (distance < minDistance) {
                minDistance = distance;
                assignedDriver = driver.Id;
            }
        }

    });

    if (!someOneAvailable) {
        return -2 //means no driver found
    }

    if (minDistance > thershold) {
        return -1;
    } else {
        return assignedDriver;
    }

}

function endBooking() {
    let time = calculateTime();
    let distance = calculateDistance();
    let amount = calculateAmount();

    return [time, distance, amount];
}

function calculateTime(bookingStartTime, bookingEndTime) {
    return bookingEndTime - bookingStartTime;
}

function calculateDistance(origin, destination) {
    // this funciton can be calculate in two ways

    // 1. based on the cab prev odometer reading and the current odometer reading, (most accurate) but hardware should be there
    // in car to send the odometer reading from car to driver app

    //2. based on distance given by the route followed by the any map service .i.e. google maps

    //goole maps api approach (COPY PASTED from google maps api docs)
    

    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}destinations=${destination}units=imperial&key=YOUR_API_KEY`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            return error;
        });
}

function calculateAmount(waitingTime, surgeAmount, pendingAmount, OffersAmount) {
    let travelledDistance = calculateDistance();
    return travelledDistance + surgeAmount + pendingAmount - OffersAmount;
}