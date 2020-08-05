export interface HandlerOutput {
  statusCode:number,
  body:string
}

export interface CharacterOutput {
  name:string,
  cartoonName:string,
  image:string
}

export const handler = async (event:any):Promise<HandlerOutput> => {
  const { name, cartoonName, image } = event;
  if (!name || !cartoonName || !image) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: 'Missing parameters' })
    }
  }

  const body:CharacterOutput = { name, cartoonName, image };
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(body)
  }

  return response;
}