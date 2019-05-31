import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import Dates from './Dates'
import Header from './Header'
import axios from 'axios';
import NYTList from './NYTList';
import GuardianList from './GuardianList';
import '../styles/base.css';
import Button from 'react-bootstrap/Button';

class TimeMachineApp extends React.Component {
    state = {
      date: undefined,
      nytResponse: undefined,
      month: undefined,
      year: undefined,
      guardianResponse: undefined,
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
  formatDigit = (digit) => {
    if (`${digit}`.length == 1) {
      return `0${digit}`
    } else {
      return `${digit}`
    }
  }
  getNYTArticles = (month, year) => {
    axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const response = res.data
        this.setState(() => ({ nytResponse: response }))
      })
    }
    getGuardianArticles = (year, month, day,) => {
      const formattedMonth = this.formatDigit(month)
      const formattedDay = this.formatDigit(day)
      console.log(formattedDay, formattedMonth)
      axios.get(`https://content.guardianapis.com/search?from-date=${year}-${formattedMonth}-${formattedDay}&to-date=${year}-${formattedMonth}-${formattedDay}&q=politics&api-key=`)
        .then(res => {
          console.log(res);
          console.log(res.data);
          const response = res.data
          if (response.response.results.length >= 1) {
          this.setState(() => ({ guardianResponse: response.response }))
          }
        })
    }
    clearAll = () => {
      this.setState(() => ({guardianResponse: undefined}))
      this.setState(() => ({nytResponse: undefined}))
    }

  handleGenerateDate = (e) => {
    e.preventDefault()
    this.clearAll()
    const month = this.randomMonth()
    const monthForPresentation = month - 1
    const year = this.randomYear()
    const day = this.randomDay(month, year)
    const dayForPresentation = day + 1
    const date = new Date(Date.UTC(year, monthForPresentation, dayForPresentation))
    const dateString = date.toDateString()
    this.setState(() => ({date: dateString}))
    this.setState(() => ({ month: month }))
    this.setState(() => ({ year: year }))
    this.getNYTArticles(month, year)
    this.getGuardianArticles(year, month, day)
  }
  render() {
    const title = "Welcome to the Time Machine App!"
    const subtitle = "Click the button below to travel through time."
    console.log(this.state.showGuardian)
    return (
      <div>
        <div className="header">
          <Header title={title} subtitle={subtitle} />
        </div>
          <div className="buttonbox">
            <Button className="button" onClick={this.handleGenerateDate}>Time
              Travel</Button>
          </div>
        <div className="container">
          <div className="row justify-content-md-center">

            {this.state.date && <Dates date={this.state.date} />}

          </div>
          <div className="box">
            <div className="nyt">
              {this.state.nytResponse &&  <NYTList test={this.state.nytResponse} year={this.state.year} month={this.state.month} />}
              </div>

              <div>
              {this.state.guardianResponse && <GuardianList response={this.state.guardianResponse} />}
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimeMachineApp
