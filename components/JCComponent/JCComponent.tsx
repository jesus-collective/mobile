
import * as React from 'react';
import MainStyles from '../../components/style';
import { Dimensions } from 'react-native';
export default class JCComponent<Props = any, State = any> extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }
    styles = MainStyles.getInstance();
    componentDidMount(): void {
        Dimensions.addEventListener('change', this.styles.updateStyles(this))
    }
    componentWillUnmount(): void {
        Dimensions.removeEventListener("change", this.styles.updateStyles(this));
    }

}