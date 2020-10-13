// Shape of error reponse from Node.js REST API
export interface ServerError {
	errors: { msg: string; }[];
}
