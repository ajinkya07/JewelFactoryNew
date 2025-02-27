import { urls } from '../network/urls';

export const constants = {
  muskseedWebUrl: 'https://muskseeds.com/',
  MOBILE_NUMBER_MAX_LENGTH: 10,
  IMAGE_URL: urls.imageUrl + 'public/backend/collection/',
  THUMB_URL: urls.imageUrl + 'public/backend/product_images/thumb_image/',
  ZOOM_URL: urls.imageUrl + 'public/backend/product_images/zoom_image/',
  AVAILABLE: 'Available',
  muskseedPlayStoreUrl:
    'https://play.google.com/store/apps/dev?id=7818756662284068360&hl=en',
  muskseedAppStoreUrl: '',
};

export const ERROR_MESSAGES = {
  GROSS_WEIGHT: {
    TITLE: 'Gross Weight Error',
    FROM_MISSING: 'Please provide "From" value for Gross Weight.',
    TO_MISSING: 'Please provide "To" value for Gross Weight.',
  },
  NET_WEIGHT: {
    TITLE: 'Net Weight Error',
    FROM_MISSING: 'Please provide "From" value for Net Weight.',
    TO_MISSING: 'Please provide "To" value for Net Weight.',
  },
  DATE: {
    TITLE: 'Date Error',
    FROM_MISSING: 'Please provide "From Date" for Product Release.',
    TO_MISSING: 'Please provide "To Date" for Product Release.',
  },
};

export const fontFamilyLight = 'Manrope-Light';
export const fontFamilyRegular = 'Manrope-Regular';
export const fontFamilyMedium = 'Manrope-Medium';
export const fontFamilySemiBold = 'Manrope-SemiBold';
export const fontFamilyBold = 'Manrope-Bold';
