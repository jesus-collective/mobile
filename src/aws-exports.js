/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:5cc0d77d-41ea-46e9-959b-447174139b1e",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_yyA79SztQ",
    "aws_user_pools_web_client_id": "3foidb1pli6fc6l52geqvf7ovm",
    "oauth": {},
    "federationTarget": "COGNITO_IDENTITY_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL",
        "FAMILY_NAME",
        "GIVEN_NAME",
        "PHONE_NUMBER"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "SMS",
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_appsync_graphqlEndpoint": "https://bobaya7h4bfthgsqy6oiev4naq.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_cloud_logic_custom": [
        {
            "name": "AdminQueries",
            "endpoint": "https://163p5x9ndc.execute-api.us-east-1.amazonaws.com/jcfacelift",
            "region": "us-east-1"
        },
        {
            "name": "jcmobileAPI",
            "endpoint": "https://5ywar85ssg.execute-api.us-east-1.amazonaws.com/jcfacelift",
            "region": "us-east-1"
        }
    ],
    "aws_mobile_analytics_app_id": "49b1562d4fe04c66ba87f0194bbdafa0",
    "aws_mobile_analytics_app_region": "us-east-1",
    "aws_content_delivery_bucket": "jc-mobile-20190818234527-hostingbucket-jcfacelift",
    "aws_content_delivery_bucket_region": "us-east-1",
    "aws_content_delivery_url": "https://d13j9gfr4f50wr.cloudfront.net",
    "aws_user_files_s3_bucket": "jc-profilejcfacelift-jcfacelift",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "geo": {
        "amazon_location_service": {
            "region": "us-east-1",
            "maps": {
                "items": {
                    "jcMap-beta": {
                        "style": "VectorEsriLightGrayCanvas"
                    }
                },
                "default": "jcMap-beta"
            },
            "search_indices": {
                "items": [
                    "jcPeople-beta"
                ],
                "default": "jcPeople-beta"
            }
        }
    },
    "aws_cognito_login_mechanisms": [
        "EMAIL",
        "FACEBOOK",
        "GOOGLE"
    ]
};


export default awsmobile;
