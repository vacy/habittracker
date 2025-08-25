export class Habit {
  title!: string;
  description!: string;
  UUID!: string;


  constructor(title: string="", description: string="", UUID: string = crypto.randomUUID()){
    this.setTitle = title;
    this.setDescription = description;
    this.setUUID = UUID;
  }

  set setTitle(title:string){ this.title = title };
  set setDescription(description:string){ this.description = description};
  set setUUID(UUIDtoVerify:string){
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if(!uuidRegex.test(UUIDtoVerify)) {
      throw "UUID is invalid";
    }
    this.UUID = UUIDtoVerify;
  }
}
