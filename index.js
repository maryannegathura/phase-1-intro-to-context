// helpers.js

// Function to create an employee record object
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records from an array of arrays
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event to an employee's record
  function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  
  // Function to add a timeOut event to an employee's record
  function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date for an employee
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date for an employee
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Function to calculate total wages earned for all dates for an employee
  function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    let totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }
  
  // Function to calculate total payroll for an array of employee records
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  
  // Exporting all functions for use in other modules
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  
  // Example test cases (assuming Mocha and Chai are used)
  if (typeof describe === 'function') {
    const { expect } = require('chai');
  
    describe("The payroll system", function () {
      // Test cases can be added here as per the provided test suite
      // ...
    });
  }
  