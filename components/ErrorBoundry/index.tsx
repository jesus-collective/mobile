import * as React from 'react';
import Sentry from '../../components/Sentry';

interface Props { }
interface State {
    error: Error
}
export default class ErrorBoundary extends React.Component<Props, State>  {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    componentDidCatch(error, errorInfo) {
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