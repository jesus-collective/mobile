import { Header, Left, Body, Right, Button } from 'native-base';

import React from 'react';
import { Text, Dimensions } from 'react-native';
import HeaderStyles from '../Header/style'

import { ResourceContext } from './ResourceContext';
import EditableButton from '../Forms/EditableButton'
import JCComponent from '../JCComponent/JCComponent';
interface Props {
    navigation: any
    //items: any,
    //onAddResource(): any,
    // onChangeResource(id): any
}
class ResourceMenu extends JCComponent<Props> {
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
        //console.log(props.items)
    }

    updateStyles = (): void => {
        this.headerStyles.update()
        this.forceUpdate();
    };
    componentDidMount(): void {
        Dimensions.addEventListener('change', this.updateStyles)
    }
    componentWillUnmount(): void {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    headerStyles = new HeaderStyles()
    render(): React.ReactNode {

        //const { navigate } = this.props.navigation;
        return (
            <ResourceMenu.Consumer>
                {({ state, actions }) => {
                    return (<Header style={this.headerStyles.style.resourceContainer}>
                        <Left></Left>
                        <Body style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            {state.resourceData.resources.items.map((item, index) => {
                                if (item != null)
                                    return <EditableButton onDelete={() => actions.deleteResource(index)} onChange={(value) => actions.updateResource(index, "menuTitle", value)} key={index} placeholder="temp" isEditable={state.isEditable} onPress={() => actions.changeResource(index)}
                                        inputStyle={this.headerStyles.style.centerMenuButtonsText} textStyle={this.headerStyles.style.centerMenuButtonsText} value={item.menuTitle}>
                                    </EditableButton>
                                else
                                    return null
                            }
                            )}

                            {state.isEditable ?
                                <Button
                                    transparent
                                    onPress={actions.createResource}>
                                    <Text style={this.headerStyles.style.centerMenuButtonsText}>+</Text>
                                </Button>

                                : null}


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