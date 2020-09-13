import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Auth } from 'aws-amplify';

interface PayPalWindow extends Window {
    paypal: any;
}

interface Params {
    cost: number;
    productId: string;
    onSuccessCallback(details: any): void;
    onFailureCallback(details: any): void;
    onErrorCallback?(err: any): void;
}

declare const window: PayPalWindow

const PayPal = ({ cost, productId, onSuccessCallback, onFailureCallback, onErrorCallback }: Params): JSX.Element => {
    const [sdkReady, setSdkReady] = useState(false);
    const [userId, setUserId] = useState('');

    const loadPayPal = () => {
        const clientID = 'AUW6ZpBxjxS6tKYDekqS__8B2DB3f5HwMQRlQ590YL-bcGtVyA9X6qxf1P7Wp2Fydv5eVV6LJ8qslHpt'; //sandbox id
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=CAD&locale=en_CA`;
        script.async = true;
        script.onload = () => { setSdkReady(true); };
        script.onerror = () => {
            throw new Error('Paypal SDK could not be loaded.');
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        async function getUser() {
            const user = await Auth.currentAuthenticatedUser();
            setUserId(user.username)
        }
        if (window && !window.paypal) {
            loadPayPal();
        }
        getUser();
    }, []);


    const createOrder = (_data: any, actions: any) => {
        return actions.order.create({
            payer: {
                address: {
                    country_code: 'CA'
                }
            },
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    value: cost,
                },
                invoice_id: `JC-${Date.now()}-U-${userId.split('-')[0]}`,
                custom_id: productId,
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
                brand_name: 'Jesus Collective',
                user_action: 'PAY_NOW'
            }
        });
    };

    const onApprove = (_data: any, actions: any) => {
        return actions.order.capture()
            .then((details: any) => { onSuccessCallback(details) })
            .catch((details: any) => { onFailureCallback(details) });
    };

    if (!sdkReady && !window.paypal) {
        return (
            <div>Loading...</div>
        );
    }

    if (cost) {
        const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

        return (
            <Button
                createOrder={(data: any, actions: any) => createOrder(data, actions)}
                onApprove={(data: any, actions: any) => onApprove(data, actions)}
                onError={(err: any) => onErrorCallback(err)}
            />
        );
    }

};

export default PayPal;