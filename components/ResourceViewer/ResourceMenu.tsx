import { Header, Left, Body, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Image, Text } from 'react-native';
import styles from '../Header/style'
import { Auth } from 'aws-amplify';
import { constants } from '../../src/constants'
import { withNavigation } from 'react-navigation';
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

    render() {

        //const { navigate } = this.props.navigation;
        return (
            <ResourceMenu.Consumer>
                {({ state, actions }) => {
                    return (<Header style={styles.resourceContainer}>
                        <Left></Left>
                        <Body style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            {state.data.resources.items.map((item, index) => {
                                if (item != null)
                                    return <EditableButton onDelete={() => actions.deleteResource(index)} onChange={(value) => actions.updateResource(index, "menuTitle", value)} key={index} placeholder="temp" isEditable={true} onPress={() => actions.changeResource(index)} inputStyle={styles.centerMenuButtonsText} textStyle={styles.centerMenuButtonsText} value={item.menuTitle}>
                                    </EditableButton>
                                else
                                    return null
                            }
                            )}


                            <Button
                                transparent
                                onPress={actions.createResource}>
                                <Text style={styles.centerMenuButtonsText}>+</Text>
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
export default withNavigation(ResourceMenu)