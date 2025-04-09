export const ENV_VARIABLE = {
  dev: {
    ENVIRONMENT: "Prod", // "Dev"
    IMAGE_BASE_URL: "https://d2kjgv54rdwtye.cloudfront.net/",
    API_BASE_URL: "https://p277xj9nqf.execute-api.ap-south-1.amazonaws.com",
    AWS_CONFIG: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_SbEjwtRsN",
      APP_CLIENT_ID: "19jjp32o8f6abgbdcsgk72j8f9",
      S3_BASE_URL: "https://d2kjgv54rdwtye.cloudfront.net/",
    },
  },
  uat: {
    ENVIRONMENT: "Prod", // "Uat"
    IMAGE_BASE_URL: "https://d2kjgv54rdwtye.cloudfront.net/",
    API_BASE_URL: "https://p277xj9nqf.execute-api.ap-south-1.amazonaws.com",
    AWS_CONFIG: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_SbEjwtRsN",
      APP_CLIENT_ID: "19jjp32o8f6abgbdcsgk72j8f9",
      S3_BASE_URL: "https://d2kjgv54rdwtye.cloudfront.net/",
    },
  },
  prod: {
    ENVIRONMENT: "Prod",
    IMAGE_BASE_URL: "https://d27xnkynewnw7.cloudfront.net/",
    API_BASE_URL: "https://rrxd95yu1g.execute-api.ap-south-1.amazonaws.com",
    AWS_CONFIG: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_vVL8h3ML4",
      APP_CLIENT_ID: "3oe76aja2d04bg8ido34mpj9iv",
      S3_BASE_URL: "https://d27xnkynewnw7.cloudfront.net/",
    },
  },
}; 
