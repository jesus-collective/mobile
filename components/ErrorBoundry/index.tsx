import * as React from 'react';
import Sentry from '../Sentry';
import { ErrorInfo } from 'react';
import JCComponent from '../JCComponent/JCComponent';

interface State {
    error: Error
}

interface Props {
    error: Error
}

export default class ErrorBoundary extends JCComponent<Props, State>  {
    constructor(props: Props) {
        super(props)
        this.state = { error: null };
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