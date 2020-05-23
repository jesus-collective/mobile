import { Header, Left, Body, Right, Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Image, Text, Dimensions } from 'react-native';
import HeaderStyles from '../Header/style'
import { Auth } from 'aws-amplify';
import { constants } from '../../src/constants'
import { ResourceContext } from './ResourceContext';
import EditableButton from '../Forms/EditableButton'
interface Props {
    navigation: any
    //items: any,
    //onAddResource(): any,
    // onChangeResource(id): any
}
interface State { }
class ResourceMenu extends React.Component<Props, State> {
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
        //console.log(props.items)
    }
    navigateToResource(id) {
        console.log(id)
    }
    updateStyles = () => {
        this.styles.update()
        this.forceUpdate();
    };
    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyles)
    }
    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    styles = new HeaderStyles()
    render() {

        //const { navigate } = this.props.navigation;
        return (
            <ResourceMenu.Consumer>
                {({ state, actions }) => {
                    return (<Header style={this.styles.style.resourceContainer}>
                        <Left></Left>
                        <Body style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            {state.data.resources.items.map((item, index) => {
                                if (item != null)
                                    return <EditableButton onDelete={() => actions.deleteResource(index)} onChange={(value) => actions.updateResource(index, "menuTitle", value)} key={index} placeholder="temp" isEditable={true} onPress={() => actions.changeResource(index)}
                                        inputStyle={this.styles.style.centerMenuButtonsText} textStyle={this.styles.style.centerMenuButtonsText} value={item.menuTitle}>
                                    </EditableButton>
                                else
                                    return null
                            }
                            )}


                            <Button
                                transparent
                                onPress={actions.createResource}>
                                <Text style={this.styles.style.centerMenuButtonsText}>+</Text>
                            </Button>




                        </Body>
                        <Right></Right>

                    </Header>)
                }
                }
            </ResourceMenu.Consumer>

        )
    }
}
export default ResourceMenu