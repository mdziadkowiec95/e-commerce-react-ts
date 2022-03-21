// Shape of error reponse from Node.js REST API
export interface ServerError {
	errors: { msg: string; }[];
}


// Contentful errors
export interface ContentfulError {
  name: string;
  value: string;
}

export interface ContentfulErrorResponse {
  sys: {
    type: string;
    id: string;
  };
  message: string;
  details: {
    errors: ContentfulError[]
  };
  requestId: string;
}
