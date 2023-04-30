import contentful from "contentful";

if (import.meta.env.DEV){
    process.env.CONTENTFUL_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
    process.env.CONTENTFUL_DELIVERY_TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;
    process.env.CONTENTFUL_PREVIEW_TOKEN = import.meta.env.CONTENTFUL_PREVIEW_TOKEN;
}

export const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.DEV
    ? process.env.CONTENTFUL_PREVIEW_TOKEN
    : process.env.CONTENTFUL_DELIVERY_TOKEN,
  host: process.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});