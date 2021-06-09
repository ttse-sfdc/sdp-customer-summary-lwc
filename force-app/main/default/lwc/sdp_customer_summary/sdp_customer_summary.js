import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import LATEST_SENTIMENT_FIELD from '@salesforce/schema/Account.Latest_Sentiment__c';
import LIFETIME_SPENDING_FIELD from '@salesforce/schema/Account.Lifetime_Spending__c';

export default class Example extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, LIFETIME_SPENDING_FIELD,LATEST_SENTIMENT_FIELD] })
    account;

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }

    get latestSentiment() {
        if(this.account.data)
            if(getFieldValue(this.account.data, LATEST_SENTIMENT_FIELD) == "Negative")
                return "😡";
            else if (getFieldValue(this.account.data, LATEST_SENTIMENT_FIELD) == "Positive")
                return "😃";
            else
                return "😐"
        else
            return "";
    }

    get lifetimeSpend(){
        return this.account.data ? getFieldDisplayValue(this.account.data, LIFETIME_SPENDING_FIELD): "$0";
    }
    
}