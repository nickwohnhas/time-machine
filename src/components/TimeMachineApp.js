import React from 'react'
import Dates from './Dates'
import Header from './Header'
import axios from 'axios';
import NYTList from './NYTList';

class TimeMachineApp extends React.Component {
    state = {
      date: undefined,
      nytResponse: undefined,
      month: undefined,
      year: undefined
    };

  randomMonth = () => {
   return Math.floor(Math.random() * 12) + 1
  }

  randomYear = () => {
    const yearCollection = [...Array(2018).keys()].slice(1950, 2018)
    return yearCollection[Math.floor(Math.random() * yearCollection.length)] + 1
  }

  isLeapYear = (year) => {
    return year % 4 === 0
  }

  randomDay = (month, year) => {
    const longMonths = [1, 3, 5, 7, 8, 10, 12]
    if (month === 2 && this.isLeapYear(year)) {
      const daysInMonth = [...Array(29).keys()]
      return daysInMonth[Math.floor(Math.random() * 29) ]
    }
    else if (month === 2) {
      const daysInMonth = [...Array(28).keys()]
      return daysInMonth[Math.floor(Math.random() * 28) ]
    }
    else if (longMonths.some((num) => (num === month))) {
      const daysInMonth = [...Array(31).keys()]
      return daysInMonth[Math.floor(Math.random() * 31) ]
    }
    else {
      const daysInMonth = [...Array(30).keys()]
      return daysInMonth[Math.floor(Math.random() * 30) ]
    }
  }
  getNYTArticles = (month, year) => {
    console.log('called')
    axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const response = res.data
        this.setState(() => ({nytResponse: response}))
      })
    }

  handleGenerateDate = (e) => {
    e.preventDefault()
    const month = this.randomMonth()
    const year = this.randomYear()
    const day = this.randomDay(month, year)
    const date = new Date(Date.UTC(year, month, day))
    const dateString = date.toDateString()
    this.setState(() => ({date: dateString}))
    this.setState(() => ({ month: month }))
    this.setState(() => ({ year: year }))
    this.getNYTArticles(month, year)
  }
  render() {
    const title = "Welcome to the Time Machine App!"
    const subtitle = "Click the button below to travel through time."
    console.log(this.state.response)
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        {this.state.date && <Dates date={this.state.date} />}
        <button onClick={this.handleGenerateDate}>Time
        Travel</button>
        {this.state.nytResponse &&  <NYTList test={this.state.nytResponse} year={this.state.year} month={this.state.month} />}
      </div>
    )
  }
}

export default TimeMachineApp
