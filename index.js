/* Your Code Here */
const createEmployeeRecord = function(line){
    return {
        firstName: line[0],
        familyName: line[1],
        title: line[2],
        payPerHour: line[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
const createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
const createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
const createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

const hoursWorkedOnDate = function(dateSort){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === dateSort
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === dateSort
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(dateSort){
    let rawWage = hoursWorkedOnDate.call(this, dateSort)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(record){
      return record.firstName === firstName
    })
  }

const calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}