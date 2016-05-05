    /**
     * Created on 18/3/16.
     */

    /* JS objects*/

    (function() {
        'use strict';
        var Promise = require('es6-promise').Promise;

        class Flight {
            constructor(airlineCode, flightNumber, date) {
                this.airlineCode = airlineCode;
                this.flightNumber = flightNumber;
                this.date = date;
            }
        }

        class Date {
            constructor(year, month, day){
                this.year = year;
                this.month = month;
                this.day = day;
            }
        }

        class PassengerCounts {
            constructor(adult, child, infantInLap, infantInSeat,senior) {
                this.adult = adult;
                this.child = child;
                this.infantInLap = infantInLap;
                this.infantInSeat = infantInSeat;
                this.senior = senior;

            }
        }

        class Trip {
            constructor(missedConnections, passengerCounts, data, slices) {
                this.missedConnections = missedConnections;
                this.passengerCounts = passengerCounts;
                this.data = data;
                this.slices = slices;

            }
        }

        class Slice {
            constructor(duration, segment) {
                this.duration = duration;
                this.segments = segment;
            }
        }

        class Segment {
            constructor(duration, flight, cabin, bookingCode, bookingCodeCount, data, leg) {
                this.duration = duration;
                this.flight = flight;
                this.cabin = cabin;
                this.bookingCode = bookingCode;
                this.bookingCodeCount = bookingCodeCount;
                this.data = data;
                this.leg = leg;

            }
        }

        class Leg {
            constructor(aircraft, arrival,departure, origin, destination, operatingDisclosure, changePlane, data) {
                this.aircraft = aircraft;
                this.arrival = arrival;
                this.departure = departure;
                this.origin = origin;
                this.destination = destination;
                this.operatingDisclosure = operatingDisclosure;
                this.changePlane = changePlane;
                this.data = data;
            }
        }

        class DateOfBirth {
                   constructor(year, month, day){
                       this.year = year;
                       this.month = month;
                       this.day = day;
                   }
        }

       class personDetails {
           constructor(gender, firstName, lastName, middleName, dateOfBirth,
                       phone, email, isDeciderToPay, isPayer, isPassenger, isBookingPerson){
                   this.gender = gender;
                   this.firstName = firstName;
                   this.lastName = lastName;
                   this.middleName = middleName;
                   this.dateOfBirth = dateOfBirth;
                   this.phone = phone;
                   this.email = email;
                   this.isDeciderToPay = isDeciderToPay;
                   this.isPayer = isPayer;
                   this.isPassenger = isPassenger;
                   this.isBookingPerson = isBookingPerson;
           }
       }

       class TripData{
           constructor(id, personInfo){
               this.id = id;
               this.personInfo = personInfo;
           }
       }

       class PurchaseData {
           constructor(priceRequestId, clientNonce, priceTier,tripData, pciTransactionId, data){
               this.priceRequestId = priceRequestId;
               this.clientNonce = clientNonce;
               this.priceTier = priceTier;
               this.trip = tripData;
               this.pciTransactionId = pciTransactionId;
               this.data = data;
           }

       }

        module.exports = global.dataObjects = {
            flight(airlineCode, flightNumber, date) {
                return (new Flight(airlineCode, flightNumber, date));
            },passengerCounts(adult, child, infantInLap, infantInSeat, senior) {
                return (new PassengerCounts(adult, child, infantInLap, infantInSeat, senior));
            },data(data) {
                return data;
            },leg(aircraft, arrival, departure, origin, destination, operatingDisclosure, changePlane, data){
                return(new Leg(aircraft, arrival, departure, origin, destination, operatingDisclosure, changePlane, data));
            },segment(duration, flight, cabin, bookingCode, bookingCodeCount, data, leg){
                return(new Segment(duration, flight, cabin, bookingCode, bookingCodeCount, data, leg));
            },slices(duration, segment){
                return(new Slice(duration, segment));
            },trip(missedConnections, passengerCounts, data, slices){
                return (new Trip(missedConnections, passengerCounts, data, slices));
            },date(year,month, day){
                return (new Date(year, month, day));
            },dateOfBirth(year, month, day){
                return (new DateOfBirth(year, month, day));
            },personInfo(gender, firstName, lastName, middleName, dateOfBirth,
                     phone, email, isDeciderToPay, isPayer, isPassenger, isBookingPerson){
                return (new personDetails(gender, firstName, lastName, middleName, dateOfBirth,
                    phone, email, isDeciderToPay, isPayer, isPassenger, isBookingPerson))
            },tripData(id, personInfo){
                return (new TripData(id, personInfo));
            },purchaseData(priceRequestId, clientNonce, priceTier,tripData, pciTransactionId, data){
                return(new PurchaseData(priceRequestId, clientNonce, priceTier,tripData, pciTransactionId, data))
            }
        };
    }());
