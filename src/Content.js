
import React, {Component} from 'react';
import PieChart from './PieChart';
import IncomeDetails from './IncomeDetails';
import SplineChart from './SplineChart';
const currencyCodes  = {'EUR': 0.0053, 'USD': 0.0065, 'PKR': 1, 'AUD': 0.0084, 'CHF': 0.0058,
                        'CAD': 0.0078, 'NZD' : 0.0090, 'CNY': 0.041, 'JPY': 0.71, };
class Content extends Component{  
    constructor(props){
        super(props);
        this.state = {
            user: {},
            income : [],
            monthly_income: 0,
            income_input : '',
            income_frequency: 'Monthly',
            addincome_status: ''
        }
    } 


    componentDidMount() {
        this.getUser()
    }

    setIncome = (income) => {
        this.setState({income: income})
        this.calculateMonthyIncome();
    };

    editIncomeAmount = (amount, index) => {
        this.setState(Object.assign(this.state.income[index], {amount: amount}));
        this.calculateMonthyIncome();
    }

    onIncomeInput = (event) => {
        this.setState({income_input: event.target.value});
    }

    onIncomeFrequency = (event) => {
        this.setState({income_frequency: event.target.value})
    }

    calculateMonthyIncome = () => {
        let income = 0;
        for(let i = 0; i < this.state.income.length; i++){
            if(this.state.income[i].frequency === 'Monthly'){
                income += parseFloat(this.state.income[i].amount);
            }
            else{ //incase income is yearly
                income += parseFloat(this.state.income[i].amount) / 12;
            }
        }
        this.setState({monthly_income: income})
    }

    onCurrencyChange = (event) => {
        fetch('https://shielded-cove-39631.herokuapp.com/changeCurrency', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
                email: this.state.user.email,
                changed_curr: [event.target.value, currencyCodes[event.target.value]],
                prev_curr: [this.state.user.currency, currencyCodes[this.state.user.currency]]
            })
            }).then(response => {
                if(!response.ok){
                    console.log('error changing currency');
                }
                else{
                    this.get_income();
                }
            })
            this.setState(Object.assign(this.state.user, {currency: event.target.value}))
    }

    getUser = () => {
        fetch('https://shielded-cove-39631.herokuapp.com/getUser', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
              email: 'johncena@gmail.com'
            })
        })
        .then(response => {
            if(!response.ok){
                console.log('error getting user data');
            }
            else{
                response.json()
                .then(result => {
                    this.setState({user: result})
                })             
            }
        }).catch(err => {
            console.log('error getting user');
        })

    }

    get_income = () => {
        fetch('https://shielded-cove-39631.herokuapp.com/getIncome', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
            {
                email: 'johncena@gmail.com',
            })
        })
        .then(response => {
            if(!response.ok){
                console.log('error getting incomes');
            }
            else{
                response.json().then(result => {
                    this.setState({income: result})
                    this.calculateMonthyIncome();
                })
            }
        })
    }

    validIncomeInput = (input) => {
        if (typeof input != "string") return false 
        return !isNaN(input) &&
               !isNaN(parseFloat(input))
    }

    addIncome = () => {
        if(this.validIncomeInput(this.state.income_input)){
            fetch('https://shielded-cove-39631.herokuapp.com/addIncome', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(
                {
                email: this.state.user.email,
                income: this.state.income_input,
                frequency: this.state.income_frequency
                })
            })
            .then(response => {
                    if(!response.ok){
                        this.setState({addincome_status: 'Error adding income'})
                    }
                    else{
                        response.json().then(result => {
                            let income_arr = this.state.income;
                            income_arr.push({_id: result, amount: this.state.income_input, frequency: this.state.income_frequency})
                            this.setState({addincome_status: '', income: income_arr, income_input: ''});
                            this.calculateMonthyIncome();
                        })
                    }
                    
            })
        }
        else{
            this.setState({addincome_status: 'Enter valid income'})
        }
    }

    render(){
        return(
            <div className = 'content-container'>
                <div className = 'profile-details'>
                    <img alt = 'profile=img'src = {this.state.user.imagelink}></img>
                    <label>{this.state.user.name}</label>
                </div>
                <div className = 'content-main'>
                    <h1 className = 'module-header'>Budget Calculator</h1>
                    <div className = 'currency-section'>
                        <label>Choose Currency</label>
                        <select onChange = {this.onCurrencyChange} value = {this.state.user.currency} className = 'currency-codes'>
                            {Object.keys(currencyCodes).map((value, index) => {
                                return <option key = {index} value = {value}>{value}</option>
                            })}
                        </select>
                    </div>
                    <div className = 'income-section'>
                        <label>Income</label>
                        <div className = 'income-inputs'>    
                            <input onChange = {this.onIncomeInput} value = {this.state.income_input} placeholder='input digits only'></input>
                            <select value = {this.income_frequency} onChange = {this.onIncomeFrequency}>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div className = 'add-income-section'>  
                            <button onClick = {this.addIncome} id = 'addincomebtn'>Add</button>
                            <label id = 'addincomestatus'>{this.state.addincome_status}</label>
                        </div>
                    </div>
                    <IncomeDetails income = {this.state.income} setIncome = {this.setIncome} get_income = {this.get_income} editIncomeAmount = {this.editIncomeAmount}/>
                    
                    <div className = 'monthly-data'>
                        <label>This Month</label>
                        <label> Income = {Math.round(this.state.monthly_income * 100) / 100} {this.state.user.currency}</label>
                        <label> Budget = {Math.round(50000 * 100) / 100} {this.state.user.currency}</label>
                    </div>
                    <div className = 'spline-chart'>
                        <SplineChart />
                    </div>
                    <div className = 'pie-chart'>
                        <PieChart />
                    </div>
                </div>
            </div>  
        );
    }

}
export default Content;