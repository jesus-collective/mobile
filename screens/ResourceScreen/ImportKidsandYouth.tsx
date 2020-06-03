/* eslint-disable */

import React from 'react';
//{ API, graphqlOperation } 
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsmobile from '../../src/aws-exports';
import { Button, Text } from 'native-base';
import { ResourceRoot, Resource, ResourceEpisode, ResourceSeries } from "../../src/models";
import GRAPHQL_AUTH_MODE, { Greetings } from 'aws-amplify-react-native'

import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { constants } from '../../src/constants'

//mport { DataStore, Predicates } from '@aws-amplify/datastore'

Amplify.configure(awsmobile);

String.prototype.replaceAll = function (find: any, replace: any) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
Amplify.configure(awsmobile);
const federated = {
    google_client_id: '',
    facebook_app_id: '579712102531269',
    amazon_client_id: ''
};


interface Props {
    authState?: any
}
interface State { }

class IndexApp extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
    }

    recurse(obj: any) {
        //console.log(typeof (obj))
        if (typeof (obj) == "object") {
            Object.keys(obj).forEach(key => {
                if (obj[key]["__text"] != null)
                    obj[key] = obj[key]["__text"]
                else if (obj[key]["__cdata"] != null)
                    obj[key] = obj[key]["__cdata"]
                else
                    obj[key] = this.recurse(obj[key]);
            })
            return obj
        }
        else if (typeof (obj) == "string")
            return obj
    }
    unserialize(data: any) {

        var utf8Overhead = function (chr: any) {
            // http://phpjs.org/functions/unserialize:571#comment_95906
            var code = chr.charCodeAt(0);
            if (code < 0x0080) {
                return 0;
            }
            if (code < 0x0800) {
                return 1;
            }
            return 2;
        },
            error = function (type: any, msg: any, filename: any, line: any) {
                console.log(type, msg, filename, line)
                //throw new that.window[type](msg, filename, line);
            },
            read_until = function (data: any, offset: any, stopchr: any) {
                var i = 2, buf = [], chr = data.slice(offset, offset + 1);

                while (chr !== stopchr) {
                    if ((i + offset) > data.length) {
                        error('Error', 'Invalid', null, null);
                    }
                    buf.push(chr);
                    chr = data.slice(offset + (i - 1), offset + i);
                    i += 1;
                }
                return [buf.length, buf.join('')];
            },
            read_chrs = function (data: any, offset: any, length: any) {
                var i, chr, buf;

                buf = [];
                for (i = 0; i < length; i++) {
                    chr = data.slice(offset + (i - 1), offset + i);
                    buf.push(chr);
                    length -= utf8Overhead(chr);
                }
                return [buf.length, buf.join('')];
            },
            _unserialize = function (data: any, offset: any) {
                var dtype: any, dataoffset: any, keyandchrs, keys: any, contig,
                    length: any, array, readdata: any, readData: any, ccount,
                    stringlength: any, i: any, key: any, kprops: any, kchrs: any, vprops: any,
                    vchrs: any, value: any, chrs: any = 0

                var typeconvert = function (x: any) {
                    return x;
                };

                if (!offset) {
                    offset = 0;
                }
                dtype = (data.slice(offset, offset + 1)).toLowerCase();

                dataoffset = offset + 2;

                switch (dtype) {
                    case 'i':
                        typeconvert = function (x) {
                            return parseInt(x, 10);
                        };
                        readData = read_until(data, dataoffset, ';');
                        chrs = readData[0];
                        readdata = readData[1];
                        dataoffset += chrs + 1;
                        break;
                    case 'b':
                        typeconvert = function (x) {
                            return parseInt(x, 10) !== 0;
                        };
                        readData = read_until(data, dataoffset, ';');
                        chrs = readData[0];
                        readdata = readData[1];
                        dataoffset += chrs + 1;
                        break;
                    case 'd':
                        typeconvert = function (x) {
                            return parseFloat(x);
                        };
                        readData = read_until(data, dataoffset, ';');
                        chrs = readData[0];
                        readdata = readData[1];
                        dataoffset += chrs + 1;
                        break;
                    case 'n':
                        readdata = null;
                        break;
                    case 's':
                        ccount = read_until(data, dataoffset, ':');
                        chrs = ccount[0];
                        stringlength = ccount[1];
                        dataoffset += chrs + 2;

                        readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
                        chrs = readData[0];
                        readdata = readData[1];
                        dataoffset += chrs + 2;
                        if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
                            error('SyntaxError', 'String length mismatch', null, null);
                        }
                        break;
                    case 'a':
                        readdata = {};

                        keyandchrs = read_until(data, dataoffset, ':');
                        chrs = keyandchrs[0];
                        keys = keyandchrs[1];
                        dataoffset += chrs + 2;

                        length = parseInt(keys, 10);
                        contig = true;

                        for (i = 0; i < length; i++) {
                            kprops = _unserialize(data, dataoffset);
                            kchrs = kprops[1];
                            key = kprops[2];
                            dataoffset += kchrs;

                            vprops = _unserialize(data, dataoffset);
                            vchrs = vprops[1];
                            value = vprops[2];
                            dataoffset += vchrs;

                            if (key !== i)
                                contig = false;

                            readdata[key] = value;
                        }

                        if (contig) {
                            array = new Array(length);
                            for (i = 0; i < length; i++)
                                array[i] = readdata[i];
                            readdata = array;
                        }

                        dataoffset += 1;
                        break;
                    case 'u':
                        readdata = null;
                        break;
                    default:
                        //    console.log(dtype)
                        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype, null, null);
                        break;
                }
                return [dtype, dataoffset - offset, typeconvert(readdata)];
            }
            ;

        return _unserialize((data + ''), 0)[2];
    }

    async write(json: any) {
        //var getResourceRoot = await DataStore.query(ResourceRoot);

        try {
            var getResourceRoot: any = await API.graphql({
                query: queries.getResourceRoot,
                variables: { id: "1b351f62-04d1-4103-a6ab-86d45c984721" },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
        }
        catch (e) {
            console.log(e)
        }


        /* console.log(getResourceRoot)
         var jr = new Resource({
             type: "curriculum",
             menuTitle: "Jr. High",
             title: "Jr. High",
             image: null,
             description: "...",
             resourceID: "1b351f62-04d1-4103-a6ab-86d45c984721"
             //  series: []
         })
         var sr = new Resource({
             type: "curriculum",
             menuTitle: "Sr. High",
             title: "Sr. High",
             image: null,
             description: "...",
             resourceID: "1b351f62-04d1-4103-a6ab-86d45c984721"
         })
         var youth = new Resource({
             type: "curriculum",
             menuTitle: "Youth",
             title: "Youth",
             image: null,
             description: "...",
             resourceID: "1b351f62-04d1-4103-a6ab-86d45c984721"
         })
         var kids = new Resource({
             type: "curriculum",
             menuTitle: "Kids",
             title: "Kids",
             image: null,
             description: "...",
             resourceID: "1b351f62-04d1-4103-a6ab-86d45c984721"
         })
         var pre = new Resource({
             type: "curriculum",
             menuTitle: "Preschool",
             title: "Preschool",
             image: null,
             description: "...",
             resourceID: "1b351f62-04d1-4103-a6ab-86d45c984721"
         })
         try {
             var jr1: any = await API.graphql({
                 query: mutations.createResource,
                 variables: { input: jr },
                 authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
             });
         }
         catch (e) {
             console.log(e)
         }
         try {
             var sr1: any = await API.graphql({
                 query: mutations.createResource,
                 variables: { input: sr },
                 authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
             });
         }
         catch (e) {
             console.log(e)
         }
         try {
             var kids1: any = await API.graphql({
                 query: mutations.createResource,
                 variables: { input: kids },
                 authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
             });
         }
         catch (e) {
             console.log(e)
         }
         try {
             var pre1: any = await API.graphql({
                 query: mutations.createResource,
                 variables: { input: pre },
                 authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
             });
         }
         catch (e) {
             console.log(e)
         }
         try {
             var youth1: any = await API.graphql({
                 query: mutations.createResource,
                 variables: { input: youth },
                 authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
             });
         }
         catch (e) {
             console.log(e)
         }*/
        //console.log(getResourceRoot)
        /* getResourceRoot=await DataStore.save(ResourceRoot.copyOf(getResourceRoot[0], updated => {
             updated.resources = updated.resources.concat(jr[0], sr[0], kids[0], youth[0], pre[0])
         })
         )*/

        var res = json.map(async (item: any) => {
            // console.log(item)
            var ptb_all_files
            if (item.postmeta != null) {
                if (Array.isArray(item.postmeta))
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key === "ptb_all_files")
                            ptb_all_files = item2.meta_value
                    })
                else
                    if (item.postmeta.meta_key === "ptb_all_files")
                        ptb_all_files = item.postmeta.meta_value

            }
            var ptb_series_playlist
            if (item.postmeta != null) {
                if (Array.isArray(item.postmeta))
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key === "ptb_series_playlist")
                            ptb_series_playlist = item2.meta_value
                    })
            }
            ptb_all_files = this.unserialize(ptb_all_files)
            if (ptb_all_files != null)
                ptb_all_files = ptb_all_files.url[0]
            var id = item.title.toLowerCase().replaceAll(" ", "-").replaceAll("'", "").replaceAll("?", "").replaceAll(",", "").replaceAll("--", "-").replaceAll("(", "").replaceAll(")", "")
            id = id.replaceAll("&", "and").replaceAll(".", "").replaceAll("--", "-")

            if (item.category != null && item.post_type != null && item.post_type != "nav_menu_item" && item.post_type != "post") {
                if (item.post_type == "series" && item.status == "publish") {
                    var type = ""
                    var parentID = ""
                    if (item.category.includes("Junior High")) {
                        type = "jrhigh"
                        parentID = jr.id
                    }
                    if (item.category.includes("Youth")) {
                        type = "youth"
                        parentID = youth.id
                    }
                    if (item.category.includes("Preschool")) {
                        type = "preschool"
                        parentID = pre.id
                    }
                    if (item.category.includes("Kids")) {
                        type = "kids"
                        parentID = kids.id
                    }
                    if (item.category.includes("Senior High")) {
                        type = "srhigh"
                        parentID = sr.id
                    }
                    var jsonValue = new ResourceSeries({

                        type: "ky-" + type,
                        title: item.title,
                        description: item.encoded[0],
                        image: item.image == undefined ? "test.jpg" : item.image,
                        category: Array.isArray(item.category) ? item.category : [item.category],
                        status: item.status,
                        allFiles: ptb_all_files,
                        playlist: ptb_series_playlist.substring(ptb_series_playlist.indexOf("?list=") + 6, ptb_series_playlist.indexOf("\"", ptb_series_playlist.indexOf("?list=") + 6)),
                        playlistImage: "",
                        seriesID: parentID
                    })
                    try {
                        var jsonValue1: any = await API.graphql({
                            query: mutations.createResourceSeries,
                            variables: { input: jsonValue },
                            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                        });
                    }
                    catch (e) {
                        console.log(e)
                    }
                    if (ptb_series_playlist.substring(0, 3) == "<im") {
                        jsonValue = ResourceSeries.copyOf(jsonValue, updated => {
                            updated.playlist = "",
                                updated.playlistImage = ptb_series_playlist.substring(ptb_series_playlist.indexOf("src=\"") + 5, ptb_series_playlist.indexOf("\"", ptb_series_playlist.indexOf("src=\"") + 5))

                        })
                    }
                    if (jsonValue.playlist.substring(0, 3) == "me ") {
                        jsonValue = ResourceSeries.copyOf(jsonValue, updated => {
                            updated.playlist = "",
                                updated.playlistImage = ptb_series_playlist.substring(ptb_series_playlist.indexOf("embed/") + 6, ptb_series_playlist.indexOf("?", ptb_series_playlist.indexOf("embed/") + 6))

                        })
                    }
                    if (jsonValue.playlist.substring(0, 17) == "https://youtu.be/") {
                        jsonValue = ResourceSeries.copyOf(jsonValue, updated => {
                            updated.playlist = "",
                                updated.playlistImage = ptb_series_playlist.substring(ptb_series_playlist.indexOf("/"))
                        })

                    }
                    if (jsonValue.playlist.substring(0, 3) != "PLB") {
                        jsonValue = ResourceSeries.copyOf(jsonValue, updated => {
                            updated.playlist = ""

                        })
                        // console.log(ptb_series_playlist)

                    }
                    console.log("ep1")
                    var ptb_episode_1_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_1_title")
                            ptb_episode_1_title = item2.meta_value
                    })

                    var ptb_episode_1_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_1_lesson_plan")
                            ptb_episode_1_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_1_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_1_activity_page")
                            ptb_episode_1_activity_page = item2.meta_value
                    })

                    var ptb_episode_1_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_1_video_message_file_high_res")
                            ptb_episode_1_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_1_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_1_video_message_file_low_res")
                            ptb_episode_1_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_1_video_preview

                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_1_video_preview")
                            ptb_episode_1_video_preview = item2.meta_value
                    })
                    ptb_episode_1_lesson_plan = this.unserialize(ptb_episode_1_lesson_plan)
                    ptb_episode_1_activity_page = this.unserialize(ptb_episode_1_activity_page)
                    ptb_episode_1_video_message_file_high_res = this.unserialize(ptb_episode_1_video_message_file_high_res)
                    ptb_episode_1_video_message_file_low_res = this.unserialize(ptb_episode_1_video_message_file_low_res)
                    ptb_episode_1_video_preview = this.unserialize(ptb_episode_1_video_preview)

                    if (ptb_episode_1_lesson_plan != null)
                        ptb_episode_1_lesson_plan = ptb_episode_1_lesson_plan.url[0]
                    if (ptb_episode_1_activity_page != null)
                        ptb_episode_1_activity_page = ptb_episode_1_activity_page.url[0]
                    if (ptb_episode_1_video_message_file_high_res != null)
                        ptb_episode_1_video_message_file_high_res = ptb_episode_1_video_message_file_high_res.url[0]
                    if (ptb_episode_1_video_message_file_low_res != null)
                        ptb_episode_1_video_message_file_low_res = ptb_episode_1_video_message_file_low_res.url[0]
                    if (ptb_episode_1_video_preview != null)
                        ptb_episode_1_video_preview = ptb_episode_1_video_preview.url[0]

                    if (ptb_episode_1_title != "") {
                        var episode1 = new ResourceEpisode({
                            episodeNumber: 1,
                            type: "ky-episode",
                            title: ptb_episode_1_title,
                            lessonPlan: ptb_episode_1_lesson_plan,
                            activityPage: ptb_episode_1_activity_page,
                            videoHiRes: ptb_episode_1_video_message_file_high_res,
                            videoLowRes: ptb_episode_1_video_message_file_low_res,
                            videoPreview: ptb_episode_1_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode11: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode1 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }
                    console.log("ep2")
                    var ptb_episode_2_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_2_title")
                            ptb_episode_2_title = item2.meta_value
                    })

                    var ptb_episode_2_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_2_lesson_plan")
                            ptb_episode_2_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_2_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_2_activity_page")
                            ptb_episode_2_activity_page = item2.meta_value
                    })

                    var ptb_episode_2_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_2_video_message_file_high_res")
                            ptb_episode_2_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_2_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_2_video_message_file_low_res")
                            ptb_episode_2_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_2_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_2_video_preview")
                            ptb_episode_2_video_preview = item2.meta_value
                    })

                    ptb_episode_2_lesson_plan = this.unserialize(ptb_episode_2_lesson_plan)
                    ptb_episode_2_activity_page = this.unserialize(ptb_episode_2_activity_page)
                    ptb_episode_2_video_message_file_high_res = this.unserialize(ptb_episode_2_video_message_file_high_res)
                    ptb_episode_2_video_message_file_low_res = this.unserialize(ptb_episode_2_video_message_file_low_res)
                    ptb_episode_2_video_preview = this.unserialize(ptb_episode_2_video_preview)

                    if (ptb_episode_2_lesson_plan != null)
                        ptb_episode_2_lesson_plan = ptb_episode_2_lesson_plan.url[0]
                    if (ptb_episode_2_activity_page != null)
                        ptb_episode_2_activity_page = ptb_episode_2_activity_page.url[0]
                    if (ptb_episode_2_video_message_file_high_res != null)
                        ptb_episode_2_video_message_file_high_res = ptb_episode_2_video_message_file_high_res.url[0]
                    if (ptb_episode_2_video_message_file_low_res != null)
                        ptb_episode_2_video_message_file_low_res = ptb_episode_2_video_message_file_low_res.url[0]
                    if (ptb_episode_2_video_preview != null)
                        ptb_episode_2_video_preview = ptb_episode_2_video_preview.url[0]

                    if (ptb_episode_2_title != "") {
                        var episode2 = new ResourceEpisode({
                            episodeNumber: 2,
                            type: "ky-episode",
                            title: ptb_episode_2_title,
                            lessonPlan: ptb_episode_2_lesson_plan,
                            activityPage: ptb_episode_2_activity_page,
                            videoHiRes: ptb_episode_2_video_message_file_high_res,
                            videoLowRes: ptb_episode_2_video_message_file_low_res,
                            videoPreview: ptb_episode_2_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode21: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode2 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }

                    console.log("ep3")
                    var ptb_episode_3_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_3_title")
                            ptb_episode_3_title = item2.meta_value
                    })

                    var ptb_episode_3_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_3_lesson_plan")
                            ptb_episode_3_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_3_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_3_activity_page")
                            ptb_episode_3_activity_page = item2.meta_value
                    })

                    var ptb_episode_3_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_3_video_message_file_high_res")
                            ptb_episode_3_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_3_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_3_video_message_file_low_res")
                            ptb_episode_3_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_3_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_3_video_preview")
                            ptb_episode_3_video_preview = item2.meta_value
                    })

                    ptb_episode_3_lesson_plan = this.unserialize(ptb_episode_3_lesson_plan)
                    ptb_episode_3_activity_page = this.unserialize(ptb_episode_3_activity_page)
                    ptb_episode_3_video_message_file_high_res = this.unserialize(ptb_episode_3_video_message_file_high_res)
                    ptb_episode_3_video_message_file_low_res = this.unserialize(ptb_episode_3_video_message_file_low_res)
                    ptb_episode_3_video_preview = this.unserialize(ptb_episode_3_video_preview)

                    if (ptb_episode_3_lesson_plan != null)
                        ptb_episode_3_lesson_plan = ptb_episode_3_lesson_plan.url[0]
                    if (ptb_episode_3_activity_page != null)
                        ptb_episode_3_activity_page = ptb_episode_3_activity_page.url[0]
                    if (ptb_episode_3_video_message_file_high_res != null)
                        ptb_episode_3_video_message_file_high_res = ptb_episode_3_video_message_file_high_res.url[0]
                    if (ptb_episode_3_video_message_file_low_res != null)
                        ptb_episode_3_video_message_file_low_res = ptb_episode_3_video_message_file_low_res.url[0]
                    if (ptb_episode_3_video_preview != null)
                        ptb_episode_3_video_preview = ptb_episode_3_video_preview.url[0]

                    if (ptb_episode_3_title != "") {
                        var episode3 = new ResourceEpisode({
                            episodeNumber: 3,
                            type: "ky-episode",
                            title: ptb_episode_3_title,
                            lessonPlan: ptb_episode_3_lesson_plan,
                            activityPage: ptb_episode_3_activity_page,
                            videoHiRes: ptb_episode_3_video_message_file_high_res,
                            videoLowRes: ptb_episode_3_video_message_file_low_res,
                            videoPreview: ptb_episode_3_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode31: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode3 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }


                    console.log("ep4")
                    var ptb_episode_4_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_4_title")
                            ptb_episode_4_title = item2.meta_value
                    })

                    var ptb_episode_4_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_4_lesson_plan")
                            ptb_episode_4_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_4_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_4_activity_page")
                            ptb_episode_4_activity_page = item2.meta_value
                    })

                    var ptb_episode_4_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_4_video_message_file_high_res")
                            ptb_episode_4_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_4_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_4_video_message_file_low_res")
                            ptb_episode_4_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_4_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_4_video_preview")
                            ptb_episode_4_video_preview = item2.meta_value
                    })

                    ptb_episode_4_lesson_plan = this.unserialize(ptb_episode_4_lesson_plan)
                    ptb_episode_4_activity_page = this.unserialize(ptb_episode_4_activity_page)
                    ptb_episode_4_video_message_file_high_res = this.unserialize(ptb_episode_4_video_message_file_high_res)
                    ptb_episode_4_video_message_file_low_res = this.unserialize(ptb_episode_4_video_message_file_low_res)
                    ptb_episode_4_video_preview = this.unserialize(ptb_episode_4_video_preview)

                    if (ptb_episode_4_lesson_plan != null)
                        ptb_episode_4_lesson_plan = ptb_episode_4_lesson_plan.url[0]
                    if (ptb_episode_4_activity_page != null)
                        ptb_episode_4_activity_page = ptb_episode_4_activity_page.url[0]
                    if (ptb_episode_4_video_message_file_high_res != null)
                        ptb_episode_4_video_message_file_high_res = ptb_episode_4_video_message_file_high_res.url[0]
                    if (ptb_episode_4_video_message_file_low_res != null)
                        ptb_episode_4_video_message_file_low_res = ptb_episode_4_video_message_file_low_res.url[0]
                    if (ptb_episode_4_video_preview != null)
                        ptb_episode_4_video_preview = ptb_episode_4_video_preview.url[0]

                    if (ptb_episode_4_title != "") {
                        var episode4 = new ResourceEpisode({
                            episodeNumber: 4,
                            type: "ky-episode",
                            title: ptb_episode_4_title,
                            lessonPlan: ptb_episode_4_lesson_plan,
                            activityPage: ptb_episode_4_activity_page,
                            videoHiRes: ptb_episode_4_video_message_file_high_res,
                            videoLowRes: ptb_episode_4_video_message_file_low_res,
                            videoPreview: ptb_episode_4_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode41: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode4 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }


                    console.log("ep5")
                    var ptb_episode_5_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_5_title")
                            ptb_episode_5_title = item2.meta_value
                    })

                    var ptb_episode_5_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_5_lesson_plan")
                            ptb_episode_5_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_5_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_5_activity_page")
                            ptb_episode_5_activity_page = item2.meta_value
                    })

                    var ptb_episode_5_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_5_video_message_file_high_res")
                            ptb_episode_5_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_5_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_5_video_message_file_low_res")
                            ptb_episode_5_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_5_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_5_video_preview")
                            ptb_episode_5_video_preview = item2.meta_value
                    })

                    ptb_episode_5_lesson_plan = this.unserialize(ptb_episode_5_lesson_plan)
                    ptb_episode_5_activity_page = this.unserialize(ptb_episode_5_activity_page)
                    ptb_episode_5_video_message_file_high_res = this.unserialize(ptb_episode_5_video_message_file_high_res)
                    ptb_episode_5_video_message_file_low_res = this.unserialize(ptb_episode_5_video_message_file_low_res)
                    ptb_episode_5_video_preview = this.unserialize(ptb_episode_5_video_preview)

                    if (ptb_episode_5_lesson_plan != null)
                        ptb_episode_5_lesson_plan = ptb_episode_5_lesson_plan.url[0]
                    if (ptb_episode_5_activity_page != null)
                        ptb_episode_5_activity_page = ptb_episode_5_activity_page.url[0]
                    if (ptb_episode_5_video_message_file_high_res != null)
                        ptb_episode_5_video_message_file_high_res = ptb_episode_5_video_message_file_high_res.url[0]
                    if (ptb_episode_5_video_message_file_low_res != null)
                        ptb_episode_5_video_message_file_low_res = ptb_episode_5_video_message_file_low_res.url[0]
                    if (ptb_episode_5_video_preview != null)
                        ptb_episode_5_video_preview = ptb_episode_5_video_preview.url[0]

                    if (ptb_episode_5_title != "") {
                        var episode5 = new ResourceEpisode({
                            episodeNumber: 5,
                            type: "ky-episode",
                            title: ptb_episode_5_title,
                            lessonPlan: ptb_episode_5_lesson_plan,
                            activityPage: ptb_episode_5_activity_page,
                            videoHiRes: ptb_episode_5_video_message_file_high_res,
                            videoLowRes: ptb_episode_5_video_message_file_low_res,
                            videoPreview: ptb_episode_5_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode51: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode5 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }


                    console.log("ep6")
                    var ptb_episode_6_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_6_title")
                            ptb_episode_6_title = item2.meta_value
                    })

                    var ptb_episode_6_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_6_lesson_plan")
                            ptb_episode_6_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_6_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_6_activity_page")
                            ptb_episode_6_activity_page = item2.meta_value
                    })

                    var ptb_episode_6_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_6_video_message_file_high_res")
                            ptb_episode_6_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_6_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_6_video_message_file_low_res")
                            ptb_episode_6_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_6_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_6_video_preview")
                            ptb_episode_6_video_preview = item2.meta_value
                    })

                    ptb_episode_6_lesson_plan = this.unserialize(ptb_episode_6_lesson_plan)
                    ptb_episode_6_activity_page = this.unserialize(ptb_episode_6_activity_page)
                    ptb_episode_6_video_message_file_high_res = this.unserialize(ptb_episode_6_video_message_file_high_res)
                    ptb_episode_6_video_message_file_low_res = this.unserialize(ptb_episode_6_video_message_file_low_res)
                    ptb_episode_6_video_preview = this.unserialize(ptb_episode_6_video_preview)

                    if (ptb_episode_6_lesson_plan != null)
                        ptb_episode_6_lesson_plan = ptb_episode_6_lesson_plan.url[0]
                    if (ptb_episode_6_activity_page != null)
                        ptb_episode_6_activity_page = ptb_episode_6_activity_page.url[0]
                    if (ptb_episode_6_video_message_file_high_res != null)
                        ptb_episode_6_video_message_file_high_res = ptb_episode_6_video_message_file_high_res.url[0]
                    if (ptb_episode_6_video_message_file_low_res != null)
                        ptb_episode_6_video_message_file_low_res = ptb_episode_6_video_message_file_low_res.url[0]
                    if (ptb_episode_6_video_preview != null)
                        ptb_episode_6_video_preview = ptb_episode_6_video_preview.url[0]

                    if (ptb_episode_6_title != "") {
                        var episode6 = new ResourceEpisode({
                            episodeNumber: 6,
                            type: "ky-episode",
                            title: ptb_episode_6_title,
                            lessonPlan: ptb_episode_6_lesson_plan,
                            activityPage: ptb_episode_6_activity_page,
                            videoHiRes: ptb_episode_6_video_message_file_high_res,
                            videoLowRes: ptb_episode_6_video_message_file_low_res,
                            videoPreview: ptb_episode_6_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode61: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode6 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }

                    }
                    console.log("ep7")

                    var ptb_episode_7_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_7_title")
                            ptb_episode_7_title = item2.meta_value

                    })
                    if (ptb_episode_7_title == undefined)
                        ptb_episode_7_title = ""
                    var ptb_episode_7_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_7_lesson_plan")
                            ptb_episode_7_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_7_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_7_activity_page")
                            ptb_episode_7_activity_page = item2.meta_value
                    })

                    var ptb_episode_7_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_7_video_message_file_high_res")
                            ptb_episode_7_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_7_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_7_video_message_file_low_res")
                            ptb_episode_7_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_7_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_7_video_preview")
                            ptb_episode_7_video_preview = item2.meta_value
                    })

                    ptb_episode_7_lesson_plan = this.unserialize(ptb_episode_7_lesson_plan)
                    ptb_episode_7_activity_page = this.unserialize(ptb_episode_7_activity_page)
                    ptb_episode_7_video_message_file_high_res = this.unserialize(ptb_episode_7_video_message_file_high_res)
                    ptb_episode_7_video_message_file_low_res = this.unserialize(ptb_episode_7_video_message_file_low_res)
                    ptb_episode_7_video_preview = this.unserialize(ptb_episode_7_video_preview)

                    if (ptb_episode_7_lesson_plan != null)
                        ptb_episode_7_lesson_plan = ptb_episode_7_lesson_plan.url[0]
                    if (ptb_episode_7_activity_page != null)
                        ptb_episode_7_activity_page = ptb_episode_7_activity_page.url[0]
                    if (ptb_episode_7_video_message_file_high_res != null)
                        ptb_episode_7_video_message_file_high_res = ptb_episode_7_video_message_file_high_res.url[0]
                    if (ptb_episode_7_video_message_file_low_res != null)
                        ptb_episode_7_video_message_file_low_res = ptb_episode_7_video_message_file_low_res.url[0]
                    if (ptb_episode_7_video_preview != null)
                        ptb_episode_7_video_preview = ptb_episode_7_video_preview.url[0]

                    if (ptb_episode_7_title != "") {
                        var episode7 = new ResourceEpisode({
                            episodeNumber: 7,
                            type: "ky-episode",
                            title: ptb_episode_7_title,
                            lessonPlan: ptb_episode_7_lesson_plan,
                            activityPage: ptb_episode_7_activity_page,
                            videoHiRes: ptb_episode_7_video_message_file_high_res,
                            videoLowRes: ptb_episode_7_video_message_file_low_res,
                            videoPreview: ptb_episode_7_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode71: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode7 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }

                    console.log("ep8")

                    var ptb_episode_8_title
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_8_title")
                            ptb_episode_8_title = item2.meta_value
                    })
                    if (ptb_episode_8_title == undefined)
                        ptb_episode_8_title = ""
                    var ptb_episode_8_lesson_plan
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_8_lesson_plan")
                            ptb_episode_8_lesson_plan = item2.meta_value
                    })

                    var ptb_episode_8_activity_page
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_8_activity_page")
                            ptb_episode_8_activity_page = item2.meta_value
                    })

                    var ptb_episode_8_video_message_file_high_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_8_video_message_file_high_res")
                            ptb_episode_8_video_message_file_high_res = item2.meta_value
                    })

                    var ptb_episode_8_video_message_file_low_res
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_8_video_message_file_low_res")
                            ptb_episode_8_video_message_file_low_res = item2.meta_value
                    })

                    var ptb_episode_8_video_preview
                    item.postmeta.forEach((item2: any) => {
                        if (item2.meta_key == "ptb_episode_8_video_preview")
                            ptb_episode_8_video_preview = item2.meta_value
                    })

                    ptb_episode_8_lesson_plan = this.unserialize(ptb_episode_8_lesson_plan)
                    ptb_episode_8_activity_page = this.unserialize(ptb_episode_8_activity_page)
                    ptb_episode_8_video_message_file_high_res = this.unserialize(ptb_episode_8_video_message_file_high_res)
                    ptb_episode_8_video_message_file_low_res = this.unserialize(ptb_episode_8_video_message_file_low_res)
                    ptb_episode_8_video_preview = this.unserialize(ptb_episode_8_video_preview)

                    if (ptb_episode_8_lesson_plan != null)
                        ptb_episode_8_lesson_plan = ptb_episode_8_lesson_plan.url[0]
                    if (ptb_episode_8_activity_page != null)
                        ptb_episode_8_activity_page = ptb_episode_8_activity_page.url[0]
                    if (ptb_episode_8_video_message_file_high_res != null)
                        ptb_episode_8_video_message_file_high_res = ptb_episode_8_video_message_file_high_res.url[0]
                    if (ptb_episode_8_video_message_file_low_res != null)
                        ptb_episode_8_video_message_file_low_res = ptb_episode_8_video_message_file_low_res.url[0]
                    if (ptb_episode_8_video_preview != null)
                        ptb_episode_8_video_preview = ptb_episode_8_video_preview.url[0]

                    if (ptb_episode_8_title != "") {
                        var episode8 = new ResourceEpisode({
                            episodeNumber: 8,
                            type: "ky-episode",
                            title: ptb_episode_8_title,
                            lessonPlan: ptb_episode_8_lesson_plan,
                            activityPage: ptb_episode_8_activity_page,
                            videoHiRes: ptb_episode_8_video_message_file_high_res,
                            videoLowRes: ptb_episode_8_video_message_file_low_res,
                            videoPreview: ptb_episode_8_video_preview,
                            episodeID: jsonValue.id
                        })
                        try {
                            var episode81: any = await API.graphql({
                                query: mutations.createResourceEpisode,
                                variables: { input: episode8 },
                                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }




                    return { jsonValue }




                }
            }
        }
        )
        console.log("start end")
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        Promise.all(res).then(async (res2) => {
            var res3: any = res2.filter(z => z != undefined)
            console.log("start end2")






        })

    }

    /*writeYoutube(vid1: any) {
      console.log("Write Youtube: " + vid1);
      var youtubeId: any = vid1['id']
     
      const getVideoByYoutubeIdent = API.graphql(graphqlOperation(queries.getVideoByYoutubeIdent, { YoutubeIdent: youtubeId }));
      getVideoByYoutubeIdent.then((json: any) => {
        //console.log("Success queries.searchVideos: " + json);
        if (json.data.getVideoByYoutubeIdent.items.length === 0) {
          console.log(json)
     
          console.log("Do mutations.createVideo")
          delete vid1['id'];
     
          delete vid1['selected'];
          if (vid1.snippet.description === "")
            delete vid1.snippet['description']
          if (vid1.snippet.localized === null)
            delete vid1.snippet['localized']
          if (vid1.snippet.localized.description === "")
            delete vid1.snippet.localized['description']
          if (vid1.contentDetails.videoId === null)
            delete vid1.contentDetails['videoId']
          if (vid1.contentDetails.videoPublishedAt === null)
            delete vid1.contentDetails['videoPublishedAt']
          const createVideo = API.graphql(graphqlOperation(mutations.createVideo, { input: { id: youtubeId, YoutubeIdent: youtubeId, Youtube: vid1 } }));
          createVideo.then((json3: any) => {
            /* this.setState({
                 currentVideoData: json3.data.createVideo
             })*/
    /*   console.log("Success mutations.createVideo: " + json3);
     }).catch((err: any) => {
       console.log("Error mutations.createVideo: " + err);
       console.log(err)
       console.log(vid1)
     });
    }
    else if (json.data.getVideoByYoutubeIdent.items.length === 1) {
     console.log(json)
     
     console.log("Do mutations.createVideo")
     delete vid1['id'];
     
     delete vid1['selected'];
     if (vid1.snippet.description === "")
       delete vid1.snippet['description']
     if (vid1.snippet.localized === null)
       delete vid1.snippet['localized']
     if (vid1.snippet.localized.description === "")
       delete vid1.snippet.localized['description']
     if (vid1.contentDetails.videoId === null)
       delete vid1.contentDetails['videoId']
     if (vid1.contentDetails.videoPublishedAt === null)
       delete vid1.contentDetails['videoPublishedAt']
     const updateVideo = API.graphql(graphqlOperation(mutations.updateVideo, { input: { id: youtubeId, Youtube: vid1 } }));
     updateVideo.then((json3: any) => {
       /* this.setState({
            currentVideoData: json3.data.createVideo
        })*/
    /*     console.log("Success mutations.updateVideo: " + json3);
       }).catch((err: any) => {
         console.log("Error mutations.updateVideo: " + err);
         console.log(err)
         console.log(vid1)
       });
     }
     
     
     
     
    }).catch((err: any) => {
     console.log("Error queries.getVideoByYoutubeIdent: " + err);
     console.log(err)
    });
    }*/
    updateVideo(original: any, series: any, episode: any) {
        //series = series
        // original = original
        // console.log(original)
        if (episode.title != null) {
            var youtube: any = episode.videoPreview.replace("https://youtu.be/", "").replace("https://www.youtube.com/watch?v=", "")
            if (youtube !== "") {
                var episodeTitle: any
                if (episode.title.includes("|"))
                    episodeTitle = episode.title.split("|")[1].trim()
                else
                    episodeTitle = episode.title.trim()

                /* const getVideoByYoutubeIdent = API.graphql(graphqlOperation(queries.getVideoByYoutubeIdent, { YoutubeIdent: youtube }));
                 getVideoByYoutubeIdent.then((json: any) => {
                   //console.log("Success queries.searchVideos: " + json);
                   if (json.data.getVideoByYoutubeIdent.items.length === 0) {
                     console.log("not found")
                     console.log(episodeTitle)
                     console.log(youtube)
                     const getYoutubeVideoSearch = API.graphql(graphqlOperation(queries.getYoutubeVideoSearch, { videoId: youtube }));
                     getYoutubeVideoSearch.then((json: any) => {
                       console.log(json.data.getYoutubeVideoSearch.items[0])
                       this.writeYoutube(json.data.getYoutubeVideoSearch.items[0])
                     }).catch((e: any) => {
                       console.log(e)
                     })
         
                   }
                   else {
                     var category: any
                     if (series.category.flat().includes("Junior High"))
                       category = "jrhigh"
                     if (series.category.flat().includes("Youth"))
                       category = "youth"
                     if (series.category.flat().includes("Preschool"))
                       category = "preschool"
                     if (series.category.flat().includes("Kids"))
                       category = "kids"
                     if (series.category.flat().includes("Senior High"))
                       category = "srhigh"
                     var seriesId = "ky-" + category + "-" + series.title
                     console.log(seriesId + "---" + series.title)
         
                     /* const createSeries = API.graphql(graphqlOperation(mutations.createSeries, { input: { id: seriesId, title: series.title } }));
                       createSeries.then((json: any) => {
                         console.log("Success mutations.createSeries: " + json);
                       }).catch((err: any) => {
                         console.log("Error mutations.createSeries: " + err);
                         console.log(err)
                       });*/
                /*    var z = "ky-" + category
                    console.log(original)
                    const updateSeries = API.graphql(graphqlOperation(mutations.updateSeries, { input: { id: seriesId, image: series.image, seriesType: z, title: series.title, startDate: original.post_date[0].split(" ")[0], endDate: original.post_date[0].split(" ")[0] } }));
                    updateSeries.then((json: any) => {
                      console.log("Success mutations.updateSeries: " + json);
                    }).catch((err: any) => {
                      console.log("Error mutations.updateSeries: " + err);
                      console.log(err)
                    });
        
                    const updateVideo = API.graphql(graphqlOperation(mutations.updateVideo, { input: { id: youtube, videoTypes: z, publishedDate: original.post_date[0].split(" ")[0], episodeTitle: episodeTitle, episodeNumber: episode.episodeNumber, seriesTitle: series.title, videoSeriesId: seriesId } }));
                    updateVideo.then(() => {
                      console.log("updateVideo success")
        
                    }).catch((err: any) => {
                      console.log("Error queries.updateVideo: " + err);
                      console.log(err)
                    })
        
                    //console.log(+ "---" + episode.episodeNumber + "---" + series.category + "---" + youtube + "---" + episodeTitle + "---")
        
        
                    //    else console.log(json)
                  }
                  //          console.log("found")
                })
                /*     if (!episode.title.includes(episode.episodeNumber))
             {        console.log(original)
                    
                  }   */
                //console.log(episode.title)
                //console.log(youtube)
            }
        }
    }

    createEpisode(episode: any, id: any) {
        episode.curriculumEpisodeGroupId = id
        /*  const createCurriculumEpisode = API.graphql(graphqlOperation(mutations.createCurriculumEpisode, { input: episode }));
          createCurriculumEpisode.then((json:any) => {
            console.log("Success queries.createCurriculumEpisode: " + json);
            // console.log(json)
       
       
          }).catch((err:any) => {
            console.log("Error queries.createCurriculumEpisode: " + err);
            console.log(err)
            console.log(episode)
       
          });*/

    }
    createGroup(group: any, episodes: any) {
        console.log(episodes)
        // console.log("createCurriculumGroup")
        if (group.image === null)
            delete group.image
        if (group.image === undefined)
            delete group.image
        if (group.playlist === "")
            delete group.playlist
        if (group.description === "")
            delete group.description
        if (group.playlist === null)
            delete group.playlist
        if (group.allFiles === "")
            delete group.allFiles
        /*  const createCurriculumGroup = API.graphql(graphqlOperation(mutations.createCurriculumGroup, { input: group }));
          createCurriculumGroup.then((json:any) => {
            console.log("Success queries.createCurriculumGroup: " + json);
            //  console.log(json)
            episodes.forEach(
              (item:any) => {
                if (item.title == "")
                  delete item.title
                if (item.lessonPlan == "")
                  delete item.lessonPlan
                if (item.activityPage == "")
                  delete item.activityPage
                if (item.videoHiRes == "")
                  delete item.videoHiRes
                if (item.videoLowRes == "")
                  delete item.videoLowRes
                if (item.videoPreview == "")
                  delete item.videoPreview
                if (item.image == null)
                  delete item.image
                if (item.image == undefined)
                  delete item.image
                this.createEpisode(item, json.data.createCurriculumGroup.id)
              }
            )
          }).catch((err:any) => {
            console.log("Error queries.createCurriculumGroup: " + err);
            console.log(err)
            console.log(group)
       
          });*/
    }
    importKidsAndYouth() {
        console.log("importKidsAndYouth")
        var data = require('./kidsandyouth.json');

        data = this.recurse(data)
        this.write(data["rss"]["channel"]["item"])
        //  console.log(myJson["rss"]["channel"]["item"])


    }








    render() {
        return (
            constants['SETTING_ISVISIBLE_RESOURCE_IMPORT'] ?
                <div>

                    <Button onPress={() => { this.importKidsAndYouth() }}><Text>Import Kids and Youth</Text></Button>


                </div > : null
        );
    }
}
export default IndexApp;