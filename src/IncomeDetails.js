import React, {Component} from 'react';
import './content.css';

class IncomeDetails extends Component {

    componentDidMount(){
        this.props.get_income();
    }

    validIncomeInput = (input) => {
        if (typeof input != "string") return false 
        return !isNaN(input) &&
               !isNaN(parseFloat(input))
    }

    onEditInputChange = (event, index) => {
        if(event.target.value === ''){
            event.target.value = 0;
        }
        if(this.validIncomeInput(event.target.value)){
            this.props.editIncomeAmount(event.target.value, index);
        }
    } 

    onEditConfirm = (id, value, index) => {
        document.getElementById(`income-details${index}`).firstChild.checked = false;
        fetch('https://shielded-cove-39631.herokuapp.com/editIncome', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
            id: id,
            amount: value
            })
        })
        .then(response => {
                if(!response.ok){
                    console.log('error editing');
                }     
                else{
                    console.log('successfully edited');
                }
        })
    }

    onEditClick = (index) => {
        document.getElementById(`income-details${index}`).firstChild.checked = true;    
    }

    onDeleteIncome = (id, index) => {
        fetch('https://shielded-cove-39631.herokuapp.com/deleteIncome', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
            id: id
            })
        })
        .then(response => {
                if(!response.ok){
                    console.log('error deleting income');
                }     
                else{
                    let income_arr = this.props.income;
                    income_arr.splice(index, 1);
                    this.props.setIncome(income_arr);
                    console.log('successfully deleted');
                }
        })
    }

    render(){
        return(
            <div className ='income-sources'>
                <label>Income Sources</label>
                <div className = 'sources-details-container'>
                    {this.props.income.map((value, index) => {

                        return(
                        <div className = 'income-card' key={index}>
                            <div className = 'income-details' id = {`income-details${index}`}>
                                <input type = 'checkbox' id = 'incomeamountedit'></input>
                                <input id = {`income-card${index}`} className = 'incomeamount' onChange = {(event) => this.onEditInputChange(event, index)} value = {Math.round(value.amount * 10000000) / 10000000}></input> 
                                <svg xmlns="http://www.w3.org/2000/svg"  className = 'checkbtn' onClick = {() => this.onEditConfirm(value._id, value.amount, index)} fill="currentColor"  viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                </svg>                          
                                <svg xmlns="http://www.w3.org/2000/svg" className = 'editbtn' onClick = {() => this.onEditClick(index)} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>                                                                   
                                <svg xmlns="http://www.w3.org/2000/svg" onClick = {() => this.onDeleteIncome(value._id, index)} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </div>
                            <label id = 'incomefrequency'>{value.frequency}</label>

                        </div>
                        )
                    })}

                </div>
            </div>



        )
    }
}

export default IncomeDetails;