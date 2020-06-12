import React from 'react';
import { Text } from 'react-native'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import JCComponent from '../JCComponent/JCComponent';

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: string,
    inputStyle?: string,
    multiline: boolean,
    placeholder?: string,
    citiesOnly?: boolean
    onChange?(string, any)
}
interface State {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle: any,
    multiline: boolean,
    placeholder: string
}
export default class EditableLocation extends JCComponent<Props, State> {
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

    onChanged = (address: string): void => {
        this.setState({ value: address })
        this.props.onChange(address, null)//this.setState({ value:address });
    };

    handleSelect = (address: string): void => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', this.setState({ value: address }, () => {
                this.props.onChange(address, latLng)

            })))
            .catch(error => console.error('Error', error));


    };
    render(): React.ReactNode {
        console.log(this.state.value)

        if (this.state.isEditable)
            return <PlacesAutocomplete
                value={this.state.value}
                onChange={this.onChanged}
                onSelect={this.handleSelect}
                searchOptions={this.props.citiesOnly ? {types: ['(cities)']} : {types: ['address', 'establishment', '(regions)', '(cities)']}}
                onError={(status, clearSuggestions) => {
                    console.log('Google Maps API returned error with status: ', status)
                    clearSuggestions()
                }}
                shouldFetchSuggestions={true}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                    <div>
                        <input style={{ minWidth: 250, paddingTop: 7, paddingBottom: 7, paddingLeft: 10, paddingRight: 25, fontSize: 16, color: "#333333" }}
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container" style={{ minWidth: 250, padding: "7px 25px 7px 10px", maxHeight: 80, overflowY: "scroll", width: 275 }}>
                            {loading && <div className="autocomplete-dropdown-container" style={{ borderWidth: 2, borderColor: "#333333", fontFamily: "Graphik-Regular-App", fontSize: 16 }} >Loading...</div>}
                            {suggestions.map((suggestion, index) => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#FFEBE9', cursor: 'pointer', width: 275, borderWidth: 2, borderColor: "#333333" }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer', width: 275, borderWidth: 2, borderColor: "#333333" };
                                return (
                                    <div key={index}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span style={{ lineHeight: 2, fontSize: 16, color: "rgb(51, 51, 51)", fontFamily: "Graphik-Regular-App" }}>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

        else
            return <Text style={this.state.textStyle}><a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination=" + escape(this.props.value)}>{this.props.value}</a></Text>
    }
}