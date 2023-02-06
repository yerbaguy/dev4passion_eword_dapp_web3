import React, { Component } from 'react'

export default class EWords extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
           engword: '',
           plword: ''
        }
      }

      handleChange = (e) => {

        console.log(e.target.value);

        const engword = e.target.engword
        const plword = e.target.plword

        console.log("engword", engword)
        console.log("plword", plword)

        // this.setState = {(
            
        //     [plword]: plword
        // )};

    }



  render() {
    return (
      <div>

           <form>
            <label htmlFor=''>engword</label>
            {/* <input type="text" name = "engword" value = {this.state.engword} onChange = { this.handleEngWord } placeholder='engword' /> */}
            <input type="text" name = "engword" value = {this.state.engword} onChange = { this.handleChange } placeholder='engword' />

            <input type="text" name = "plword" value = {this.state.plword } onChange = { this.handleChange } placeholder='plword' />

            <input type="submit" value="Submit" />
        </form>
        
      </div>
    )
  }
}
