import { Header, Left, Body, Right, Button } from 'native-base';

import React from 'react';
import { Text, Dimensions } from 'react-native';
import HeaderStyles from '../Header/style'
import { ResourceContext } from './ResourceContext';
import EditableButton from '../Forms/EditableButton'
interface Props {
    navigation: any
    //items: any,
    //onAddResource(): any,
    // onChangeResource(id): any
}
class ResourceMenu extends React.Component<Props> {
    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
        //console.log(props.items)
    }

    updateStyles = (): void => {
        this.styles.update()
        this.forceUpdate();
    };
    componentDidMount(): void {
        Dimensions.addEventListener('change', this.updateStyles)
    }
    componentWillUnmount(): void {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    styles = new HeaderStyles()
    render(): React.ReactNode {

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
                            {state.resourceData.resources.items.map((item, index) => {
                                if (item != null)
                                    return <EditableButton onDelete={() => actions.deleteResource(index)} onChange={(value) => actions.updateResource(index, "menuTitle", value)} key={index} placeholder="temp" isEditable={state.isEditable} onPress={() => actions.changeResource(index)}
                                        inputStyle={this.styles.style.centerMenuButtonsText} textStyle={this.styles.style.centerMenuButtonsText} value={item.menuTitle}>
                                    </EditableButton>
                                else
                                    return null
                            }
                            )}

                            {state.isEditable ?
                                <Button
                                    transparent
                                    onPress={actions.createResource}>
                                    <Text style={this.styles.style.centerMenuButtonsText}>+</Text>
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