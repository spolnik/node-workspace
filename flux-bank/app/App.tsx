import * as React from 'react';
import {render} from 'react-dom';
import {Container} from 'flux/utils';
import BankBalanceStore from './BankBalanceStore';
import BankRewardsStore from './BankRewardsStore';
import BankActions from './BankActions';

interface AppState {
    balance: number;
    rewardsTier: number;
}

class App extends React.Component<{}, AppState> {

    refs: {
        [key: string]: (Element);
        amount: (HTMLInputElement);
    };

    constructor(props) {
        super(props);
        BankActions.createAccount();
    }

    deposit() {
        BankActions.depositIntoAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    withdraw() {
        BankActions.withdrawFromAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    render() {
        return (
            <div>
                <header>FluxTrust Bank</header>
                <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
                <h2>Your Points Rewards Tier is {this.state.rewardsTier}</h2>
                <div className="atm">
                    <input type="text" placeholder="Enter Amount" ref="amount"/>
                    <br />
                    <button onClick={this.withdraw.bind(this)}>Withdraw</button>
                    <button onClick={this.deposit.bind(this)}>Deposit</button>
                </div>
            </div>

        );
    }

    static getStores = () => ([BankBalanceStore, BankRewardsStore]);
    static calculateState = (prevState) => ({
        balance: BankBalanceStore.getState(),
        rewardsTier: BankRewardsStore.getState()
    });
}


const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));
