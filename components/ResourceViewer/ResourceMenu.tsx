import { Header, Left, Body, Right, Button } from 'native-base';

import React from 'react';
import { Text, Dimensions } from 'react-native';
import HeaderStyles from '../Header/style'

import { ResourceContext } from './ResourceContext';
import EditableButton from '../Forms/EditableButton'
import JCComponent from '../JCComponent/JCComponent';
import { EmptyProps } from '../../src/types';

class ResourceMenu extends JCComponent<EmptyProps> {
    static Consumer = ResourceContext.Consumer;
    constructor(props: EmptyProps) {
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
    headerStyles: HeaderStyles = new HeaderStyles()
    render(): React.ReactNode {

        //const { navigate } = this.props.navigation;
        return (
            <ResourceMenu.Consumer>
                {({ state, actions }) => {
                    if (!state)
                        return null
                    return (<Header style={this.headerStyles.style.resourceContainer}>
                        <Left></Left>
                        <Body style={this.styles.style.resourcesSubMenu}>
                            {state.resourceData.resources.items.map((item, index: number) => {
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