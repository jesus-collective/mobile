import React from 'react';
import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button } from 'native-base';
import { Text } from 'react-native'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    onChange?(string)
}
interface State {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle: any,
    multiline: boolean,
    placeholder: string
}
export default class MessageBoard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            multiline: props.multiline,
            placeholder: props.placeholder
        }
        // console.log(props)
    }

    onChanged = address => {
        this.setState({ value: address })
        this.props.onChange(address)//this.setState({ value:address });
    };

    handleSelect = address => {
        this.setState({ value: address })
        this.props.onChange(address)
     /* *  geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));*/
    };
    render() {
        console.log(this.state.value)

        if (this.state.isEditable)
            return <PlacesAutocomplete
                value={this.state.value}
                onChange={this.onChanged}
                onSelect={this.handleSelect}
                onError={(status, clearSuggestions) => {
                    console.log('Google Maps API returned error with status: ', status)
                    clearSuggestions()
                }}
                shouldFetchSuggestions={true}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

        else
            return <Text style={this.state.textStyle}>{this.props.value}</Text>
    }
}