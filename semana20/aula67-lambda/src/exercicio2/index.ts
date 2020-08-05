export interface HandlerOutput {
  statusCode:number,
  body:string
}

export const handler = async (event:any):Promise<HandlerOutput> => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Olá mundo, sou uma mensagem da AWS")
  }

  return response;
}