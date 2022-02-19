export type AmplifyDependentResourcesAttributes = {
  function: {
    jcmobilePostConfirmation: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    S3Trigger14f1cefa: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    S3Trigger839efa13: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    AdminQueries7403b6cf: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobilePreSignup: {
      Name: "string"
      Arn: "string"
      LambdaExecutionRole: "string"
      Region: "string"
    }
    jcUpdateMainUserGroup: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
      CloudWatchEventRule: "string"
    }
    jcProcessDMAlerts: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcProcessMessageAlerts: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileStripeCreatePaymentIntent: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobilePreTokenGeneration: {
      Name: "string"
      Arn: "string"
      LambdaExecutionRole: "string"
      Region: "string"
    }
    jcmobileStripWebhook: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileStripCreateCustomer: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileStripCreateSubscription: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileStripPreviewInvoice: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileCreateCognitoOrgUser: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileGetOrgStripeSubs: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileSendInviteToOrgUser: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileStripListInvoices: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileStripCancelSubscription: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileSendHelpRequest: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcHandleActivity: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobilePinpointCleanEndpoints: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
      CloudWatchEventRule: "string"
    }
    jcmobileStripListProducts: {
      Name: "string"
      Arn: "string"
      Region: "string"
      LambdaExecutionRole: "string"
    }
    jcmobileShared: {
      Arn: "string"
    }
  }
  auth: {
    jcmobile: {
      IdentityPoolId: "string"
      IdentityPoolName: "string"
      UserPoolId: "string"
      UserPoolArn: "string"
      UserPoolName: "string"
      AppClientIDWeb: "string"
      AppClientID: "string"
      CreatedSNSRole: "string"
      GoogleWebClient: "string"
      FacebookWebClient: "string"
    }
    userPoolGroups: {
      userpoolGroupRole: "string"
    }
  }
  api: {
    jcmobile: {
      GraphQLAPIIdOutput: "string"
      GraphQLAPIEndpointOutput: "string"
    }
    AdminQueries: {
      RootUrl: "string"
      ApiName: "string"
      ApiId: "string"
    }
    jcmobileAPI: {
      RootUrl: "string"
      ApiName: "string"
      ApiId: "string"
    }
  }
  analytics: {
    jcmobile: {
      Region: "string"
      Id: "string"
      appName: "string"
    }
  }
  hosting: {
    S3AndCloudFront: {
      Region: "string"
      HostingBucketName: "string"
      WebsiteURL: "string"
      S3BucketSecureURL: "string"
      CloudFrontDistributionID: "string"
      CloudFrontDomainName: "string"
      CloudFrontSecureURL: "string"
    }
  }
  storage: {
    jcProfile: {
      BucketName: "string"
      Region: "string"
    }
  }
  geo: {
    jcMap: {
      Name: "string"
      Style: "string"
      Region: "string"
      Arn: "string"
    }
    jcPeople: {
      Name: "string"
      Region: "string"
      Arn: "string"
    }
  }
}
