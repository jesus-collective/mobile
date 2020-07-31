import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PayPal = (props: { cost: number }): JSX.Element => {
    const [sdkReady, setSdkReady] = useState(false);

    const loadPayPal = () => {
        const clientID = 'sb'; //sandbox testing id
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
        script.async = true;
        script.onload = () => { setSdkReady(true); };
        script.onerror = () => {
            throw new Error('Paypal SDK could not be loaded.');
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (window && !window.paypal) {
            loadPayPal();
        }
    }, []);


    const createOrder = (_data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD', // only USD works with the sandbox
                        value: props.cost,
                    }
                }
            ]
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then((details) => { console.log(details) })
            .catch(err => { console.log(err) });
    };

    if (!sdkReady && !window.paypal) {
        return (
            <div>Loading...</div>
        );
    }

    if (props.cost) {
        const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

        return (
            <Button
                {...props}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        );
    }

};

export default PayPal;