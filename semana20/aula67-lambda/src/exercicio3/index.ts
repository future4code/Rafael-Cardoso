export interface HandlerOutput {
  statusCode:number,
  body:string
}

export const handler = async (event:any):Promise<HandlerOutput> => {
  const a = event.a;
  const b = event.b;
  const sum = a + b;
  const response = {
    statusCode: 200,
    body: JSON.stringify(`A soma de ${a} e ${b} é ${sum}`)
  }

  return response;
}