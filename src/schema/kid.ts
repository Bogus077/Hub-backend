export type CreateClassType = {
  request: {
    name: string,
  }
}

export type CreateKidsType = {
  request: [{
    name: string,
    lastName: string,
    ClassId: number,
  }]
}