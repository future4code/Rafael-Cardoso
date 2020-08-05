export interface HandlerOutput {
  statusCode:number,
  body:string
}

export interface ValidationEmailOutput {
  isEmail:boolean,
  reason?:string
}

export const handler = async (event:any):Promise<HandlerOutput> => {
  const text = event.text;
  let isEmail:boolean = true;
  let reason:string = '';
  if (text.indexOf('@') === -1 && text.indexOf('.') === -1) {
    isEmail = false;
    reason = "\'@\' and \'.\' are missing"
  } else if (text.indexOf('@') === -1) {
    isEmail = false;
    reason = "\'@\' is missing"
  } else if (text.indexOf('.') === -1) {
    isEmail = false;
    reason = "\'.\' is missing"
  } 
  const body:ValidationEmailOutput = reason ? { isEmail, reason } : { isEmail };
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(body)
  }

  return response;
}