
function updateDriverAvailabilty(availbale,driverID){
    if(availbale){
        let location = getDriverCurrentLocation();
        drivers.updateOne({"driverId":driverID},{"isAvailable":availbale,"location":location});// this is db call to update the driver availabilty
    }else{
        drivers.updateOne({"driverId":driverID},{"isAvailable":availbale});// this is db call to update the driver availabilty
    }
}

function getDriverCurrentLocation(){
    return navigator.geolocation;
}

