import React from 'react';
import { Container, Card, CardItem, ListItem, List } from 'native-base';

import { Text, Image, Dimensions } from 'react-native'
import { ResourceContext, ResourceState } from './ResourceContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import EditableText from '../Forms/EditableText'
import JCComponent, { JCState } from '../JCComponent/JCComponent';

interface Props {
    currentResource: number
}

interface State extends JCState {
    numberOfVideos: number
    rowLength: number
    cardHeight: number
}

class ResourceContent extends JCComponent<Props, State> {

    static Consumer = ResourceContext.Consumer;
    constructor(props: Props) {
        super(props);
        this.state = {
            ...super.getInitialState(),
            numberOfVideos: 0,
            rowLength: 4,
            cardHeight: 0
        }
    }

    componentDidMount(): void {

        const w = Dimensions.get('window').width

        if (w >= 1280)
            this.setState({ rowLength: 4, numberOfVideos: 8, cardHeight: 200 + w * 0.09 })
        else if (w < 769)
            this.setState({ rowLength: 1, numberOfVideos: 4 })
        else
            this.setState({ rowLength: 3, numberOfVideos: 6, cardHeight: 200 + w * 0.12 })
    }

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.currentResource !== this.props.currentResource) {
            this.state.rowLength === 3 ? this.setState({ numberOfVideos: 6 }) : this.setState({ numberOfVideos: 8 })
        }
    }

    renderSeriesMobile(state: ResourceState, actions): React.ReactNode {
        const moreVideosLength = state.resourceData.resources.items[state.currentResource].series.items.length - 3
        return (
            <Container style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', backgroundColor: "#F9FAFC" }}>
                <Container style={this.styles.style.resourceContentLeftContainer}>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>Current Series</Text>
                    </Container>
                    <List>
                        {state.resourceData.resources.items[state.currentResource].series.items.slice(0, 3).map((series, index: number) => {
                            const thumbnailIndex = this.findFirstEpisode(series.episodes.items)
                            return (
                                <ListItem key={series.id} style={{ borderBottomWidth: 0 }}>
                                    <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                            </CardItem>
                                            : null
                                        }
                                        <TouchableOpacity
                                            accessible={true}
                                            accessibilityLabel={series.title}
                                            accessibilityHint={"Navigate to series " + series.title}
                                            onPress={() => { !state.isEditable ? actions.changeSeries(index) : null }}>
                                            <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                                {series.type === "ky-preschool" ?
                                                    <Image
                                                        accessible={true}
                                                        accessibilityLabel={series.title + " thumbnail"}
                                                        style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                        resizeMode="contain"
                                                        source={{ uri: series.playlistImage }}
                                                    />
                                                    : <Image
                                                        accessible={true}
                                                        accessibilityLabel={series.title + " thumbnail"}
                                                        style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                        resizeMode="contain"
                                                        source={{ uri: "https://img.youtube.com/vi/" + series.episodes.items[thumbnailIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg" }}
                                                    />
                                                }
                                            </CardItem>

                                            <CardItem style={{ width: '100%', padding: 0, margin: 0, paddingBottom: 0, backgroundColor: '#F9FAFC' }}>
                                                <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                    multiline={false}
                                                    inputStyle={this.styles.style.seriesTitle}
                                                    textStyle={this.styles.style.seriesTitle}
                                                    value={series.title}
                                                    isEditable={state.isEditable}></EditableText>
                                            </CardItem>
                                            <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC' }}>
                                                <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "description", val) }}
                                                    multiline={true}
                                                    inputStyle={this.styles.style.seriesDescription}
                                                    textStyle={this.styles.style.seriesDescription}
                                                    value={this.stripHTMLTags(series.description)}
                                                    isEditable={state.isEditable}
                                                    ellipsizeMode='tail'
                                                    numberOfLines={3}></EditableText>
                                            </CardItem>
                                            <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <JCButton buttonType={ButtonTypes.Solid} onPress={() => actions.changeSeries(index)}>Learn More</JCButton>
                                            </CardItem>
                                        </TouchableOpacity>
                                    </Card>
                                </ListItem>
                            )
                        })}

                    </List>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>More Series</Text>
                    </Container>
                    <List style={{ height: '100%' }}>

                        {state.resourceData.resources.items[state.currentResource].series.items.slice(3, this.state.numberOfVideos + 4).map((series, index: number) => {
                            const thumbnailIndex = this.findFirstEpisode(series.episodes.items)
                            index += 3
                            return (
                                <ListItem key={series.id} style={{ borderBottomWidth: 0 }}>
                                    <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                            </CardItem>
                                            : null
                                        }
                                        <TouchableOpacity
                                            accessible={true}
                                            accessibilityLabel={series.title}
                                            accessibilityHint={"Navigate to series " + series.title}
                                            onPress={() => { !state.isEditable ? actions.changeSeries(index) : null }}>
                                            <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                                {series.type === "ky-preschool" ?
                                                    <Image
                                                        accessible={true}
                                                        accessibilityLabel={series.title + " thumbnail"}
                                                        style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                        resizeMode="contain"
                                                        source={{ uri: series.playlistImage }}
                                                    />
                                                    : <Image
                                                        accessible={true}
                                                        accessibilityLabel={series.title + " thumbnail"}
                                                        style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                        resizeMode="contain"
                                                        source={{ uri: "https://img.youtube.com/vi/" + series.episodes.items[thumbnailIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg" }}
                                                    />
                                                }
                                            </CardItem>
                                            <CardItem style={{ width: '100%', padding: 0, margin: 0, paddingBottom: 0, backgroundColor: '#F9FAFC' }}>
                                                <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                    multiline={false}
                                                    inputStyle={this.styles.style.seriesTitle}
                                                    textStyle={this.styles.style.seriesTitle}
                                                    value={series.title}
                                                    isEditable={state.isEditable}></EditableText>
                                            </CardItem>
                                            <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <JCButton buttonType={ButtonTypes.MoreSeriesOutlineBold} onPress={() => actions.changeSeries(index)}>Learn More</JCButton>
                                            </CardItem>
                                        </TouchableOpacity>
                                    </Card>
                                </ListItem>
                            )

                        })}
                        {state.isEditable ?
                            <ListItem style={{ borderBottomWidth: 0 }}>
                                <TouchableOpacity onPress={actions.createSeries}>
                                    <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
                                        <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                            <Text>Add Series</Text>
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    </Card>
                                </TouchableOpacity>
                            </ListItem>
                            : null}
                        {moreVideosLength - this.state.numberOfVideos > 0 ?
                            <ListItem style={{ borderBottomWidth: 0 }}>
                                <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.handleMoreVideos(moreVideosLength)}>Load More Videos</JCButton>
                            </ListItem>
                            : null}
                    </List>
                </Container>
            </Container >)
    }

    renderSeries(state: ResourceState, actions): React.ReactNode {
        let temp = [];
        const moreVideosLength = state.resourceData.resources.items[state.currentResource].series.items.length - 3
        return (
            <Container style={{ height: '100%', display: "flex", flexDirection: "row", justifyContent: 'flex-start', backgroundColor: "#F9FAFC" }}>
                <Container style={this.styles.style.resourceContentLeftContainer}>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>Current Series</Text>
                    </Container>
                    <Container style={this.styles.style.resourceContentCurrentSeriesContainer}>

                        {state.resourceData.resources.items[state.currentResource].series.items.length > 3 ? state.resourceData.resources.items[state.currentResource].series.items.slice(0, 3).map((series, index: number) => {
                            const thumbnailIndex = this.findFirstEpisode(series.episodes.items)
                            return (
                                <Card key={series.id} style={this.styles.style.resourceContentCurrentSeriesCard}>
                                    {state.isEditable ?
                                        <CardItem>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                            <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                        </CardItem>
                                        : null
                                    }
                                    <TouchableOpacity
                                        accessible={true}
                                        accessibilityLabel={series.title}
                                        accessibilityHint={"Navigate to series " + series.title}
                                        onPress={() => { !state.isEditable ? actions.changeSeries(index) : null }}>
                                        <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>

                                            {series.type === "ky-preschool" ?
                                                <Image
                                                    accessible={true}
                                                    accessibilityLabel={series.title + " thumbnail"}
                                                    style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                    resizeMode="contain"
                                                    source={{ uri: series.playlistImage }}
                                                />
                                                : <Image
                                                    accessible={true}
                                                    accessibilityLabel={series.title + " thumbnail"}
                                                    style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                    resizeMode="contain"
                                                    source={{
                                                        uri: series.episodes.items[thumbnailIndex]?.videoPreview ?
                                                            "https://img.youtube.com/vi/" + series.episodes.items[thumbnailIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg"
                                                            : "no.jpg"
                                                    }}
                                                />
                                            }
                                        </CardItem>
                                        <CardItem style={{ width: '100%', height: 70, padding: 0, margin: 0, paddingBottom: 0, backgroundColor: '#F9FAFC', alignItems: 'flex-start' }}>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                multiline={false}
                                                inputStyle={this.styles.style.seriesTitle}
                                                textStyle={this.styles.style.seriesTitle}
                                                value={series.title}
                                                isEditable={state.isEditable}
                                                ellipsizeMode='tail'
                                                numberOfLines={2}
                                            ></EditableText>

                                        </CardItem>
                                        <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC' }}>
                                            <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "description", val) }}
                                                multiline={true}
                                                inputStyle={this.styles.style.seriesDescription}
                                                textStyle={this.styles.style.seriesDescription}
                                                value={this.stripHTMLTags(series.description)}
                                                isEditable={state.isEditable}
                                                ellipsizeMode='tail'
                                                numberOfLines={3}></EditableText>
                                        </CardItem>
                                        <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => actions.changeSeries(index)}>Learn More</JCButton>
                                        </CardItem>
                                    </TouchableOpacity>
                                </Card>
                            )
                        }) : null}

                    </Container>
                    <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 40, marginTop: 30, paddingLeft: 10, paddingRight: 20 }}>
                        <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Bold-App", color: '#333333' }}>More Series</Text>
                    </Container>
                    <Container style={{ height: this.state.cardHeight * this.state.numberOfVideos / this.state.rowLength, width: "100%" }}>

                        {state.resourceData.resources.items[state.currentResource].series.items.slice(3, this.state.numberOfVideos + 4).map((series, index: number) => {
                            temp.push(series)
                            if (index + 1 === moreVideosLength && this.state.numberOfVideos - moreVideosLength > 0) {
                                const offset = 4 - temp.length

                                for (let val = 0; val < offset - 4 + this.state.rowLength; val++) {
                                    temp.push('dummy')
                                }
                                return <Container style={this.styles.style.resourceContentMoreSeriesRowContainer}>
                                    {temp.map((series2, index2) => {

                                        if (series2 === 'dummy') {
                                            return <Card key={series2 + index2} style={this.styles.style.resourceContentMoreSeriesCardDummy}></Card>
                                        }

                                        const firstEpisodeIndex = this.findFirstEpisode(series2.episodes.items)
                                        return (
                                            <Card key={series2.id} style={this.styles.style.resourceContentMoreSeriesCard}>
                                                {state.isEditable ?
                                                    <CardItem>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index + index2 + offset) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index + index2 + offset) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                                    </CardItem>
                                                    : null
                                                }
                                                <TouchableOpacity
                                                    accessible={true}
                                                    accessibilityLabel={series2.title}
                                                    accessibilityHint={"Navigate to series " + series2.title}
                                                    onPress={() => { !state.isEditable ? actions.changeSeries(index + index2 + offset) : null }}>
                                                    <CardItem style={this.styles.style.resourceContentMoreSeriesIframeContainer}>
                                                        {series2.type === "ky-preschool" ?
                                                            <Image
                                                                accessible={true}
                                                                accessibilityLabel={series2.title + " thumbnail"}
                                                                style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                                resizeMode="contain"
                                                                source={{ uri: series2.playlistImage }}
                                                            />
                                                            : <Image
                                                                accessible={true}
                                                                accessibilityLabel={series2.title + " thumbnail"}
                                                                style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                                resizeMode="contain"
                                                                source={{
                                                                    uri: series2.episodes.items[firstEpisodeIndex]?.videoPreview ?
                                                                        "https://img.youtube.com/vi/" + series2.episodes.items[firstEpisodeIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg"
                                                                        : "no.jpg"
                                                                }}
                                                            />
                                                        }
                                                    </CardItem>
                                                    <CardItem style={{ width: '100%', height: 70, padding: 0, margin: 0, paddingBottom: 0, backgroundColor: '#F9FAFC', alignItems: 'flex-start' }}>
                                                        <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                            multiline={false}
                                                            inputStyle={this.styles.style.seriesTitle}
                                                            textStyle={this.styles.style.seriesTitle}
                                                            value={series2.title}
                                                            isEditable={state.isEditable}
                                                            ellipsizeMode='tail'
                                                            numberOfLines={2}></EditableText>
                                                    </CardItem>
                                                    <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <JCButton buttonType={ButtonTypes.MoreSeriesOutlineBold} onPress={() => actions.changeSeries(index + index2 + offset)}>Learn More</JCButton>
                                                    </CardItem>
                                                </TouchableOpacity>
                                            </Card>
                                        )
                                    })}
                                </Container>
                            }

                            else if ((index + 1) % this.state.rowLength === 0) {
                                const tempCopy = temp
                                temp = []
                                return <Container style={this.styles.style.resourceContentMoreSeriesRowContainer}>
                                    {tempCopy.map((series2, index2) => {
                                        const firstEpisodeIndex = this.findFirstEpisode(series2.episodes.items)
                                        return (
                                            <Card key={series2.id} style={this.styles.style.resourceContentMoreSeriesCard}>
                                                {state.isEditable ?
                                                    <CardItem>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeSeries(index + index2 + 4 - this.state.rowLength) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteSeries(state.currentResource, index + index2 + 4 - this.state.rowLength) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                                    </CardItem>
                                                    : null
                                                }
                                                <TouchableOpacity
                                                    accessible={true}
                                                    accessibilityLabel={series2.title}
                                                    accessibilityHint={"Navigate to series " + series2.title}
                                                    onPress={() => { !state.isEditable ? actions.changeSeries(index + index2 + 4 - this.state.rowLength) : null }}>
                                                    <CardItem style={this.styles.style.resourceContentMoreSeriesIframeContainer}>
                                                        {series2.type === "ky-preschool" ?
                                                            <Image
                                                                accessible={true}
                                                                accessibilityLabel={series2.title + " thumbnail"}
                                                                style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                                resizeMode="contain"
                                                                source={{ uri: series2.playlistImage }}
                                                            />
                                                            : <Image
                                                                accessible={true}
                                                                accessibilityLabel={series2.title + " thumbnail"}
                                                                style={{ padding: 0, width: '100%', height: '100%', borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
                                                                resizeMode="contain"
                                                                source={{ uri: "https://img.youtube.com/vi/" + series2.episodes.items[firstEpisodeIndex].videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg" }}
                                                            />
                                                        }
                                                    </CardItem>
                                                    <CardItem style={{ width: '100%', height: 70, padding: 0, margin: 0, paddingBottom: 0, backgroundColor: '#F9FAFC', alignItems: 'flex-start' }}>
                                                        <EditableText onChange={(val) => { actions.updateSeries(state.currentResource, index, "title", val) }}
                                                            multiline={false}
                                                            inputStyle={this.styles.style.seriesTitle}
                                                            textStyle={this.styles.style.seriesTitle}
                                                            value={series2.title}
                                                            isEditable={state.isEditable}
                                                            ellipsizeMode='tail'
                                                            numberOfLines={2}></EditableText>
                                                    </CardItem>
                                                    <CardItem style={{ width: '100%', padding: 0, margin: 0, backgroundColor: '#F9FAFC', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <JCButton buttonType={ButtonTypes.MoreSeriesOutlineBold} onPress={() => actions.changeSeries(index + index2 + 4 - this.state.rowLength)}>Learn More</JCButton>
                                                    </CardItem>
                                                    {/*<CardItem>
                                                        <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{series.category}</Text>
                                                    </CardItem>*/}
                                                </TouchableOpacity>
                                            </Card>
                                        )
                                    })}
                                </Container>

                            }

                        })}
                        {state.isEditable ?
                            <TouchableOpacity onPress={actions.createSeries}>
                                <Card style={this.styles.style.resourceContentCurrentSeriesCard}>
                                    <CardItem style={this.styles.style.resourceContentCurrentSeriesIframeContainer}>
                                        <Text>Add Series</Text>
                                    </CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0, paddingBottom: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                </Card>
                            </TouchableOpacity>
                            : null}
                        {moreVideosLength - this.state.numberOfVideos > 0 ?
                            <Container style={this.styles.style.resourceContentLoadMoreButtonContainer}>
                                <JCButton buttonType={ButtonTypes.Solid} onPress={() => this.handleMoreVideos(moreVideosLength)}>Load More Videos</JCButton>
                            </Container>
                            : null}
                    </Container>
                </Container>
                <Container style={this.styles.style.resourceContentRightContainer}>
                </Container>
            </Container >)
    }
    generateKey(state: ResourceState): string {
        return state.currentResource + "-" + state.currentSeries + "-" + state.currentEpisode
    }

    renderEpisodesMobile(state: ResourceState, actions): React.ReactNode {
        const series = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
        if (series.type === 'ky-preschool') {
            const img = series.playlistImage
            const seriesTitle = series.title
            return (
                <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                    <List>
                        <ListItem style={{ flexDirection: 'column', borderBottomWidth: 0 }}>
                            {state.isEditable ?
                                <EditableText
                                    key={this.generateKey(state) + '1'}
                                    onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                                    multiline={false}
                                    inputStyle={this.styles.style.headerSeriesTitle}
                                    textStyle={this.styles.style.headerSeriesTitle}
                                    value={series.title}
                                    isEditable={state.isEditable}></EditableText>
                                : null}

                            <EditableText
                                key={this.generateKey(state) + '2'}
                                onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                                multiline={true}
                                inputStyle={this.styles.style.resourceContentEpisodesDescription}
                                textStyle={this.styles.style.resourceContentEpisodesDescription}
                                value={this.stripHTMLTags(series.description)}
                                isEditable={state.isEditable}></EditableText>

                            <Container style={{ alignSelf: 'flex-start', marginTop: 50, marginBottom: 40, flexGrow: 0, borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, width: 240 }}></Container>

                            <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
                            <EditableText
                                key={this.generateKey(state) + '3'}
                                onChange={() => null}
                                multiline={true}
                                inputStyle={this.styles.style.resourceContentEpisodesText}
                                textStyle={this.styles.style.resourceContentEpisodesText}
                                value={series.whoIsThisFor}
                                isEditable={state.isEditable}></EditableText>

                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>+ Add to my Favourites</JCButton>
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Share with Others</JCButton>
                        </ListItem>
                        <Container>
                            {series.episodes.items.sort((a, b) => state.isEditable ? 0 : a.episodeNumber - b.episodeNumber).map((episode, index: number) => {
                                return (
                                    <Card
                                        key={episode.id}
                                        style={{
                                            padding: 0,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            borderRadius: 4,
                                            width: '100%',
                                            borderColor: "#ffffff",
                                            height: (episode.lessonPlan || episode.activityPage) && (episode.videoLowRes || episode.videoHiRes) ?
                                                index === 0 ? Dimensions.get('window').width * (9 / 16) + 175 + 25 : 175 + 25
                                                : index === 0 ? Dimensions.get('window').width * (9 / 16) + 112 + 25 : 112 + 25
                                        }}
                                    >
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>

                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, state.currentSeries, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                            </CardItem> :
                                            null
                                        }
                                        <CardItem style={{ width: '100%', paddingRight: 0, paddingLeft: 0 }}>
                                            <Container style={this.styles.style.resourceContentEpisodesCardInnerContainer}>
                                                {index === 0 ?
                                                    <Image
                                                        accessible={true}
                                                        accessibilityLabel={seriesTitle + " series graphic"}
                                                        style={this.styles.style.resourceContentEpisodesIframe}
                                                        source={{ uri: img }}
                                                    /> : null
                                                }
                                                <CardItem>
                                                    <EditableText
                                                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "title", val) }}
                                                        multiline={false}
                                                        inputStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                        textStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                        value={episode.title}
                                                        isEditable={state.isEditable}></EditableText>
                                                </CardItem>
                                                {episode.videoLowRes || episode.videoHiRes ?
                                                    <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer}>

                                                        <Text style={this.styles.style.resourceContentEpisodesEpisodeTitle}>Video</Text>
                                                        <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                            {episode.videoLowRes ?
                                                                <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.videoLowRes}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Low</JCButton>
                                                                : null
                                                            }
                                                            {episode.videoHiRes ?
                                                                <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.videoHiRes}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />High Quality</JCButton>
                                                                : null
                                                            }
                                                        </CardItem>
                                                    </CardItem>
                                                    : null}

                                                {episode.lessonPlan || episode.activityPage ?
                                                    <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer2}>
                                                        <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                            {episode.lessonPlan ?
                                                                <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.lessonPlan}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Lesson Plan</JCButton>
                                                                : null
                                                            }
                                                            {episode.activityPage ?
                                                                <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.activityPage}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Activity Page</JCButton>
                                                                : null
                                                            }
                                                        </CardItem>
                                                    </CardItem>
                                                    : null}
                                            </Container>
                                        </CardItem>
                                    </Card>
                                )

                            })}
                            {state.isEditable ?
                                <TouchableOpacity onPress={actions.createEpisode}>
                                    <Card style={this.styles.style.resourceContentEpisodeCard}>
                                        <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                                            <Text>Add Episode</Text>
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    </Card>
                                </TouchableOpacity> : null
                            }
                        </Container>
                        <ListItem style={{ flexDirection: 'column', borderBottomWidth: 0 }}>
                            <Text style={this.styles.style.resourceContentEpisodesDownloadInfo}>Download all documantation that you’ll need for this package. Lessons overview and templates for whole cirruculum is available as well.</Text>
                            {series.allFiles ?
                                <JCButton buttonType={ButtonTypes.Solid} onPress={() => window.location.href = series.allFiles}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Download Documents</JCButton>
                                : null
                            }
                        </ListItem>
                    </List>
                </Container>)
        } else {
            return (
                <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                    <List>
                        <ListItem style={{ flexDirection: 'column', borderBottomWidth: 0 }}>
                            {state.isEditable ?
                                <EditableText
                                    key={this.generateKey(state) + '1'}
                                    onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                                    multiline={false}
                                    inputStyle={this.styles.style.headerSeriesTitle}
                                    textStyle={this.styles.style.headerSeriesTitle}
                                    value={series.title}
                                    isEditable={state.isEditable}></EditableText>
                                : null}

                            <EditableText
                                key={this.generateKey(state) + '2'}
                                onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                                multiline={true}
                                inputStyle={this.styles.style.resourceContentEpisodesDescription}
                                textStyle={this.styles.style.resourceContentEpisodesDescription}
                                value={this.stripHTMLTags(series.description)}
                                isEditable={state.isEditable}></EditableText>

                            <Container style={{ alignSelf: 'flex-start', marginTop: 50, marginBottom: 40, flexGrow: 0, borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, width: 240 }}></Container>

                            <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
                            <EditableText
                                key={this.generateKey(state) + '3'}
                                onChange={() => null}
                                multiline={true}
                                inputStyle={this.styles.style.resourceContentEpisodesText}
                                textStyle={this.styles.style.resourceContentEpisodesText}
                                value={series.whoIsThisFor}
                                isEditable={state.isEditable}></EditableText>

                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>+ Add to my Favourites</JCButton>
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Share with Others</JCButton>
                        </ListItem>
                        <Container>
                            {series.episodes.items.sort((a, b) => state.isEditable ? 0 : a.episodeNumber - b.episodeNumber).map((episode, index: number) => {
                                return (
                                    <Card
                                        key={episode.id}
                                        style={{
                                            padding: 0,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            borderRadius: 4,
                                            width: '100%',
                                            borderColor: "#ffffff",
                                            height: (episode.lessonPlan || episode.activityPage) && (episode.videoLowRes || episode.videoHiRes) ? Dimensions.get('window').width * (9 / 16) + 175 + 25 : Dimensions.get('window').width * (9 / 16) + 112 + 25
                                        }}
                                    >
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>

                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, state.currentSeries, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                            </CardItem> :
                                            null
                                        }
                                        <CardItem style={{ width: '100%', paddingRight: 0, paddingLeft: 0 }}>
                                            <Container style={this.styles.style.resourceContentEpisodesCardInnerContainer}>
                                                <TouchableOpacity
                                                    accessible={true}
                                                    accessibilityLabel={episode.title}
                                                    accessibilityHint={"Navigate to episode " + episode.title}
                                                    onPress={() => { !state.isEditable ? actions.changeEpisode(index) : null }}>
                                                    <Image
                                                        accessible={true}
                                                        accessibilityLabel={episode.title + " thumbnail"}
                                                        style={this.styles.style.resourceContentEpisodesIframe}
                                                        source={{ uri: "https://img.youtube.com/vi/" + episode.videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg" }}
                                                    />
                                                </TouchableOpacity>

                                                <CardItem>
                                                    <EditableText
                                                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "title", val) }}
                                                        multiline={false}
                                                        inputStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                        textStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                        value={episode.title}
                                                        isEditable={state.isEditable}></EditableText>
                                                </CardItem>
                                                {episode.videoLowRes || episode.videoHiRes ?
                                                    <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer}>

                                                        <Text style={this.styles.style.resourceContentEpisodesEpisodeTitle}>Video</Text>
                                                        <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                            {episode.videoLowRes ?
                                                                <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.videoLowRes}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Low</JCButton>
                                                                : null
                                                            }
                                                            {episode.videoHiRes ?
                                                                <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.videoHiRes}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />High Quality</JCButton>
                                                                : null
                                                            }
                                                        </CardItem>
                                                    </CardItem>
                                                    : null}

                                                {episode.lessonPlan || episode.activityPage ?
                                                    <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer2}>
                                                        <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                            {episode.lessonPlan ?
                                                                <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.lessonPlan}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Lesson Plan</JCButton>
                                                                : null
                                                            }
                                                            {episode.activityPage ?
                                                                <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.activityPage}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Activity Page</JCButton>
                                                                : null
                                                            }
                                                        </CardItem>
                                                    </CardItem>
                                                    : null}
                                            </Container>
                                        </CardItem>
                                    </Card>
                                )

                            })}
                            {state.isEditable ?
                                <TouchableOpacity onPress={actions.createEpisode}>
                                    <Card style={this.styles.style.resourceContentEpisodeCard}>
                                        <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                                            <Text>Add Episode</Text>
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    </Card>
                                </TouchableOpacity> : null
                            }
                        </Container>
                        <ListItem style={{ flexDirection: 'column', borderBottomWidth: 0 }}>
                            <Text style={this.styles.style.resourceContentEpisodesDownloadInfo}>Download all documantation that you’ll need for this package. Lessons overview and templates for whole cirruculum is available as well.</Text>
                            {series.allFiles ?
                                <JCButton buttonType={ButtonTypes.Solid} onPress={() => window.location.href = series.allFiles}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Download Documents</JCButton>
                                : null
                            }
                        </ListItem>
                    </List>
                </Container>)
        }
    }

    renderEpisodes(state: ResourceState, actions): React.ReactNode {
        const series = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
        if (series.type === 'ky-preschool') {
            const img = series.playlistImage
            const seriesTitle = series.title
            return (
                <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                    <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>

                        {state.isEditable ? <EditableText
                            key={this.generateKey(state) + '1'}
                            onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                            multiline={false}
                            inputStyle={this.styles.style.headerSeriesTitle}
                            textStyle={this.styles.style.headerSeriesTitle}
                            value={series.title}
                            isEditable={state.isEditable}></EditableText>
                            : null}

                        <EditableText
                            key={this.generateKey(state) + '2'}
                            onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                            multiline={true}
                            inputStyle={this.styles.style.resourceContentEpisodesDescription}
                            textStyle={this.styles.style.resourceContentEpisodesDescription}
                            value={this.stripHTMLTags(series.description)}
                            isEditable={state.isEditable}></EditableText>

                        <Container style={{ marginTop: 50, marginBottom: 40, flexGrow: 0, borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, width: 200, alignSelf: 'center' }}></Container>

                        <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
                        <EditableText
                            key={this.generateKey(state) + '3'}
                            onChange={() => null}
                            multiline={true}
                            inputStyle={this.styles.style.resourceContentEpisodesText}
                            textStyle={this.styles.style.resourceContentEpisodesText}
                            value={series.whoIsThisFor}
                            isEditable={state.isEditable}></EditableText>

                        {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

                        <Container style={this.styles.style.resourceContentEpisodesContainer}>
                            <Card style={this.styles.style.resourceContentEpisodeCard}>
                                {state.isEditable ?
                                    <CardItem>
                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>

                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, state.currentSeries, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                        <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                    </CardItem> :
                                    null
                                }
                                <CardItem style={{ width: '100%' }}>
                                    <Container style={this.styles.style.resourceContentEpisodesCardInnerContainer}>
                                        <Image
                                            accessible={true}
                                            accessibilityLabel={seriesTitle + " series graphic"}
                                            style={this.styles.style.resourceContentEpisodesIframe}
                                            source={{ uri: img }}
                                        />
                                        <Container style={{ marginLeft: 40 }}>
                                            {series.episodes.items.sort((a, b) => state.isEditable ? 0 : a.episodeNumber - b.episodeNumber).map((episode, index: number) => {
                                                return (
                                                    <Container key={episode.id}>
                                                        <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                            <EditableText
                                                                onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "title", val) }}
                                                                multiline={false}
                                                                inputStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                                textStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                                value={episode.title}
                                                                isEditable={state.isEditable}></EditableText>
                                                        </CardItem>
                                                        {episode.videoLowRes || episode.videoHiRes ?
                                                            <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer}>

                                                                <Text style={this.styles.style.resourceContentEpisodesVideoText}>Video</Text>
                                                                <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                                    {episode.videoLowRes ?
                                                                        <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.videoLowRes}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Low</JCButton>
                                                                        : null
                                                                    }
                                                                    {episode.videoHiRes ?
                                                                        <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.videoHiRes}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />High Quality</JCButton>
                                                                        : null
                                                                    }
                                                                </CardItem>
                                                            </CardItem>
                                                            : null}
                                                        {episode.lessonPlan || episode.activityPage ?
                                                            <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer2}>
                                                                <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                                    {episode.lessonPlan ?
                                                                        <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.lessonPlan}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Lesson Plan</JCButton>
                                                                        : null
                                                                    }
                                                                    {episode.activityPage ?
                                                                        <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.activityPage}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Activity Page</JCButton>
                                                                        : null
                                                                    }
                                                                </CardItem>
                                                            </CardItem>
                                                            : null}
                                                    </Container>
                                                )
                                            })}
                                        </Container>

                                    </Container>
                                </CardItem>
                            </Card>
                            {state.isEditable ?
                                <TouchableOpacity onPress={actions.createEpisode}>
                                    <Card style={this.styles.style.resourceContentEpisodeCard}>
                                        <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                                            <Text>Add Episode</Text>
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    </Card>
                                </TouchableOpacity> : null
                            }

                        </Container>

                    </Container >

                    <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
                        <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>+ Add to my Favourites</JCButton>
                        <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Share with Others</JCButton>
                        <Text style={this.styles.style.resourceContentEpisodesDownloadInfo}>Download all documantation that you’ll need for this package. Lessons overview and templates for whole cirruculum is available as well.</Text>
                        {series.allFiles ?
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => window.location.href = series.allFiles}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Download Documents</JCButton>
                            : null
                        }
                    </Container>

                </Container >)
        } else {
            return (
                <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                    <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>

                        {state.isEditable ? <EditableText
                            key={this.generateKey(state) + '1'}
                            onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "title", val) }}
                            multiline={false}
                            inputStyle={this.styles.style.headerSeriesTitle}
                            textStyle={this.styles.style.headerSeriesTitle}
                            value={series.title}
                            isEditable={state.isEditable}></EditableText>
                            : null}

                        <EditableText
                            key={this.generateKey(state) + '2'}
                            onChange={(val) => { actions.updateSeries(state.currentResource, state.currentSeries, "description", val) }}
                            multiline={true}
                            inputStyle={this.styles.style.resourceContentEpisodesDescription}
                            textStyle={this.styles.style.resourceContentEpisodesDescription}
                            value={this.stripHTMLTags(series.description)}
                            isEditable={state.isEditable}></EditableText>

                        <Container style={{ marginTop: 50, marginBottom: 40, flexGrow: 0, borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, width: 200, alignSelf: 'center' }}></Container>

                        <Text style={this.styles.style.whoIsThisForText}>Who is this for?</Text>
                        <EditableText
                            key={this.generateKey(state) + '3'}
                            onChange={() => null}
                            multiline={true}
                            inputStyle={this.styles.style.resourceContentEpisodesText}
                            textStyle={this.styles.style.resourceContentEpisodesText}
                            value={series.whoIsThisFor}
                            isEditable={state.isEditable}></EditableText>

                        {/*<Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].category}</Text>*/}

                        <Container style={this.styles.style.resourceContentEpisodesContainer}>
                            {series.episodes.items.sort((a, b) => state.isEditable ? 0 : a.episodeNumber - b.episodeNumber).map((episode, index: number) => {
                                return (
                                    <Card key={episode.id} style={this.styles.style.resourceContentEpisodeCard}>
                                        {state.isEditable ?
                                            <CardItem>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-back" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-attach" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.changeEpisode(index) }}> <Ionicons size={24} name="ios-open" style={this.styles.style.icon} /></JCButton>

                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={() => { actions.deleteEpisode(state.currentResource, state.currentSeries, index) }}><Ionicons size={24} name="ios-trash" style={this.styles.style.icon} /></JCButton>
                                                <JCButton buttonType={ButtonTypes.TransparentNoPadding} onPress={null}> <Ionicons size={24} name="ios-arrow-forward" style={this.styles.style.icon} /></JCButton>
                                            </CardItem> :
                                            null
                                        }
                                        <CardItem style={{ width: '100%' }}>
                                            <Container style={this.styles.style.resourceContentEpisodesCardInnerContainer}>
                                                <TouchableOpacity
                                                    accessible={true}
                                                    accessibilityLabel={episode.title}
                                                    accessibilityHint={"Navigate to episode " + episode.title}
                                                    onPress={() => { !state.isEditable ? actions.changeEpisode(index) : null }}>
                                                    <Image
                                                        accessible={true}
                                                        accessibilityLabel={episode.title + " thumbnail"}
                                                        style={this.styles.style.resourceContentEpisodesIframe}
                                                        source={{ uri: "https://img.youtube.com/vi/" + episode.videoPreview.replace("https://youtu.be/", "") + "/maxresdefault.jpg" }}
                                                    />
                                                </TouchableOpacity>

                                                <Container style={{ marginLeft: 40, height: '100%' }}>
                                                    <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                        <EditableText
                                                            onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, index, "title", val) }}
                                                            multiline={false}
                                                            inputStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                            textStyle={this.styles.style.resourceContentEpisodesEpisodeTitle}
                                                            value={episode.title}
                                                            isEditable={state.isEditable}></EditableText>
                                                    </CardItem>
                                                    {episode.videoLowRes || episode.videoHiRes ?
                                                        <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer}>

                                                            <Text style={this.styles.style.resourceContentEpisodesVideoText}>Video</Text>
                                                            <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                                {episode.videoLowRes ?
                                                                    <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.videoLowRes}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Low</JCButton>
                                                                    : null
                                                                }
                                                                {episode.videoHiRes ?
                                                                    <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.videoHiRes}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />High Quality</JCButton>
                                                                    : null
                                                                }
                                                            </CardItem>
                                                        </CardItem>
                                                        : null}

                                                    {episode.lessonPlan || episode.activityPage ?
                                                        <CardItem style={this.styles.style.resourceContentEpisodesButtonsContainer2}>
                                                            <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8, paddingBottom: 8 }}>
                                                                {episode.lessonPlan ?
                                                                    <JCButton buttonType={ButtonTypes.TransparentRegularOrange} onPress={() => window.location.href = episode.lessonPlan}><AntDesign name="download" size={24} color="F0493E" style={{ marginRight: 12 }} />Lesson Plan</JCButton>
                                                                    : null
                                                                }
                                                                {episode.activityPage ?
                                                                    <JCButton buttonType={ButtonTypes.SolidResources} onPress={() => window.location.href = episode.activityPage}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Activity Page</JCButton>
                                                                    : null
                                                                }
                                                            </CardItem>
                                                        </CardItem>
                                                        : null}
                                                </Container>
                                            </Container>
                                        </CardItem>
                                    </Card>
                                )

                            })}
                            {state.isEditable ?
                                <TouchableOpacity onPress={actions.createEpisode}>
                                    <Card style={this.styles.style.resourceContentEpisodeCard}>
                                        <CardItem style={this.styles.style.resourceContentEpisodesIframeContainer}>
                                            <Text>Add Episode</Text>
                                        </CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeTitle}></Text></CardItem>
                                        <CardItem style={{ width: 300, padding: 0, margin: 0 }}><Text style={this.styles.style.episodeDescription}></Text></CardItem>
                                    </Card>
                                </TouchableOpacity> : null
                            }

                        </Container>

                    </Container >

                    <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
                        <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>+ Add to my Favourites</JCButton>
                        <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Share with Others</JCButton>
                        <Text style={this.styles.style.resourceContentEpisodesDownloadInfo}>Download all documantation that you’ll need for this package. Lessons overview and templates for whole cirruculum is available as well.</Text>
                        {series.allFiles ?
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => window.location.href = series.allFiles}><AntDesign name="download" size={24} color="white" style={{ marginRight: 12 }} />Download Documents</JCButton>
                            : null
                        }
                    </Container>

                </Container >)
        }
    }
    renderEpisode(state: ResourceState, actions): React.ReactNode {
        const series = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries]
        const episode = state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode]
        return (
            <Container style={this.styles.style.resourceContentEpisodeMainContainer}>
                <Container style={this.styles.style.resourceContentEpisodeLeftContainer}>
                    <EditableText
                        key={this.generateKey(state) + 'a'}

                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "title", val) }}
                        multiline={false}
                        inputStyle={this.styles.style.headerEpisodeTitle}
                        textStyle={this.styles.style.headerEpisodeTitle}
                        value={episode.title}
                        isEditable={state.isEditable}></EditableText>


                    <iframe style={{ padding: 0, border: 0, width: 600, height: 336 }}
                        src={"https://www.youtube.com/embed/" + episode.videoPreview.replace("https://youtu.be/", "")}

                    />

                    <EditableText
                        key={this.generateKey(state) + 'b'}

                        onChange={(val) => { actions.updateEpisode(state.currentResource, state.currentSeries, state.currentEpisode, "description", val) }}
                        multiline={true}
                        inputStyle={this.styles.style.headerEpisodeDescription}
                        textStyle={this.styles.style.headerEpisodeDescription}
                        value={episode.description}
                        isEditable={state.isEditable}></EditableText>

                    {/*}  <Text style={{ wordBreak: "break-word", fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: '#333333' }}>{state.resourceData.resources.items[state.currentResource].series.items[state.currentSeries].episodes.items[state.currentEpisode].category}</Text>*/}

                    {series.allFiles ?
                        <a href={series.allFiles}>
                            <Text>All series files</Text>
                        </a> : null
                    }
                    {series.playlist ?
                        <a href={series.playlist}>
                            <Text>Series Playlist</Text>
                        </a> : null
                    }
                    {episode.videoPreview ?
                        <a href={episode.videoPreview}>
                            <Text>View Preview</Text>
                        </a> : null
                    }
                    {episode.videoLowRes ?
                        <a href={episode.videoLowRes}>
                            <Text>Lo Res Video</Text>
                        </a>
                        : null
                    }
                    {episode.videoHiRes ?
                        <a href={episode.videoHiRes}>
                            <Text>Hi Res Video</Text>
                        </a>
                        : null
                    }
                    {episode.lessonPlan ?
                        <a href={episode.lessonPlan}>
                            <Text>Lesson Plan</Text>
                        </a>
                        : null
                    }
                    {episode.activityPage ?
                        <a href={episode.activityPage}>
                            <Text>Activity Page</Text>
                        </a> : null
                    }


                </Container >

                <Container style={this.styles.style.resourceContentEpisodeRightContainer}>
                </Container>

            </Container >)
    }

    stripHTMLTags(data: string): string {
        return data.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, "").replace(/&gt;/g, "");
    }

    findFirstEpisode(series: any[]): number {
        let firstEpisodeIndex = 0
        series.forEach((episode, index) => {
            if (episode.episodeNumber === 1)
                firstEpisodeIndex = index;
        })
        return firstEpisodeIndex
    }

    handleMoreVideos(moreVideosLength: number): void {

        if (this.state.rowLength === 1 || this.state.rowLength === 4) {
            if (moreVideosLength - this.state.numberOfVideos >= 8) {
                this.setState({ numberOfVideos: this.state.numberOfVideos + 8 })
            } else {
                this.setState({ numberOfVideos: this.state.numberOfVideos + 4 })
            }
        } else {
            if (moreVideosLength - this.state.numberOfVideos >= 6) {
                this.setState({ numberOfVideos: this.state.numberOfVideos + 6 })
            } else {
                this.setState({ numberOfVideos: this.state.numberOfVideos + 3 })
            }
        }


    }

    render(): React.ReactNode {

        return (
            <ResourceContent.Consumer>
                {({ state, actions }) => {
                    if (!state)
                        return null
                    if (state.currentEpisode != null)
                        return this.renderEpisode(state, actions)
                    if (state.currentSeries != null)
                        if (this.state.rowLength === 1)
                            return this.renderEpisodesMobile(state, actions)
                        else
                            return this.renderEpisodes(state, actions)
                    else
                        if (this.state.rowLength === 1)
                            return this.renderSeriesMobile(state, actions)
                        else
                            return this.renderSeries(state, actions)

                }}
            </ResourceContent.Consumer>
        )
    }
}
export default ResourceContent