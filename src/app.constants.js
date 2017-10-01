const {
  REACT_APP_BASE_URL: baseUrl,
  REACT_APP_MOCK_ENABLED: useMock,
} = process.env;

export const BASE_URL = baseUrl;
export const MOCK_ENABLED = parseInt(useMock, 10);
export const MOCK_URLS = {
  '/api/v1/get-token/': '/mocks/get-token.json',
};
