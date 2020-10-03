import * as React from 'react';
import Sentry from '../Sentry';
import { ErrorInfo } from 'react';
import JCComponent, { JCState } from '../JCComponent/JCComponent';

interface IState extends JCState {
    error: Error
}

interface Props {
    children: any
}
export default class ErrorBoundary extends JCComponent<Props, IState>  {
    constructor(props: Props) {
        super(props)
        this.state = {
            ...super.getInitialState()
        };

    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error });
        Sentry.captureException(error, { extra: errorInfo });
    }
    render(): React.ReactNode {
        if (this.state.error) {
            return (
                <div
                    className="snap"
                    onClick={() => Sentry.lastEventId() && Sentry.showReportDialog()}
                >

                    <p>We&apos;re sorry — something&apos;s gone wrong.</p>
                    <p>Our team has been notified, but click here fill out a report.</p>
                </div>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}