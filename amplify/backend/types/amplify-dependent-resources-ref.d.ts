export type AmplifyDependentResourcesAttributes = {
  analytics: {
    jcmobile: {
      Id: "string"
      Region: "string"
      appName: "string"
    }
  }
  api: {
    AdminQueries: {
      ApiId: "string"
      ApiName: "string"
      RootUrl: "string"
    }
    jcmobile: {
      GraphQLAPIEndpointOutput: "string"
      GraphQLAPIIdOutput: "string"
    }
    jcmobileAPI: {
      ApiId: "string"
      ApiName: "string"
      RootUrl: "string"
    }
  }
  auth: {
    jcmobile: {
      AppClientID: "string"
      AppClientIDWeb: "string"
      CreatedSNSRole: "string"
      FacebookWebClient: "string"
      GoogleWebClient: "string"
      IdentityPoolId: "string"
      IdentityPoolName: "string"
      UserPoolArn: "string"
      UserPoolId: "string"
      UserPoolName: "string"
    }
    userPoolGroups: {
      adminGroupRole: "string"
      courseAdminGroupRole: "string"
      courseCoachGroupRole: "string"
      courseGroup1GroupRole: "string"
      courseGroup2GroupRole: "string"
      courseGroup3GroupRole: "string"
      courseGroup4GroupRole: "string"
      courseGroup5GroupRole: "string"
      courseGroup6GroupRole: "string"
      courseGroup7GroupRole: "string"
      courseGroup8GroupRole: "string"
      courseGroup9GroupRole: "string"
      courseUserGroupRole: "string"
      friendsGroupRole: "string"
      legacyUserGroup1GroupRole: "string"
      partnersGroupRole: "string"
      productMarkBakerGroupRole: "string"
      subscriptionPartnersGroupRole: "string"
      subscriptionValidGroupRole: "string"
      subscriptionkyearlyyearsGroupRole: "string"
      subscriptionkykidsGroupRole: "string"
      subscriptionkyyouthGroupRole: "string"
      userpoolGroupRole: "string"
      verifiedUsersGroupRole: "string"
    }
  }
  function: {
    AdminQueries7403b6cf: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    S3Trigger14f1cefa: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    S3Trigger839efa13: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    deleteJCUser: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcHandleActivity: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcProcessDMAlerts: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcProcessMessageAlerts: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcUpdateMainUserGroup: {
      Arn: "string"
      CloudWatchEventRule: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileCreateCognitoOrgUser: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileGetOrgStripeSubs: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobilePinpointCleanEndpoints: {
      Arn: "string"
      CloudWatchEventRule: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobilePostConfirmation: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobilePreSignup: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobilePreTokenGeneration: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileSendHelpRequest: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileSendInviteToOrgUser: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileShared: {
      Arn: "string"
    }
    jcmobileStripCancelSubscription: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripCreateCustomer: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripCreateSubscription: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripListInvoices: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripListProducts: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripPreviewInvoice: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripWebhook: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
    jcmobileStripeCreatePaymentIntent: {
      Arn: "string"
      LambdaExecutionRole: "string"
      LambdaExecutionRoleArn: "string"
      Name: "string"
      Region: "string"
    }
  }
  geo: {
    jcMap: {
      Arn: "string"
      Name: "string"
      Region: "string"
      Style: "string"
    }
    jcPeople: {
      Arn: "string"
      Name: "string"
      Region: "string"
    }
  }
  hosting: {
    S3AndCloudFront: {
      CloudFrontDistributionID: "string"
      CloudFrontDomainName: "string"
      CloudFrontSecureURL: "string"
      HostingBucketName: "string"
      Region: "string"
      S3BucketSecureURL: "string"
      WebsiteURL: "string"
    }
  }
  storage: {
    jcProfile: {
      BucketName: "string"
      Region: "string"
    }
  }
}
